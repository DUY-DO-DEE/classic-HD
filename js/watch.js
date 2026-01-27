/* ============================================
   MOVIE HUB - Watch Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initNavbar();
  initSearch();
  initModal();
  
  // Load content based on URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  const searchQuery = urlParams.get('search');
  
  if (movieId) {
    loadMovieDetails(movieId);
  } else if (searchQuery) {
    loadSearchResults(searchQuery);
  } else {
    loadNotFound();
  }
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', Utils.throttle(() => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 100));
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const debouncedSearch = Utils.debounce((query) => {
    if (query.length >= 2) {
      window.location.href = `./watch.html?search=${encodeURIComponent(query)}`;
    }
  }, 500);

  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value.trim());
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        window.location.href = `./watch.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

// Modal functionality
function initModal() {
  const modal = document.getElementById('watchModal');
  const closeBtn = document.getElementById('closeModal');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function openModal() {
  const modal = document.getElementById('watchModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('watchModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Load movie details
function loadMovieDetails(movieId) {
  const movie = MovieDB.getMovieById(movieId);
  const content = document.getElementById('movieContent');
  
  if (!movie) {
    loadNotFound();
    return;
  }
  
  // Update page title and meta
  document.title = `${movie.titleTh} (${movie.year}) | Movie Hub`;
  updateMetaTags(movie);
  
  // Render movie hero section
  content.innerHTML = `
    <section class="movie-hero">
      <div class="movie-backdrop">
        <img src="${movie.backdrop}" alt="${movie.titleTh}" loading="eager">
      </div>
      <div class="movie-backdrop-glow"></div>
      
      <div class="movie-hero-content">
        <div class="container">
          <div class="movie-hero-grid">
            <div class="movie-poster-large">
              <img src="${movie.poster}" alt="${movie.titleTh}" loading="eager">
              <span class="poster-badge">${movie.quality}</span>
            </div>
            
            <div class="movie-info-large">
              <nav class="movie-breadcrumbs">
                <a href="./index.html">หน้าหลัก</a>
                <span>/</span>
                <a href="./index.html#${movie.type}">${getCategoryName(movie.type)}</a>
                <span>/</span>
                <span>${movie.titleTh}</span>
              </nav>
              
              <h1 class="movie-title-large">${movie.titleTh}</h1>
              <p class="movie-title-original">${movie.title}</p>
              
              <div class="movie-meta-large">
                <div class="movie-rating-large">
                  <span class="rating-number">${movie.rating}</span>
                  <div class="rating-stars">
                    ${generateStarRating(movie.rating)}
                  </div>
                  <span class="rating-count">/10</span>
                </div>
                
                <div class="movie-meta-item">
                  ${Utils.getIcon('calendar', 16)}
                  <span>${movie.year}</span>
                </div>
                
                <div class="movie-meta-item">
                  ${Utils.getIcon('clock', 16)}
                  <span>${movie.duration}</span>
                </div>
              </div>
              
              <div class="movie-genres-large">
                ${movie.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}
              </div>
              
              <p class="movie-description">${movie.description}</p>
              
              <div class="movie-actions-large">
                <button class="btn-action btn-watch-now" id="watchNowBtn">
                  ${Utils.getIcon('play', 20)}
                  ดูหนังตอนนี้
                </button>
                <a href="#details" class="btn-action btn-details-view">
                  ${Utils.getIcon('info', 20)}
                  รายละเอียด
                </a>
                <button class="btn-action btn-favorite" id="favoriteBtn" title="เพิ่มในรายการโปรด">
                  ${Utils.getIcon('heart', 20)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Streaming Links Section -->
    <section class="streaming-section">
      <div class="container">
        <div class="section-header-glow">
          <h2 class="gradient-text">เลือกแพลตฟอร์มรับชม</h2>
          <p>รับชม ${movie.titleTh} ได้ที่แพลตฟอร์มสตรีมมิ่งเหล่านี้</p>
        </div>
        
        <div class="streaming-grid">
          ${movie.links.map(link => createStreamingCard(link)).join('')}
        </div>
      </div>
    </section>
    
    <!-- Details Section -->
    <section class="details-section" id="details">
      <div class="container">
        <div class="details-grid">
          <div class="details-main">
            <h3>
              ${Utils.getIcon('users', 24)}
              นักแสดงนำ
            </h3>
            <div class="cast-grid">
              ${movie.cast.map((actor, index) => createCastCard(actor, index)).join('')}
            </div>
          </div>
          
          <aside class="details-sidebar">
            <div class="info-card">
              <h4>ข้อมูลเพิ่มเติม</h4>
              <div class="info-item">
                <span class="info-label">ผู้กำกับ</span>
                <span class="info-value">${movie.director}</span>
              </div>
              <div class="info-item">
                <span class="info-label">ปีที่ฉาย</span>
                <span class="info-value">${movie.year}</span>
              </div>
              <div class="info-item">
                <span class="info-label">ความยาว</span>
                <span class="info-value">${movie.duration}</span>
              </div>
              <div class="info-item">
                <span class="info-label">คุณภาพ</span>
                <span class="info-value">${movie.quality}</span>
              </div>
              <div class="info-item">
                <span class="info-label">คะแนน</span>
                <span class="info-value">${movie.rating}/10</span>
              </div>
              <div class="info-item">
                <span class="info-label">หมวดหมู่</span>
                <span class="info-value">${movie.genres.join(', ')}</span>
              </div>
            </div>
            
            <div class="info-card">
              <h4>แชร์หนังเรื่องนี้</h4>
              <div class="footer-social" style="justify-content: flex-start;">
                <a href="https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                   target="_blank" class="social-link" aria-label="แชร์บน Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(movie.titleTh)}" 
                   target="_blank" class="social-link" aria-label="แชร์บน Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <button class="social-link" onclick="copyLink()" aria-label="คัดลอกลิงก์">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    
    <!-- Related Movies Section -->
    <section class="related-section">
      <div class="container">
        <h2 class="section-title">หนังที่คุณอาจชอบ</h2>
        <div class="related-grid" id="relatedGrid">
          <!-- Will be loaded by JavaScript -->
        </div>
      </div>
    </section>
  `;
  
  // Initialize related movies
  loadRelatedMovies(movie);
  
  // Initialize event listeners
  initMovieEvents(movie);
}

// Create streaming card HTML
function createStreamingCard(link) {
  const platformColors = {
    'Netflix': '#e50914',
    'HBO Max': '#673ab7',
    'Amazon Prime': '#00a8e1',
    'Apple TV': '#000000',
    'Disney+': '#113ccf',
    'Hulu': '#1ce783',
    'Paramount+': '#0064ff',
    'Peacock': '#000000',
    'Starz': '#ff0055',
    'Max': '#002be7',
    'Google Play': '#4285f4'
  };
  
  const color = platformColors[link.name] || 'var(--primary)';
  
  return `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="streaming-card">
      <div class="streaming-icon" style="background: ${color};">
        ${Utils.getIcon(link.icon || 'play', 30)}
      </div>
      <div class="streaming-info">
        <h3 class="streaming-name">${link.name}</h3>
        <p class="streaming-quality">รับชมได้ทันที</p>
      </div>
      <div class="streaming-arrow">
        ${Utils.getIcon('external-link', 20)}
      </div>
    </a>
  `;
}

// Create cast card HTML
function createCastCard(actor, index) {
  return `
    <div class="cast-card" style="animation-delay: ${index * 0.1}s">
      <div class="cast-avatar">
        ${Utils.getIcon('user', 40)}
      </div>
      <h4 class="cast-name">${actor}</h4>
      <p class="cast-role">นักแสดง</p>
    </div>
  `;
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;
  let html = '';
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      html += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else if (i === fullStars && hasHalfStar) {
      html += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><polygon fill="url(#half)" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/><polygon fill="none" stroke="currentColor" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else {
      html += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
  }
  
  return html;
}

// Get category name in Thai
function getCategoryName(type) {
  const categories = {
    'action': 'แอคชั่น',
    'drama': 'ดราม่า',
    'comedy': 'คอมเมดี้',
    'horror': 'สยองขวัญ',
    'romance': 'รอมคอม',
    'scifi': 'ไซไฟ',
    'thriller': 'ระทึกขวัญ',
    'animation': 'การ์ตูน'
  };
  return categories[type] || 'หนังทั้งหมด';
}

// Load related movies
function loadRelatedMovies(currentMovie) {
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;
  
  const allMovies = MovieDB.getMovies();
  const related = allMovies
    .filter(m => m.id !== currentMovie.id && m.genres.some(g => currentMovie.genres.includes(g)))
    .slice(0, 6);
  
  if (related.length === 0) {
    // If no related movies by genre, show random movies
    const random = allMovies
      .filter(m => m.id !== currentMovie.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    
    grid.innerHTML = random.map(movie => createRelatedCard(movie)).join('');
  } else {
    grid.innerHTML = related.map(movie => createRelatedCard(movie)).join('');
  }
}

// Create related movie card
function createRelatedCard(movie) {
  return `
    <article class="movie-card">
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
          </div>
        </div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title" title="${movie.titleTh}">${movie.titleTh}</h3>
        <div class="movie-meta">
          <span>${movie.year}</span>
          <span>${movie.duration}</span>
        </div>
      </div>
    </article>
  `;
}

// Initialize movie page events
function initMovieEvents(movie) {
  // Watch now button
  const watchBtn = document.getElementById('watchNowBtn');
  if (watchBtn) {
    watchBtn.addEventListener('click', () => {
      openModal();
      // Scroll to streaming section
      document.querySelector('.streaming-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Favorite button
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (favoriteBtn) {
    // Check if already favorited
    const favorites = JSON.parse(localStorage.getItem('movieHub_favorites') || '[]');
    if (favorites.includes(movie.id)) {
      favoriteBtn.classList.add('active');
    }
    
    favoriteBtn.addEventListener('click', () => {
      const favorites = JSON.parse(localStorage.getItem('movieHub_favorites') || '[]');
      const index = favorites.indexOf(movie.id);
      
      if (index === -1) {
        favorites.push(movie.id);
        favoriteBtn.classList.add('active');
        Utils.showToast('เพิ่มในรายการโปรดแล้ว', 'success');
      } else {
        favorites.splice(index, 1);
        favoriteBtn.classList.remove('active');
        Utils.showToast('นำออกจากรายการโปรดแล้ว', 'success');
      }
      
      localStorage.setItem('movieHub_favorites', JSON.stringify(favorites));
    });
  }
}

// Load search results
function loadSearchResults(query) {
  const content = document.getElementById('movieContent');
  const results = MovieDB.searchMovies(query);
  
  document.title = `ผลการค้นหา: ${query} | Movie Hub`;
  
  content.innerHTML = `
    <section class="search-results-header">
      <div class="container">
        <h1>ผลการค้นหา</h1>
        <p>พบ ${results.length} รายการ สำหรับ "<span class="search-query">${query}</span>"</p>
      </div>
    </section>
    
    <section class="section latest-section">
      <div class="container">
        <div class="movies-grid">
          ${results.length > 0 
            ? results.map(movie => createRelatedCard(movie)).join('')
            : `
              <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: var(--text-muted); margin-bottom: 1.5rem;">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h2 style="color: var(--text-secondary); margin-bottom: 0.5rem;">ไม่พบผลการค้นหา</h2>
                <p style="color: var(--text-muted);">ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกด</p>
              </div>
            `
          }
        </div>
      </div>
    </section>
  `;
}

// Load not found state
function loadNotFound() {
  const content = document.getElementById('movieContent');
  
  document.title = 'ไม่พบหนัง | Movie Hub';
  
  content.innerHTML = `
    <section class="not-found">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 15s1.5-2 4-2 4 2 4 2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
      <h1>ไม่พบหนังที่คุณต้องการ</h1>
      <p>หนังที่คุณกำลังหาอาจถูกลบออกหรือไม่มีในระบบ ลองค้นหาหนังเรื่องอื่นดู</p>
      <a href="./index.html" class="btn btn-primary btn-hero">
        ${Utils.getIcon('film', 20)}
        กลับสู่หน้าหลัก
      </a>
    </section>
  `;
}

// Update meta tags for SEO
function updateMetaTags(movie) {
  // Update description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `${movie.titleTh} (${movie.year}) - ${Utils.truncate(movie.description, 150)}`;
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (ogTitle) ogTitle.content = `${movie.titleTh} (${movie.year}) | Movie Hub`;
  if (ogDesc) ogDesc.content = movie.description;
  if (ogImage) ogImage.content = movie.poster;
}

// Copy link to clipboard
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    Utils.showToast('คัดลอกลิงก์แล้ว', 'success');
  }).catch(() => {
    Utils.showToast('ไม่สามารถคัดลอกลิงก์ได้', 'error');
  });
}

// Mobile menu toggle
document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('mobile-open');
});
