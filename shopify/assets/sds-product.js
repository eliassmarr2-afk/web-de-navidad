/* MIG-SHFY-03 | Native Shopify variant selection, gallery and details, no mock price. */
(()=>{"use strict";
const root=document.querySelector("[data-sds-product]");if(!root)return;
const form=document.getElementById(root.dataset.productForm),input=form?.querySelector('input[name="id"]');
const cards=[...root.querySelectorAll("[data-sds-offer]")],price=root.querySelector("[data-sds-current-price]"),sticky=root.querySelector("[data-sds-sticky-price]"),old=root.querySelector("[data-sds-current-compare]"),cta=root.querySelector("[data-sds-buy-button]");
const image=root.querySelector("[data-sds-main-image]"),thumbs=[...root.querySelectorAll("[data-sds-thumb]")];
const dialog=root.querySelector("[data-sds-detail-dialog]"),contents=dialog?.querySelector("[data-sds-dialog-content]");
const dTitle=root.querySelector("[data-sds-selected-label]");
let selected=String(input?.value||"");
const offer=id=>cards.find(c=>c.dataset.sdsOffer===String(id));
function select(id){
  const c=offer(id);if(!c)return;
  selected=String(id);if(input)input.value=selected;
  cards.forEach(el=>{const active=el===c;el.classList.toggle("is-selected",active);const button=el.querySelector("[data-sds-select-offer]");button?.setAttribute("aria-pressed",String(active));});
  if(price)price.textContent=c.dataset.price||"";if(sticky)sticky.textContent=c.dataset.price||"";
  if(old){old.textContent=c.dataset.compare||"";old.hidden=!c.dataset.compare;}
  if(dTitle)dTitle.textContent=c.dataset.label||"";
  if(cta){cta.disabled=c.dataset.available!=="true";cta.textContent=cta.disabled?(c.dataset.reason==="bundle"?"Combo en preparación":"Sin stock"):"Iniciar compra ›";}
  if(image&&c.dataset.image){image.src=c.dataset.image;image.alt=c.dataset.imageAlt||image.alt;}
}
function closeDialog(){if(dialog?.open)dialog.close();}
root.addEventListener("click",e=>{
 const d=e.target.closest("[data-sds-details]");if(d){
   const c=offer(d.dataset.sdsDetails);const template=c?.querySelector("template[data-sds-details-template]");
   if(!c||!template||!dialog||!contents)return;
   contents.replaceChildren(template.content.cloneNode(true));dialog.dataset.variant=c.dataset.sdsOffer;dialog.showModal();return;
 }
 const c=e.target.closest("[data-sds-select-offer]");if(c){select(c.dataset.sdsSelectOffer);return;}
 const thumb=e.target.closest("[data-sds-thumb]");if(thumb&&image){image.src=thumb.dataset.image;image.alt=thumb.dataset.alt||"";thumbs.forEach(x=>{const on=x===thumb;x.classList.toggle("is-selected",on);x.setAttribute("aria-pressed",String(on));});return;}
 if(e.target.closest("[data-sds-detail-close]")){closeDialog();return;}
 if(e.target.closest("[data-sds-detail-select]")){const id=dialog?.dataset.variant;if(id)select(id);closeDialog();return;}
 if(e.target.closest("[data-sds-share]")){if(navigator.share)navigator.share({title:document.title,url:location.href}).catch(()=>{});else if(navigator.clipboard?.writeText)navigator.clipboard.writeText(location.href).catch(()=>{});}
});
if(dialog){dialog.addEventListener("click",e=>{if(e.target===dialog)closeDialog();});}
if(selected)select(selected);
})();


/* Session-only CP display across Home and Product, no logistics requests. */
(()=>{
 const root=document.querySelector("[data-sds-product]");if(!root)return;
 const dialog=root.querySelector("[data-sds-location-dialog]"),form=root.querySelector("[data-sds-location-form]"),label=root.querySelector("[data-sds-location-label]");
 if(!dialog||!form||!label)return;
 const storageKey="sds:location:session:v1",postal=form.elements.namedItem("postal"),address=form.elements.namedItem("address");
 const setLabel=value=>{label.textContent=value?"Llega a CP "+value+" · Cambiar ›":"Llega a · Completá tu dirección de envío ›";};
 try{const d=JSON.parse(sessionStorage.getItem(storageKey)||"null");if(d&&typeof d.postal==="string"&&/^[A-Z0-9]{4,8}$/.test(d.postal)){postal.value=d.postal;address.value=typeof d.address==="string"?d.address:"";setLabel(d.postal);}}catch{}
 root.querySelector("[data-sds-location-open]")?.addEventListener("click",()=>dialog.showModal());
 root.querySelector("[data-sds-location-close]")?.addEventListener("click",()=>dialog.close());
 dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
 postal.addEventListener("input",()=>postal.setCustomValidity(""));
 form.addEventListener("submit",e=>{
   e.preventDefault();const cp=postal.value.trim().toUpperCase().slice(0,8);
   if(!/^[A-Z0-9]{4,8}$/.test(cp)){postal.setCustomValidity("Ingresá un código postal argentino válido.");postal.reportValidity();return;}
   const addr=address.value.trim().slice(0,120);postal.setCustomValidity("");
   try{sessionStorage.setItem(storageKey,JSON.stringify({postal:cp,address:addr}));}catch{}
   setLabel(cp);dialog.close();
 });
})();
