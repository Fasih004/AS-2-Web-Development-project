// index.js
document.addEventListener('DOMContentLoaded', function() {
    // Add hero content animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 500);
    }
     
    // Animation for featured cars
    const animateFeaturedCars = function() {
        const featuredCars = document.querySelectorAll('.featured-car');
        
        featuredCars.forEach(car => {
            const carPosition = car.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (carPosition < windowHeight - 100) { 
                car.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateFeaturedCars();
    
    // Check on scroll
    window.addEventListener('scroll', animateFeaturedCars);
    
    // Animation for about section
    const animateAboutContent = function() {
        const aboutContent = document.querySelector('.about-content');
        
        if (aboutContent) {
            const contentPosition = aboutContent.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (contentPosition < windowHeight - 100) {
                aboutContent.classList.add('slide-up');
            }
        }
    };
    
    // Initial check
    animateAboutContent();
    
    // Check on scroll
    window.addEventListener('scroll', animateAboutContent);
});