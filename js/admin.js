/* ============================================
   MOVIE HUB ADMIN - Complete Firebase System
   ============================================ */

let currentUser = null;
let moviesUnsubscribe = null;

// Initialize Admin Page
document.addEventListener('DOMContentLoaded', () => {
  // Check Auth State
  AdminAuth.init((isLoggedIn, user, error) => {
    if (isLoggedIn) {
      currentUser = user;
      showDashboard();
      initRealtimeMovies();
      updateUserInfo(user);
    } else {
      showLogin();
      if (error) showLoginError(error);
    }
  });

  // Init Event Listeners
  initLoginForm();
  initTabs();
  initShortcuts();
});

// Show/Hide Sections
function showLogin() {
  document.getElementById('loginSection').style.display = 'flex';
  document.getElementById('dashboardSection').style.display = 'none';
  document.body.classList.add('login-page');
}

function showDashboard() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('dashboardSection').style.display = 'grid';
  document.body.classList.remove('login-page');
  
  // Animate stats
  animateStats();
}

// Real-time Movies Listener
function initRealtimeMovies() {
  if (moviesUnsubscribe) moviesUnsubscribe();
  
  const tableBody = document.getElementById('moviesTableBody');
  
  // Subscribe to MovieDB changes
  moviesUnsubscribe = MovieDB.subscribe(movies => {
    renderMoviesTable(movies);
    updateStats(movies);
  });
}

// Render Table with Animation
function renderMoviesTable(movies) {
  const tbody = document.getElementById('moviesTableBody');
  const searchQuery = document.getElementById('tableSearch')?.value || '';
  
  let filtered = movies;
  if (searchQuery) {
    filtered = MovieDB.searchMovies(searchQuery);
  }
  
  tbody.innerHTML = filtered.map((movie, index) => `
    <tr class="fade-in-up" style="animation-delay: ${index * 0.05}s">
      <td>
        <input type="checkbox" class="checkbox-custom row-checkbox" data-id="${movie.id}">
      </td>
      <td>
        <div class="movie-cell">
          <img src="${movie.poster}" alt="" class="movie-thumb" loading="lazy">
          <div class="movie-info-cell">
            <h4>${movie.titleTh}</h4>
            <span>${movie.title}</span>
          </div>
        </div>
      </td>
      <td>${movie.year}</td>
      <td>
        <div class="rating-cell">
          <i class="fas fa-star"></i>
          <span>${movie.rating}</span>
        </div>
      </td>
      <td>
        <div class="genre-tags">
          ${movie.genres?.slice(0, 2).map(g => `<span class="genre-tag">${g}</span>`).join('') || ''}
        </div>
      </td>
      <td>
        <span class="status-badge ${movie.featured ? 'active' : ''}">
          ${movie.featured ? 'เด่น' : movie.latest ? 'ใหม่' : 'ปกติ'}
        </span>
      </td>
      <td>
        <div class="action-btns">
          <button class="btn-icon edit magnetic-btn" onclick="editMovie('${movie.id}')" title="แก้ไข">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon delete magnetic-btn" onclick="confirmDelete('${movie.id}')" title="ลบ">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Stats Animation
function updateStats(movies) {
  const stats = {
    total: movies.length,
    featured: movies.filter(m => m.featured).length,
    latest: movies.filter(m => m.latest).length
  };
  
  animateValue('totalMovies', stats.total);
  animateValue('featuredMovies', stats.featured);
  animateValue('newMovies', stats.latest);
}

function animateValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  
  const current = parseInt(el.textContent) || 0;
  const diff = value - current;
  if (diff === 0) return;
  
  const step = diff > 0 ? 1 : -1;
  const timer = setInterval(() => {
    const newVal = parseInt(el.textContent) + step;
    el.textContent = newVal;
    if (newVal === value) clearInterval(timer);
  }, 20);
}

// Login Handlers
function initLoginForm() {
  const form = document.getElementById('emailLoginForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.btn-login');
    btn.classList.add('loading');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const result = await AdminAuth.loginWithEmail(email, password);
    
    btn.classList.remove('loading');
    
    if (!result.success) {
      showLoginError(result.error);
    }
  });
}

async function loginWithGoogle() {
  const btn = document.querySelector('.btn-google');
  btn.classList.add('loading');
  
  const result = await AdminAuth.loginWithGoogle();
  btn.classList.remove('loading');
  
  if (!result.success) {
    showLoginError(result.error);
  }
}

function showLoginError(msg) {
  const errorDiv = document.getElementById('loginError');
  errorDiv.querySelector('span').textContent = msg;
  errorDiv.classList.add('show', 'shake');
  setTimeout(() => errorDiv.classList.remove('shake'), 500);
}

// Toggle Password
function togglePassword() {
  const input = document.getElementById('loginPassword');
  const icon = document.querySelector('.toggle-password i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Tab Switching
function initTabs() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.dataset.tab;
      document.querySelectorAll('.login-form').forEach(f => {
        f.style.display = f.dataset.tab === target ? 'block' : 'none';
        if (f.dataset.tab === target) f.classList.add('fade-in');
      });
    });
  });
}

// CRUD Operations
async function saveMovie() {
  const form = document.getElementById('movieForm');
  const formData = new FormData(form);
  const id = document.getElementById('movieId').value;
  
  const movieData = {
    titleTh: document.getElementById('titleTh').value,
    title: document.getElementById('title').value,
    year: parseInt(document.getElementById('year').value),
    rating: parseFloat(document.getElementById('rating').value) || 0,
    genres: document.getElementById('genres').value.split(',').map(g => g.trim()),
    featured: document.getElementById('featured').checked,
    latest: document.getElementById('latest').checked,
    // ... other fields
  };
  
  try {
    if (id) {
      await MovieDB.updateMovie(id, movieData);
    } else {
      await MovieDB.addMovie(movieData);
    }
    closeModal();
  } catch (e) {
    console.error(e);
  }
}

async function confirmDelete(id) {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบหนังเรื่องนี้?')) {
    await MovieDB.deleteMovie(id);
  }
}

// Keyboard Shortcuts
function initShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl+K = Focus Search
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      document.getElementById('tableSearch')?.focus();
    }
    
    // Ctrl+N = New Movie
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      openAddModal();
    }
    
    // Escape = Close Modal
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function logout() {
  AdminAuth.logout();
}

// Modal Functions
function openAddModal() { /* ... */ }
function closeModal() { /* ... */ }
function editMovie(id) { /* ... */ }