// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation menu for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.car-card, .footer-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                if (element.classList.contains('car-card')) {
                    element.classList.add('fade-in');
                } else if (element.classList.contains('footer-section')) {
                    element.classList.add('slide-in-right');
                }
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && !event.target.closest('.main-nav')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking a link
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Showroom functionality - Filter cars by category
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and add to clicked button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide cars based on category
                carCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // 3D tilt effect for car cards
    const cards = document.querySelectorAll('.car-card.car-3d-container');
    
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardRect = card.getBoundingClientRect();
                const cardWidth = cardRect.width;
                const cardHeight = cardRect.height;
                const centerX = cardRect.left + cardWidth / 2;
                const centerY = cardRect.top + cardHeight / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                const rotateX = (-mouseY / (cardHeight / 2)) * 10;
                const rotateY = (mouseX / (cardWidth / 2)) * 10;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
    
    // Pagination functionality
    const pageNumbers = document.querySelectorAll('.page-number');
    
    if (pageNumbers.length > 0) {
        pageNumbers.forEach(number => {
            number.addEventListener('click', function() {
                // Remove active class from all page numbers
                pageNumbers.forEach(num => num.classList.remove('active'));
                
                // Add active class to clicked page number
                this.classList.add('active');
                
                // In a real application, this would load the next page of cars
                // For this demo, we'll just scroll to the top of the grid
                document.querySelector('.showroom-grid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }
});