(() => {
  "use strict";
  // SDS-01.2: preview-only offers; runtime is the selection authority.
  const money=n=>"$"+Number(n).toLocaleString("es-AR");
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  // SDS-01.4: visual mapping for approved tree offer cards.
  // Demo references, not Shopify variant IDs or certified Protocol Data SKUs.
  const assets = Object.freeze({
    tree: "./assets/productos/arbol-canadiense-150cm/arbol-canadiense-150cm-principal.webp",
    combo: "./assets/productos/arbol-canadiense-150cm/arbol-canadiense-150cm-combo-con-luces.webp",
    lights: "./assets/productos/arbol-canadiense-150cm/luces-led-multicolor-50m.webp",
    baubles: "./assets/productos/arbol-canadiense-150cm/esferas-rojas-pack-x15.webp",
    tinsel: "./assets/productos/arbol-canadiense-150cm/guirnalda-roja.webp"
  });

  function getOffers(product) {
    const treePreview = product.id === "prod-002";
    const unit = {
      id: "demo-offer-" + product.id + "-single",
      kind: "single",
      label: "1 Unidad",
      subtitle: "",
      price: product.price,
      compareAt: Math.round(product.price * 1.2 / 10) * 10,
      badge: "",
      image: treePreview ? assets.tree : product.image,
      productSetId: null,
      items: []
    };
    if (!treePreview) return [unit];

    // Four distinct component types. 30 decorative balls are shown to the
    // customer, while the tentative pack-of-15 component has quantity 2.
    // Display prices are strictly MOCK until the Shopify offer is approved.
    const components = [
      { sku: "demo-arbol-150cm", quantity: 1, title: "Árbol 150 cm", image: assets.tree, referenceUnitPrice: product.price },
      { sku: "demo-luces-50m", quantity: 1, title: "Luces Navideñas 50m", image: assets.lights, referenceUnitPrice: 29990 },
      { sku: "demo-esferas-pack-x15", quantity: 2, displayQuantity: 30, title: "Pelotas Decorativas", image: assets.baubles, referenceUnitPrice: 19990, referenceUnitText: "por pack x15" },
      { sku: "demo-guirnalda-roja", quantity: 5, title: "Guirnaldas Decorativas", image: assets.tinsel, referenceUnitPrice: 4990 }
    ];
    return [
      unit,
      {
        id: "demo-offer-prod-002-mixed",
        kind: "bundle",
        label: "Combo Navidad",
        subtitle: "Árbol completo · 4 componentes",
        badge: "SOLO HOY",
        price: 109990,
        compareAt: components.reduce((sum, item) => sum + item.quantity * item.referenceUnitPrice, 0),
        image: assets.combo,
        // detailTitle is a separate presentation field, later mapped to the
        // Shopify internal-title metafield (never used as inventory identity).
        detailTitle: "Árbol Canadiense 150 cm · Combo Navidad",
        detailDescription: "Árbol decorado con guirnaldas, esferas y luces multicolor.",
        detailImages: [
          { src: assets.combo, alt: "Árbol canadiense 150 cm completo con guirnaldas rojas, esferas rojas y doradas y luces multicolor" },
          { src: "./assets/productos/arbol-canadiense-150cm/combo-detalle-con-luces.webp", alt: "Detalle de la parte superior del árbol con esferas, guirnaldas metalizadas y luces encendidas" },
          { src: "./assets/productos/arbol-canadiense-150cm/combo-decorado-sin-luces.webp", alt: "Árbol con guirnaldas y esferas, vista de la decoración sin luces" },
          { src: "./assets/productos/arbol-canadiense-150cm/combo-detalle-sin-luces.webp", alt: "Acercamiento de ramas, guirnaldas y esferas sin luces" }
        ],
        productSetId: "demo-set-prod-002-mixed",
        items: components
      }
    ];
  }
  function mount({root,offers,selectedId,onSelect}){
    if(!root||!offers.length)return null;
    const by=id=>document.getElementById(id),backdrop=by("comboDetailBackdrop"),title=by("comboDetailTitle"),gallery=by("comboDetailGallery"),copy=by("comboDetailCopy"),items=by("comboDetailItems"),price=by("comboDetailPrice"),compare=by("comboDetailCompare"),badge=by("comboDetailBadge"),select=by("comboDetailSelect"),close=by("comboDetailClose"),favorite=by("comboDetailFavorite");
    let currentId=selectedId,detailId=null,previousFocus=null;
    const e=esc;
    const row=i=>'<li><img src="'+e(i.image)+'" alt="" loading="lazy"><span>'+e((i.displayQuantity ?? i.quantity)+" × "+i.title)+'</span><s>'+e(money(i.referenceUnitPrice)+(i.referenceUnitText?" "+i.referenceUnitText:(i.quantity>1?" c/u":"")))+'</s></li>';
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
      if(title)title.textContent=o.detailTitle || o.label;
      if(copy)copy.textContent=o.detailDescription || o.subtitle || "";
      if(gallery){
        const visuals=(Array.isArray(o.detailImages)&&o.detailImages.length?o.detailImages:[{src:o.image,alt:o.label}]).slice(0,4);
        gallery.replaceChildren(...visuals.map((v,i)=>{
          const img=document.createElement("img");
          img.src=v.src;img.alt=v.alt || o.detailTitle || o.label;
          img.loading=i===0?"eager":"lazy";img.decoding="async";
          img.width=900;img.height=1125;
          return img;
        }));
        gallery.scrollLeft=0;
      }
      if(items)items.replaceChildren(...o.items.map(i=>{
        const li=document.createElement("li");
        const picture=document.createElement("img");picture.src=i.image;picture.alt=i.title;picture.loading="lazy";picture.decoding="async";
        const text=document.createElement("span");text.textContent=(i.displayQuantity ?? i.quantity)+" × "+i.title;
        const ref=document.createElement("s");
        ref.textContent=money(i.referenceUnitPrice)+(i.referenceUnitText?" "+i.referenceUnitText:(i.quantity>1?" c/u":""));
        li.append(picture,text,ref);
        return li;
      }));
      if(price)price.textContent=money(o.price);
      if(compare){compare.textContent=o.compareAt>o.price?money(o.compareAt):"";compare.hidden=!(o.compareAt>o.price);}
      if(badge){badge.textContent=o.badge||"";badge.hidden=!o.badge;}
      if(favorite){const active=by("favoriteButton")?.classList.contains("is-favorite")||false;favorite.setAttribute("aria-pressed",String(active));favorite.classList.toggle("is-favorite",active);}
      setSelected(currentId);
      backdrop.hidden=false;
      document.body.classList.add("no-scroll");
      requestAnimationFrame(()=>{if(!backdrop.hidden&&detailId===id){backdrop.classList.add("is-open");close?.focus();}});
    }
    function closeDetails(){if(!backdrop||backdrop.hidden)return;detailId=null;backdrop.hidden=true;backdrop.classList.remove("is-open");document.body.classList.remove("no-scroll");previousFocus?.focus();previousFocus=null;}
    root.addEventListener("click",ev=>{const d=ev.target.closest("[data-details-offer]");if(d){openDetails(d.dataset.detailsOffer,d);return;}const c=ev.target.closest("[data-sds-offer]");if(c)choose(c.dataset.sdsOffer);});
    select?.addEventListener("click",()=>{if(detailId){choose(detailId);closeDetails();}});
    favorite?.addEventListener("click",()=>{
      by("favoriteButton")?.click();
      const active=by("favoriteButton")?.classList.contains("is-favorite")||false;
      favorite.classList.toggle("is-favorite",active);
      favorite.setAttribute("aria-pressed",String(active));
    });
    close?.addEventListener("click",closeDetails);backdrop?.addEventListener("click",ev=>{if(ev.target===backdrop)closeDetails();});
    window.addEventListener("keydown",ev=>{
      if(!backdrop||backdrop.hidden)return;
      if(ev.key==="Escape"){closeDetails();return;}
      if(ev.key==="Tab"){
        const controls=[close,favorite,select].filter(Boolean);
        const first=controls[0],last=controls[controls.length-1];
        if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
        else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
      }
    });
    setSelected(selectedId);return {setSelected};
  }
  window.SDSOfferCards=Object.freeze({getOffers,mount});
})();
