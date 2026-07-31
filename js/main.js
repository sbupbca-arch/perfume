/* ==========================================================================
   MAISON D'ÉLIXIR - Multi-Page Master Application Engine JS
   (Home, About Us, Products Catalog, Contact Us)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Active Navigation Indicator
  // ------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-luxury .nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else if (linkHref !== 'index.html' && currentPath.includes(linkHref)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ------------------------------------------------------------------------
  // 2. Preloader Screen Engine
  // ------------------------------------------------------------------------
  const loaderScreen = document.getElementById('loader-screen');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercentage = document.getElementById('loader-percentage');

  if (loaderScreen) {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          loaderScreen.classList.add('fade-out');
          initGSAPAnimations();
        }, 300);
      }
      if (loaderBar) loaderBar.style.width = `${progress}%`;
      if (loaderPercentage) loaderPercentage.textContent = `${progress}%`;
    }, 40);
  }

  // ------------------------------------------------------------------------
  // 3. Lenis Smooth Scrolling Engine
  // ------------------------------------------------------------------------
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // ------------------------------------------------------------------------
  // 4. Custom Luxury Cursor Engine
  // ------------------------------------------------------------------------
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorCircle = document.querySelector('.custom-cursor-circle');

  if (cursorDot && cursorCircle && window.innerWidth > 991) {
    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;

      cursorCircle.style.left = `${circleX}px`;
      cursorCircle.style.top = `${circleY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .category-card, .product-card, .filter-btn');
    hoverables.forEach(elem => {
      elem.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      elem.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ------------------------------------------------------------------------
  // 5. Hero Fragrance Particles Canvas
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('hero-particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -0.6 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const particleCount = Math.floor(canvas.width / 20);
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ------------------------------------------------------------------------
  // 6. GSAP Animation Engine
  // ------------------------------------------------------------------------
  function initGSAPAnimations() {
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      if (document.querySelector('.hero-title')) {
        const tl = gsap.timeline();
        tl.from('.hero-subheading', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' })
          .from('.hero-title', { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out' }, '-=0.6')
          .from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=0.8')
          .from('.hero-btn-group', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-bottle-wrapper', { opacity: 0, scale: 0.8, duration: 1.4, ease: 'power3.out' }, '-=1');
      }

      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }
  }

  // ------------------------------------------------------------------------
  // 7. Scroll Progress & Navbar State
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar-luxury');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;

    if (window.scrollY > 80) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTop) backToTop.classList.add('active');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTop) backToTop.classList.remove('active');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. Swiper Carousels Initialization
  // ------------------------------------------------------------------------
  if (typeof Swiper !== 'undefined') {
    if (document.querySelector('.new-arrivals-swiper')) {
      new Swiper('.new-arrivals-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.new-arrivals-pagination', clickable: true },
        navigation: { nextEl: '.new-arrivals-next', prevEl: '.new-arrivals-prev' },
        breakpoints: {
          640: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 }
        }
      });
    }

    if (document.querySelector('.testimonials-swiper')) {
      new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.testimonials-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2 } }
      });
    }
  }

  // ------------------------------------------------------------------------
  // 9. Product Data (With 100% Reliable High-Res Luxury Fragrance Assets)
  // ------------------------------------------------------------------------
  const products = [
    {
      id: 'p1',
      name: "Élixir Noir Privé",
      category: "wood",
      categoryName: "Oud & Dark Woods",
      price: 340,
      oldPrice: 390,
      badge: "Best Seller",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      topNotes: "Agarwood, Smoked Incense",
      heartNotes: "Black Amber, Saffron",
      baseNotes: "Royal Leather, Tonka Bean",
      intensity: 95
    },
    {
      id: 'p2',
      name: "Velvet Rose Imperiale",
      category: "floral",
      categoryName: "Royal Floral",
      price: 295,
      oldPrice: 320,
      badge: "Exclusive",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      topNotes: "Damask Rose, Pink Pepper",
      heartNotes: "Bulgarian Rose, Peony",
      baseNotes: "Cashmere Wood, Musk",
      intensity: 85
    },
    {
      id: 'p3',
      name: "Sovereign Gold Extract",
      category: "amber",
      categoryName: "Amber & Spice",
      price: 420,
      oldPrice: 480,
      badge: "Limited Edition",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      topNotes: "Golden Amber, Cardamom",
      heartNotes: "Myrrh, Golden Honey",
      baseNotes: "Sandalwood, Vanilla Oud",
      intensity: 98
    },
    {
      id: 'p4',
      name: "Celestial Smoked Vanilla",
      category: "amber",
      categoryName: "Vanilla & Balsamic",
      price: 280,
      oldPrice: 310,
      badge: "New",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      topNotes: "Bourbon Vanilla, Bergamot",
      heartNotes: "Smoked Oak, Tobacco Leaf",
      baseNotes: "Golden Amber, Patchouli",
      intensity: 88
    },
    {
      id: 'p5',
      name: "Mystic Cedarwood",
      category: "wood",
      categoryName: "Woody & Earthy",
      price: 310,
      oldPrice: 340,
      badge: "Artisanal",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      topNotes: "Atlas Cedar, Vetiver",
      heartNotes: "Clary Sage, Black Pepper",
      baseNotes: "Dark Leather, Moss",
      intensity: 90
    },
    {
      id: 'p6',
      name: "Imperial Citrus & White Tea",
      category: "fresh",
      categoryName: "Fresh & Citrus",
      price: 260,
      oldPrice: 290,
      badge: "Fresh Signature",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      topNotes: "Calabrian Bergamot, Lemon Zest",
      heartNotes: "Silver White Tea, Jasmine",
      baseNotes: "White Musk, Cedar",
      intensity: 75
    }
  ];

  let cart = JSON.parse(localStorage.getItem('maison_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('maison_wishlist')) || [];

  function saveState() {
    localStorage.setItem('maison_cart', JSON.stringify(cart));
    localStorage.setItem('maison_wishlist', JSON.stringify(wishlist));
    updateBadges();
    renderCart();
    renderWishlist();
  }

  function updateBadges() {
    const cartCount = document.getElementById('cart-badge');
    const cartCountMobile = document.getElementById('cart-badge-mobile');
    const wishlistCount = document.getElementById('wishlist-badge');
    const wishlistCountMobile = document.getElementById('wishlist-badge-mobile');
    
    const totalCartQty = cart.reduce((total, item) => total + item.qty, 0);
    if (cartCount) cartCount.textContent = totalCartQty;
    if (cartCountMobile) cartCountMobile.textContent = totalCartQty;
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
    if (wishlistCountMobile) wishlistCountMobile.textContent = wishlist.length;
  }

  window.showToast = function(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-luxury align-items-center show mb-2';
    toast.role = 'alert';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="fas fa-crown text-warning me-2"></i> ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  };

  function renderCart() {
    const cartItemsContainer = document.getElementById('cart-drawer-items');
    const cartTotalEl = document.getElementById('cart-total-price');
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
          <p class="text-muted">Your luxury bag is currently empty.</p>
        </div>
      `;
      if (cartTotalEl) cartTotalEl.textContent = '$0.00';
      return;
    }

    let html = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      html += `
        <div class="drawer-item">
          <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
          <div class="flex-grow-1">
            <h6 class="drawer-item-title">${item.name}</h6>
            <div class="drawer-item-price">$${item.price} x ${item.qty}</div>
          </div>
          <button class="drawer-remove-btn" onclick="removeFromCart('${item.id}')">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = html;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-drawer-items');
    if (!wishlistContainer) return;

    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="far fa-heart fa-3x text-muted mb-3"></i>
          <p class="text-muted">Your wishlist is currently empty.</p>
        </div>
      `;
      return;
    }

    let html = '';
    wishlist.forEach(item => {
      html += `
        <div class="drawer-item">
          <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
          <div class="flex-grow-1">
            <h6 class="drawer-item-title">${item.name}</h6>
            <div class="drawer-item-price">$${item.price}.00</div>
          </div>
          <button class="btn-luxury-gold py-1 px-2 fs-7 me-2" onclick="addToCart('${item.id}')">Add</button>
          <button class="drawer-remove-btn" onclick="toggleWishlist('${item.id}')">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
    });

    wishlistContainer.innerHTML = html;
  }

  window.addToCart = function(productId, qty = 1) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...prod, qty });
    }

    saveState();
    showToast(`Added <strong>${prod.name}</strong> to your luxury bag.`);
  };

  window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveState();
  };

  window.toggleWishlist = function(productId, buttonElement) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
      wishlist.splice(index, 1);
      if (buttonElement) buttonElement.classList.remove('active');
      showToast(`Removed <sup>${prod.name}</sup> from wishlist.`);
    } else {
      wishlist.push(prod);
      if (buttonElement) buttonElement.classList.add('active');
      showToast(`Added <strong>${prod.name}</strong> to private wishlist.`);
    }
    saveState();
  };

  window.openQuickView = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const modalTitle = document.getElementById('qv-title');
    const modalImage = document.getElementById('qv-image');
    const modalCategory = document.getElementById('qv-category');
    const modalPrice = document.getElementById('qv-price');
    const modalTop = document.getElementById('qv-top');
    const modalHeart = document.getElementById('qv-heart');
    const modalBase = document.getElementById('qv-base');
    const modalAddToCartBtn = document.getElementById('qv-add-btn');

    if (modalTitle) modalTitle.textContent = prod.name;
    if (modalImage) modalImage.src = prod.image;
    if (modalCategory) modalCategory.textContent = prod.categoryName;
    if (modalPrice) modalPrice.textContent = `$${prod.price}.00`;
    if (modalTop) modalTop.textContent = prod.topNotes;
    if (modalHeart) modalHeart.textContent = prod.heartNotes;
    if (modalBase) modalBase.textContent = prod.baseNotes;

    if (modalAddToCartBtn) {
      modalAddToCartBtn.onclick = () => {
        addToCart(prod.id);
        const modalEl = document.getElementById('quickViewModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      };
    }

    const modalEl = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modalEl.show();
  };

  // Initial State Render
  updateBadges();
  renderCart();
  renderWishlist();

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        showToast(`Welcome to the Private VIP Atelier! Check ${emailInput.value} for your invitation.`);
        emailInput.value = '';
      }
    });
  }

  // Vanilla Tilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
      max: 12,
      speed: 400,
      glare: true,
      "max-glare": 0.2
    });
  }

});
