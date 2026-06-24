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

// ==================== LANGUAGE TRANSLATIONS ====================
const translations = {
  en: {
    // Navbar
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_experience: 'Experience',
    nav_education: 'Education',
    nav_certs: 'Certs',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    
    // Hero
    hero_tag: 'Available for Projects',
    hero_subtitle: '// Full Stack Developer & Android Engineer',
    hero_desc: 'Passionate and aspiring developer with a deep love for creating innovative solutions. Experienced in Android, Web, and Full Stack development — turning ideas into seamless digital experiences.',
    hero_btn_projects: 'View Projects',
    hero_btn_hire: 'Hire Me',
    cv_en: 'Download CV (EN)',
    cv_id: 'Download CV (ID)',
    
    // About
    about_number: '01 / about',
    about_title: 'About Me',
    about_text1: "Hi! I'm <strong>Finti Sasa Sabila</strong>, a passionate and aspiring developer based in Jakarta, Indonesia. I have a strong desire to create innovative solutions and push the boundaries of technology.",
    about_text2: 'With a deep love for coding and problem-solving, I constantly seek opportunities to learn and grow in this ever-evolving field. My experience spans across Android development, full stack web development, and IT support.',
    about_text3: "I've worked professionally as a <strong>Full Stack Developer</strong> at Politeknik STMI Jakarta, as a <strong>Mobile Developer</strong> at PT Wahana Makmur Sejati, and as a <strong>Freelance Web Developer</strong> building real-world applications that serve actual users.",
    about_highlight1_title: 'Android Developer',
    about_highlight1_desc: 'Kotlin, Java, Retrofit, XML Layout Design — building native Android apps',
    about_highlight2_title: 'Web Developer',
    about_highlight2_desc: 'Laravel, CodeIgniter 4, PHP Native, Bootstrap — building responsive web apps',
    about_highlight3_title: 'Full Stack Developer',
    about_highlight3_desc: 'End-to-end development from database design to UI implementation',
    about_highlight4_title: 'IT Support',
    about_highlight4_desc: 'Server configuration, system troubleshooting, database administration',
    
    // Skills
    skills_number: '02 / skills',
    skills_title: 'Technical Skills',
    skills_mobile: 'Mobile Development',
    skills_backend: 'Backend & Server',
    skills_frontend: 'Frontend',
    skills_tools: 'Tools & Platforms',
    skills_system: 'System Admin & IT Support',
    skills_soft: 'Soft Skills',
    
    // Experience
    exp_number: '03 / experience',
    exp_title: 'Work Experience',
    exp1_company: 'Politeknik STMI Jakarta',
    exp1_period: 'Dec 2025 – Jun 2026',
    exp1_role: 'Full Stack Developer · Internship',
    exp1_desc1: 'Developed 5 study-program websites (TRO, ABO, TIO, TKP, SIIO), improving online program visibility and information accessibility.',
    exp1_desc2: 'Built an SPM (Quality Assurance Management) web application to support structured institutional reporting workflows.',
    exp1_desc3: 'Developed a TVET web platform to support vocational education program management and documentation.',
    exp1_desc4: 'Built the LSP (Professional Certification Body) website, enabling digital certification and assessor management.',
    exp1_desc5: 'Developed an Android-based e-learning application to support mobile learning for students and instructors.',
    exp2_company: 'PT Wahana Makmur Sejati',
    exp2_period: 'Mar 2024 – Feb 2025',
    exp2_role: 'Mobile Application Developer · Internship',
    exp2_desc1: 'Reduced manual form usage by 80% by developing the Android Mechanic Audit Tools application.',
    exp2_desc2: 'Accelerated tool ordering response time by 40% by building the Android Mechanic Order Tools application.',
    exp2_desc3: 'Designed the Android Mechanic Training Registration application and Web Services (Node.js + MySQL) for a mobile-backend integrated training registration system.',
    exp3_company: 'Information System Developer',
    exp3_period: 'Aug 2022 – Mar 2023',
    exp3_role: 'Web Developer · Freelance',
    exp3_desc1: 'Cut manual administration time by 50% by building a church administration web system managing 150+ active congregation records, including baptism registration and member data management.',
    exp3_desc2: 'Handled an average of 200+ monthly transactions by developing a motorcycle service administration app with online booking, repair history, and customer management features.',
    exp3_desc3: 'Developed an employee KPI web system for PT DKB with assessment input, sub-criteria, weight calculation, and final score features for structured performance evaluation.',
    
    // Education
    edu_number: '04 / education',
    edu_title: 'Education',
    edu1_degree: "Applied Bachelor's Degree: Industrial Automotive Information Systems (GPA 3.77)",
    edu1_school: 'POLITEKNIK STMI JAKARTA · Jakarta',
    edu1_period: 'Sep 2021 – Jul 2025',
    edu2_degree: 'Back-End Developer Program',
    edu2_school: 'DBS FOUNDATION · Online',
    edu2_period: 'Mar – Sep 2023',
    
    // Certifications
    cert_number: '05 / certifications',
    cert_title: 'Certifications',
    
    // Projects
    proj_number: '06 / projects',
    proj_title: 'Portfolio Projects',
    proj_all: 'All',
    proj_web: 'Web',
    proj_android: 'Android',
    proj_show_more: 'Show More Projects',
    proj_show_less: 'Show Less Projects',
    proj_demo: 'Demo',
    proj_code: 'Code',
    
    // Contact
    contact_number: '07 / contact',
    contact_title: "Let's Work Together",
    contact_desc: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Drop me a message and let's talk!",
    contact_name: 'Name',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_service: 'Service',
    contact_message: 'Message',
    contact_send: 'Send Message',
    contact_service_android: 'Android App Development',
    contact_service_web: 'Web Development',
    contact_service_fullstack: 'Full Stack Development',
    contact_service_it: 'IT Support',
    contact_service_api: 'API Development',
    contact_service_other: 'Other',
    
    // Footer
    footer_text: '© 2026 Finti Sasa Sabila'
  },
  id: {
    // Navbar
    nav_about: 'Tentang',
    nav_skills: 'Keahlian',
    nav_experience: 'Pengalaman',
    nav_education: 'Pendidikan',
    nav_certs: 'Sertifikat',
    nav_projects: 'Proyek',
    nav_contact: 'Kontak',
    
    // Hero
    hero_tag: 'Tersedia untuk Proyek',
    hero_subtitle: '// Full Stack Developer & Android Engineer',
    hero_desc: 'Pengembang yang bersemangat dan bercita-cita dengan kecintaan mendalam untuk menciptakan solusi inovatif. Berpengalaman dalam pengembangan Android, Web, dan Full Stack, mengubah ide menjadi pengalaman digital yang mulus.',
    hero_btn_projects: 'Lihat Proyek',
    hero_btn_hire: 'Hubungi Saya',
    cv_en: 'Download CV (EN)',
    cv_id: 'Download CV (ID)',
    
    // About
    about_number: '01 / tentang',
    about_title: 'Tentang Saya',
    about_text1: "Hai! Saya <strong>Finti Sasa Sabila</strong>, seorang pengembang yang bersemangat dan bercita-cita tinggi yang berbasis di Jakarta, Indonesia. Saya memiliki keinginan kuat untuk menciptakan solusi inovatif dan mendorong batas-batas teknologi.",
    about_text2: 'Dengan kecintaan mendalam terhadap coding dan pemecahan masalah, saya terus mencari peluang untuk belajar dan berkembang di bidang yang terus berkembang ini. Pengalaman saya mencakup pengembangan Android, full stack web, dan dukungan IT.',
    about_text3: "Saya telah bekerja secara profesional sebagai <strong>Full Stack Developer</strong> di Politeknik STMI Jakarta, sebagai <strong>Mobile Developer</strong> di PT Wahana Makmur Sejati, dan sebagai <strong>Freelance Web Developer</strong> yang membangun aplikasi dunia nyata yang melayani pengguna aktual.",
    about_highlight1_title: 'Android Developer',
    about_highlight1_desc: 'Kotlin, Java, Retrofit, XML Layout Design — membangun aplikasi Android native',
    about_highlight2_title: 'Web Developer',
    about_highlight2_desc: 'Laravel, CodeIgniter 4, PHP Native, Bootstrap — membangun aplikasi web responsif',
    about_highlight3_title: 'Full Stack Developer',
    about_highlight3_desc: 'Pengembangan end-to-end dari desain database hingga implementasi UI',
    about_highlight4_title: 'IT Support',
    about_highlight4_desc: 'Konfigurasi server, troubleshooting sistem, administrasi database',
    
    // Skills
    skills_number: '02 / keahlian',
    skills_title: 'Keahlian Teknis',
    skills_mobile: 'Pengembangan Mobile',
    skills_backend: 'Backend & Server',
    skills_frontend: 'Frontend',
    skills_tools: 'Tools & Platform',
    skills_system: 'System Admin & IT Support',
    skills_soft: 'Soft Skills',
    
    // Experience
    exp_number: '03 / pengalaman',
    exp_title: 'Pengalaman Kerja',
    exp1_company: 'Politeknik STMI Jakarta',
    exp1_period: 'Des 2025 – Jun 2026',
    exp1_role: 'Full Stack Developer · Magang',
    exp1_desc1: 'Mengembangkan 5 website program studi (TRO, ABO, TIO, TKP, SIIO), meningkatkan visibilitas program dan aksesibilitas informasi.',
    exp1_desc2: 'Membangun aplikasi web SPM (Sistem Penjaminan Mutu) untuk mendukung alur kerja pelaporan institusional.',
    exp1_desc3: 'Mengembangkan platform web TVET untuk mendukung manajemen dan dokumentasi program pendidikan vokasi.',
    exp1_desc4: 'Membangun website LSP (Lembaga Sertifikasi Profesi), memungkinkan sertifikasi digital dan manajemen asesor.',
    exp1_desc5: 'Mengembangkan aplikasi e-learning berbasis Android untuk mendukung pembelajaran mobile bagi siswa dan instruktur.',
    exp2_company: 'PT Wahana Makmur Sejati',
    exp2_period: 'Mar 2024 – Feb 2025',
    exp2_role: 'Mobile Application Developer · Magang',
    exp2_desc1: 'Mengurangi penggunaan formulir manual hingga 80% dengan mengembangkan aplikasi Android Audit Tools Mekanik.',
    exp2_desc2: 'Mempercepat waktu respons pemesanan alat hingga 40% dengan membangun aplikasi Android Order Tools Mekanik.',
    exp2_desc3: 'Merancang aplikasi Android Pendaftaran Training Mekanik dan Web Services (Node.js + MySQL) untuk sistem pendaftaran training terintegrasi mobile-backend.',
    exp3_company: 'Pengembang Sistem Informasi',
    exp3_period: 'Agu 2022 – Mar 2023',
    exp3_role: 'Web Developer · Freelance',
    exp3_desc1: 'Memotong waktu administrasi manual hingga 50% dengan membangun sistem administrasi gereja yang mengelola 150+ catatan jemaat aktif.',
    exp3_desc2: 'Menangani rata-rata 200+ transaksi bulanan dengan mengembangkan aplikasi administrasi servis motor dengan pemesanan online.',
    exp3_desc3: 'Mengembangkan sistem KPI karyawan untuk PT DKB dengan fitur input penilaian, sub-kriteria, perhitungan bobot, dan nilai akhir.',
    
    // Education
    edu_number: '04 / pendidikan',
    edu_title: 'Pendidikan',
    edu1_degree: 'Sarjana Terapan: Sistem Informasi Otomotif Industri (IPK 3.77)',
    edu1_school: 'POLITEKNIK STMI JAKARTA · Jakarta',
    edu1_period: 'Sep 2021 – Jul 2025',
    edu2_degree: 'Program Back-End Developer',
    edu2_school: 'DBS FOUNDATION · Online',
    edu2_period: 'Mar – Sep 2023',
    
    // Certifications
    cert_number: '05 / sertifikasi',
    cert_title: 'Sertifikasi',
    
    // Projects
    proj_number: '06 / proyek',
    proj_title: 'Proyek Portfolio',
    proj_all: 'Semua',
    proj_web: 'Web',
    proj_android: 'Android',
    proj_show_more: 'Tampilkan Lebih Banyak',
    proj_show_less: 'Sembunyikan',
    proj_demo: 'Demo',
    proj_code: 'Kode',
    
    // Contact
    contact_number: '07 / kontak',
    contact_title: 'Mari Bekerja Sama',
    contact_desc: 'Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda. Kirim pesan dan mari kita bicara!',
    contact_name: 'Nama',
    contact_email: 'Email',
    contact_phone: 'Telepon',
    contact_service: 'Layanan',
    contact_message: 'Pesan',
    contact_send: 'Kirim Pesan',
    contact_service_android: 'Pengembangan Aplikasi Android',
    contact_service_web: 'Pengembangan Web',
    contact_service_fullstack: 'Pengembangan Full Stack',
    contact_service_it: 'Dukungan IT',
    contact_service_api: 'Pengembangan API',
    contact_service_other: 'Lainnya',
    
    // Footer
    footer_text: '© 2026 Finti Sasa Sabila'
  }
};

let currentLang = 'en';

// ==================== LANGUAGE TOGGLE FUNCTION ====================
function toggleLanguage() {
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  
  currentLang = currentLang === 'en' ? 'id' : 'en';
  langLabel.textContent = currentLang.toUpperCase();
  localStorage.setItem('language', currentLang);
  updateLanguage(currentLang);
}

// ==================== UPDATE LANGUAGE FUNCTION ====================
function updateLanguage(lang) {
  const t = translations[lang];
  if (!t) return;
  
  // Update Navbar
  document.querySelector('.nav-links a[href="#about"]').textContent = t.nav_about;
  document.querySelector('.nav-links a[href="#skills"]').textContent = t.nav_skills;
  document.querySelector('.nav-links a[href="#experience"]').textContent = t.nav_experience;
  document.querySelector('.nav-links a[href="#education"]').textContent = t.nav_education;
  document.querySelector('.nav-links a[href="#certifications"]').textContent = t.nav_certs;
  document.querySelector('.nav-links a[href="#projects"]').textContent = t.nav_projects;
  document.querySelector('.nav-links a[href="#contact"]').textContent = t.nav_contact;
  
  // Update Mobile Menu
  document.querySelectorAll('.mobile-menu a')[0].textContent = t.nav_about;
  document.querySelectorAll('.mobile-menu a')[1].textContent = t.nav_skills;
  document.querySelectorAll('.mobile-menu a')[2].textContent = t.nav_experience;
  document.querySelectorAll('.mobile-menu a')[3].textContent = t.nav_education;
  document.querySelectorAll('.mobile-menu a')[4].textContent = t.nav_certs;
  document.querySelectorAll('.mobile-menu a')[5].textContent = t.nav_projects;
  document.querySelectorAll('.mobile-menu a')[6].textContent = t.nav_contact;
  
  // Update Hero
  document.querySelector('.hero-tag').textContent = t.hero_tag;
  document.querySelector('.hero-subtitle').textContent = t.hero_subtitle;
  document.querySelector('.hero-desc').textContent = t.hero_desc;
  document.querySelector('.hero-actions .btn-primary').textContent = t.hero_btn_projects;
  document.querySelector('.hero-actions .btn-outline').textContent = t.hero_btn_hire;
  
  // Update CV Buttons
  document.querySelectorAll('.btn-cv')[0].innerHTML = '<i class="fas fa-file-pdf"></i> ' + t.cv_en;
  document.querySelectorAll('.btn-cv')[1].innerHTML = '<i class="fas fa-file-pdf"></i> ' + t.cv_id;
  
  // Update About
  document.querySelector('.section-number').textContent = t.about_number;
  document.querySelector('.section-title').textContent = t.about_title;
  document.querySelectorAll('.about-text p')[0].innerHTML = t.about_text1;
  document.querySelectorAll('.about-text p')[1].textContent = t.about_text2;
  document.querySelectorAll('.about-text p')[2].innerHTML = t.about_text3;
  
  // Update About Highlights
  document.querySelectorAll('.highlight-text strong')[0].textContent = t.about_highlight1_title;
  document.querySelectorAll('.highlight-text span')[0].textContent = t.about_highlight1_desc;
  document.querySelectorAll('.highlight-text strong')[1].textContent = t.about_highlight2_title;
  document.querySelectorAll('.highlight-text span')[1].textContent = t.about_highlight2_desc;
  document.querySelectorAll('.highlight-text strong')[2].textContent = t.about_highlight3_title;
  document.querySelectorAll('.highlight-text span')[2].textContent = t.about_highlight3_desc;
  document.querySelectorAll('.highlight-text strong')[3].textContent = t.about_highlight4_title;
  document.querySelectorAll('.highlight-text span')[3].textContent = t.about_highlight4_desc;
  
  // Update Skills
  document.querySelectorAll('.section-header')[1].querySelector('.section-number').textContent = t.skills_number;
  document.querySelectorAll('.section-header')[1].querySelector('.section-title').textContent = t.skills_title;
  document.querySelectorAll('.skill-cat-name')[0].textContent = t.skills_mobile;
  document.querySelectorAll('.skill-cat-name')[1].textContent = t.skills_backend;
  document.querySelectorAll('.skill-cat-name')[2].textContent = t.skills_frontend;
  document.querySelectorAll('.skill-cat-name')[3].textContent = t.skills_tools;
  document.querySelectorAll('.skill-cat-name')[4].textContent = t.skills_system;
  document.querySelectorAll('.skill-cat-name')[5].textContent = t.skills_soft;
  
  // Update Experience
  document.querySelectorAll('.section-header')[2].querySelector('.section-number').textContent = t.exp_number;
  document.querySelectorAll('.section-header')[2].querySelector('.section-title').textContent = t.exp_title;
  
  // Update Education
  document.querySelectorAll('.section-header')[3].querySelector('.section-number').textContent = t.edu_number;
  document.querySelectorAll('.section-header')[3].querySelector('.section-title').textContent = t.edu_title;
  
  // Update Certifications
  document.querySelectorAll('.section-header')[4].querySelector('.section-number').textContent = t.cert_number;
  document.querySelectorAll('.section-header')[4].querySelector('.section-title').textContent = t.cert_title;
  
  // Update Projects
  document.querySelectorAll('.section-header')[5].querySelector('.section-number').textContent = t.proj_number;
  document.querySelectorAll('.section-header')[5].querySelector('.section-title').textContent = t.proj_title;
  document.querySelectorAll('.filter-btn')[0].textContent = t.proj_all;
  document.querySelectorAll('.filter-btn')[1].textContent = t.proj_web;
  document.querySelectorAll('.filter-btn')[2].textContent = t.proj_android;
  
  // Update Contact
  document.querySelectorAll('.section-header')[6].querySelector('.section-number').textContent = t.contact_number;
  document.querySelectorAll('.section-header')[6].querySelector('.section-title').textContent = t.contact_title;
  document.querySelector('.contact-info p').textContent = t.contact_desc;
  
  // Update Footer
  document.querySelector('.footer-text').textContent = t.footer_text;
}

// ==================== CERTIFICATE MODAL ====================
function openCertModal(filename, title, filepath) {
  const modal = document.getElementById('certModal');
  const titleEl = document.getElementById('certModalTitle');
  const imageEl = document.getElementById('certModalImage');
  const pdfEl = document.getElementById('certModalPdf');
  const downloadEl = document.getElementById('certModalDownload');
  
  // Set title
  titleEl.textContent = title || 'Certificate';
  
  // Check file extension
  const ext = filename.split('.').pop().toLowerCase();
  const isPdf = ext === 'pdf';
  
  // Show/hide elements
  if (isPdf) {
    imageEl.style.display = 'none';
    pdfEl.style.display = 'block';
    pdfEl.src = filepath;
  } else {
    imageEl.style.display = 'block';
    pdfEl.style.display = 'none';
    pdfEl.src = '';
    imageEl.src = filepath;
    imageEl.alt = title || 'Certificate';
  }
  
  // Set download link
  downloadEl.href = filepath;
  downloadEl.download = filename;
  
  // Show modal
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  
  // Reset iframe
  const pdfEl = document.getElementById('certModalPdf');
  pdfEl.src = '';
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('certModal');
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeCertModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeCertModal();
    }
  });
});

// ==================== INITIALIZE LANGUAGE ====================
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    currentLang = savedLang;
    document.getElementById('langLabel').textContent = currentLang.toUpperCase();
    updateLanguage(currentLang);
  }
});

// ==================== LANGUAGE TOGGLE EVENT ====================
document.getElementById('langToggle').addEventListener('click', toggleLanguage);

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