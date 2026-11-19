(() => {
  "use strict";
  // SDS-01.2: preview-only offers; runtime is the selection authority.
  const money=n=>"$"+Number(n).toLocaleString("es-AR");
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const photo=s=>"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="white"/>'+s+'</svg>');
  const p='<ellipse cx="60" cy="98" rx="35" ry="5" fill="#e2e5e7"/><rect x="54" y="72" width="12" height="23" fill="#252a35"/><ellipse cx="60" cy="96" rx="24" ry="5" fill="#343b49"/><rect x="25" y="31" width="70" height="45" rx="12" fill="#252a35"/><rect x="29" y="35" width="62" height="37" rx="10" fill="#48515e"/><circle cx="64" cy="54" r="19" fill="#171d26"/><circle cx="64" cy="54" r="13" fill="#698ba8"/><circle cx="68" cy="50" r="7" fill="#d4ebfa"/>';
  const c='<path d="M12 20H108" stroke="#b9a368" stroke-width="2"/>'+[18,32,46,60,74,88,102].map(x=>'<path d="M'+x+' 20V96" stroke="#c9b786"/>'+[30,43,56,69,82].map(y=>'<circle cx="'+x+'" cy="'+y+'" r="3" fill="#f4c65c"/>').join("")).join("");
  const l='<g fill="none" stroke="#c49c46" stroke-width="3">'+[18,23,28,33].map(r=>'<ellipse cx="60" cy="65" rx="'+(r+10)+'" ry="'+r/2+'"/>').join("")+'</g>'+Array.from({length:16},(_,i)=>'<circle cx="'+(60+40*Math.cos(i*Math.PI/8))+'" cy="'+(65+18*Math.sin(i*Math.PI/8))+'" r="4" fill="#ffd875"/>').join("");
  const art={projector:photo(p),pair:photo('<g transform="translate(0 2) scale(.64)">'+p+'</g><g transform="translate(42 35) scale(.64)">'+p+'</g>'),curtain:photo(c),lights:photo(l),mixed:photo('<g transform="translate(1 16) scale(.60)">'+p+'</g><g transform="translate(63 1) scale(.45)">'+c+'</g><g transform="translate(61 58) scale(.47)">'+l+'</g>')};
  function getOffers(product){
    const unit={id:"demo-offer-"+product.id+"-single",kind:"single",label:"1 Unidad",subtitle:"",price:product.price,compareAt:Math.round(product.price*1.2/10)*10,badge:"",image:product.id==="prod-002"?art.projector:product.image,productSetId:null,items:[]};
    if(product.id!=="prod-002")return [unit];
    const item=quantity=>({sku:"demo-proyector",quantity,title:"Proyector navideño",image:art.projector,referenceUnitPrice:product.price});
    return [unit,
      {id:"demo-offer-prod-002-x2",kind:"quantity",label:"Oferta x2",subtitle:"2 unidades",badge:"SOLO HOY",price:134990,compareAt:product.price*2,image:art.pair,productSetId:"demo-set-prod-002-x2",items:[item(2)]},
      {id:"demo-offer-prod-002-mixed",kind:"bundle",label:"Combo Navidad",subtitle:"3 productos · máximo ahorro",badge:"SOLO HOY",price:109990,compareAt:product.price+29990+19990,image:art.mixed,productSetId:"demo-set-prod-002-mixed",items:[item(1),{sku:"demo-cortina",quantity:1,title:"Cortina LED 3x3",image:art.curtain,referenceUnitPrice:29990},{sku:"demo-guirnalda",quantity:1,title:"Guirnalda LED cálida",image:art.lights,referenceUnitPrice:19990}]}];
  }
  function mount({root,offers,selectedId,onSelect}){
    if(!root||!offers.length)return null;
    const by=id=>document.getElementById(id),backdrop=by("comboDetailBackdrop"),title=by("comboDetailTitle"),image=by("comboDetailImage"),copy=by("comboDetailCopy"),items=by("comboDetailItems"),price=by("comboDetailPrice"),compare=by("comboDetailCompare"),select=by("comboDetailSelect"),close=by("comboDetailClose");
    let currentId=selectedId,detailId=null,previousFocus=null;
    const e=esc;
    const row=i=>'<li><img src="'+e(i.image)+'" alt="" loading="lazy"><span>'+e(i.quantity+" × "+i.title)+'</span><s>'+e(money(i.referenceUnitPrice)+(i.quantity>1?" c/u":""))+'</s></li>';
    const card=o=>'<article class="sds-offer-card'+(o.badge?' has-badge':'')+'" data-sds-offer="'+e(o.id)+'" data-combo-id="'+e(o.id)+'" data-offer-kind="'+e(o.kind)+'">'+(o.badge?'<span class="sds-offer-badge">'+e(o.badge)+'</span>':'')+'<div class="sds-offer-head"><button type="button" class="sds-offer-select" data-select-offer="'+e(o.id)+'" aria-label="'+e(o.label+", "+money(o.price))+'" aria-pressed="false"></button><img class="sds-offer-image" src="'+e(o.image)+'" alt="" loading="lazy"><div class="sds-offer-copy"><span class="sds-offer-title">'+e(o.label)+'</span>'+(o.subtitle?'<span class="sds-offer-subtitle">'+e(o.subtitle)+'</span>':'')+'</div><div class="sds-offer-prices"><strong>'+e(money(o.price))+'</strong>'+(o.compareAt>o.price?'<s>'+e(money(o.compareAt))+'</s>':'')+'</div>'+(o.kind!=="single"?'<button type="button" class="sds-offer-details" data-details-offer="'+e(o.id)+'" aria-haspopup="dialog" aria-controls="comboDetailBackdrop">Detalles <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>':'')+'</div>'+(o.items.length?'<ul class="sds-offer-includes" aria-label="Componentes incluidos">'+o.items.map(row).join("")+'</ul>':'')+'</article>';
    root.innerHTML='<p class="sds-offer-preview">Ofertas de demostración · precios ilustrativos</p>'+offers.map(card).join("");
    function setSelected(id){
      if(!offers.some(o=>o.id===id))return;
      currentId=id;
      root.querySelectorAll("[data-sds-offer]").forEach(c=>{const active=c.dataset.sdsOffer===id;c.classList.toggle("is-selected",active);c.querySelector("[data-select-offer]")?.setAttribute("aria-pressed",String(active));});
      if(select&&detailId){select.textContent=detailId===id?"Oferta seleccionada":"Seleccionar oferta";select.classList.toggle("is-selected",detailId===id);}
    }
    function choose(id){if(offers.some(o=>o.id===id))onSelect(id);}
    function openDetails(id,trigger){
      const o=offers.find(v=>v.id===id);if(!o||!backdrop||o.kind==="single")return;
      detailId=id;previousFocus=trigger;
      if(title)title.textContent=o.label;if(image){image.src=o.image;image.alt=o.label;}
      if(copy)copy.textContent=o.subtitle+" · Composición ilustrativa.";
      if(items)items.replaceChildren(...o.items.map(i=>{const li=document.createElement("li");li.textContent=i.quantity+" × "+i.title;return li;}));
      if(price)price.textContent=money(o.price);if(compare){compare.textContent=o.compareAt>o.price?money(o.compareAt):"";compare.hidden=!(o.compareAt>o.price);}
      setSelected(currentId);backdrop.hidden=false;document.body.classList.add("no-scroll");
      requestAnimationFrame(()=>{if(!backdrop.hidden&&detailId===id){backdrop.classList.add("is-open");close?.focus();}});
    }
    function closeDetails(){if(!backdrop||backdrop.hidden)return;detailId=null;backdrop.hidden=true;backdrop.classList.remove("is-open");document.body.classList.remove("no-scroll");previousFocus?.focus();previousFocus=null;}
    root.addEventListener("click",ev=>{const d=ev.target.closest("[data-details-offer]");if(d){openDetails(d.dataset.detailsOffer,d);return;}const c=ev.target.closest("[data-sds-offer]");if(c)choose(c.dataset.sdsOffer);});
    select?.addEventListener("click",()=>{if(detailId){choose(detailId);closeDetails();}});
    close?.addEventListener("click",closeDetails);backdrop?.addEventListener("click",ev=>{if(ev.target===backdrop)closeDetails();});
    window.addEventListener("keydown",ev=>{if(ev.key==="Escape"&&backdrop&&!backdrop.hidden)closeDetails();});
    setSelected(selectedId);return {setSelected};
  }
  window.SDSOfferCards=Object.freeze({getOffers,mount});
})();
