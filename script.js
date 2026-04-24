// --- Mobile Navigation ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  if (navLinks.classList.contains('active')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  });
});

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Typewriter Effect ---
const typewriterElement = document.getElementById('typewriter');
const words = ['Computer Science Undergraduate', 'Backend Developer', 'System Architect', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    // Remove char
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; // Delete faster
  } else {
    // Add char
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  // If word is completely typed
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at the end
  } 
  // If word is completely deleted
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500; // Pause before typing new word
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect after a short delay
setTimeout(typeWriter, 1000);

// --- Scroll Animation (Intersection Observer) ---
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserverOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once it's visible
    }
  });
}, fadeObserverOptions);

fadeElements.forEach(element => {
  fadeObserver.observe(element);
});

// --- Update Copyright Year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').substring(1) === current) {
      item.classList.add('active');
    }
  });
});
