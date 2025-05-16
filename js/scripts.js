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
        const elements = document.querySelectorAll('.featured-car, .about-content, .footer-section, .car-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                if (element.classList.contains('featured-car')) {
                    element.classList.add('fade-in');
                } else if (element.classList.contains('about-content')) {
                    element.classList.add('slide-up');
                } else if (element.classList.contains('footer-section')) {
                    element.classList.add('slide-in-right');
                } else if (element.classList.contains('car-card')) {
                    element.classList.add('fade-in');
                }
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hero content animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 500);
    }
    
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
    
    // Car Customization Functionality
    const customizePage = document.querySelector('.customize-container');
    if (customizePage) {
        // Tab switching functionality
        const optionTabs = document.querySelectorAll('.option-tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        optionTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                optionTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show corresponding tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Car color selection
        const colorOptions = document.querySelectorAll('.color-option');
        const carPreviewImage = document.querySelector('.car-preview-image');
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                colorOptions.forEach(o => o.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update car image based on selected color
                const colorValue = this.getAttribute('data-color');
                const carAngle = document.querySelector('.rotate-slider').value;
                const viewType = document.querySelector('.view-toggle').getAttribute('data-view');
                
                updateCarImage(colorValue, carAngle, viewType);
                updatePriceSummary();
            });
        });
        
        // Wheel selection
        const wheelOptions = document.querySelectorAll('.wheel-option');
        
        wheelOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                wheelOptions.forEach(o => o.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update wheel image and price
                updatePriceSummary();
            });
        });
        
        // Interior options selection
        const seatOptions = document.querySelectorAll('.seat-option');
        const materialOptions = document.querySelectorAll('.material-option');
        
        seatOptions.forEach(option => {
            option.addEventListener('click', function() {
                seatOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                updatePriceSummary();
            });
        });
        
        materialOptions.forEach(option => {
            option.addEventListener('click', function() {
                materialOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                updatePriceSummary();
            });
        });
        
        // Feature and accessory toggles
        const featureOptions = document.querySelectorAll('.feature-option');
        const accessoryOptions = document.querySelectorAll('.accessory-option');
        
        featureOptions.forEach(option => {
            option.addEventListener('click', function() {
                this.classList.toggle('active');
                updatePriceSummary();
            });
        });
        
        accessoryOptions.forEach(option => {
            option.addEventListener('click', function() {
                this.classList.toggle('active');
                updatePriceSummary();
            });
        });
        
        // 360 degree rotation functionality
        const rotateSlider = document.querySelector('.rotate-slider');
        
        if (rotateSlider) {
            rotateSlider.addEventListener('input', function() {
                const colorValue = document.querySelector('.color-option.active').getAttribute('data-color');
                const viewType = document.querySelector('.view-toggle').getAttribute('data-view');
                
                updateCarImage(colorValue, this.value, viewType);
            });
        }
        
        // View toggle (exterior/interior)
        const viewToggle = document.querySelector('.view-toggle');
        
        if (viewToggle) {
            viewToggle.addEventListener('click', function() {
                const currentView = this.getAttribute('data-view');
                let newView;
                
                if (currentView === 'exterior') {
                    newView = 'interior';
                    this.textContent = 'View Exterior';
                } else {
                    newView = 'exterior';
                    this.textContent = 'View Interior';
                }
                
                this.setAttribute('data-view', newView);
                
                const colorValue = document.querySelector('.color-option.active').getAttribute('data-color');
                const carAngle = document.querySelector('.rotate-slider').value;
                
                updateCarImage(colorValue, carAngle, newView);
            });
        }
        
        // Environment selection
        const envOptions = document.querySelectorAll('.env-option');
        
        envOptions.forEach(option => {
            option.addEventListener('click', function() {
                envOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                const envBackground = this.getAttribute('data-env');
                document.querySelector('.car-preview-wrapper').style.backgroundImage = `url('../images/custom-backgrounds/${envBackground}')`;
            });
        });
        
        // Zoom functionality
        const zoomInBtn = document.querySelector('.zoom-in');
        const zoomOutBtn = document.querySelector('.zoom-out');
        let zoomLevel = 1;
        
        if (zoomInBtn && zoomOutBtn) {
            zoomInBtn.addEventListener('click', function() {
                if (zoomLevel < 1.5) {
                    zoomLevel += 0.1;
                    carPreviewImage.style.transform = `scale(${zoomLevel})`;
                }
            });
            
            zoomOutBtn.addEventListener('click', function() {
                if (zoomLevel > 0.5) {
                    zoomLevel -= 0.1;
                    carPreviewImage.style.transform = `scale(${zoomLevel})`;
                }
            });
        }
        
        // Helper function to update car image based on selected options
        function updateCarImage(color, angle, viewType) {
            // In a real implementation, this would load the appropriate image
            // For this example, we'll simulate the image change
            
            // The path would typically be something like:
            // `images/car-details/model-name/color-name/angle-view.jpg`
            
            const basePath = 'images/car-details/';
            const carModel = 'ferrari'; // This would be dynamic based on user selection
            
            let imagePath;
            
            if (viewType === 'exterior') {
                imagePath = `${basePath}${carModel}/${color}/angle-${angle}.jpg`;
            } else {
                imagePath = `${basePath}${carModel}/interior/angle-${angle}.jpg`;
            }
            
            // For this example, we'll just use a placeholder
            carPreviewImage.src = '/api/placeholder/600/400';
            carPreviewImage.alt = `${carModel} in ${color}`;
        }
        
        // Function to update price summary based on selected options
        function updatePriceSummary() {
            // Base price
            let basePrice = 321400; // Would be dynamic based on selected model
            
            // Get price elements
            const basePriceElement = document.querySelector('.base-price-value');
            const colorPriceElement = document.querySelector('.color-price-value');
            const wheelsPriceElement = document.querySelector('.wheels-price-value');
            const interiorPriceElement = document.querySelector('.interior-price-value');
            const featuresPriceElement = document.querySelector('.features-price-value');
            const accessoriesPriceElement = document.querySelector('.accessories-price-value');
            const totalPriceElement = document.querySelector('.total-price-value');
            
            // Calculate color price
            const activeColor = document.querySelector('.color-option.active');
            const colorPrice = activeColor ? parseInt(activeColor.getAttribute('data-price')) : 0;
            
            // Calculate wheels price
            const activeWheels = document.querySelector('.wheel-option.active');
            const wheelsPrice = activeWheels ? parseInt(activeWheels.getAttribute('data-price')) : 0;
            
            // Calculate interior price
            const activeSeat = document.querySelector('.seat-option.active');
            const activeMaterial = document.querySelector('.material-option.active');
            const seatPrice = activeSeat ? parseInt(activeSeat.getAttribute('data-price')) : 0;
            const materialPrice = activeMaterial ? parseInt(activeMaterial.getAttribute('data-price')) : 0;
            const interiorPrice = seatPrice + materialPrice;
            
            // Calculate features price
            let featuresPrice = 0;
            document.querySelectorAll('.feature-option.active').forEach(feature => {
                featuresPrice += parseInt(feature.getAttribute('data-price'));
            });
            
            // Calculate accessories price
            let accessoriesPrice = 0;
            document.querySelectorAll('.accessory-option.active').forEach(accessory => {
                accessoriesPrice += parseInt(accessory.getAttribute('data-price'));
            });
            
            // Update price elements
            if (basePriceElement) basePriceElement.textContent = `${basePrice.toLocaleString()}`;
            if (colorPriceElement) colorPriceElement.textContent = `${colorPrice.toLocaleString()}`;
            if (wheelsPriceElement) wheelsPriceElement.textContent = `${wheelsPrice.toLocaleString()}`;
            if (interiorPriceElement) interiorPriceElement.textContent = `${interiorPrice.toLocaleString()}`;
            if (featuresPriceElement) featuresPriceElement.textContent = `${featuresPrice.toLocaleString()}`;
            if (accessoriesPriceElement) accessoriesPriceElement.textContent = `${accessoriesPrice.toLocaleString()}`;
            
            // Calculate and update total price
            const totalPrice = basePrice + colorPrice + wheelsPrice + interiorPrice + featuresPrice + accessoriesPrice;
            if (totalPriceElement) totalPriceElement.textContent = `${totalPrice.toLocaleString()}`;
        }
        
        // Initialize with default selections
        const defaultColor = document.querySelector('.color-option');
        if (defaultColor) defaultColor.classList.add('active');
        
        const defaultWheel = document.querySelector('.wheel-option');
        if (defaultWheel) defaultWheel.classList.add('active');
        
        const defaultSeat = document.querySelector('.seat-option');
        if (defaultSeat) defaultSeat.classList.add('active');
        
        const defaultMaterial = document.querySelector('.material-option');
        if (defaultMaterial) defaultMaterial.classList.add('active');
        
        const defaultEnv = document.querySelector('.env-option');
        if (defaultEnv) defaultEnv.classList.add('active');
        
        // Initialize car image and price summary
        if (carPreviewImage) {
            updateCarImage('red', 1, 'exterior');
            updatePriceSummary();
        }
        
        // Add to cart button functionality
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                alert('Configuration added to cart!');
                // In a real implementation, this would add the configuration to the cart
            });
        }
        
        // Save configuration button
        const saveConfigBtn = document.querySelector('.save-config');
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', function() {
                alert('Configuration saved!');
                // In a real implementation, this would save the configuration
            });
        }
        
        // Share configuration button
        const shareConfigBtn = document.querySelector('.share-config');
        if (shareConfigBtn) {
            shareConfigBtn.addEventListener('click', function() {
                alert('Configuration shared!');
                // In a real implementation, this would share the configuration
            });
        }
    }
});
