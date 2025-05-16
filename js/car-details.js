// Car Details Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tabs functionality for specifications section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                const tabId = this.getAttribute('data-tab');
                this.classList.add('active');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.car-hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.4;
            heroSection.style.backgroundPosition = `center ${translateY}px`;
        });
    }
    
    // Enhanced gallery viewer
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        // Create modal elements
        const modalContainer = document.createElement('div');
        modalContainer.className = 'gallery-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const modalImage = document.createElement('img');
        modalImage.className = 'modal-image';
        
        const closeButton = document.createElement('span');
        closeButton.className = 'close-modal';
        closeButton.innerHTML = '&times;';
        
        const prevButton = document.createElement('span');
        prevButton.className = 'nav-button prev';
        prevButton.innerHTML = '&#10094;';
        
        const nextButton = document.createElement('span');
        nextButton.className = 'nav-button next';
        nextButton.innerHTML = '&#10095;';
        
        // Append elements to DOM
        modalContent.appendChild(modalImage);
        modalContent.appendChild(closeButton);
        modalContent.appendChild(prevButton);
        modalContent.appendChild(nextButton);
        modalContainer.appendChild(modalContent);
        document.body.appendChild(modalContainer);
        
        // Add CSS for modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .gallery-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .modal-image {
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
            }
            
            .close-modal {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 35px;
                font-weight: bold;
                cursor: pointer;
                z-index: 1002;
            }
            
            .nav-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                font-size: 35px;
                font-weight: bold;
                cursor: pointer;
                padding: 15px;
                z-index: 1002;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .nav-button.prev {
                left: 20px;
            }
            
            .nav-button.next {
                right: 20px;
            }

            .gallery-modal.active {
                display: flex;
                animation: fadeIn 0.3s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Variables to track current image
        let currentImageIndex = 0;
        const imageSources = Array.from(galleryItems).map(img => img.src);
        
        // Open modal when clicking on a gallery image
        galleryItems.forEach((img, index) => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                currentImageIndex = index;
                modalImage.src = this.src;
                modalContainer.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal
        closeButton.addEventListener('click', function() {
            modalContainer.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        // Navigation buttons
        prevButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
            modalImage.src = imageSources[currentImageIndex];
        });
        
        nextButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % imageSources.length;
            modalImage.src = imageSources[currentImageIndex];
        });
        
        // Close on click outside of image
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!modalContainer.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                modalContainer.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
                modalImage.src = imageSources[currentImageIndex];
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % imageSources.length;
                modalImage.src = imageSources[currentImageIndex];
            }
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation when elements come into view
    const animateElements = document.querySelectorAll('.feature-item, .gallery-item, .related-model-card, .category-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
        
        // Add CSS for animations
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(animationStyle);
    }
});