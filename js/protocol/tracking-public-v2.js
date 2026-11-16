/* Santa Clausula · LOG-OP-03B — public capability-only tracking reader.
 * This module never reads operator JWTs, Shopify cookies, Support capabilities,
 * URLs/search parameters or untrusted order/tracking numbers.
 * Its response is a deliberately minimal Logistics V2 projection only.
 */
const KEY=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ACCESS=/^[A-Za-z0-9_-]{43}$/;
const STATES=Object.freeze(["received","dispatched","in_transit","delivered"]);
const TRACKING_FIELDS=Object.freeze([
  "lifecycle_status","carrier_label","tracking_number","tracking_url",
  "shipping_promise_label","delivery_min_operational_days",
  "delivery_max_operational_days","delivery_time_band",
  "status_changed_at","delivered_at","observations"
]);
const OBSERVATION_FIELDS=Object.freeze(["items","page_size","has_more","next_cursor"]);
const ERROR_RESULT=Object.freeze({status:"ERROR"});
const NOT_FOUND_RESULT=Object.freeze({status:"NOT_FOUND"});
const UNAVAILABLE_RESULT=Object.freeze({status:"UNAVAILABLE"});

const plainObject=value=>value!==null&&typeof value==="object"&&!Array.isArray(value);
function exactly(obj,fields){
  return plainObject(obj)&&Object.keys(obj).length===fields.length&&
    fields.every(key=>Object.hasOwn(obj,key));
}
function boundedOptional(value,max=180){
  return value===null||
    (typeof value==="string"&&value.length<=max);
}
function validDate(value){
  return typeof value==="string"&&value.length<=45&&Number.isFinite(Date.parse(value));
}
function nonnegativeOptional(value){
  return value===null||(Number.isSafeInteger(value)&&value>=0);
}
function safeExternalLink(raw){
  if(typeof raw!=="string"||raw.length>500)return null;
  try{
    const u=new URL(raw);
    return u.protocol==="https:"&&u.hostname&&u.username===""&&u.password===""&&
      u.hash===""?u.href:null;
  }catch{return null;}
}
export function normalizePublicTrackingProjection(payload){
  if(!exactly(payload,TRACKING_FIELDS)||!STATES.includes(payload.lifecycle_status)||
    !validDate(payload.status_changed_at)||
    !(payload.delivered_at===null||validDate(payload.delivered_at))||
    !boundedOptional(payload.carrier_label,140)||
    !boundedOptional(payload.tracking_number,180)||
    !boundedOptional(payload.tracking_url,500)||
    !boundedOptional(payload.shipping_promise_label,220)||
    !boundedOptional(payload.delivery_time_band,140)||
    !nonnegativeOptional(payload.delivery_min_operational_days)||
    !nonnegativeOptional(payload.delivery_max_operational_days))
    throw Error("Invalid public tracking projection");
  const observations=payload.observations;
  if(!exactly(observations,OBSERVATION_FIELDS)||
    !Number.isInteger(observations.page_size)||observations.page_size<1||
    observations.page_size>100||typeof observations.has_more!=="boolean"||
    !Array.isArray(observations.items)||
    observations.items.length>observations.page_size||
    !(observations.next_cursor===null||
      (typeof observations.next_cursor==="string"&&observations.next_cursor.length<=512)))
    throw Error("Invalid public observations");
  if(observations.has_more!==Boolean(observations.next_cursor))throw Error("Inconsistent public cursor");
  const items=observations.items.map(item=>{
    if(!exactly(item,["body","created_at"])||
      typeof item.body!=="string"||item.body.length>3000||
      !validDate(item.created_at))
      throw Error("Invalid public observation");
    return Object.freeze({body:item.body,createdAt:item.created_at});
  });
  return Object.freeze({
    status:"FOUND",
    projection:Object.freeze({
      logistics:Object.freeze({
        lifecycleStatus:payload.lifecycle_status,
        updatedAt:payload.status_changed_at,
        deliveredAt:payload.delivered_at,
        carrierLabel:payload.carrier_label,
        trackingNumber:payload.tracking_number,
        trackingUrl:safeExternalLink(payload.tracking_url),
        promiseLabel:payload.shipping_promise_label,
        deliveryMinDays:payload.delivery_min_operational_days,
        deliveryMaxDays:payload.delivery_max_operational_days,
        deliveryTimeBand:payload.delivery_time_band,
        observations:Object.freeze(items),
        hasMoreObservations:observations.has_more
      })
    })
  });
}
function validEndpoint(value){
  if(typeof value!=="string")return false;
  try{
    const u=new URL(value);
    return u.protocol==="https:"&&u.username===""&&u.password===""&&
      u.hash===""&&u.search===""&&
      u.pathname.endsWith("/functions/v1/logistics-public-tracking")&&
      (u.hostname.endsWith(".supabase.co")||u.hostname.endsWith(".supabase.in"));
  }catch{return false;}
}
export function createPublicTrackingAdapter(config,{fetchImpl=globalThis.fetch}={}){
  const activated=config?.enabled===true&&KEY.test(String(config.publicInstallationKey||""))&&
    validEndpoint(config.endpoint)&&typeof fetchImpl==="function";
  const enabled=Boolean(activated);
  const endpoint=enabled?config.endpoint:null;
  const installationKey=enabled?config.publicInstallationKey:null;
  let busy=false;
  return Object.freeze({
    enabled,
    async lookup(access){
      if(!enabled)return UNAVAILABLE_RESULT;
      if(typeof access!=="string"||!ACCESS.test(access))return NOT_FOUND_RESULT;
      if(busy)return ERROR_RESULT; // no duplicated network lookup
      busy=true;
      try{
        const response=await fetchImpl(endpoint,{
          method:"POST",
          mode:"cors",
          credentials:"omit",
          cache:"no-store",
          redirect:"error",
          referrerPolicy:"no-referrer",
          headers:{"Content-Type":"application/json"},
          // Auth boundary: no store/order/tracking number, never a query string.
          body:JSON.stringify({
            public_installation_key:installationKey,
            access,
            page_size:25
          })
        });
        if(response?.status===404)return NOT_FOUND_RESULT;
        if(response?.status!==200||response.ok!==true)return ERROR_RESULT;
        const value=await response.json();
        return normalizePublicTrackingProjection(value);
      }catch{
        return ERROR_RESULT; // NEVER log or echo capability
      }finally{
        busy=false;
      }
    }
  });
}
