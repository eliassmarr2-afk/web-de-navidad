/* SDS Home — session-only optional delivery context; NOT a shipping quote. */
(()=>{"use strict";
const dialog=document.getElementById("sds-location-dialog");
const form=document.getElementById("sds-location-form");
const output=document.getElementById("sds-location-label");
if(!dialog||!form||!output)return;
const postal=form.elements.namedItem("postal");
const address=form.elements.namedItem("address");
const storageKey="sds:location:session:v1";
function setLabel(code){output.textContent=code?"Llega a "+code:"¿A dónde lo enviamos?";}
try{const raw=sessionStorage.getItem(storageKey);if(raw){const data=JSON.parse(raw);if(typeof data.postal==="string"){postal.value=data.postal;address.value=typeof data.address==="string"?data.address:"";setLabel(data.postal);}}}catch{}
document.querySelectorAll("[data-sds-location-open]").forEach(btn=>btn.addEventListener("click",()=>dialog.showModal()));
dialog.querySelectorAll("[data-sds-location-close]").forEach(btn=>btn.addEventListener("click",()=>dialog.close()));
form.addEventListener("submit",e=>{
e.preventDefault();const value=postal.value.trim().toUpperCase().slice(0,8);
if(!/^[A-Z0-9]{4,8}$/.test(value)){postal.setCustomValidity("Ingresá un código postal válido.");postal.reportValidity();return;}
postal.setCustomValidity("");const street=address.value.trim().slice(0,120);
try{sessionStorage.setItem(storageKey,JSON.stringify({postal:value,address:street}));}catch{}
setLabel(value);dialog.close();
});
postal.addEventListener("input",()=>postal.setCustomValidity(""));
})();


// MIG-SHFY-01D: use a top-layer navigation drawer so the 25svh hero never clips it.
(()=>{
  const menu=document.getElementById("sds-menu-dialog");
  const trigger=document.querySelector("[data-sds-menu-open]");
  if(!menu||!trigger)return;
  trigger.addEventListener("click",()=>menu.showModal());
  menu.querySelector("[data-sds-menu-close]")?.addEventListener("click",()=>menu.close());
  menu.addEventListener("click",e=>{if(e.target===menu)menu.close();});
  menu.addEventListener("close",()=>trigger.focus({preventScroll:true}));
})();

