/* Santa Clausula · LOG-OP-03B.
 * Safe PUBLIC tracking only: no demo fallback, no Orders/Commerce/Support
 * projection, no operator JWT, no access tokens in URL/storage/logs/DOM.
 */
import {trackingSiteConfig} from "./protocol/tracking-site-config.js";
import {createPublicTrackingAdapter} from "./protocol/tracking-public-v2.js";

const adapter=createPublicTrackingAdapter(trackingSiteConfig);
const order=["received","dispatched","in_transit","delivered"];
const copy=Object.freeze({
  received:["Recibido","Tu pedido ingresó al circuito logístico."],
  dispatched:["Despachado","El pedido fue despachado."],
  in_transit:["En camino","El envío se encuentra en distribución."],
  delivered:["Entregado","El envío figura como entregado."]
});
const byId=id=>document.getElementById(id);
const form=byId("trackingSearchForm");
const input=byId("trackingAccess");
const submit=byId("trackingSubmit");
const statusMessage=byId("trackingStatus");
const results=byId("trackingResults");
const empty=document.querySelector(".tracking-empty");
const help=document.querySelector(".tracking-help-row");
const drawer=byId("trackingDrawer");
const backdrop=byId("trackingDrawerBackdrop");
const drawerButton=byId("trackingMenuButton");
const closeDrawer=byId("trackingDrawerClose");
let loading=false;

function element(tag,className,text){
  const e=document.createElement(tag);
  if(className)e.className=className;
  if(text!==undefined&&text!==null)e.textContent=String(text);
  return e;
}
function add(root,...children){for(const child of children)if(child)root.append(child);return root;}
function timestamp(value){
  if(typeof value!=="string"||!Number.isFinite(Date.parse(value)))return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-AR",{
    timeZone:"America/Argentina/Buenos_Aires",dateStyle:"short",timeStyle:"short"
  }).format(new Date(value));
}
function line(label,value){
  if(value===null||value===undefined||value==="")return null;
  const row=element("div","tracking-data-item");
  add(row,element("dt","",label),element("dd","",value));
  return row;
}
function card(title,updatedAt){
  const article=element("article","tracking-result-card");
  const header=element("header","tracking-result-card__header");
  add(header,element("h2","tracking-result-card__title",title),
    element("span","tracking-result-card__updated",timestamp(updatedAt)));
  const body=element("div","tracking-result-card__body");
  add(article,header,body);
  return {article,body};
}
function stageRow(state,index,currentIndex){
  const [title,description]=copy[state];
  const className=index<currentIndex?"is-complete":index===currentIndex?"is-current":"is-pending";
  const item=element("li","tracking-timeline__item "+className);
  item.dataset.lifecycleStatus=state;
  add(item,element("span","tracking-timeline__node"),
    element("p","tracking-timeline__title",title),
    element("p","tracking-timeline__subtitle",description));
  return item;
}
function showFound(data){
  const logistics=data?.projection?.logistics;
  if(!logistics||!order.includes(logistics.lifecycleStatus)){
    showState("ERROR");return;
  }
  results?.replaceChildren();
  const lifecycle=card("Estado de tu pedido",logistics.updatedAt);
  const timeline=element("ol","tracking-timeline");
  timeline.setAttribute("aria-label","Recorrido logístico del pedido");
  order.forEach((state,i)=>timeline.append(stageRow(state,i,order.indexOf(logistics.lifecycleStatus))));
  lifecycle.body.append(timeline);
  if(logistics.lifecycleStatus==="delivered"&&logistics.deliveredAt){
    lifecycle.body.append(element("p","tracking-result-note","Entrega registrada: "+timestamp(logistics.deliveredAt)));
  }
  const details=card("Información del envío",logistics.updatedAt);
  const facts=element("dl","tracking-data-list");
  const promise=logistics.promiseLabel||
    (logistics.deliveryMinDays!==null&&logistics.deliveryMaxDays!==null
      ?logistics.deliveryMinDays+" a "+logistics.deliveryMaxDays+" días operativos":null);
  add(facts,line("Estado",copy[logistics.lifecycleStatus][0]),
    line("Transportista",logistics.carrierLabel),
    line("Número de seguimiento",logistics.trackingNumber),
    line("Plazo previsto",promise),
    line("Franja de entrega",logistics.deliveryTimeBand));
  details.body.append(facts);
  if(logistics.trackingUrl){
    const link=element("a","tracking-safe-link","Consultar con transportista");
    link.href=logistics.trackingUrl;link.target="_blank";link.rel="noopener noreferrer";
    details.body.append(link);
  }
  const obs=logistics.observations||[];
  if(obs.length){
    const notes=card("Actualizaciones del envío",logistics.updatedAt);
    const ul=element("ul","tracking-public-notes");
    for(const note of obs){
      const li=element("li");
      add(li,element("span","",note.body),
        element("small","",timestamp(note.createdAt)));
      ul.append(li);
    }
    notes.body.append(ul);
    if(logistics.hasMoreObservations)notes.body.append(
      element("p","tracking-result-note","Hay actualizaciones anteriores disponibles.")
    );
    results?.append(notes.article);
  }
  const support=element("a","tracking-safe-link tracking-help-cta","Contactar a Soporte");
  support.href="./soporte.html";
  results?.append(lifecycle.article,details.article,support);
  if(results)results.hidden=false;
  if(empty)empty.hidden=true;
  if(help)help.hidden=true;
  setStatus("Seguimiento consultado correctamente.");
}
function setStatus(message){if(statusMessage)statusMessage.textContent=message;}
function showState(status){
  if(results){results.replaceChildren();results.hidden=true;}
  if(empty){empty.hidden=false;empty.dataset.trackingState=status.toLowerCase();}
  if(help)help.hidden=false;
  switch(status){
    case "EMPTY":setStatus("");break;
    case "NOT_FOUND":setStatus("No pudimos consultar un seguimiento válido con ese acceso.");break;
    case "UNAVAILABLE":setStatus("El seguimiento online todavía no está habilitado para esta tienda.");break;
    default:setStatus("No pudimos consultar el seguimiento en este momento. Intentá más tarde.");break;
  }
}
function setDrawer(open){
  drawer?.classList.toggle("is-open",open);
  backdrop?.classList.toggle("is-open",open);
  drawer?.setAttribute("aria-hidden",String(!open));
  drawerButton?.setAttribute("aria-expanded",String(open));
  document.body.style.overflow=open?"hidden":"";
}
drawerButton?.addEventListener("click",()=>setDrawer(true));
closeDrawer?.addEventListener("click",()=>setDrawer(false));
backdrop?.addEventListener("click",()=>setDrawer(false));
document.querySelectorAll("[data-tracking-submenu]").forEach(toggle=>{
  toggle.addEventListener("click",()=>{
    const target=byId(toggle.getAttribute("aria-controls"));
    const open=!target?.classList.contains("is-open");
    target?.classList.toggle("is-open",open);
    toggle.setAttribute("aria-expanded",String(open));
  });
});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&drawer?.classList.contains("is-open"))setDrawer(false);
});
if(!adapter.enabled){
  if(input)input.disabled=true;
  if(submit)submit.disabled=true;
  showState("UNAVAILABLE");
}else{
  showState("EMPTY");
}
form?.addEventListener("submit",async event=>{
  event.preventDefault();
  if(loading||!adapter.enabled)return;
  // Read access once. Clear browser control immediately, never store or echo it.
  const access=String(input?.value??"").trim();
  if(input)input.value="";
  if(!/^[A-Za-z0-9_-]{43}$/.test(access)){
    showState("NOT_FOUND");return;
  }
  loading=true;
  if(submit)submit.disabled=true;
  setStatus("Consultando el seguimiento...");
  try{
    const result=await adapter.lookup(access);
    if(result.status==="FOUND")showFound(result);
    else showState(result.status);
  }catch{
    showState("ERROR");
  }finally{
    loading=false;
    if(submit)submit.disabled=false;
  }
});
