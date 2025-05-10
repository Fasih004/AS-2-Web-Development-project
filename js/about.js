document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    const aboutSections = document.querySelectorAll('.about-section');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            aboutSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.add('active');
            
            // Scroll to the top of the section
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Animate Stats on Scroll
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const storySection = document.getElementById('story-section');
        if (!storySection.classList.contains('active')) return;
        
        const statsContainer = document.querySelector('.stats-container');
        if (!statsContainer) return;
        
        const containerPosition = statsContainer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (containerPosition < windowHeight - 100) {
            stats.forEach(stat => {
                const targetValue = parseInt(stat.getAttribute('data-count'));
                let currentValue = 0;
                const duration = 2000; // 2 seconds
                const increment = targetValue / (duration / 16); // 60fps
                
                const updateStat = () => {
                    currentValue += increment;
                    if (currentValue > targetValue) {
                        currentValue = targetValue;
                        clearInterval(interval);
                    }
                    stat.textContent = Math.floor(currentValue);
                };
                
                const interval = setInterval(updateStat, 16);
            });
            
            animated = true;
        }
    }
    
    // Check if stats are in view on scroll
    window.addEventListener('scroll', animateStats);
    
    // Check if stats are in view when story section becomes active
    navBtns.forEach(btn => {
        if (btn.getAttribute('data-section') === 'story') {
            btn.addEventListener('click', function() {
                // Reset animation flag when story section is clicked
                animated = false;
                // Check if stats should be animated
                setTimeout(animateStats, 500);
            });
        }
    });
    
    // Initialize sections based on URL hash or default to story
    function initializePage() {
        let activeSection = 'story';
        
        // Check for hash in URL
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            if (document.getElementById(hash + '-section')) {
                activeSection = hash;
            }
        }
        
        // Activate the appropriate section
        const activeBtn = document.querySelector(`.nav-btn[data-section="${activeSection}"]`);
        if (activeBtn) {
            activeBtn.click();
        }
        
        // Check if stats should be animated
        if (activeSection === 'story') {
            setTimeout(animateStats, 1000);
        }
    }
    
    // Initialize the page
    initializePage();
    
    // Update URL hash when changing sections
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            window.location.hash = section;
        });
    });
    
    // Image Gallery Lightbox (for Culture Gallery)
    const galleryImages = document.querySelectorAll('.gallery-image img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            // Create lightbox content
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            // Create image
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            // Append elements
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Add close functionality
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            display: block;
        }
        
        .lightbox-close {
            position: absolute;
            top: -30px;
            right: 0;
            font-size: 30px;
            color: #fff;
            background: none;
            border: none;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});