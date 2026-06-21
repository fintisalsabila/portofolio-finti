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
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const categories = card.dataset.category || '';
    if (cat === 'all' || categories.includes(cat) || categories === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

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