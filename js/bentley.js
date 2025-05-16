// Bentley Continental GT Detail Page - Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add Bentley-specific background styling to hero section
    const carHero = document.querySelector('.car-hero');
    if (carHero) {
        // Set background image if not already set in CSS
        if (!carHero.style.backgroundImage) {
            carHero.style.backgroundImage = 'url("../images/car-deatails/bently.jpg")';
            carHero.style.backgroundSize = 'cover';
            carHero.style.backgroundPosition = 'center'; 
        }
    } 

    // Bentley Rotating Display Functionality
    const displayButtons = document.querySelectorAll('.display-btn');
    const displayViews = document.querySelectorAll('.display-view');

    if (displayButtons.length > 0 && displayViews.length > 0) {
        displayButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and views
                displayButtons.forEach(btn => btn.classList.remove('active'));
                displayViews.forEach(view => view.classList.remove('active'));
                
                // Add active class to clicked button and corresponding view
                const displayType = this.getAttribute('data-display');
                this.classList.add('active');
                
                // Find and activate the corresponding view
                const activeView = document.querySelector(`.display-view.${displayType}`);
                if (activeView) {
                    activeView.classList.add('active');
                }
            });
        });

        // Add automatic rotation for demonstration (optional)
        let currentDisplayIndex = 0;
        const displayTypes = ['veneer', 'digital', 'analog'];
        
        // Make sure at least one view is active initially
        if (!document.querySelector('.display-view.active')) {
            document.querySelector('.display-view.veneer').classList.add('active');
            document.querySelector('.display-btn[data-display="veneer"]').classList.add('active');
        }
        
        // Function to rotate the display
        function rotateDisplay() {
            // Remove active class from all buttons and views
            displayButtons.forEach(btn => btn.classList.remove('active'));
            displayViews.forEach(view => view.classList.remove('active'));
            
            // Activate the current display type
            const currentType = displayTypes[currentDisplayIndex];
            const currentButton = document.querySelector(`.display-btn[data-display="${currentType}"]`);
            const currentView = document.querySelector(`.display-view.${currentType}`);
            
            if (currentButton && currentView) {
                currentButton.classList.add('active');
                currentView.classList.add('active');
            }
            
            // Increment index for next rotation
            currentDisplayIndex = (currentDisplayIndex + 1) % displayTypes.length;
        }
        
        // Auto-rotate the display every 5 seconds if user hasn't interacted
        let rotationInterval = setInterval(rotateDisplay, 5000);
        
        // Stop auto-rotation when user interacts with display buttons
        displayButtons.forEach(button => {
            button.addEventListener('click', function() {
                clearInterval(rotationInterval);
                
                // Reset the rotation after 30 seconds of inactivity
                setTimeout(() => {
                    rotationInterval = setInterval(rotateDisplay, 5000);
                }, 30000);
            });
        });
    }

    // Add elegant hover effects for Mulliner features
    const mullinerFeatures = document.querySelectorAll('.mulliner-feature');
    
    if (mullinerFeatures.length > 0) {
        mullinerFeatures.forEach(feature => {
            feature.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            feature.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    // Create parallax effect for craftsmanship section
    const craftsmanshipSection = document.querySelector('.craftsmanship-section');
    const craftsmanshipImage = document.querySelector('.craftsmanship-image img');
    
    if (craftsmanshipSection && craftsmanshipImage) {
        window.addEventListener('scroll', function() {
            const sectionTop = craftsmanshipSection.getBoundingClientRect().top;
            const sectionHeight = craftsmanshipSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Only apply effect when section is in view
            if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
                const scrollPosition = sectionTop / windowHeight;
                const translateY = scrollPosition * 30; // Adjust multiplier for effect intensity
                
                craftsmanshipImage.style.transform = `translateY(${translateY}px)`;
            }
        });
    }

    // Add subtle animation to stats
    const statValue = document.querySelector('.stat-value');
    
    if (statValue) {
        // Create IntersectionObserver to animate when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(statValue, 0, parseInt(statValue.textContent.replace(/,/g, '')), 2000);
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(statValue);
        
        // Function to animate counting up
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                let value = Math.floor(progress * (end - start) + start);
                obj.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }
    
    // Enhance the gallery with a fade effect on hover
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Dim all other items
                galleryItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0.6';
                        otherItem.style.transition = 'opacity 0.3s ease';
                    }
                });
            });
            
            item.addEventListener('mouseleave', function() {
                // Restore opacity to all items
                galleryItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                });
            });
        });
    }
    
    // Add smooth reveal for pricing features
    const pricingFeatures = document.querySelectorAll('.pricing-features li');
    
    if (pricingFeatures.length > 0) {
        // Initially hide all features
        pricingFeatures.forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            feature.style.transitionDelay = `${index * 100}ms`;
        });
        
        // Create IntersectionObserver to reveal when in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                pricingFeatures.forEach(feature => {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateY(0)';
                });
                observer.unobserve(entries[0].target);
            }
        }, {
            threshold: 0.2
        });
        
        // Observe the pricing box
        const pricingBox = document.querySelector('.pricing-box');
        if (pricingBox) {
            observer.observe(pricingBox);
        }
    }
    
    // Add elegance to the header on scroll
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                header.style.padding = '10px 0';
            } else {
                header.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
                header.style.boxShadow = 'none';
                header.style.padding = '20px 0';
            }
        });
    }
    
    // Add a subtle hover effect for related model cards
    const modelCards = document.querySelectorAll('.related-model-card');
    
    if (modelCards.length > 0) {
        modelCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Enhance CTA buttons with hover animation
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    if (ctaButtons.length > 0) {
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
                if (this.classList.contains('primary-cta')) {
                    this.style.boxShadow = '0 5px 15px rgba(0, 63, 45, 0.3)';
                } else {
                    this.style.boxShadow = '0 5px 15px rgba(201, 169, 89, 0.3)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
        });
    }
});

