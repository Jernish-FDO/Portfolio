// ===== MODERN PORTFOLIO JAVASCRIPT =====
// Professional portfolio with advanced animations and interactions

class PortfolioApp {
    constructor() {
        this.isLoading = true;
        this.currentSection = 'home';
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handleLoading();
        this.applyTheme();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        // Navigation events
        this.setupNavigation();
        
        // Theme toggle
        this.setupThemeToggle();
        
        // Scroll events
        this.setupScrollEvents();
        
        // Form handling
        this.setupContactForm();
        
        // Project filtering
        this.setupProjectFiltering();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Back to top button
        this.setupBackToTop();
        
        // Intersection Observer for animations
        this.setupScrollAnimations();
        
        // Skills animation
        this.setupSkillsAnimation();
        
        // Typing effect
        this.setupTypingEffect();
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Window resize events
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initializeComponents() {
        // Initialize any components that need setup
        this.initializeSkillBars();
        this.initializeProjectCards();
    }

    // ===== LOADING SCREEN =====
    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const minLoadingTime = 2000; // Minimum 2 seconds for branding effect
        
        const startTime = Date.now();
        
        const hideLoading = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                this.isLoading = false;
                
                // Trigger entrance animations
                this.triggerEntranceAnimations();
                
                // Remove loading screen after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, remainingTime);
        };

        // Hide loading screen when everything is ready
        if (document.readyState === 'complete') {
            hideLoading();
        } else {
            window.addEventListener('load', hideLoading);
        }
    }

    triggerEntranceAnimations() {
        // Add entrance animations class to body
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        this.animateHeroElements();
    }

    animateHeroElements() {
        const heroElements = [
            '.hero-greeting',
            '.hero-title',
            '.hero-subtitle',
            '.hero-description',
            '.hero-stats',
            '.hero-buttons',
            '.social-links'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // ===== THEME TOGGLE =====
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.applyTheme();
            localStorage.setItem('theme', this.theme);
            
            // Update icon with animation
            themeIcon.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeIcon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                themeIcon.style.transform = 'rotate(0deg)';
            }, 150);
        });
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Update active nav link based on scroll position
        const updateActiveNav = () => {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.id;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                    this.currentSection = sectionId;
                }
            });
        };
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initialize
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEvents() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateNavbarOnScroll();
                    this.updateBackToTopButton();
                    this.updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll);
    }

    updateNavbarOnScroll() {
        const navbar = document.getElementById('navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateBackToTopButton() {
        const backToTopBtn = document.getElementById('back-to-top');
        const scrollY = window.scrollY;
        
        if (scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (!scrollProgress) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for different elements
                    this.handleElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(`
            .section-header,
            .about-content > *,
            .skill-category,
            .project-card,
            .timeline-item,
            .contact-item,
            .contact-form
        `);

        animateElements.forEach(el => observer.observe(el));
    }

    handleElementAnimation(element) {
        // Skills animation
        if (element.classList.contains('skill-category')) {
            setTimeout(() => this.animateSkillBars(element), 500);
        }
        
        // Project cards stagger animation
        if (element.classList.contains('project-card')) {
            const cards = document.querySelectorAll('.project-card');
            const index = Array.from(cards).indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }
    }

    // ===== TYPING EFFECT =====
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        const cursor = document.querySelector('.cursor');
        
        if (!typingElement) return;
        
        const text = typingElement.getAttribute('data-text') || 'JERNISH';
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;
        
        let index = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentText = isDeleting ? text.substring(0, index--) : text.substring(0, index++);
            typingElement.textContent = currentText;
            
            let speed = isDeleting ? deletingSpeed : typingSpeed;
            
            if (!isDeleting && index === text.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                speed = typingSpeed;
            }
            
            setTimeout(type, speed);
        };
        
        // Start typing effect after loading
        setTimeout(type, 1000);
    }

    // ===== SKILLS ANIMATION =====
    setupSkillsAnimation() {
        this.skillsAnimated = false;
    }

    initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }

    animateSkillBars(category) {
        const skillBars = category.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width') || '0';
            
            setTimeout(() => {
                bar.style.width = `${width}%`;
                
                // Add number counting animation
                const percentage = bar.parentElement.parentElement.querySelector('.skill-percentage');
                if (percentage) {
                    this.animateCounter(percentage, parseInt(width));
                }
            }, index * 200);
        });
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = `${Math.floor(current)}%`;
        }, 30);
    }

    // ===== PROJECT FILTERING =====
    setupProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects with animation
                this.filterProjects(projectCards, filter);
            });
        });
    }

    filterProjects(cards, filter) {
        cards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    initializeProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateX(2deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
            });
            
            // Add click ripple effect
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===== CONTACT FORM =====
    setupContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = form.querySelector('.btn-submit');
        const inputs = form.querySelectorAll('input, textarea');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form, submitBtn);
        });
    }

    validateField(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        errorElement.textContent = '';
        field.classList.remove('error');
        
        // Validation rules
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Show error
        if (!isValid) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
        }
        
        return isValid;
    }

    handleFormSubmission(form, submitBtn) {
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please fix the errors before submitting', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            this.simulateFormSubmission(form, submitBtn);
        }, 2000);
    }

    simulateFormSubmission(form, submitBtn) {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        this.showNotification('Thank you! Your message has been sent successfully.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset labels
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-muted)';
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : '#3182ce'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(300px);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ===== UTILITY METHODS =====
    handleResize() {
        // Handle any resize-specific logic
        this.updateLayout();
    }

    updateLayout() {
        // Update layout calculations if needed
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
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
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== ADDITIONAL FEATURES =====

// Parallax effect for hero background
function setupParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    const orbs = heroBackground.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        orbs.forEach((orb, index) => {
            const speed = 0.2 + (index * 0.1);
            orb.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
        });
    });
}

// Mouse cursor effects
function setupCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(49, 130, 206, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    
    // Show cursor only on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX - 10}px`;
            cursor.style.top = `${e.clientY - 10}px`;
        });
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'radial-gradient(circle, rgba(56, 161, 105, 0.8) 0%, transparent 70%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(49, 130, 206, 0.8) 0%, transparent 70%)';
            });
        });
    }
}

// Add ripple animation CSS
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e53e3e;
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
        }
        
        .custom-cursor {
            mix-blend-mode: difference;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    const app = new PortfolioApp();
    
    // Initialize additional features
    setupParallax();
    setupCursorEffects();
    addRippleCSS();
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.warn('Portfolio Error:', e.error);
    });
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
        });
    }
    
    // Progressive Web App features
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Register service worker for offline functionality
            // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed'));
        });
    }
    
    // Add accessibility enhancements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});

// ===== EXPORT FOR MODULE SYSTEMS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
