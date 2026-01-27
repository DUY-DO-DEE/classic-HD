/* ============================================
   MOVIE HUB - Common JavaScript
   ============================================ */

// Movie Data Storage
const MovieDB = {
  // Get movies from localStorage or use default data
  getMovies() {
    const stored = localStorage.getItem('movieHub_movies');
    return stored ? JSON.parse(stored) : this.getDefaultMovies();
  },

  // Save movies to localStorage
  saveMovies(movies) {
    localStorage.setItem('movieHub_movies', JSON.stringify(movies));
  },

  // Get categories
  getCategories() {
    return [
      { id: 'action', name: 'แอคชั่น', icon: 'sword', count: 1250 },
      { id: 'drama', name: 'ดราม่า', icon: 'heart', count: 980 },
      { id: 'comedy', name: 'คอมเมดี้', icon: 'smile', count: 850 },
      { id: 'horror', name: 'สยองขวัญ', icon: 'ghost', count: 620 },
      { id: 'romance', name: 'รอมคอม', icon: 'heart-handshake', count: 740 },
      { id: 'scifi', name: 'ไซไฟ', icon: 'rocket', count: 430 },
      { id: 'thriller', name: 'ระทึกขวัญ', icon: 'alert-triangle', count: 560 },
      { id: 'animation', name: 'การ์ตูน', icon: 'sparkles', count: 390 }
    ];
  },

  // Default movie data
  getDefaultMovies() {
    return [
      {
        id: 1,
        title: 'Dune: Part Two',
        titleTh: 'ดูน ภาค 2',
        year: 2024,
        rating: 8.9,
        quality: '4K',
        duration: '166 นาที',
        genres: ['แอคชั่น', 'ไซไฟ', 'ดราม่า'],
        poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop',
        description: 'พอล อาเทริดีส ร่วมมือกับชานี ในการแก้แค้นผู้ที่ทำลายครอบครัวของเขา ต้องเผชิญหน้ากับการเลือกระหว่างความรักของชีวิตและชะตากรรมของจักรวาล',
        director: 'Denis Villeneuve',
        cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
        type: 'action',
        featured: true,
        latest: true,
        links: [
          { name: 'Netflix', url: 'https://netflix.com', icon: 'play' },
          { name: 'HBO Max', url: 'https://hbomax.com', icon: 'play' },
          { name: 'Amazon Prime', url: 'https://primevideo.com', icon: 'play' }
        ]
      },
      {
        id: 2,
        title: 'Oppenheimer',
        titleTh: 'ออปเพนไฮเมอร์',
        year: 2023,
        rating: 8.6,
        quality: '4K',
        duration: '180 นาที',
        genres: ['ดราม่า', 'ประวัติศาสตร์'],
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
        description: 'เรื่องราวชีวิตของเจ. โรเบิร์ต ออปเพนไฮเมอร์ นักฟิสิกส์ผู้คิดค้นระเบิดปรมาณู และบทบาทของเขาในสงครามโลกครั้งที่สอง',
        director: 'Christopher Nolan',
        cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon'],
        type: 'drama',
        featured: true,
        latest: false,
        links: [
          { name: 'Apple TV', url: 'https://tv.apple.com', icon: 'play' },
          { name: 'Google Play', url: 'https://play.google.com', icon: 'play' }
        ]
      },
      {
        id: 3,
        title: 'The Batman',
        titleTh: 'เดอะ แบทแมน',
        year: 2022,
        rating: 7.8,
        quality: '4K',
        duration: '176 นาที',
        genres: ['แอคชั่น', 'อาชญากรรม', 'ระทึกขวัญ'],
        poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
        description: 'แบทแมน ต้องสืบสวนคดีฆาตกรรมลึกลับในกอธแธม ซิตี้ โดยมีผู้ร้ายปริศนาคอยท้าทายเขาอยู่เสมอ',
        director: 'Matt Reeves',
        cast: ['Robert Pattinson', 'Zoë Kravitz', 'Jeffrey Wright'],
        type: 'action',
        featured: true,
        latest: false,
        links: [
          { name: 'HBO Max', url: 'https://hbomax.com', icon: 'play' },
          { name: 'Amazon Prime', url: 'https://primevideo.com', icon: 'play' }
        ]
      },
      {
        id: 4,
        title: 'Spider-Man: Across the Spider-Verse',
        titleTh: 'สไปเดอร์แมน: ผ่ามัลติเวิร์ส',
        year: 2023,
        rating: 8.7,
        quality: '4K',
        duration: '140 นาที',
        genres: ['แอคชั่น', 'การ์ตูน', 'ไซไฟ'],
        poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop',
        description: 'ไมล์ โมราเลส ร่วมมือกับเกว็น สไตซี่ เพื่อเดินทางผ่านมัลติเวิร์สและพบกับทีมสไปเดอร์คนอื่นๆ',
        director: 'Joaquim Dos Santos',
        cast: ['Shameik Moore', 'Hailee Steinfeld', 'Brian Tyree Henry'],
        type: 'animation',
        featured: true,
        latest: true,
        links: [
          { name: 'Netflix', url: 'https://netflix.com', icon: 'play' },
          { name: 'Apple TV', url: 'https://tv.apple.com', icon: 'play' }
        ]
      },
      {
        id: 5,
        title: 'Poor Things',
        titleTh: 'พูร์ ธิงส์',
        year: 2023,
        rating: 8.0,
        quality: 'HD',
        duration: '141 นาที',
        genres: ['คอมเมดี้', 'ดราม่า', 'แฟนตาซี'],
        poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
        description: 'เบลลา แบ็กซ์เตอร์ หญิงสาวที่ถูกฟื้นคืนชีพโดยนักวิทยาศาสตร์ ออกเดินทางผจญภัยรอบโลกเพื่อค้นหาตัวตน',
        director: 'Yorgos Lanthimos',
        cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe'],
        type: 'comedy',
        featured: true,
        latest: true,
        links: [
          { name: 'Hulu', url: 'https://hulu.com', icon: 'play' },
          { name: 'Amazon Prime', url: 'https://primevideo.com', icon: 'play' }
        ]
      },
      {
        id: 6,
        title: 'Killers of the Flower Moon',
        titleTh: 'ฆาตกรรมจันทร์เจ้าเอ๋ย',
        year: 2023,
        rating: 7.6,
        quality: '4K',
        duration: '206 นาที',
        genres: ['อาชญากรรม', 'ดราม่า', 'ประวัติศาสตร์'],
        poster: 'https://images.unsplash.com/photo-1594909122849-11daa2a0cf2b?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        description: 'เรื่องราวการสืบสวนฆาตกรรมต่อเนื่องของชนพื้นเมืองอเมริกันในโอคลาโฮมาช่วงปี 1920',
        director: 'Martin Scorsese',
        cast: ['Leonardo DiCaprio', 'Robert De Niro', 'Lily Gladstone'],
        type: 'drama',
        featured: false,
        latest: true,
        links: [
          { name: 'Apple TV', url: 'https://tv.apple.com', icon: 'play' },
          { name: 'Paramount+', url: 'https://paramountplus.com', icon: 'play' }
        ]
      },
      {
        id: 7,
        title: 'The Super Mario Bros. Movie',
        titleTh: 'เดอะ ซูเปอร์มาริโอบราเธอร์ส มูฟวี่',
        year: 2023,
        rating: 7.1,
        quality: '4K',
        duration: '92 นาที',
        genres: ['การ์ตูน', 'คอมเมดี้', 'ผจญภัย'],
        poster: 'https://images.unsplash.com/photo-1612287230217-969b698cb8d1?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop',
        description: 'มาริโอและลุยจี้ สองพี่น้องช่างประปา ต้องเดินทางเข้าไปในโลกใหม่เพื่อช่วยเจ้าหญิงพีช',
        director: 'Aaron Horvath',
        cast: ['Chris Pratt', 'Anya Taylor-Joy', 'Charlie Day'],
        type: 'animation',
        featured: false,
        latest: true,
        links: [
          { name: 'Netflix', url: 'https://netflix.com', icon: 'play' },
          { name: 'Peacock', url: 'https://peacocktv.com', icon: 'play' }
        ]
      },
      {
        id: 8,
        title: 'John Wick: Chapter 4',
        titleTh: 'จอห์น วิค แรงกว่านรก 4',
        year: 2023,
        rating: 7.7,
        quality: '4K',
        duration: '169 นาที',
        genres: ['แอคชั่น', 'อาชญากรรม', 'ระทึกขวัญ'],
        poster: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1514306191717-452ec28c7f31?w=1920&h=1080&fit=crop',
        description: 'จอห์น วิค ค้นพบวิธีเดียวที่จะเอาชีวิตรอดคือการท้าทาย The High Table แต่ต้องเผชิญกับศัตรูใหม่ที่มีอำนาจมหาศาล',
        director: 'Chad Stahelski',
        cast: ['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård'],
        type: 'action',
        featured: false,
        latest: true,
        links: [
          { name: 'Starz', url: 'https://starz.com', icon: 'play' },
          { name: 'Amazon Prime', url: 'https://primevideo.com', icon: 'play' }
        ]
      },
      {
        id: 9,
        title: 'Barbie',
        titleTh: 'บาร์บี้',
        year: 2023,
        rating: 6.9,
        quality: '4K',
        duration: '114 นาที',
        genres: ['คอมเมดี้', 'ผจญภัย', 'แฟนตาซี'],
        poster: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop',
        description: 'บาร์บี้ต้องออกจากโลกบาร์บี้แลนด์และเดินทางเข้าสู่โลกจริงเพื่อค้นหาความหมายของชีวิต',
        director: 'Greta Gerwig',
        cast: ['Margot Robbie', 'Ryan Gosling', 'America Ferrera'],
        type: 'comedy',
        featured: false,
        latest: true,
        links: [
          { name: 'Max', url: 'https://max.com', icon: 'play' },
          { name: 'Amazon Prime', url: 'https://primevideo.com', icon: 'play' }
        ]
      },
      {
        id: 10,
        title: 'Talk to Me',
        titleTh: 'ขออีกสักคน',
        year: 2023,
        rating: 7.1,
quality: 'HD',
        duration: '95 นาที',
        genres: ['สยองขวัญ', 'ระทึกขวัญ'],
        poster: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=1920&h=1080&fit=crop',
        description: 'กลุ่มวัยรุ่นค้นพบวิธีเรียกวิญญาณด้วยมือปั้นศพลึกลับ แต่เกมนี้กลับกลายเป็นฝันร้าย',
        director: 'Danny Philippou',
        cast: ['Sophie Wilde', 'Joe Bird', 'Alexandra Jensen'],
        type: 'horror',
        featured: false,
        latest: true,
        links: [
          { name: 'Paramount+', url: 'https://paramountplus.com', icon: 'play' },
          { name: 'Apple TV', url: 'https://tv.apple.com', icon: 'play' }
        ]
      },
      {
        id: 11,
        title: 'Past Lives',
        titleTh: 'ครั้งหนึ่ง...ซึ่งคิดถึงตลอดไป',
        year: 2023,
        rating: 7.9,
        quality: 'HD',
        duration: '105 นาที',
        genres: ['รอมคอม', 'ดราม่า'],
        poster: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1920&h=1080&fit=crop',
        description: 'หญิงสาวชาวเกาหลีใต้ได้พบกับเพื่อนสมัยเด็กชาวเกาหลีเหนืออีกครั้งในนิวยอร์ก',
        director: 'Celine Song',
        cast: ['Greta Lee', 'Teo Yoo', 'John Magaro'],
        type: 'romance',
        featured: false,
        latest: true,
        links: [
          { name: 'Paramount+', url: 'https://paramountplus.com', icon: 'play' },
          { name: 'Apple TV', url: 'https://tv.apple.com', icon: 'play' }
        ]
      },
      {
        id: 12,
        title: 'Mission: Impossible - Dead Reckoning',
        titleTh: 'มิชชั่น:อิมพอสซิเบิ้ล 7',
        year: 2023,
        rating: 7.7,
        quality: '4K',
        duration: '163 นาที',
        genres: ['แอคชั่น', 'ผจญภัย', 'ระทึกขวัญ'],
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
        backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop',
        description: 'อีธาน ฮันต์ และทีม IMF ต้องตามล่าอาวุธล้ำยุคที่อาจทำลายมนุษยชาติ',
        director: 'Christopher McQuarrie',
        cast: ['Tom Cruise', 'Hayley Atwell', 'Ving Rhames'],
        type: 'action',
        featured: false,
        latest: true,
        links: [
          { name: 'Paramount+', url: 'https://paramountplus.com', icon: 'play' },
          { name: 'Amazon Prime', url: 'https://primevideo.com', icon: 'play' }
        ]
      }
    ];
  },

  // Get movie by ID
  getMovieById(id) {
    const movies = this.getMovies();
    return movies.find(m => m.id === parseInt(id));
  },

  // Get featured movies
  getFeaturedMovies() {
    const movies = this.getMovies();
    return movies.filter(m => m.featured);
  },

  // Get latest movies
  getLatestMovies() {
    const movies = this.getMovies();
    return movies.filter(m => m.latest);
  },

  // Get movies by type
  getMoviesByType(type) {
    const movies = this.getMovies();
    return type === 'all' ? movies : movies.filter(m => m.type === type);
  },

  // Search movies
  searchMovies(query) {
    const movies = this.getMovies();
    const lowerQuery = query.toLowerCase();
    return movies.filter(m => 
      m.title.toLowerCase().includes(lowerQuery) ||
      m.titleTh.toLowerCase().includes(lowerQuery) ||
      m.genres.some(g => g.toLowerCase().includes(lowerQuery))
    );
  },

  // Add new movie
  addMovie(movie) {
    const movies = this.getMovies();
    movie.id = Date.now();
    movies.unshift(movie);
    this.saveMovies(movies);
    return movie;
  },

  // Update movie
  updateMovie(id, updates) {
    const movies = this.getMovies();
    const index = movies.findIndex(m => m.id === parseInt(id));
    if (index !== -1) {
      movies[index] = { ...movies[index], ...updates };
      this.saveMovies(movies);
      return movies[index];
    }
    return null;
  },

  // Delete movie
  deleteMovie(id) {
    const movies = this.getMovies();
    const filtered = movies.filter(m => m.id !== parseInt(id));
    this.saveMovies(filtered);
    return filtered.length < movies.length;
  }
};

// Utility Functions
const Utils = {
  // Format number with commas
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Truncate text
  truncate(text, length = 100) {
    return text.length > length ? text.substring(0, length) + '...' : text;
  },

  // Generate star rating HTML
  generateStars(rating) {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    let html = '';
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        html += '<svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else if (i === fullStars && hasHalfStar) {
        html += '<svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.5"/></svg>';
      } else {
        html += '<svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      }
    }
    return html;
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Generate random ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Animate number counting
  animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString() + '+';
    }, 16);
  },

  // Show toast notification
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 12px;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // Get icon SVG
  getIcon(name, size = 24) {
    const icons = {
      sword: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`,
      heart: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      smile: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
      ghost: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>`,
      'heart-handshake': `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/></svg>`,
      rocket: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
      'alert-triangle': `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
      sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
      play: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
      info: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
      edit: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
      trash: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
      plus: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
      save: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
      x: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      upload: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
      image: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
      link: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      logout: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
      dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
      film: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
      users: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      settings: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
      eye: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
      star: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      clock: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      user: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      menu: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
      search: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      check: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      lock: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      'external-link': `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
      trend: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
      hash: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`
    };
    
    return icons[name] || icons['film'];
  }
};

// Admin Authentication
const AdminAuth = {
  // Default admin credentials (change in production)
  defaultCredentials: {
    username: 'admin',
    password: 'moviehub2026'
  },

  // Check if admin is logged in
  isLoggedIn() {
    return sessionStorage.getItem('movieHub_admin') === 'true';
  },

  // Login
  login(username, password) {
    if (username === this.defaultCredentials.username && 
        password === this.defaultCredentials.password) {
      sessionStorage.setItem('movieHub_admin', 'true');
      return true;
    }
    return false;
  },

  // Logout
  logout() {
    sessionStorage.removeItem('movieHub_admin');
    window.location.href = './index.html';
  },

  // Protect admin page
  protect() {
    if (!this.isLoggedIn()) {
      window.location.href = './admin.html';
      return false;
    }
    return true;
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MovieDB, Utils, AdminAuth };
}
