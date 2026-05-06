const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a, button, .btn, .theme-toggle, .social-btn, .hamburger, .project-card, .skill-category').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// Scroll progress
window.addEventListener('scroll', () => {
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scroll-progress').style.width = (s / h * 100) + '%';
});

// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const html = document.documentElement;
  html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.add('open');
});
document.getElementById('mobile-close').addEventListener('click', closeMobileMenu);
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); }

// Typing effect
const phrases = [
  'Building scalable Django web apps...',
  'Designing clean REST APIs...',
  'Crafting pixel-perfect frontends...',
  'Turning ideas into products...',
];
let pi = 0, ci = 0, deleting = false;
const target = document.getElementById('typing-text');
function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    target.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 48);
  } else {
    target.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, 26);
  }
}
setTimeout(type, 1200);

// Particles
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (6 + Math.random() * 10) + 's';
  p.style.animationDelay = (Math.random() * 12) + 's';
  p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
  particleContainer.appendChild(p);
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Skill bar animation
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

// Contact form submit
document.getElementById('submit-btn').addEventListener('click', function() {
  this.textContent = '✓ Message Sent!';
  this.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  setTimeout(() => {
    this.textContent = 'Send Message →';
    this.style.background = '';
  }, 3000);
});

// Resume btn
document.getElementById('resume-btn').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Resume download would start here. Add your actual CV link!');
});