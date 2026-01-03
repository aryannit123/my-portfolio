// Portfolio JavaScript - Interactive Features and Animations

// Navigation functionality
class PortfolioNavigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.initializeNavigation();
        this.handleScrollEffects();
    }

    initializeNavigation() {
        // Mobile hamburger menu
        this.hamburger?.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu
                    this.navMenu.classList.remove('active');
                    this.hamburger.classList.remove('active');
                    
                    // Update active link
                    this.updateActiveLink(link);
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
            }
        });
    }

    handleScrollEffects() {
        window.addEventListener('scroll', () => {
            // Navbar scroll effect
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Update active navigation based on scroll position
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// Portfolio Projects Filter
class ProjectsFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.initializeFilter();
    }

    initializeFilter() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active filter button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                this.filterProjects(filter);
            });
        });
    }

    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.initializeSkillsObserver();
    }

    initializeSkillsObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                }
            });
        }, this.observerOptions);

        this.skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    animateSkill(skillBar) {
        const width = skillBar.style.width;
        skillBar.style.width = '0%';
        
        setTimeout(() => {
            skillBar.style.width = width;
        }, 200);
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.initializeForm();
    }

    initializeForm() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }
    }

    handleFormSubmission() {
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form data
        if (this.validateForm(data)) {
            this.sendMessage(data);
        }
    }

    validateForm(data) {
        const errors = [];

        if (!data.name.trim()) errors.push('Name is required');
        if (!data.email.trim()) errors.push('Email is required');
        if (!this.isValidEmail(data.email)) errors.push('Valid email is required');
        if (!data.subject.trim()) errors.push('Subject is required');
        if (!data.message.trim()) errors.push('Message is required');

        if (errors.length > 0) {
            this.showNotification(errors.join(', '), 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async sendMessage(data) {
        try {
            // Show loading state
            this.showNotification('Sending message...', 'info');
            
            // Get form action URL (Formspree endpoint)
            const formAction = this.form.getAttribute('action');
            
            // Send form data to Formspree
            const response = await fetch(formAction, {
                method: 'POST',
                body: new FormData(this.form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.form.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to send message. Please try again.', 'error');
        }
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type]}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.initializeScrollAnimations();
    }

    initializeScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(`
            .about-content,
            .skill-category,
            .achievement-card,
            .profile-card,
            .cert-item,
            .project-card,
            .contact-item,
            .stat-card
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
}

// Demo Button Handlers
class DemoHandlers {
    constructor() {
        this.initializeDemoButtons();
    }

    initializeDemoButtons() {
        // Hero demo button
        const heroDemoBtn = document.getElementById('demo-btn');
        if (heroDemoBtn) {
            heroDemoBtn.addEventListener('click', () => {
                this.showDemoModal();
            });
        }

        // Footer demo button
        const footerDemoBtn = document.getElementById('footer-demo');
        if (footerDemoBtn) {
            footerDemoBtn.addEventListener('click', () => {
                this.scrollToProjects();
            });
        }
    }

    showDemoModal() {
        const modal = document.createElement('div');
        modal.className = 'demo-modal-overlay';
        modal.innerHTML = `
            <div class="demo-modal">
                <div class="demo-modal-header">
                    <h3>Portfolio Demo</h3>
                    <button class="close-demo-modal">&times;</button>
                </div>
                <div class="demo-modal-content">
                    <div class="demo-features">
                        <div class="demo-feature">
                            <i class="fas fa-mobile-alt"></i>
                            <h4>Responsive Design</h4>
                            <p>Fully responsive layout that works on all devices</p>
                        </div>
                        <div class="demo-feature">
                            <i class="fas fa-rocket"></i>
                            <h4>Smooth Animations</h4>
                            <p>Engaging scroll animations and transitions</p>
                        </div>
                        <div class="demo-feature">
                            <i class="fas fa-code"></i>
                            <h4>Clean Code</h4>
                            <p>Well-structured HTML, CSS, and JavaScript</p>
                        </div>
                        <div class="demo-feature">
                            <i class="fas fa-search"></i>
                            <h4>SEO Optimized</h4>
                            <p>Search engine friendly structure and meta tags</p>
                        </div>
                    </div>
                    <div class="demo-actions">
                        <button class="btn btn-primary" onclick="document.querySelector('#projects').scrollIntoView({behavior: 'smooth'}); this.closest('.demo-modal-overlay').remove();">
                            View Projects
                        </button>
                        <button class="btn btn-outline" onclick="document.querySelector('#contact').scrollIntoView({behavior: 'smooth'}); this.closest('.demo-modal-overlay').remove();">
                            Get In Touch
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal handlers
        modal.querySelector('.close-demo-modal').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // Add modal styles
        this.addDemoModalStyles();
    }

    addDemoModalStyles() {
        if (document.getElementById('demo-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'demo-modal-styles';
        style.textContent = `
            .demo-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }

            .demo-modal {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                animation: slideInUp 0.3s ease;
            }

            .demo-modal-header {
                background: #f8fafc;
                padding: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .demo-modal-header h3 {
                margin: 0;
                color: #1f2937;
            }

            .close-demo-modal {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.15s ease;
            }

            .close-demo-modal:hover {
                background: #f3f4f6;
                color: #374151;
            }

            .demo-modal-content {
                padding: 2rem;
            }

            .demo-features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .demo-feature {
                text-align: center;
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
            }

            .demo-feature i {
                font-size: 2rem;
                color: #3b82f6;
                margin-bottom: 1rem;
            }

            .demo-feature h4 {
                margin: 0 0 0.5rem 0;
                color: #1f2937;
            }

            .demo-feature p {
                margin: 0;
                color: #6b7280;
                font-size: 0.875rem;
            }

            .demo-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    closeModal(modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 300);
    }

    scrollToProjects() {
        document.querySelector('#projects').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Typing Effect for Hero Section
class TypingEffect {
    constructor() {
        this.initializeTypingEffect();
    }

    initializeTypingEffect() {
        const taglineElement = document.querySelector('.hero-tagline');
        if (!taglineElement) return;

        const originalText = taglineElement.textContent;
        const typingTexts = [
            'Web Developer & Data Structures Expert',
            'Problem Solver & Code Enthusiast', 
            'Tech Innovator & Algorithm Master',
            'Full Stack Developer & Competitive Programmer'
        ];

        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        const typeText = () => {
            const currentText = typingTexts[currentTextIndex];
            
            if (isDeleting) {
                taglineElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                taglineElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
                typeSpeed = 500; // Pause before next text
            }

            setTimeout(typeText, typeSpeed);
        };

        // Start typing effect after a delay
        setTimeout(typeText, 2000);
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.initializeParallax();
    }

    initializeParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-background');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.initializeOptimizations();
    }

    initializeOptimizations() {
        // Throttle scroll events
        this.throttleScrollEvents();
        
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
    }

    throttleScrollEvents() {
        let ticking = false;
        
        const updateScrollElements = () => {
            // Update scroll-dependent elements
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        });
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadResources() {
        // Preload critical images
        const criticalImages = [
            'attached_assets/WhatsApp Image 2025-06-16 at 22.32.13_fdb4f6a9_1751122802972.jpg',
            'attached_assets/image_1751123393418.png',
            'attached_assets/image_1751123521523.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    new PortfolioNavigation();
    
    // Initialize projects filter
    new ProjectsFilter();
    
    // Initialize skills animation
    new SkillsAnimation();
    
    // Initialize contact form
    new ContactForm();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize demo handlers
    new DemoHandlers();
    
    // Initialize typing effect
    new TypingEffect();
    
    // Initialize parallax effect
    new ParallaxEffect();
    
    // Initialize performance optimizations
    new PerformanceOptimizer();
    
    console.log('Portfolio initialized successfully!');
});

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0;
        margin-left: auto;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.15s ease;
    }

    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Global utility functions
window.portfolioUtils = {
    // Smooth scroll to section
    scrollToSection: (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    // Copy text to clipboard
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        });
    },
    
    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
};

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});