import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  createPublicTrackingAdapter,normalizePublicTrackingProjection
} from "../js/protocol/tracking-public-v2.js";
import {trackingSiteConfig} from "../js/protocol/tracking-site-config.js";

const source=file=>fs.readFileSync(new URL("../"+file,import.meta.url),"utf8");
const trackedSite="11111111-1111-4111-8111-111111111111";
const ACCESS="A".repeat(43); // offline fixture only, not an issued capability
const endpoint="https://bnatbusjdomvnsurgtja.supabase.co/functions/v1/logistics-public-tracking";
const enabled=Object.freeze({enabled:true,publicInstallationKey:trackedSite,endpoint});
const projection=()=>({
 lifecycle_status:"received",carrier_label:"Transportista de prueba",
 tracking_number:"TEST-123",tracking_url:"https://carrier.example.com/track",
 shipping_promise_label:"Entrega estimada",
 delivery_min_operational_days:2,delivery_max_operational_days:5,
 delivery_time_band:"De 9 a 18 h",status_changed_at:"2026-11-16T20:00:00Z",
 delivered_at:null,
 observations:{items:[{body:"Tu pedido fue recibido.",created_at:"2026-11-16T20:00:00Z"}],
   page_size:25,has_more:false,next_cursor:null}
});
function response(status=200,data=projection()){
  return {ok:status>=200&&status<300,status,json:async()=>data};
}
test("LOG-OP-03B: default configuration blocks public requests and has no private credentials",async()=>{
 let calls=0;
 const adapter=createPublicTrackingAdapter(trackingSiteConfig,{fetchImpl:async()=>{calls++;return response();}});
 assert.equal(adapter.enabled,false);
 assert.equal((await adapter.lookup(ACCESS)).status,"UNAVAILABLE");
 assert.equal(calls,0);
 assert.equal(trackingSiteConfig.publicInstallationKey,"");
 assert.equal(trackingSiteConfig.enabled,false);
});
test("LOG-OP-03B: only a canonical tracked-site key and HTTPS public Edge can enable access",async()=>{
 const values=[
  {...enabled,enabled:false},
  {...enabled,publicInstallationKey:""},
  {...enabled,publicInstallationKey:"not-a-uuid"},
  {...enabled,endpoint:"http://bnatbusjdomvnsurgtja.supabase.co/functions/v1/logistics-public-tracking"},
  {...enabled,endpoint:"https://malicious.example.com/functions/v1/logistics-public-tracking"},
  {...enabled,endpoint:endpoint+"?access=LEAK"},
  {...enabled,endpoint:endpoint+"#access"},
  {...enabled,endpoint:"https://user:secret@bnatbusjdomvnsurgtja.supabase.co/functions/v1/logistics-public-tracking"}
 ];
 for(const bad of values){
  let calls=0;
  const adapter=createPublicTrackingAdapter(bad,{fetchImpl:async()=>{calls++;return response();}});
  assert.equal(adapter.enabled,false);
  assert.equal((await adapter.lookup(ACCESS)).status,"UNAVAILABLE");
  assert.equal(calls,0);
 }
});
test("LOG-OP-03B: 43-char capability POST body is exact; never URL/header/JWT/identity",async()=>{
 let urlSent,optionsSent;
 const adapter=createPublicTrackingAdapter(enabled,{fetchImpl:async(u,o)=>{
   urlSent=u;optionsSent=o;return response();
 }});
 const result=await adapter.lookup(ACCESS);
 assert.equal(result.status,"FOUND");
 assert.equal(urlSent,endpoint);
 assert.equal(urlSent.includes(ACCESS),false);
 assert.equal(optionsSent.method,"POST");
 assert.equal(optionsSent.credentials,"omit");
 assert.equal(optionsSent.cache,"no-store");
 assert.equal(optionsSent.redirect,"error");
 assert.equal(optionsSent.referrerPolicy,"no-referrer");
 assert.deepEqual(JSON.parse(optionsSent.body),{
   public_installation_key:trackedSite,access:ACCESS,page_size:25
 });
 assert.deepEqual(Object.keys(optionsSent.headers),["Content-Type"]);
 assert.equal(optionsSent.headers["Content-Type"],"application/json");
 assert.equal(Object.hasOwn(optionsSent.headers,"Origin"),false,"Origin must be supplied by the browser");
 assert.equal(Object.hasOwn(optionsSent.headers,"Authorization"),false);
});
test("LOG-OP-03B: a visible order/tracking ID is never an access capability",async()=>{
 let calls=0;
 const a=createPublicTrackingAdapter(enabled,{fetchImpl:async()=>{calls++;return response();}});
 for(const naked of ["#1001","TEST-123",trackedSite,"123456789",ACCESS.toLowerCase().slice(0,10),""]){
   assert.equal((await a.lookup(naked)).status,"NOT_FOUND");
 }
 assert.equal(calls,0);
});
test("LOG-OP-03B: accepted public response renders only Logistics allowlisted fields",async()=>{
 const a=createPublicTrackingAdapter(enabled,{fetchImpl:async()=>response()});
 const result=await a.lookup(ACCESS);
 assert.equal(result.status,"FOUND");
 assert.equal(result.projection.logistics.lifecycleStatus,"received");
 assert.equal(result.projection.logistics.trackingNumber,"TEST-123");
 assert.equal(result.projection.logistics.observations.length,1);
 assert.deepEqual(Object.keys(result.projection),["logistics"]);
 assert.equal(JSON.stringify(result).includes("customer"),false);
 assert.equal(JSON.stringify(result).includes("workspace"),false);
 assert.equal(JSON.stringify(result).includes(ACCESS),false);
 assert.equal(result.projection.logistics.trackingUrl,"https://carrier.example.com/track");
});
test("LOG-OP-03B: every canonical lifecycle stage maps to public projection",()=>{
 for(const state of ["received","dispatched","in_transit","delivered"]){
  const p=projection();p.lifecycle_status=state;
  p.delivered_at=state==="delivered"?"2026-11-16T21:00:00Z":null;
  const r=normalizePublicTrackingProjection(p);
  assert.equal(r.projection.logistics.lifecycleStatus,state);
  if(state==="delivered")assert.ok(r.projection.logistics.deliveredAt);
 }
});
test("LOG-OP-03B: unknown lifecycle and customer/order/commerce/internal fields are rejected",async()=>{
 const variants=[
  {...projection(),lifecycle_status:"paid"},
  {...projection(),customer_email:"example@example.com"},
  {...projection(),shipping_address:"private"},
  {...projection(),order:{total:9999}},
  {...projection(),workspace_id:trackedSite},
  {...projection(),observations:{...projection().observations,
     items:[{...projection().observations.items[0],is_internal:true}]}},
  {...projection(),observations:{...projection().observations,page_size:0}},
  {...projection(),observations:{...projection().observations,has_more:true}},
  {...projection(),status_changed_at:"invalid-date"}
 ];
 for(const data of variants){
  const adapter=createPublicTrackingAdapter(enabled,{fetchImpl:async()=>response(200,data)});
  assert.equal((await adapter.lookup(ACCESS)).status,"ERROR");
 }
});
test("LOG-OP-03B: invalid/unsafe carrier URLs are not emitted as clickable links",()=>{
 for(const url of ["javascript:alert(1)","http://carrier.example.com","https://alice:password@carrier.example.com","https://carrier.example.com/path#secret","not a url"]){
  const p=projection();p.tracking_url=url;
  assert.equal(normalizePublicTrackingProjection(p).projection.logistics.trackingUrl,null);
 }
});
test("LOG-OP-03B: ambiguous 404 (missing/cross-store/revoked) returns one NOT_FOUND",async()=>{
 let calls=0;
 const adapter=createPublicTrackingAdapter(enabled,{fetchImpl:async()=>{calls++;return response(404,{error:{code:"SITE_CONTEXT_NOT_FOUND"}});}});
 assert.equal((await adapter.lookup(ACCESS)).status,"NOT_FOUND");
 assert.equal(calls,1);
});
test("LOG-OP-03B: rate limiting/network/invalid response are not displayed as found",async()=>{
 for(const status of [400,401,403,429,500,503]){
   const adapter=createPublicTrackingAdapter(enabled,{fetchImpl:async()=>response(status,{error:{code:"RATE_LIMITED"}})});
   assert.equal((await adapter.lookup(ACCESS)).status,"ERROR");
 }
 const failure=createPublicTrackingAdapter(enabled,{fetchImpl:async()=>{throw Error("network error with secret");}});
 assert.equal((await failure.lookup(ACCESS)).status,"ERROR");
});
test("LOG-OP-03B: overlapping lookups do not double-send capability",async()=>{
 let release,calls=0;
 const pending=new Promise(r=>release=r);
 const adapter=createPublicTrackingAdapter(enabled,{fetchImpl:async()=>{calls++;await pending;return response();}});
 const first=adapter.lookup(ACCESS);
 assert.equal((await adapter.lookup(ACCESS)).status,"ERROR");
 release();
 assert.equal((await first).status,"FOUND");
 assert.equal(calls,1);
});
test("LOG-OP-03B: Santa Clausula page has no IND., mocked order or insecure lookup",()=>{
 const html=source("tracking.html"),js=source("js/tracking.js");
 const css=source("css/tracking.css"),config=source("js/protocol/tracking-site-config.js");
 assert.match(html,/Seguimiento de tu pedido · Santa Clausula/);
 assert.match(html,/id="trackingAccess"[^>]*type="password"/);
 assert.match(html,/id="trackingSubmit"[^>]*disabled/);
 assert.match(html,/name="referrer" content="no-referrer"/);
 assert.match(html,/src="\.\/js\/tracking\.js\?v=20261116-logop03b"/);
 assert.doesNotMatch(html,/>IND\.</);
 assert.doesNotMatch(html,/CAMISETAS|CAMPERAS|PANTALONES|BOTINES/);
 assert.doesNotMatch(js,/MOCK_RESULTS|FOUND_DEMO|MOCK_DEVELOPMENT_ONLY/);
 assert.doesNotMatch(js,/window\.IND_TRACKING_LOOKUP_ADAPTER/);
 assert.doesNotMatch(js,/innerHTML|localStorage|sessionStorage|location\.search|location\.hash|cookie/);
 assert.doesNotMatch(js,/console\.(log|error)|data-tracking-id|customer_name|shipping_address|totalAmount/);
 assert.match(js,/import \{createPublicTrackingAdapter\} from "\.\/protocol\/tracking-public-v2\.js"/);
 assert.match(js,/if\(input\)input\.value=""/);
 assert.match(js,/results\?\.append\(lifecycle\.article,details\.article/);
 assert.match(js,/href="\.\/soporte\.html"/);
 assert.match(css,/--tracking-accent: #16878C/);
 assert.match(config,/enabled: false/);
});
