/* ===================================
   Le Brief du Lundi - JavaScript Principal
   =================================== */

// DOM Ready function
function domReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

// Initialize everything when DOM is ready
domReady(function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Initialize theme
    initializeTheme();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize hero intro
    initializeHeroIntro();
    
    // Initialize features carousel
    initializeFeaturesCarousel();
    
    // Initialize scroll events
    initializeScrollEvents();
    
    // Initialize intersection observer
    initializeIntersectionObserver();
    
    // Initialize touch events
    initializeTouchEvents();
    
    // Initialize vibration feedback
    initializeVibrationFeedback();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

window.toggleTheme = function() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    
    try {
        localStorage.setItem('theme', newTheme);
    } catch(e) {
        console.warn('LocalStorage not available');
    }
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
}

window.closeMenu = function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle) menuToggle.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Hero Intro Toggle
function initializeHeroIntro() {
    const heroIntro = document.getElementById('heroIntro');
    const readMoreBtn = document.querySelector('.read-more');
    if (heroIntro) {
        heroIntro.classList.remove('expanded');
        if (readMoreBtn) {
            readMoreBtn.textContent = 'Lire plus';
        }
    }
}

window.toggleIntro = function(event) {
    const intro = document.getElementById('heroIntro');
    const button = event.target;
    if (intro && button) {
        intro.classList.toggle('expanded');
        button.textContent = intro.classList.contains('expanded') ? 'Lire moins' : 'Lire plus';
    }
}

// Features Carousel
let currentSlide = 0;

function initializeFeaturesCarousel() {
    const featuresWrapper = document.getElementById('featuresWrapper');
    if (!featuresWrapper) return;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    // Touch events
    featuresWrapper.addEventListener('touchstart', (e) => {
        if (window.innerWidth >= 768) return;
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    featuresWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging || window.innerWidth >= 768) return;
        currentX = e.touches[0].clientX;
    });

    featuresWrapper.addEventListener('touchend', () => {
        if (!isDragging || window.innerWidth >= 768) return;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < 3) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
            }
            updateCarousel();
        }
        isDragging = false;
    });
}

window.goToSlide = function(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    if (window.innerWidth >= 768) return;
    
    const wrapper = document.getElementById('featuresWrapper');
    const dotsElements = document.querySelectorAll('.dot');
    
    if (wrapper) {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    dotsElements.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Summary Cards
window.toggleCard = function(card) {
    if (!card) return;
    // Toggle only the clicked card
    card.classList.toggle('active');
}

window.goToSection = function(sectionId) {
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}

// Exercise Modals
let currentExerciseModal = null;

window.openExercise = function(event) {
    const section = event.target.closest('.content-section');
    const modal = section ? section.querySelector('.exercise-modal') : null;
    const overlay = document.querySelector('.modal-overlay');
    
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
        currentExerciseModal = modal;
        document.body.style.overflow = 'hidden';
    }
}

window.closeExercise = function() {
    if (currentExerciseModal) {
        currentExerciseModal.classList.remove('active');
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        currentExerciseModal = null;
    }
}

// Scroll Functions
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progressBar = document.getElementById('progressBar');
    if (progressBar && scrollHeight > 0) {
        const progress = (scrollPosition / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    }
}

// Scroll Events
function initializeScrollEvents() {
    let scrollTimeout;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        updateProgressBar();
        
        // Header scroll effect
        const currentScroll = window.scrollY;
        if (header && currentScroll > 50) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Hide floating buttons on scroll
        clearTimeout(scrollTimeout);
        const themeToggle = document.querySelector('.theme-toggle');
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (themeToggle) themeToggle.style.transform = 'translateX(100px)';
        if (backToTopBtn) backToTopBtn.style.transform = 'translateX(100px)';
        
        scrollTimeout = setTimeout(() => {
            if (themeToggle) themeToggle.style.transform = '';
            if (backToTopBtn) backToTopBtn.style.transform = '';
        }, 1000);
    });
}

// Intersection Observer for content sections
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Touch Events
function initializeTouchEvents() {
    // Prevent pull-to-refresh on iOS
    let lastY = 0;
    document.addEventListener('touchstart', (e) => {
        lastY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        const y = e.touches[0].clientY;
        const scrollTop = window.scrollY;
        
        if (scrollTop === 0 && y > lastY) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Vibration Feedback
function initializeVibrationFeedback() {
    function vibrate() {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }

    // Add vibration to buttons
    document.querySelectorAll('button, .touchable').forEach(element => {
        element.addEventListener('click', vibrate);
    });
}

// Resize Handler
window.addEventListener('resize', () => {
    const wrapper = document.getElementById('featuresWrapper');
    if (wrapper) {
        if (window.innerWidth >= 768) {
            wrapper.style.transform = '';
        } else {
            updateCarousel();
        }
    }
});

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Global error handler
window.addEventListener('error', (e) => {
    console.warn('An error occurred:', e.message);
    e.preventDefault();
    return true;
});