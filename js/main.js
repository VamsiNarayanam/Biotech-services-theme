window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Fallback: Hide preloader if page takes too long
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
    }
}, 5000);

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  initDashboard();
  initDashboardLayout();
  initDashboardPages();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initSmoothScroll();
  initCounters();
  initTestimonials();
  initFAQ();
  initContactForm();
  initLoginForm();
  initRegisterForm();
  initScrollReveal();
  initPortfolioViewMore();
  initBlogViewMore();
});

function initDashboardLayout() {
  const sidebar = document.querySelector('.dashboard');
  if (!sidebar) return;
  const role = sessionStorage.getItem('userRole') || 'Patient';
  const sidebarLabel = document.querySelector('.dashboard__logo');
  if (sidebarLabel) sidebarLabel.textContent = role;
  document.querySelectorAll('.dashboard__nav-link[data-admin-only]').forEach(function(link) {
    link.style.display = role === 'Admin' ? '' : 'none';
  });
}

function initDashboard() {
  const headerTitle = document.querySelector('.dashboard__header h1');
  const headerSub = document.querySelector('.dashboard__header p');
  const statsContainer = document.querySelector('.dashboard__stats');
  const tableSection = document.querySelector('.dashboard__table-wrapper');
  if (!statsContainer) return;

  const role = sessionStorage.getItem('userRole') || 'Patient';
  const name = sessionStorage.getItem('userName') || 'User';
  const displayName = name || role;

  if (headerTitle) headerTitle.textContent = role + ' Dashboard';
  if (headerSub) headerSub.textContent = 'Welcome, ' + displayName + '! Here\'s your overview.';
  document.title = role + ' Dashboard - Biotechnology Services';

  const patientStats = '<div class="dashboard__stat-card"><h3 data-count="3" data-suffix="">0</h3><p>My Appointments</p></div><div class="dashboard__stat-card"><h3 data-count="5" data-suffix="">0</h3><p>Test Results</p></div><div class="dashboard__stat-card"><h3 data-count="2" data-suffix="">0</h3><p>Pending Reports</p></div><div class="dashboard__stat-card"><h3 data-count="1" data-suffix="">0</h3><p>Messages</p></div>';
  const researcherStats = '<div class="dashboard__stat-card"><h3 data-count="8" data-suffix="">0</h3><p>My Projects</p></div><div class="dashboard__stat-card"><h3 data-count="24" data-suffix="">0</h3><p>Samples</p></div><div class="dashboard__stat-card"><h3 data-count="12" data-suffix="">0</h3><p>Data Sets</p></div><div class="dashboard__stat-card"><h3 data-count="4" data-suffix="">0</h3><p>Pending Analyses</p></div>';
  const adminStats = '<div class="dashboard__stat-card"><h3 data-count="1234" data-suffix="+">0</h3><p>Total Users</p></div><div class="dashboard__stat-card"><h3 data-count="56" data-suffix="+">0</h3><p>New Orders</p></div><div class="dashboard__stat-card"><h3 data-prefix="$" data-count="12450" data-suffix="">0</h3><p>Revenue</p></div><div class="dashboard__stat-card"><h3 data-count="24" data-suffix="">0</h3><p>Unread Messages</p></div>';

  if (role === 'Patient') {
    statsContainer.innerHTML = patientStats;
    if (tableSection) {
      tableSection.querySelector('thead th').textContent = 'Recent Test Requests';
      const tbody = tableSection.querySelector('tbody');
      if (tbody) tbody.innerHTML = '<tr><td>Blood panel - Genomic</td><td>Mar 10, 2025</td><td><span class="badge badge--warning">Processing</span></td></tr><tr><td>DNA Sequencing</td><td>Mar 8, 2025</td><td>Completed</td></tr><tr><td>Diagnostic report</td><td>Mar 5, 2025</td><td>Completed</td></tr>';
    }
  } else if (role === 'Researcher') {
    statsContainer.innerHTML = researcherStats;
    if (tableSection) {
      tableSection.querySelector('thead th').textContent = 'Recent Project Activity';
      const tbody = tableSection.querySelector('tbody');
      if (tbody) tbody.innerHTML = '<tr><td>Sample batch #452</td><td>Mar 10, 2025</td><td><span class="badge badge--warning">Analysis</span></td></tr><tr><td>Genome assembly v2</td><td>Mar 9, 2025</td><td>Completed</td></tr><tr><td>New dataset uploaded</td><td>Mar 8, 2025</td><td>Completed</td></tr>';
    }
  } else {
    statsContainer.innerHTML = adminStats;
  }
}

function initDashboardPages() {
  const role = sessionStorage.getItem('userRole') || 'Patient';
  const name = sessionStorage.getItem('userName') || 'User';
  const displayName = name || role;
  const headerTitle = document.querySelector('.dashboard__header h1');
  const headerSub = document.querySelector('.dashboard__header p');
  const href = window.location.href || '';
  const page = href.includes('users') ? 'users' : href.includes('orders') ? 'orders' : href.includes('messages') ? 'messages' : href.includes('analytics') ? 'analytics' : '';

  if (!page || !headerTitle) return;

  if (page === 'users') {
    if (role !== 'Admin') {
      headerTitle.textContent = 'Access Restricted';
      if (headerSub) headerSub.textContent = 'User management is available to Administrators only.';
      const table = document.querySelector('.dashboard__table-wrapper');
      if (table) table.innerHTML = '<p style="color: var(--text-muted); padding: 2rem;">You do not have permission to view this page. <a href="dashboard.html">Return to Dashboard</a></p>';
    } else {
      if (headerSub) headerSub.textContent = 'Manage your users';
      document.title = 'Users - Admin - Biotechnology Services';
    }
  } else if (page === 'orders') {
    document.title = 'Orders - ' + role + ' - Biotechnology Services';
    if (headerSub) headerSub.textContent = role === 'Admin' ? 'View and manage all orders' : (role === 'Patient' ? 'Your test orders and requests' : 'Your lab orders and sample requests');
    const thead = document.querySelector('.dashboard__table-wrapper thead tr');
    const tbody = document.querySelector('.dashboard__table-wrapper tbody');
    if (thead && tbody) {
      if (role === 'Patient') {
        thead.innerHTML = '<th>Request ID</th><th>Test Type</th><th>Date</th><th>Status</th>';
        tbody.innerHTML = '<tr><td>#REQ-001</td><td>Blood panel - Genomic</td><td>Mar 10, 2025</td><td><span class="badge badge--warning">Processing</span></td></tr><tr><td>#REQ-002</td><td>DNA Sequencing</td><td>Mar 8, 2025</td><td><span class="badge badge--success">Completed</span></td></tr><tr><td>#REQ-003</td><td>Diagnostic report</td><td>Mar 5, 2025</td><td><span class="badge badge--success">Completed</span></td></tr>';
      } else if (role === 'Researcher') {
        thead.innerHTML = '<th>Order ID</th><th>Project / Samples</th><th>Status</th><th>Date</th>';
        tbody.innerHTML = '<tr><td>#LAB-452</td><td>Sample batch #452 - Genome sequencing</td><td><span class="badge badge--warning">Analysis</span></td><td>Mar 10, 2025</td></tr><tr><td>#LAB-451</td><td>Genome assembly v2</td><td><span class="badge badge--success">Completed</span></td><td>Mar 9, 2025</td></tr><tr><td>#LAB-450</td><td>Dataset upload - Bioinformatics</td><td><span class="badge badge--success">Completed</span></td><td>Mar 8, 2025</td></tr>';
      }
    }
  } else if (page === 'messages') {
    document.title = 'Messages - ' + role + ' - Biotechnology Services';
    if (headerSub) headerSub.textContent = role === 'Admin' ? 'Contact form submissions and inquiries' : 'Your messages and communications';
    const thead = document.querySelector('.dashboard__table-wrapper thead tr');
    const tbody = document.querySelector('.dashboard__table-wrapper tbody');
    if (thead && tbody && role !== 'Admin') {
      thead.innerHTML = '<th>From</th><th>Subject</th><th>Date</th><th>Status</th>';
      tbody.innerHTML = '<tr><td>support@biotech.com</td><td>Re: Your test results - REQ-002</td><td>Mar 9, 2025</td><td><span class="badge badge--muted">Read</span></td></tr><tr><td>lab@biotech.com</td><td>Appointment confirmation</td><td>Mar 8, 2025</td><td><span class="badge badge--muted">Read</span></td></tr>';
    }
  } else if (page === 'analytics') {
    if (role !== 'Admin') {
      headerTitle.textContent = role + ' Activity';
      if (headerSub) headerSub.textContent = 'Your usage and activity metrics';
      document.title = 'Activity - ' + role + ' - Biotechnology Services';
      const statsContainer = document.querySelector('.dashboard__stats');
      if (statsContainer) {
        if (role === 'Patient') {
          statsContainer.innerHTML = '<div class="dashboard__stat-card"><h3>5</h3><p>Tests Completed</p></div><div class="dashboard__stat-card"><h3>3</h3><p>Appointments</p></div><div class="dashboard__stat-card"><h3>2</h3><p>Reports Downloaded</p></div>';
        } else {
          statsContainer.innerHTML = '<div class="dashboard__stat-card"><h3>8</h3><p>Active Projects</p></div><div class="dashboard__stat-card"><h3>670</h3><p>Samples Processed</p></div><div class="dashboard__stat-card"><h3>12</h3><p>Data Sets</p></div>';
        }
      }
    } else {
      document.title = 'Analytics - Admin - Biotechnology Services';
    }
  }
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}



function initMobileMenu() {
  const toggle = document.querySelector('.navbar__mobile-toggle');
  const menu = document.querySelector('.navbar__menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  menu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', (e) => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : '');
  updateThemeIcon(toggle, savedTheme);

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(toggle, newTheme);
  });
}

function updateThemeIcon() {
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('h3[data-count]');
  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'), 10);
        animateCounter(counter, 0, target, 2000);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  const suffix = element.getAttribute('data-suffix') || '';
  const prefix = element.getAttribute('data-prefix') || '';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);
    element.textContent = prefix + current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  let currentIndex = 0;

  function showTestimonial(index) {
    currentIndex = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.classList.toggle('hidden', i !== currentIndex);
    });
  }

  showTestimonial(0);
  setInterval(() => showTestimonial(currentIndex + 1), 5000);
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    form.querySelectorAll('.form-group').forEach(group => {
      const input = group.querySelector('input, textarea');
      const errorMsg = group.querySelector('.error-message');
      if (!input) return;
      if (errorMsg) errorMsg.remove();

      const value = input.value.trim();
      const required = input.hasAttribute('required');

      if (required && !value) {
        isValid = false;
        showError(group, 'This field is required', input);
      } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        showError(group, 'Please enter a valid email address', input);
      } else {
        input.classList.remove('error');
      }
    });

    if (isValid) {
      form.reset();
      window.location.href = '404.html';
    }
  });
}

function showError(group, message, input) {
  input.classList.add('error');
  const errorEl = document.createElement('span');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  group.appendChild(errorEl);
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const msgEl = document.getElementById('authMessage');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const role = form.querySelector('select[name="role"]');
    const username = form.querySelector('input[name="username"]');
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    const roleVal = role ? role.value.trim() : '';
    const usernameVal = username ? username.value.trim() : '';
    const emailVal = email ? email.value.trim() : '';
    const passVal = password ? password.value.trim() : '';

    if (msgEl) {
      msgEl.hidden = false;
      msgEl.classList.remove('auth-message--success');
      msgEl.classList.add('auth-message--error');
    }

    if (!roleVal || !usernameVal || !emailVal || !passVal) {
      if (msgEl) msgEl.textContent = 'Please fill in all fields including role and username';
      return;
    }
    sessionStorage.setItem('userRole', roleVal);
    sessionStorage.setItem('userName', usernameVal);
    if (msgEl) {
      msgEl.hidden = false;
      msgEl.classList.remove('auth-message--error');
      msgEl.classList.add('auth-message--success');
      msgEl.textContent = 'Login successful! Redirecting to dashboard...';
    }
    setTimeout(function() {
      window.location.href = './dashboard.html';
    }, 800);
  });
}

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  const msgEl = document.getElementById('authMessage');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const role = form.querySelector('select[name="role"]');
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirmPassword"]');
    const roleVal = role ? role.value.trim() : '';
    const nameVal = name ? name.value.trim() : '';
    const emailVal = email ? email.value.trim() : '';
    const passVal = password ? password.value.trim() : '';
    const confirmVal = confirmPassword ? confirmPassword.value.trim() : '';

    if (msgEl) {
      msgEl.hidden = false;
      msgEl.classList.remove('auth-message--success');
      msgEl.classList.add('auth-message--error');
    }

    if (!roleVal || !nameVal || !emailVal || !passVal || !confirmVal) {
      if (msgEl) msgEl.textContent = 'Please fill in all fields including role';
      return;
    }

    if (passVal !== confirmVal) {
      if (msgEl) msgEl.textContent = 'Passwords do not match';
      return;
    }

    if (msgEl) {
      msgEl.hidden = false;
      msgEl.classList.remove('auth-message--error');
      msgEl.classList.add('auth-message--success');
      msgEl.textContent = '✓ Registration successful! Redirecting...';
    }
    setTimeout(function() {
      window.location.href = './404.html';
    }, 3000);
  });
}


function initPortfolioViewMore() {
  const btn = document.getElementById('portfolioViewMore');
  const moreCards = document.querySelectorAll('.portfolio-card--more');
  if (!btn || !moreCards.length) return;

  btn.addEventListener('click', function() {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    moreCards.forEach(function(card) {
      card.hidden = expanded;
    });
    btn.setAttribute('aria-expanded', !expanded);
    btn.textContent = expanded ? 'View More Projects' : 'Show Less';
  });
}

function initBlogViewMore() {
  const btn = document.getElementById('blogViewMore');
  const moreCards = document.querySelectorAll('.blog-card--more');
  if (!btn || !moreCards.length) return;

  btn.addEventListener('click', function() {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    moreCards.forEach(function(card) {
      card.hidden = expanded;
    });
    btn.setAttribute('aria-expanded', !expanded);
    btn.textContent = expanded ? 'View More Posts' : 'Show Less';
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.service-card, .blog-card, .portfolio-card, .pricing-card, .team__card, .process__step, .tech__item, .about__feature, .journey__item, .clients__item, .innovation-card, .testimonial-card, .stat-item, .section__header'
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 50);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
