// ==========================================
// PORTFOLIO JAVASCRIPT
// ==========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // DARK MODE TOGGLE
    // ==========================================
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('dark', currentTheme === 'dark');
    
    function toggleTheme() {
        html.classList.toggle('dark');
        const newTheme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    }
    
    themeToggle?.addEventListener('click', toggleTheme);
    themeToggleMobile?.addEventListener('click', toggleTheme);
    
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuButton?.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Animate icon
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    
    // ==========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ==========================================
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
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
    
    
    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in-up elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    
    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    
    const contactForm = document.getElementById('contact-form');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:amrinakhan40@gmail.com?subject=${subject}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you! Your message has been prepared. Please send it from your email client.', 'success');
        
        // Reset form
        contactForm.reset();
    });
    
    
    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        // Set color based on type
        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-blue-500', 'text-white');
        }
        
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <p class="font-medium">${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    
    // ==========================================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ==========================================
    
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
    
    
    // ==========================================
    // DYNAMIC YEAR IN FOOTER
    // ==========================================
    
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    
    // ==========================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ==========================================
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('home');
        
        if (heroSection && scrolled < window.innerHeight) {
            const parallaxElements = heroSection.querySelectorAll('.animate-blob');
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
    
    
    // ==========================================
    // SKILL CARDS STAGGER ANIMATION
    // ==========================================
    
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        skillObserver.observe(card);
    });
    
    
    // ==========================================
    // PROJECT CARDS HOVER EFFECT
    // ==========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    
    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    animateCounter(target, 0, number, 2000, hasPlus, hasPercent);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element, start, end, duration, hasPlus, hasPercent) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            
            element.textContent = displayValue;
        }, 16);
    }
    
    
    // ==========================================
    // TESTIMONIAL CARDS ANIMATION
    // ==========================================
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    
    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ==========================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    
    // ==========================================
    // PREVENT FORM RESUBMISSION
    // ==========================================
    
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    
    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
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
    
    
    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    
    console.log('%c👋 Welcome to Amrina Altaf\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for a talented developer? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c📧 amrinakhan40@gmail.com', 'color: #06b6d4; font-size: 12px;');
    
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
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

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
