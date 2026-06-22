// ==================== THEME TOGGLE ====================
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;

function setTheme(dark) {
  isDark = dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
const saved = localStorage.getItem('theme');
if (saved) setTheme(saved === 'dark');
else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true);
themeToggle.addEventListener('click', () => setTheme(!isDark));

// ==================== HAMBURGER ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ==================== SCROLL ====================
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});

// ==================== FADE-UP ANIMATION ====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ==================== PROJECT FILTER ====================
let currentFilter = 'all';

function filterProjects(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const allProjects = document.querySelectorAll('.project-card');
  let visibleCount = 0;
  
  allProjects.forEach(card => {
    const categories = card.dataset.category || '';
    if (cat === 'all' || categories.includes(cat) || categories === cat) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Reset toggle state - show only 3 projects initially
  const toggleBtn = document.getElementById('toggleProjects');
  const isExpanded = toggleBtn.classList.contains('active');
  
  if (!isExpanded) {
    showOnlyThreeProjects();
  }
}

function showOnlyThreeProjects() {
  const visibleProjects = document.querySelectorAll('.project-card[style*="display: none"]');
  const allProjects = document.querySelectorAll('.project-card');
  let count = 0;
  
  allProjects.forEach(card => {
    if (card.style.display !== 'none') {
      count++;
      if (count > 3) {
        card.style.display = 'none';
      }
    }
  });
}

function showAllProjects() {
  const allProjects = document.querySelectorAll('.project-card');
  const currentFilter = document.querySelector('.filter-btn.active')?.textContent.toLowerCase() || 'all';
  
  allProjects.forEach(card => {
    const categories = card.dataset.category || '';
    if (currentFilter === 'all' || categories.includes(currentFilter) || categories === currentFilter) {
      card.style.display = '';
    }
  });
}

// ==================== PROJECTS TOGGLE ====================
let isExpanded = false;

function toggleProjects() {
  const toggleBtn = document.getElementById('toggleProjects');
  const allProjects = document.querySelectorAll('.project-card');
  const currentFilter = document.querySelector('.filter-btn.active')?.textContent.toLowerCase() || 'all';
  
  isExpanded = !isExpanded;
  toggleBtn.classList.toggle('active');
  
  if (isExpanded) {
    // Show all projects
    allProjects.forEach(card => {
      const categories = card.dataset.category || '';
      if (currentFilter === 'all' || categories.includes(currentFilter) || categories === currentFilter) {
        card.style.display = '';
      }
    });
    toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Projects';
  } else {
    // Show only 3 projects
    let count = 0;
    allProjects.forEach(card => {
      const categories = card.dataset.category || '';
      const isVisible = currentFilter === 'all' || categories.includes(currentFilter) || categories === currentFilter;
      
      if (isVisible) {
        count++;
        if (count <= 3) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      }
    });
    toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Projects';
  }
}

// ==================== INITIAL PROJECTS STATE ====================
// Show only 3 projects initially
document.addEventListener('DOMContentLoaded', function() {
  // Give time for filter to apply
  setTimeout(() => {
    const allProjects = document.querySelectorAll('.project-card');
    let count = 0;
    allProjects.forEach(card => {
      if (card.style.display !== 'none') {
        count++;
        if (count > 3) {
          card.style.display = 'none';
        }
      }
    });
  }, 100);
});

// ==================== ACTIVE NAV ====================
const sections = document.querySelectorAll('section[id], .hero');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id || 'home';
  });
  navLinks.forEach(a => {
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent)';
    } else {
      a.style.color = '';
    }
  });
});