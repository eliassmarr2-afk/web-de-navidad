/* SDS-LOG-01 | The INDUMENTARY tracking design with BC-02-safe data.
 * Real lookup: capability-only public reader, default disabled until site
 * installation and safe delivery are certified. Preview: synthetic only.
 * No order/customer/commerce data is returned by the public reader.
 */
import {trackingSiteConfig} from "./protocol/tracking-site-config.js";
import {createPublicTrackingAdapter} from "./protocol/tracking-public-v2.js";

const by=id=>document.getElementById(id);
const adapter=createPublicTrackingAdapter(trackingSiteConfig);
const preview=new URLSearchParams(window.location.search).get("vista")==="demo";
const STATES=["received","dispatched","in_transit","delivered"];
const TEXT={
  received:["Recibido","Tu pedido ingresó a nuestro circuito logístico."],
  dispatched:["Despachado","El paquete fue despachado para su distribución."],
  in_transit:["En camino","El envío se encuentra en camino."],
  delivered:["Entregado","El pedido figura como entregado."]
};
const els={
  form:by("trackingSearchForm"),input:by("trackingId"),
  submit:by("trackingSubmit"),status:by("trackingStatus"),
  demo:by("trackingDemoBanner"),empty:document.querySelector(".tracking-empty"),
  help:document.querySelector(".tracking-help-row"),results:by("trackingResults"),
  drawer:by("trackingDrawer"),backdrop:by("trackingDrawerBackdrop"),
  menu:by("trackingMenuButton"),close:by("trackingDrawerClose"),
  unknown:by("trackingUnknownId")
};
const illustration=els.empty?.querySelector("img");
const INITIAL="./assets/tracking-empty-state-final.webp?v=20261102-1305";
const NOT_FOUND="./assets/tracking-no-encontrado.png?v=20261102-1415";
const DEMO_ACCESS="C-1111";
const DEMO_NOT_FOUND=new Set(["A1111","B1111"]);
let loading=false;
function node(tag,className,value){
  const e=document.createElement(tag);
  if(className)e.className=className;
  if(value!==undefined&&value!==null)e.textContent=String(value);
  return e;
}
function put(root,...children){for(const child of children)if(child)root.append(child);return root;}
function stamp(raw){
  if(typeof raw!=="string"||!Number.isFinite(Date.parse(raw)))return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-AR",{timeZone:"America/Argentina/Buenos_Aires",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date(raw)).replace(",","");
}
function line(label,value){
  if(value===undefined||value===null||value==="")return null;
  return put(node("div","tracking-data-item"),node("dt","",label),node("dd","",value));
}
function card(title,updatedAt,area){
  const article=node("article","tracking-result-card");
  article.dataset.projection=area;
  const header=put(node("header","tracking-result-card__header"),node("h2","tracking-result-card__title",title),node("span","tracking-result-card__updated",stamp(updatedAt)));
  const body=node("div","tracking-result-card__body");
  put(article,header,body);return {article,body};
}
function slot(body,area){
  // Reserved for a separately certified PUBLIC incidents projection. BC-02
  // currently does not authorize any structured incident field.
  const e=node("div","tracking-public-incident");e.hidden=true;
  e.dataset.publicIncidentSlot=area;body.append(e);return e;
}
function demoIncident(area,title,message){
  // Never used for backend payloads. Synthetic preview-only evidence.
  const element=els.results?.querySelector('[data-public-incident-slot="'+area+'"]');
  if(!element)return;
  element.dataset.severity="warning";
  element.replaceChildren(node("strong","tracking-public-incident__title",title),node("span","tracking-public-incident__body",message));
  element.hidden=false;
}
function showState(state){
  els.results?.replaceChildren();
  if(els.results)els.results.hidden=true;
  if(els.empty){els.empty.hidden=false;els.empty.dataset.trackingState=state.toLowerCase();}
  if(els.help)els.help.hidden=false;
  if(illustration){
    const missing=state==="NOT_FOUND";
    illustration.src=missing?NOT_FOUND:INITIAL;
    illustration.alt=missing?"Ilustración de seguimiento no encontrado":"Ilustración de una persona buscando información de seguimiento con binoculares";
  }
  const message={
    EMPTY:preview?"Vista de prueba: usá C-1111 para ver una consulta exitosa; A1111 para una no encontrada.":"",
    NOT_FOUND:"No encontramos un seguimiento válido con ese acceso.",
    UNAVAILABLE:"El seguimiento real todavía no está habilitado. Estamos preparando la conexión segura.",
    ERROR:"No pudimos consultar el seguimiento en este momento. Intentá nuevamente."
  }[state]||"";
  if(els.status)els.status.textContent=message;
}
function showFound(result){
  const g=result?.projection?.logistics;
  if(!g||!STATES.includes(g.lifecycleStatus)){showState("ERROR");return;}
  const stepIndex=STATES.indexOf(g.lifecycleStatus);
  const first=card("Estado de tu pedido",g.updatedAt,"logistics");
  const timeline=node("ol","tracking-timeline");timeline.setAttribute("aria-label","Estados logísticos del pedido");
  STATES.forEach((id,index)=>{
    const [title,subtitle]=TEXT[id];
    const cls=index<stepIndex?"is-complete":index===stepIndex?"is-current":"is-pending";
    const item=put(node("li","tracking-timeline__item "+cls),
      node("span","tracking-timeline__node"),
      node("p","tracking-timeline__title",title),
      node("p","tracking-timeline__subtitle",subtitle));
    item.dataset.lifecycleStatus=id;timeline.append(item);
  });
  first.body.append(timeline);
  // BC-02 supplies PUBLIC observation bodies; the most recent may be rendered
  // under the operator-facing label “Mensaje de logística” without inventions.
  const publicNotes=Array.isArray(g.observations)?g.observations:[];
  if(publicNotes.length){
    const latest=publicNotes[0];
    const message=put(node("section","tracking-public-message"),
      node("h3","","Mensaje de logística"),
      node("p","",latest.body),
      node("time","",stamp(latest.createdAt)));
    first.body.append(message);
  }
  if(g.lifecycleStatus==="delivered"&&g.deliveredAt)
    first.body.append(node("p","tracking-public-note","Entrega registrada: "+stamp(g.deliveredAt)));
  slot(first.body,"status");
  const second=card("Información del envío",g.updatedAt,"shipment");
  const facts=node("dl","tracking-data-list");
  const promise=g.promiseLabel||(g.deliveryMinDays!==null&&g.deliveryMaxDays!==null?
    g.deliveryMinDays+" a "+g.deliveryMaxDays+" días operativos":null);
  put(facts,line("Estado",TEXT[g.lifecycleStatus][0]),line("Transportista",g.carrierLabel),
    line("Seguimiento",g.trackingNumber),line("Entrega prevista",promise),line("Franja horaria",g.deliveryTimeBand));
  if(!facts.children.length)facts.append(line("Información","Datos aún no disponibles"));
  second.body.append(facts);
  if(g.trackingUrl){
    const link=node("a","tracking-safe-link","Consultar con el transportista");
    link.href=g.trackingUrl;link.target="_blank";link.rel="noopener noreferrer";second.body.append(link);
  }
  slot(second.body,"shipment");
  const third=card("Actualizaciones del envío",g.updatedAt,"updates");
  if(publicNotes.length){
    const ul=node("ul","tracking-public-notes");
    for(const note of publicNotes){
      ul.append(put(node("li",""),node("span","",note.body),node("small","",stamp(note.createdAt))));
    }
    third.body.classList.add("tracking-result-card__body--flush");
    third.body.append(ul);
    if(g.hasMoreObservations)third.body.append(node("p","tracking-public-note","Hay actualizaciones anteriores disponibles."));
  }else third.body.append(node("p","tracking-public-note","Todavía no hay mensajes públicos adicionales."));
  slot(third.body,"updates");
  const fourth=card("Ayuda",g.updatedAt,"help");
  fourth.body.classList.add("tracking-result-card__body--flush");
  const link=node("a","tracking-action","Hablar con Soporte");
  link.href="./soporte.html";
  link.append(node("span","tracking-action__chevron","›"));
  fourth.body.append(link);
  slot(fourth.body,"support");
  els.results?.replaceChildren(first.article,second.article,third.article,fourth.article);
  if(preview){
    demoIncident("shipment","Ejemplo de incidencia","El transportista notificó una reprogramación. Este mensaje es de demostración.");
  }
  if(els.results)els.results.hidden=false;
  if(els.empty)els.empty.hidden=true;
  if(els.help)els.help.hidden=true;
  if(els.status)els.status.textContent=preview?"Resultado ficticio de demostración.":"Consulta realizada correctamente.";
}
const synthetic=Object.freeze({
  status:"FOUND",
  projection:{logistics:{
    lifecycleStatus:"in_transit",
    updatedAt:"2026-11-20T12:00:00-03:00",
    deliveredAt:null,carrierLabel:"Transportista de demostración",trackingNumber:"DEMO-1111",
    trackingUrl:null,promiseLabel:"Entrega estimada (ejemplo)",deliveryMinDays:null,deliveryMaxDays:null,
    deliveryTimeBand:"14:00–18:00 (ejemplo)",
    observations:[{body:"Tu envío presenta una actualización logística de ejemplo.",createdAt:"2026-11-20T12:00:00-03:00"}],
    hasMoreObservations:false
  }}
});
function setDrawer(isOpen){
  els.drawer?.classList.toggle("is-open",isOpen);
  els.backdrop?.classList.toggle("is-open",isOpen);
  els.drawer?.setAttribute("aria-hidden",String(!isOpen));
  els.menu?.setAttribute("aria-expanded",String(isOpen));
  document.body.style.overflow=isOpen?"hidden":"";
}
els.menu?.addEventListener("click",()=>setDrawer(true));
els.close?.addEventListener("click",()=>setDrawer(false));
els.backdrop?.addEventListener("click",()=>setDrawer(false));
document.querySelectorAll("[data-tracking-submenu]").forEach(toggle=>{
  toggle.addEventListener("click",()=>{
    const target=by(toggle.getAttribute("aria-controls"));
    const open=!target?.classList.contains("is-open");
    target?.classList.toggle("is-open",open);
    toggle.setAttribute("aria-expanded",String(open));
  });
});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&els.drawer?.classList.contains("is-open"))setDrawer(false);
});
els.unknown?.addEventListener("click",()=>{window.location.assign("./soporte.html");});
if(preview){
  if(els.demo)els.demo.hidden=false;
  if(els.input){
    els.input.disabled=false;els.input.type="text";els.input.maxLength=100;
    els.input.placeholder="ID de prueba: C-1111";
    els.input.setAttribute("aria-label","ID de seguimiento de demostración");
    els.input.name="demo_tracking_id";
  }
  if(els.submit)els.submit.disabled=false;
  showState("EMPTY");
}else if(adapter.enabled){
  if(els.input)els.input.disabled=false;
  if(els.submit)els.submit.disabled=false;
  showState("EMPTY");
}else{showState("UNAVAILABLE");}
els.form?.addEventListener("submit",async event=>{
  event.preventDefault();
  if(loading)return;
  if(preview){
    const id=String(els.input?.value||"").trim().toUpperCase();
    if(!id){showState("EMPTY");return;}
    if(id===DEMO_ACCESS){showFound(synthetic);return;}
    showState(DEMO_NOT_FOUND.has(id)?"NOT_FOUND":"NOT_FOUND");return;
  }
  if(!adapter.enabled)return;
  // Access is a single-use in-memory form value. No URL, logs or storage.
  const access=String(els.input?.value||"").trim();
  if(els.input)els.input.value="";
  if(!/^[A-Za-z0-9_-]{43}$/.test(access)){showState("NOT_FOUND");return;}
  loading=true;
  if(els.submit)els.submit.disabled=true;
  if(els.status)els.status.textContent="Consultando...";
  try{
    const result=await adapter.lookup(access);
    if(result.status==="FOUND")showFound(result);
    else showState(result.status);
  }catch{showState("ERROR");}
  finally{loading=false;if(els.submit)els.submit.disabled=false;}
});
