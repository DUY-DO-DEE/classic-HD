/* ============================================
   MOVIE HUB - Index Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavbar();
  initParticles();
  initScrollAnimations();
  initFeaturedMovies();
  initCategories();
  initLatestMovies();
  initSearch();
  initFilters();
  initNewsletter();
  initStatsAnimation();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', Utils.throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, 100));
}

// Create floating particles
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.3;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      opacity: ${opacity};
    `;
    
    container.appendChild(particle);
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.movie-card, .category-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add animation class styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// Stats counter animation
function initStatsAnimation() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

function animateStats() {
  const stats = [
    { element: document.getElementById('statMovies'), target: 10000 },
    { element: document.getElementById('statDaily'), target: 100 },
    { element: document.getElementById('statUsers'), target: 1000000 }
  ];

  stats.forEach(({ element, target }) => {
    if (element) {
      Utils.animateNumber(element, target, 2000);
    }
  });
}

// Render featured movies
function initFeaturedMovies() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const movies = MovieDB.getFeaturedMovies();
  grid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
}

// Render categories
function initCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  const categories = MovieDB.getCategories();
  grid.innerHTML = categories.map(cat => createCategoryCard(cat)).join('');
}

// Render latest movies
function initLatestMovies() {
  const grid = document.getElementById('latestGrid');
  if (!grid) return;

  const movies = MovieDB.getLatestMovies();
  grid.innerHTML = movies.map(movie => createMovieCard(movie, 'compact')).join('');
}

// Create movie card HTML
function createMovieCard(movie, variant = 'default') {
  const isCompact = variant === 'compact';
  
  return `
    <article class="movie-card" data-id="${movie.id}" data-type="${movie.type}">
      <div class="movie-poster">
        <img src="${movie.poster}" alt="${movie.titleTh}" loading="lazy">
        <span class="movie-badge-quality">${movie.quality}</span>
        <div class="movie-badge-rating">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          ${movie.rating}
        </div>
        <div class="movie-overlay">
          <div class="movie-actions">
            <a href="./watch.html?id=${movie.id}" class="btn btn-movie btn-watch">
              ${Utils.getIcon('play', 16)}
              ดูหนัง
            </a>
            <a href="./watch.html?id=${movie.id}&details=1" class="btn btn-movie btn-details">
              ${Utils.getIcon('info', 16)}
              รายละเอียด
            </a>
          </div>
        </div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title" title="${movie.titleTh}">${movie.titleTh}</h3>
        <div class="movie-meta">
          <span>${movie.year}</span>
          <span>${movie.duration}</span>
        </div>
        ${!isCompact ? `
          <div class="movie-genres">
            ${movie.genres.slice(0, 3).map(g => `<span class="movie-genre">${g}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    </article>
  `;
}

// Create category card HTML
function createCategoryCard(category) {
  return `
    <a href="#" class="category-card" data-category="${category.id}">
      <div class="category-icon">
        ${Utils.getIcon(category.icon, 30)}
      </div>
      <h3 class="category-name">${category.name}</h3>
      <p class="category-count">${Utils.formatNumber(category.count)} เรื่อง</p>
    </a>
  `;
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const debouncedSearch = Utils.debounce((query) => {
    if (query.length < 2) {
      // Reset to default view
      initFeaturedMovies();
      initLatestMovies();
      return;
    }

    const results = MovieDB.searchMovies(query);
    displaySearchResults(results);
  }, 300);

  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value.trim());
  });

  // Handle Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        window.location.href = `./watch.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

// Display search results
function displaySearchResults(movies) {
  const featuredGrid = document.getElementById('featuredGrid');
  const latestGrid = document.getElementById('latestGrid');
  
  if (featuredGrid) {
    if (movies.length === 0) {
      featuredGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: var(--text-muted); margin-bottom: 1rem;">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">ไม่พบผลการค้นหา</h3>
          <p style="color: var(--text-muted);">ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกด</p>
        </div>
      `;
    } else {
      featuredGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
    }
  }

  if (latestGrid) {
    latestGrid.innerHTML = '';
  }
}

// Filter functionality
function initFilters() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter movies
      const filter = btn.dataset.filter;
      const movies = MovieDB.getMoviesByType(filter);
      
      const featuredGrid = document.getElementById('featuredGrid');
      if (featuredGrid) {
        // Show loading state
        featuredGrid.innerHTML = `
          <div class="loading-grid" style="grid-column: 1/-1;">
            ${Array(6).fill(0).map(() => `
              <div class="loading-card">
                <div class="loading-poster"></div>
                <div class="loading-info">
                  <div class="loading-title"></div>
                  <div class="loading-meta"></div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        
        // Simulate loading delay
        setTimeout(() => {
          featuredGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
        }, 300);
      }
    });
  });
}

// Newsletter form
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate subscription
    const submitBtn = form.querySelector('.btn-subscribe');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="loading-spinner" style="width: 20px; height: 20px; border-width: 2px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
      </svg>
      กำลังสมัคร...
    `;
    
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        สมัครสำเร็จ!
      `;
      submitBtn.style.background = '#10b981';
      
      Utils.showToast(`สมัครรับข่าวสารสำเร็จ! อีเมล: ${email}`, 'success');
      
      form.reset();
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

// Mobile menu toggle
document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('mobile-open');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Add parallax effect to hero
window.addEventListener('scroll', Utils.throttle(() => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
}, 16));

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Performance: Preload critical resources
function preloadResources() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Initialize preloading
preloadResources();

// Handle offline/online status
window.addEventListener('online', () => {
  Utils.showToast('เชื่อมต่ออินเทอร์เน็ตแล้ว', 'success');
});

window.addEventListener('offline', () => {
  Utils.showToast('ขาดการเชื่อมต่ออินเทอร์เน็ต', 'warning');
});

// Register service worker for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('./sw.js');
  });
}
