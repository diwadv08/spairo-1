    const hamburger = document.querySelector('.hamburger');
    const navLinks1 = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');

    // Open menu
    hamburger.addEventListener('click', () => {
      navLinks1.classList.add('show');
      overlay.classList.add('show');
      hamburger.setAttribute('aria-expanded', 'true');
    });

    // Close menu
    closeBtn.addEventListener('click', () => {
      navLinks1.classList.remove('show');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    });

    // Close when clicking overlay
    overlay.addEventListener('click', () => {
      navLinks1.classList.remove('show');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });
    document.querySelectorAll('.card').forEach(el => observer.observe(el));



    // ===== Product data (demo) =====
    const PRODUCTS = [
      {id:"ENG-2018-35E-ATL", year:2018, engine:"3.5L EcoBoost", mileage:82, price:4200, zip:"30303", yard:"Atlanta, GA", img:"https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop"},
      {id:"ENG-2019-27E-LA", year:2019, engine:"2.7L EcoBoost", mileage:64, price:4550, zip:"90011", yard:"Los Angeles, CA", img:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"},
      {id:"ENG-2016-50V8-DAL", year:2016, engine:"5.0L V8", mileage:110, price:3650, zip:"75201", yard:"Dallas, TX", img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"},
      {id:"ENG-2017-33V6-CHI", year:2017, engine:"3.3L V6", mileage:95, price:3150, zip:"60604", yard:"Chicago, IL", img:"https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"},
      {id:"ENG-2015-50V8-NYC", year:2015, engine:"5.0L V8", mileage:130, price:2950, zip:"10001", yard:"New York, NY", img:"https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop"},
      {id:"ENG-2020-35E-MIA", year:2020, engine:"3.5L EcoBoost", mileage:48, price:5900, zip:"33101", yard:"Miami, FL", img:"https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop"}
    ];

    // ===== Blogs (dynamic) =====
    const BLOGS = [
      { id:1, title:"How to pick the right F‑150 engine (2015–2020)",cover:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop", excerpt:"Model years, engine codes, and what to check before you buy.", content:`<p>Choosing the correct engine for a 2015–2020 Ford F‑150 starts with <strong>VIN decoding</strong> and confirming the engine code (2.7L, 3.5L EcoBoost, 5.0L V8, 3.3L V6). Always cross‑match the <em>8th digit</em> of the VIN with the donor engine.</p><h4>Quick checklist</h4><ul><li>Confirm year‑to‑year compatibility and sensor plug styles.</li><li>Ask for <strong>compression</strong> or <strong>leak‑down</strong> test results if available.</li><li>Verify mileage and yard warranty terms.</li><li>Plan for gaskets/fluids and transfer of accessories.</li></ul>` },
      { id:2, title:"Mileage vs. price: finding the sweet spot",cover:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop", excerpt:"How mileage, warranty, and yard reputation affect value.", content:`<p>Lower mileage often commands a premium, but <strong>service history</strong> and <strong>warranty</strong> matter. Engines between <em>60k–100k miles</em> typically balance price and lifespan well. Closer yards reduce freight costs and transit time.</p>` },
      { id:3, title:"Shipping timelines & what to expect", cover:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop", excerpt:"Door‑to‑door delivery, lift‑gate fees, and preparation tips.", content:`<p>Most yards ship within <strong>2–5 business days</strong> after payment. Check if you need a <em>lift‑gate</em> for delivery and confirm receiving hours. Inspect crates on arrival and note issues on the BOL.</p>` }
    ];

    // Proximity scorer (rough)
    function distanceScore(a,b){ if(!a||!b) return 0; let s=0; for(let i=0;i<Math.min(a.length,b.length);i++){ if(a[i]===b[i]) s++; else break; } return s; }

    function renderProducts(list){
      const grid = document.getElementById('product-grid');
      grid.innerHTML = '';
      list.forEach(p=>{
        const el = document.createElement('article');
        el.className = 'card';
        el.innerHTML = `
         <div class='myImg'><img src="${p.img}" alt="${p.engine} engine for ${p.year} Ford F-150 from ${p.yard}" loading="lazy" /></div>
        <div class="body">
          <div class="card-header">
            <span class="badge" aria-label="Model year">${p.year}</span>
            <span class="price" aria-label="Price">$${p.price.toLocaleString()}</span>
          </div>
          <div><b>Yard: </b><span class="muted">${p.yard} • ZIP ${p.zip}</span></div>
          <div class="card-actions btn-group">
            <a class="btn btn-outline-primary" href="#" onclick="openEnquiry('${p.id}');return false;"><i class='fa fa-question'></i>Enquire</a>
            <a class="btn btn-primary" href="#" onclick="openDetails('${p.id}');return false;"><i class='fa fa-eye'></i>Details</a>
          </div>
        </div>`;
        grid.appendChild(el);
      });
      document.getElementById('no-results').style.display = list.length? 'none':'block';
    }

    function applyFilters(){
      const q = document.getElementById('f-search').value.toLowerCase();
      const year = document.getElementById('f-year').value;
      const engine = document.getElementById('f-engine').value;
      const maxMileage = +document.getElementById('f-mileage').value;
      const maxPrice = +document.getElementById('f-price').value;
      const zip = document.getElementById('f-zip').value;
      const sort = document.getElementById('f-sort').value;

      let list = PRODUCTS.filter(p=>{
        const matchQ = !q || (`${p.year} ${p.engine} ${p.yard}`.toLowerCase().includes(q));
        const matchYear = !year || p.year==year;
        const matchEngine = !engine || p.engine===engine;
        const matchMileage = p.mileage <= maxMileage;
        const matchPrice = p.price <= maxPrice;
        return matchQ && matchYear && matchEngine && matchMileage && matchPrice;
      });

      if(sort==='priceAsc') list.sort((a,b)=>a.price-b.price);
      else if(sort==='priceDesc') list.sort((a,b)=>b.price-a.price);
      else if(sort==='mileageAsc') list.sort((a,b)=>a.mileage-b.mileage);
      else if(sort==='yearDesc') list.sort((a,b)=>b.year-a.year);
      else if(zip){ list.sort((a,b)=>distanceScore(zip,b.zip)-distanceScore(zip,a.zip)); }

      renderProducts(list);
      buildProductSchema(list);
    }

    // Product modal
    const modal = document.getElementById('product-modal');
    const pmImg = document.getElementById('pm-img');
    const pmSpecs = document.getElementById('pm-specs');
    const pmEnquire = document.getElementById('pm-enquire');
    const productTitle = document.getElementById('product-title');

    function openDetails(productId) {
      const p = PRODUCTS.find(x => x.id === productId);
      if (!p) return;

      // Update modal content
      productTitle.textContent = `${p.year} Ford F-150 — ${p.engine}`;
      pmImg.src = p.img;
      pmImg.alt = `${p.engine} for ${p.year} Ford F-150`;

      // Build product specs
      pmSpecs.innerHTML = '';
      const fields = [
        ['Product ID', p.id],
        ['Engine', p.engine],
        ['Year', p.year],
        ['Mileage', `${p.mileage}k mi`],
        ['Price', `$${p.price.toLocaleString()}`],
        ['Yard', p.yard],
        ['ZIP', p.zip],
      ];

      fields.forEach(([k, v]) => {
        const s = document.createElement('div');
        s.className = 'spec';
        s.innerHTML = `
          <div class="spec-key">${k}</div>
          <div class="spec-value">${v}</div>
        `;
        pmSpecs.appendChild(s);
      });

      // Set up enquiry button
      pmEnquire.onclick = function (e) {
        e.preventDefault();
        openEnquiry(p.id);
      };

      // Show modal
      modal.classList.add('show');
      modal.removeAttribute('aria-hidden');

      // Focus on close button
      setTimeout(() => {
        modal.querySelector('.modal-close').focus();
      }, 0);
    }

    function closeDetails() {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }

    // Close modal when clicking outside
    modal.addEventListener('click', e => {
      if (e.target === modal) closeDetails();
    });

    // Close modal with ESC key
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeDetails();
    });


    // Enquiry modal
    const enquiry = document.getElementById('enquiry-modal');
    const eProduct = document.getElementById('e-product');
    const eTitle = document.getElementById('enquiry-title');

    function openEnquiry(productId){
      const p = PRODUCTS.find(x=>x.id===productId);
      if(p){
        eProduct.value = p.id;
        eTitle.textContent = `Raise Enquiry — ${p.year} F-150 ${p.engine}`;
        const msg = document.getElementById('e-msg');
        msg.value = `Please confirm stock, price and ETA for ${p.year} Ford F-150 ${p.engine} (${p.mileage}k mi), Product ID ${p.id}. Ship to ZIP ____.`;
      }
      enquiry.classList.add('show'); enquiry.removeAttribute('aria-hidden');
      setTimeout(()=>{ document.getElementById('e-name').focus(); },0);
    }
    function closeEnquiry(){ enquiry.classList.remove('show'); enquiry.setAttribute('aria-hidden','true'); }
    enquiry.addEventListener('click', (e)=>{ if(e.target===enquiry) closeEnquiry(); });
    window.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && enquiry.classList.contains('show')) closeEnquiry(); });

    function submitEnquiry(e){
      e.preventDefault();
      const name=document.getElementById('e-name').value;
      const email=document.getElementById('e-email').value;
      const phone=document.getElementById('e-phone').value;
      const zip=document.getElementById('e-zip').value;
      const msg=document.getElementById('e-msg').value;
      const product=eProduct.value;
      const subject = encodeURIComponent(`Enquiry ${product} — Spairo LLC`);
      const body = encodeURIComponent(`Product: ${product}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nZIP: ${zip}\n\nMessage:\n${msg}`);
      window.location.href = `mailto:care@boltontrade.com?subject=${subject}&body=${body}`;
      return false;
    }

    // Blog
    const blogModal = document.getElementById('blog-modal');
    const blogTitle = document.getElementById('blog-title');
    const blogCover = document.getElementById('blog-cover');
    const blogContent = document.getElementById('blog-content');

    function renderBlogs() {
    const grid = document.getElementById('blog-grid');
    grid.innerHTML = '';

    BLOGS.forEach(b => {
      const el = document.createElement('article');
      el.className = 'card post';
      el.innerHTML = `
        <div class="body blogPost">
          <h3 class="post-title">${b.title}</h3>
          <div class="myImg"><img src="${b.cover}" alt="${b.title}" loading="lazy"/></div>
          <p class="muted">${b.excerpt}</p>
          <a class="btn btn-outline-success rounded-circle" href="#" onclick="openPost(${b.id});return false;"><i class='fa fa-eye'></i>View Blog</a>
        </div>
      `;
      grid.appendChild(el);
    });
  }
    function openPost(id){
      const b = BLOGS.find(x=>x.id===id); if(!b) return;
      blogTitle.textContent = b.title; blogCover.src = b.cover; blogCover.alt = b.title; blogContent.innerHTML = "<b>Description:</b>"+b.content;
      blogModal.classList.add('show'); blogModal.removeAttribute('aria-hidden'); setTimeout(()=>{ blogModal.querySelector('.modal-close').focus(); },0);
    }
    function closePost(){ blogModal.classList.remove('show'); blogModal.setAttribute('aria-hidden','true'); }
    blogModal.addEventListener('click',(e)=>{ if(e.target===blogModal) closePost(); });
    window.addEventListener('keydown',(e)=>{ if(e.key==='Escape' && blogModal.classList.contains('show')) closePost(); });

    // Contact (mailto)
    function submitContact(e){
      e.preventDefault();
      const name=document.getElementById('c-name').value;
      const email=document.getElementById('c-email').value;
      const phone=document.getElementById('c-phone').value;
      const zip=document.getElementById('c-zip').value;
      const msg=document.getElementById('c-msg').value;
      const subject = encodeURIComponent('New Enquiry — Spairo LLC');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nZIP: ${zip}\n\nMessage:\n${msg}`);
      window.location.href = `mailto:care@boltontrade.com?subject=${subject}&body=${body}`;
      return false;
    }

    // Scrollspy
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('nav a'));
    const byId = id => navLinks.find(a => a.getAttribute('href') === `#${id}`);
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){ navLinks.forEach(a=>a.removeAttribute('aria-current')); const link = byId(e.target.id); if(link) link.setAttribute('aria-current','page'); } }); }, {rootMargin: '-40% 0px -55% 0px', threshold: 0});
    sections.forEach(s=>obs.observe(s));

    // JSON-LD (Products)
    function buildProductSchema(current=PRODUCTS){
      const itemList = {"@context":"https://schema.org","@type":"ItemList","itemListElement": current.map((p,i)=>({"@type":"ListItem","position": i+1,"item": {"@type":"Product","name": `${p.year} Ford F-150 ${p.engine} Used Engine`,"sku": p.id,"brand": {"@type":"Brand","name":"Ford"},"category": "Engines","itemCondition": "https://schema.org/UsedCondition","offers": {"@type":"Offer","price": p.price,"priceCurrency": "USD","availability": "https://schema.org/InStock","url": "https://www.boltontrade.com/#shop"}}}))};
      document.getElementById('ld-products').textContent = JSON.stringify(itemList);
    }

    // Init
    document.getElementById('year').textContent = new Date().getFullYear();
    (function init(){ renderProducts(PRODUCTS); renderBlogs(); applyFilters(); buildProductSchema(PRODUCTS); })();

     document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
        });
    });
   

    document.addEventListener("DOMContentLoaded", () => {
      const stepsData = [
        { title: "Browse & Enquire", description: "View F‑150 engine listings with price & details. Tap Enquire.", icon: "1" },
        { title: "We Confirm with Yard", description: "We confirm nearest yard, stock & quote based on your ZIP.", icon: "2" },
        { title: "Direct Yard Payment", description: "You pay the yard via their gateway. No middle‑layer payments.", icon: "3" },
        { title: "Ship & Support", description: "Yard ships, we share tracking & delivery updates plus after‑sales support.", icon: "4" },
      ];

      const stepsContainer = document.getElementById('steps');

      // Create step elements with icons
      stepsData.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step');

        const marker = document.createElement('div');
        marker.classList.add('step-marker');
        const icon = document.createElement('i');
        icon.innerHTML = step.icon;
        marker.appendChild(icon);

        const title = document.createElement('div');
        title.classList.add('step-title');
        title.textContent = step.title;

        const desc = document.createElement('div');
        desc.classList.add('step-description');
        desc.textContent = step.description;

        stepDiv.appendChild(marker);
        stepDiv.appendChild(title);
        stepDiv.appendChild(desc);

        stepsContainer.appendChild(stepDiv);
      });

      const allSteps = document.querySelectorAll('.step');
      let currentStep = 0;

      function highlightNextStep() {
        // Mark previous step as completed
        if(currentStep > 0) {
          allSteps[currentStep - 1].classList.remove('active');
          allSteps[currentStep - 1].classList.add('completed');
        }

        // Reset all future steps
        allSteps.forEach((step, index) => {
          if(index > currentStep) {
            step.classList.remove('active', 'completed');
          }
        });

        // Highlight current step
        allSteps[currentStep].classList.add('active');

        // Move to next step
        currentStep = (currentStep + 1) % allSteps.length;
      }

      // Initial highlight
      highlightNextStep();

      // Change step every 1 second
      setInterval(highlightNextStep, 2000);

});

let lastScrollTop = 0;
const header = document.querySelector("header");
let disableHide = false; // Flag to disable hiding temporarily

// Listen for link clicks inside the header
header.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    disableHide = true; // Disable hiding when clicking
    header.classList.remove("hide"); // Ensure header stays visible
    // Re-enable hiding after a short delay
    setTimeout(() => disableHide = false, 1000); // 1 second is enough
  });
});

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if(window.innerWidth >= 700 && !disableHide){
    if (currentScroll <= 150) {
      header.classList.remove("hide");
      return;
    }

    if (currentScroll >= 2000) {
      // Always show after certain scroll
      header.classList.remove("hide");
    } else {
      // Hide header while scrolling down
      if (currentScroll > lastScrollTop) {
        header.classList.add("hide"); // Scrolling down
      } else {
        header.classList.remove("hide"); // Scrolling up
      }
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});