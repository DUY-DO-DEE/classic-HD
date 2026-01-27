/* ============================================
   MOVIE HUB - Admin Page JavaScript
   ============================================ */

// Global variables
let currentPage = 1;
const itemsPerPage = 10;
let deleteMovieId = null;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if already logged in
  if (AdminAuth.isLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }
  
  // Initialize event listeners
  initLoginForm();
  initLogout();
  initModalEvents();
  initMovieForm();
  initTableSearch();
  initSidebarNavigation();
});

// Show login section
function showLogin() {
  document.getElementById('loginSection').style.display = 'flex';
  document.getElementById('dashboardSection').style.display = 'none';
}

// Show dashboard section
function showDashboard() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('dashboardSection').style.display = 'grid';
  
  // Load dashboard data
  loadStats();
  loadMoviesTable();
}

// Initialize login form
function initLoginForm() {
  const form = document.getElementById('loginForm');
  const errorDiv = document.getElementById('loginError');
  
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (AdminAuth.login(username, password)) {
      errorDiv.classList.remove('show');
      showDashboard();
      Utils.showToast('เข้าสู่ระบบสำเร็จ', 'success');
    } else {
      errorDiv.classList.add('show');
      Utils.showToast('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
    }
  });
}

// Initialize logout
function initLogout() {
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    AdminAuth.logout();
  });
}

// Load statistics
function loadStats() {
  const movies = MovieDB.getMovies();
  const featured = movies.filter(m => m.featured).length;
  const latest = movies.filter(m => m.latest).length;
  
  document.getElementById('totalMovies').textContent = movies.length;
  document.getElementById('newMovies').textContent = latest;
  document.getElementById('featuredMovies').textContent = featured;
}

// Load movies table
function loadMoviesTable(searchQuery = '') {
  const tbody = document.getElementById('moviesTableBody');
  const pagination = document.getElementById('pagination');
  
  let movies = MovieDB.getMovies();
  
  // Filter by search query
  if (searchQuery) {
    movies = movies.filter(m => 
      m.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Pagination
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = movies.slice(start, start + itemsPerPage);
  
  // Render table rows
  if (paginatedMovies.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 3rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: var(--text-muted); margin-bottom: 1rem;">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
          </svg>
          <p style="color: var(--text-muted);">ไม่พบรายการหนัง</p>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = paginatedMovies.map(movie => createTableRow(movie)).join('');
  }
  
  // Render pagination
  renderPagination(totalPages);
  
  // Initialize action buttons
  initTableActions();
}

// Create table row HTML
function createTableRow(movie) {
  return `
    <tr data-id="${movie.id}">
      <td>
        <div class="movie-cell">
          <img src="${movie.poster}" alt="${movie.titleTh}" class="movie-thumb" loading="lazy">
          <div class="movie-info-cell">
            <h4>${movie.titleTh}</h4>
            <span>${movie.title}</span>
          </div>
        </div>
      </td>
      <td>${movie.year}</td>
      <td>
        <div class="rating-cell">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          ${movie.rating}
        </div>
      </td>
      <td>
        <div class="genre-tags">
          ${movie.genres.slice(0, 2).map(g => `<span class="genre-tag-small">${g}</span>`).join('')}
          ${movie.genres.length > 2 ? `<span class="genre-tag-small">+${movie.genres.length - 2}</span>` : ''}
        </div>
      </td>
      <td>
        <span class="status-badge ${movie.featured || movie.latest ? 'active' : ''}">
          ${movie.featured ? 'เด่น' : movie.latest ? 'ใหม่' : 'ปกติ'}
        </span>
      </td>
      <td>
        <div class="action-btns">
          <button class="btn-icon edit-btn" title="แก้ไข" data-id="${movie.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="btn-icon delete delete-btn" title="ลบ" data-id="${movie.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `;
}

// Render pagination
function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let html = `
    <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
  `;
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span style="color: var(--text-muted);">...</span>`;
    }
  }
  
  html += `
    <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  `;
  
  pagination.innerHTML = html;
  
  // Add click handlers
  pagination.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.dataset.page);
      if (page && page !== currentPage) {
        currentPage = page;
        loadMoviesTable(document.getElementById('tableSearch')?.value);
      }
    });
  });
}

// Initialize table action buttons
function initTableActions() {
  // Edit buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      openEditModal(id);
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteMovieId = btn.dataset.id;
      openDeleteModal();
    });
  });
}

// Initialize table search
function initTableSearch() {
  const searchInput = document.getElementById('tableSearch');
  
  searchInput?.addEventListener('input', Utils.debounce((e) => {
    currentPage = 1;
    loadMoviesTable(e.target.value);
  }, 300));
}

// Initialize sidebar navigation
function initSidebarNavigation() {
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active state
      document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Show corresponding section
      const section = link.dataset.section;
      showSection(section);
    });
  });
}

// Show section
function showSection(section) {
  const statsSection = document.getElementById('statsSection');
  const moviesSection = document.getElementById('moviesSection');
  
  switch (section) {
    case 'stats':
      statsSection.style.display = 'grid';
      moviesSection.style.display = 'none';
      document.querySelector('.admin-header h1').textContent = 'สถิติ';
      break;
    case 'settings':
      statsSection.style.display = 'none';
      moviesSection.style.display = 'none';
      document.querySelector('.admin-header h1').textContent = 'ตั้งค่า';
      break;
    default:
      statsSection.style.display = 'grid';
      moviesSection.style.display = 'block';
      document.querySelector('.admin-header h1').textContent = 'แดชบอร์ด';
  }
}

// Initialize modal events
function initModalEvents() {
  // Add movie button
  document.getElementById('addMovieBtn')?.addEventListener('click', () => {
    openAddModal();
  });
  
  // Close modal buttons
  document.getElementById('closeModal')?.addEventListener('click', closeModal);
  document.getElementById('cancelBtn')?.addEventListener('click', closeModal);
  
  // Close on backdrop click
  document.getElementById('movieModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'movieModal') {
      closeModal();
    }
  });
  
  // Add link button
  document.getElementById('addLinkBtn')?.addEventListener('click', () => {
    addLinkRow();
  });
  
  // Delete modal buttons
  document.getElementById('cancelDelete')?.addEventListener('click', closeDeleteModal);
  document.getElementById('confirmDelete')?.addEventListener('click', confirmDelete);
  
  // Close delete modal on backdrop click
  document.getElementById('deleteModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'deleteModal') {
      closeDeleteModal();
    }
  });
}

// Open add movie modal
function openAddModal() {
  document.getElementById('modalTitle').textContent = 'เพิ่มหนังใหม่';
  document.getElementById('movieForm').reset();
  document.getElementById('movieId').value = '';
  document.getElementById('linksContainer').innerHTML = '';
  
  // Add default link row
  addLinkRow();
  
  openModal();
}

// Open edit movie modal
function openEditModal(id) {
  const movie = MovieDB.getMovieById(id);
  if (!movie) return;
  
  document.getElementById('modalTitle').textContent = 'แก้ไขหนัง';
  document.getElementById('movieId').value = movie.id;
  document.getElementById('titleTh').value = movie.titleTh;
  document.getElementById('title').value = movie.title;
  document.getElementById('year').value = movie.year;
  document.getElementById('rating').value = movie.rating;
  document.getElementById('duration').value = movie.duration;
  document.getElementById('quality').value = movie.quality;
  document.getElementById('type').value = movie.type;
  document.getElementById('director').value = movie.director;
  document.getElementById('genres').value = movie.genres.join(', ');
  document.getElementById('cast').value = movie.cast.join(', ');
  document.getElementById('description').value = movie.description;
  document.getElementById('poster').value = movie.poster;
  document.getElementById('backdrop').value = movie.backdrop;
  document.getElementById('featured').checked = movie.featured;
  document.getElementById('latest').checked = movie.latest;
  
  // Load links
  const linksContainer = document.getElementById('linksContainer');
  linksContainer.innerHTML = '';
  
  if (movie.links && movie.links.length > 0) {
    movie.links.forEach(link => addLinkRow(link.name, link.url));
  } else {
    addLinkRow();
  }
  
  openModal();
}

// Open modal
function openModal() {
  const modal = document.getElementById('movieModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('movieModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Add link row
function addLinkRow(name = '', url = '') {
  const container = document.getElementById('linksContainer');
  const row = document.createElement('div');
  row.className = 'link-row';
  row.innerHTML = `
    <input type="text" placeholder="ชื่อแพลตฟอร์ม" class="link-name" value="${name}">
    <input type="url" placeholder="https://example.com" class="link-url" value="${url}">
    <button type="button" class="btn-remove-link" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;
  container.appendChild(row);
}

// Initialize movie form
function initMovieForm() {
  const form = document.getElementById('movieForm');
  
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveMovie();
  });
  
  // Save button
  document.getElementById('saveBtn')?.addEventListener('click', () => {
    saveMovie();
  });
}

// Save movie
function saveMovie() {
  const id = document.getElementById('movieId').value;
  
  // Collect links
  const links = [];
  document.querySelectorAll('.link-row').forEach(row => {
    const name = row.querySelector('.link-name').value.trim();
    const url = row.querySelector('.link-url').value.trim();
    if (name && url) {
      links.push({ name, url, icon: 'play' });
    }
  });
  
  const movieData = {
    titleTh: document.getElementById('titleTh').value,
    title: document.getElementById('title').value,
    year: parseInt(document.getElementById('year').value),
    rating: parseFloat(document.getElementById('rating').value) || 0,
    duration: document.getElementById('duration').value,
    quality: document.getElementById('quality').value,
    type: document.getElementById('type').value,
    director: document.getElementById('director').value,
    genres: document.getElementById('genres').value.split(',').map(g => g.trim()).filter(g => g),
    cast: document.getElementById('cast').value.split(',').map(c => c.trim()).filter(c => c),
    description: document.getElementById('description').value,
    poster: document.getElementById('poster').value,
    backdrop: document.getElementById('backdrop').value,
    featured: document.getElementById('featured').checked,
    latest: document.getElementById('latest').checked,
    links: links
  };
  
  if (id) {
    // Update existing movie
    MovieDB.updateMovie(id, movieData);
    Utils.showToast('แก้ไขหนังสำเร็จ', 'success');
  } else {
    // Add new movie
    MovieDB.addMovie(movieData);
    Utils.showToast('เพิ่มหนังสำเร็จ', 'success');
  }
  
  closeModal();
  loadStats();
  loadMoviesTable();
}

// Open delete modal
function openDeleteModal() {
  const modal = document.getElementById('deleteModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close delete modal
function closeDeleteModal() {
  const modal = document.getElementById('deleteModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  deleteMovieId = null;
}

// Confirm delete
function confirmDelete() {
  if (!deleteMovieId) return;
  
  MovieDB.deleteMovie(deleteMovieId);
  Utils.showToast('ลบหนังสำเร็จ', 'success');
  
  closeDeleteModal();
  loadStats();
  loadMoviesTable();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Escape to close modals
  if (e.key === 'Escape') {
    closeModal();
    closeDeleteModal();
  }
  
  // Ctrl+N to add new movie
  if (e.ctrlKey && e.key === 'n') {
    e.preventDefault();
    if (AdminAuth.isLoggedIn()) {
      openAddModal();
    }
  }
});
