/* ===================================
   Le Brief du Lundi - Animations & Interactions
   =================================== */

// Custom Cursor (Desktop only)
(function() {
    // Check if device supports hover
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (cursor && cursorFollower) {
            let mouseX = 0;
            let mouseY = 0;
            let followerX = 0;
            let followerY = 0;
            
            // Update cursor position
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                // Direct cursor update
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            });
            
            // Smooth follower animation
            function animateFollower() {
                followerX += (mouseX - followerX) * 0.1;
                followerY += (mouseY - followerY) * 0.1;
                
                cursorFollower.style.left = followerX + 'px';
                cursorFollower.style.top = followerY + 'px';
                
                requestAnimationFrame(animateFollower);
            }
            animateFollower();

            // Mouse down/up effects
            document.addEventListener('mousedown', () => {
                cursor.style.transform = 'scale(0.8)';
            });

            document.addEventListener('mouseup', () => {
                cursor.style.transform = 'scale(1)';
            });

            // Hover effects
            const hoverElements = document.querySelectorAll('a, button, .touchable, .summary-card, .feature-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursorFollower.style.transform = 'scale(1.5)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
            
            // Hide cursor when leaving window
            document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
                cursorFollower.style.opacity = '0';
            });
            
            document.addEventListener('mouseenter', () => {
                cursor.style.opacity = '1';
                cursorFollower.style.opacity = '0.1';
            });
        }
    }
})();

// Parallax Effects
(function() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const heroBackground = heroSection.querySelector('::before');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection.style) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only enable parallax on desktop
    if (window.innerWidth > 1024) {
        window.addEventListener('scroll', requestTick);
    }
})();

// Smooth Reveal Animations
(function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add smooth reveal to elements
    const revealElements = document.querySelectorAll('.main-content, .info-card, .tool-feature, .use-case');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
})();

// Number Counter Animation
(function() {
    const animateValue = (element, start, end, duration) => {
        const startTimestamp = Date.now();
        const step = (timestamp) => {
            const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Example: Animate any numbers in the page
    const numberElements = document.querySelectorAll('[data-count]');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const endValue = parseInt(entry.target.getAttribute('data-count'));
                animateValue(entry.target, 0, endValue, 2000);
            }
        });
    });
    
    numberElements.forEach(el => {
        numberObserver.observe(el);
    });
})();

// Magnetic Buttons Effect
(function() {
    const magneticButtons = document.querySelectorAll('.cta-button, .exercise-button');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
})();

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to hero title on load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const fx = new TextScramble(heroTitle);
        const originalText = heroTitle.innerText;
        heroTitle.innerText = '';
        
        setTimeout(() => {
            fx.setText(originalText);
        }, 500);
    }
});

// Smooth Section Transitions
(function() {
    let lastScrollPosition = 0;
    const sections = document.querySelectorAll('.content-section');
    
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;
        const scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                section.setAttribute('data-scroll-direction', scrollDirection);
            }
        });
        
        lastScrollPosition = currentScrollPosition;
    });
})();

// Interactive Emoji Animations
(function() {
    const emojis = document.querySelectorAll('.card-emoji, .content-emoji, .feature-icon');
    
    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
})();

// Ripple Effect on Click
(function() {
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles dynamically
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add ripple to buttons
    const rippleElements = document.querySelectorAll('button, .touchable');
    rippleElements.forEach(el => {
        el.addEventListener('click', createRipple);
    });
})();

// Performance Monitor (Development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const perfMonitor = document.createElement('div');
    perfMonitor.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.8);
        color: #00ff00;
        padding: 10px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        border-radius: 5px;
        pointer-events: none;
    `;
    
    let fps = 0;
    let lastTime = performance.now();
    let frames = 0;
    
    function updatePerf() {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
            
            perfMonitor.textContent = `FPS: ${fps}`;
        }
        
        requestAnimationFrame(updatePerf);
    }
    
    document.body.appendChild(perfMonitor);
    requestAnimationFrame(updatePerf);
}