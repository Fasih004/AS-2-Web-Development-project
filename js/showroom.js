// showroom.js
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Animation for car cards
    const animateCarCards = function() {
        const carCards = document.querySelectorAll('.car-card');
        
        carCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                card.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateCarCards();
    
    // Check on scroll
    window.addEventListener('scroll', animateCarCards);
}); 