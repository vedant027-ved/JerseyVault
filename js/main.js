/* JerseyHub — shared site logic */

const ICONS = {
  search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  heart: `<svg viewBox="0 0 24 24"><path d="M20.8 4.6c-1.7-1.7-4.4-1.7-6.1 0L12 7.3 9.3 4.6c-1.7-1.7-4.4-1.7-6.1 0-1.7 1.7-1.7 4.4 0 6.1L12 19.3l8.8-8.6c1.7-1.7 1.7-4.4 0-6.1z"/></svg>`,
  cart: `<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.4"/><circle cx="19" cy="21" r="1.4"/><path d="M2 3h2l2.6 12.4A2 2 0 0 0 8.5 17h9.9a2 2 0 0 0 2-1.6L22 8H6"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.6-4 5-6 8-6s6.4 2 8 6"/></svg>`,
  truck: `<svg viewBox="0 0 24 24"><path d="M3 16V6a1 1 0 0 1 1-1h9v11"/><path d="M13 9h4l4 4v3h-8"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>`,
  menu: `<svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5z"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24"><path d="M20 11A8 8 0 1 0 6 6.3L3 9"/><path d="M3 4v5h5"/></svg>`,
  headset: `<svg viewBox="0 0 24 24"><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2" y="13" width="5" height="7" rx="1.5"/><rect x="17" y="13" width="5" height="7" rx="1.5"/></svg>`,
  fb: `<svg viewBox="0 0 24 24"><path d="M14 9h3V6h-3c-2 0-3 1.2-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.3-1 1-1z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>`,
  tw: `<svg viewBox="0 0 24 24"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1c.5 1.6 2 2.8 3.8 2.8A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>`,
  yt: `<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10 9 16 12 10 15"/></svg>`,
  star: `★`,
  starEmpty: `☆`
};

/* ---------- Storage helpers ---------- */
function getCart(){ try{ return JSON.parse(localStorage.getItem('jh_cart')) || []; }catch(e){ return []; } }
function setCart(c){ localStorage.setItem('jh_cart', JSON.stringify(c)); updateHeaderCounts(); }
function getWishlist(){ try{ return JSON.parse(localStorage.getItem('jh_wishlist')) || []; }catch(e){ return []; } }
function setWishlist(w){ localStorage.setItem('jh_wishlist', JSON.stringify(w)); updateHeaderCounts(); }

function cartKey(id, size, custom){
  return id + '|' + (size||'') + '|' + (custom ? custom.name + '-' + custom.number : '');
}

function addToCart(product, size, qty, custom){
  const cart = getCart();
  const key = cartKey(product.id, size, custom);
  const existing = cart.find(i => i.key === key);
  if(existing){
    existing.qty += qty;
  } else {
    cart.push({
      key, id: product.id, name: product.name, price: product.price, mrp: product.mrp,
      art: product.art, size: size || '', qty: qty || 1, custom: custom || null
    });
  }
  setCart(cart);
  showToast('Added to cart — ' + product.name);
}

function removeFromCart(key){
  setCart(getCart().filter(i => i.key !== key));
}
function changeQty(key, delta){
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){ removeFromCart(key); return; }
  setCart(cart);
}
function cartCount(){ return getCart().reduce((s,i)=>s+i.qty,0); }
function cartSubtotal(){ return getCart().reduce((s,i)=>s+i.price*i.qty,0); }

function toggleWishlist(id){
  let w = getWishlist();
  if(w.includes(id)) w = w.filter(x=>x!==id);
  else { w.push(id); showToast('Added to wishlist'); }
  setWishlist(w);
  document.querySelectorAll('.wishlist-btn[data-id="'+id+'"]').forEach(btn=>{
    btn.classList.toggle('active', getWishlist().includes(id));
  });
}
function isWishlisted(id){ return getWishlist().includes(id); }

/* ---------- Toast ---------- */
function showToast(msg){
  let t = document.getElementById('jh-toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'jh-toast';
    t.className = 'badge-toast';
    document.body.appendChild(t);
  }
  t.innerHTML = ICONS.check + '<span>' + msg + '</span>';
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2600);
}

/* ---------- Header / Footer ---------- */
const NAV_LINKS = [
  ['index.html','Home'],
  ['shop.html','Shop'],
  ['shop.html?category=club#players','Players'],
  ['custom-jersey.html','Custom Jersey'],
  ['shop.html?sort=new','New Arrivals'],
  ['contact.html','Contact']
];

function renderHeader(active){
  const wl = getWishlist().length, ct = cartCount();
  const navHtml = NAV_LINKS.map(([href,label])=>{
    const isActive = active === label;
    return `<a href="${href}" class="${isActive?'active':''}">${label}</a>`;
  }).join('');

  return `
  <div class="announce">FREE SHIPPING ACROSS INDIA ON ORDERS ABOVE <b>₹2999</b> &nbsp;|&nbsp; USE CODE <b>JERSEYHUB10</b> FOR 10% OFF</div>
  <header class="site-header">
    <div class="container header-inner">
      <button class="mobile-toggle" id="navOpenBtn" aria-label="Open menu">${ICONS.menu}</button>
      <a href="index.html" class="logo">JERSEY<span>HUB</span><small>Official Fan Store · India</small></a>
      <nav class="main-nav" id="mainNav">
        <button class="nav-close" id="navCloseBtn" aria-label="Close menu">${ICONS.close}</button>
        ${navHtml}
        <a href="track-order.html" class="${active==='Track Order'?'active':''}">Track Order</a>
        <a href="contact.html" class="${active==='Help & Support'?'active':''}">Help &amp; Support</a>
        <a href="login.html" class="${active==='My Account'?'active':''}">My Account</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" id="searchToggleBtn" aria-label="Search">${ICONS.search}</button>
        <a href="wishlist.html" class="icon-btn" aria-label="Wishlist">${ICONS.heart}${wl?`<span class="badge-count">${wl}</span>`:''}</a>
        <a href="cart.html" class="icon-btn" aria-label="Cart">${ICONS.cart}${ct?`<span class="badge-count">${ct}</span>`:''}</a>
        <a href="login.html" class="icon-btn" aria-label="My Account">${ICONS.user}</a>
      </div>
    </div>
    <div class="search-flyout" id="searchFlyout">
      <div class="container">
        <input type="text" id="headerSearchInput" placeholder="Search jerseys, clubs, countries…" autocomplete="off">
      </div>
    </div>
  </header>
  <div class="nav-overlay" id="navOverlay"></div>
  `;
}

function renderFooter(){
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo">JERSEY<span>HUB</span></a>
          <p>India's premium destination for authentic-style club and national team jerseys. Choose. Wear. Support.</p>
          <div class="social-row">
            <a href="#" aria-label="Facebook">${ICONS.fb}</a>
            <a href="#" aria-label="Instagram">${ICONS.ig}</a>
            <a href="#" aria-label="Twitter">${ICONS.tw}</a>
            <a href="#" aria-label="YouTube">${ICONS.yt}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="track-order.html">Track Order</a></li>
            <li><a href="contact.html">Shipping Policy</a></li>
            <li><a href="contact.html">Returns &amp; Exchange</a></li>
            <li><a href="contact.html">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="shop.html">Shop All</a></li>
            <li><a href="custom-jersey.html">Custom Jersey</a></li>
            <li><a href="shop.html?category=kids">Kids Jerseys</a></li>
            <li><a href="shop.html?category=accessories">Accessories</a></li>
            <li><a href="login.html">My Account</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Stay Updated</h4>
          <p style="font-size:13.5px;color:var(--grey);">Get early access to drops &amp; offers.</p>
          <div class="newsletter-row">
            <input type="email" placeholder="Your email address">
            <button onclick="showToast('Subscribed! Welcome to JerseyHub.')">Join</button>
          </div>
          <div class="payment-row">
            <span class="pay-chip">UPI</span>
            <span class="pay-chip">VISA</span>
            <span class="pay-chip">Mastercard</span>
            <span class="pay-chip">RuPay</span>
            <span class="pay-chip">COD</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 JerseyHub. All rights reserved.</span>
        <span><a href="contact.html">Privacy Policy</a> &nbsp;·&nbsp; <a href="contact.html">Terms of Service</a></span>
      </div>
    </div>
  </footer>`;
}

function mountLayout(active){
  document.getElementById('site-header').innerHTML = renderHeader(active);
  document.getElementById('site-footer').innerHTML = renderFooter();
  bindHeaderEvents();
}

function bindHeaderEvents(){
  const nav = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');
  document.getElementById('navOpenBtn').addEventListener('click', ()=>{
    nav.classList.add('open'); overlay.classList.add('open');
  });
  document.getElementById('navCloseBtn').addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);
  function closeNav(){ nav.classList.remove('open'); overlay.classList.remove('open'); }

  const searchBtn = document.getElementById('searchToggleBtn');
  const flyout = document.getElementById('searchFlyout');
  searchBtn.addEventListener('click', ()=>{
    flyout.classList.toggle('open');
    if(flyout.classList.contains('open')) setTimeout(()=>document.getElementById('headerSearchInput').focus(),150);
  });
  document.getElementById('headerSearchInput').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && e.target.value.trim()){
      window.location.href = 'shop.html?q=' + encodeURIComponent(e.target.value.trim());
    }
  });
}

function updateHeaderCounts(){
  const wl = getWishlist().length, ct = cartCount();
  const cartIcon = document.querySelector('a[href="cart.html"].icon-btn');
  const wlIcon = document.querySelector('a[href="wishlist.html"].icon-btn');
  if(cartIcon){
    let b = cartIcon.querySelector('.badge-count');
    if(ct){ if(!b){ b=document.createElement('span'); b.className='badge-count'; cartIcon.appendChild(b);} b.textContent = ct; }
    else if(b) b.remove();
  }
  if(wlIcon){
    let b = wlIcon.querySelector('.badge-count');
    if(wl){ if(!b){ b=document.createElement('span'); b.className='badge-count'; wlIcon.appendChild(b);} b.textContent = wl; }
    else if(b) b.remove();
  }
}

/* ---------- Product card ---------- */
function ratingStars(r){
  const full = Math.round(r);
  return ICONS.star.repeat(full) + ICONS.starEmpty.repeat(5-full);
}

function productCardHTML(p){
  const off = p.mrp > p.price ? Math.round((1-p.price/p.mrp)*100) : 0;
  const wished = isWishlisted(p.id);
  return `
  <div class="product-card reveal in">
    <a class="card-link" href="product.html?id=${p.id}" aria-label="${p.name}"></a>
    <div class="product-media">
      <div class="p-badges">
        ${p.badge==='NEW' ? '<span class="p-badge new">New</span>' : ''}
        ${p.badge==='SALE' ? `<span class="p-badge sale">-${off}%</span>` : ''}
      </div>
      <button class="wishlist-btn ${wished?'active':''}" data-id="${p.id}" onclick="event.stopPropagation();toggleWishlist('${p.id}')" aria-label="Toggle wishlist">${ICONS.heart}</button>
      ${jerseySVG(p.art)}
    </div>
    <div class="product-info">
      <span class="product-club">${p.club}</span>
      <span class="product-name">${p.name}</span>
      <span class="product-rating"><span class="stars">${ratingStars(p.rating)}</span> ${p.rating} (${p.reviews})</span>
      <span class="product-price">
        <span class="now">₹${p.price.toLocaleString('en-IN')}</span>
        ${p.mrp>p.price?`<span class="was">₹${p.mrp.toLocaleString('en-IN')}</span><span class="off">${off}% OFF</span>`:''}
      </span>
      <div class="product-actions">
        <button class="add-cart-btn" onclick="event.stopPropagation();quickAdd('${p.id}', this)">${ICONS.cart} Add to Cart</button>
      </div>
    </div>
  </div>`;
}

function quickAdd(id, btn){
  const p = findProduct(id);
  addToCart(p, p.sizes[Math.min(2,p.sizes.length-1)], 1, null);
  if(btn){
    const original = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = ICONS.check + ' Added';
    setTimeout(()=>{ btn.classList.remove('added'); btn.innerHTML = original; }, 1400);
  }
}

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); obs.unobserve(en.target); } });
  }, {threshold:.12});
  els.forEach(e=>obs.observe(e));
}

document.addEventListener('DOMContentLoaded', ()=>{
  initReveal();
  updateHeaderCounts();
});
