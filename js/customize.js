// customize.js
document.addEventListener('DOMContentLoaded', function() {
    // Car Customization Functionality
    const customizePage = document.querySelector('.customize-container');
    if (customizePage) {
        // Create dummy elements for removed car preview components
        const dummyCarPreviewImage = document.createElement('img');
        const dummyRotateSlider = { value: 1 };
        const dummyViewToggle = { 
            getAttribute: () => 'exterior',
            setAttribute: () => {},
            textContent: ''
        };
        
        // Current vehicle model and configuration 
        let currentVehicle = {
            model: 'ferrari-sf90', 
            name: 'Ferrari SF90 Stradale',
            basePrice: 321400,
            specs: {
                year: '2023',
                color: 'Rosso Corsa',
                interior: 'Nero Leather',
                engine: 'Standard V8 Hybrid'
            },
            options: {}
        };
        
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
        const carPreviewImage = dummyCarPreviewImage; // Using dummy element
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                colorOptions.forEach(o => o.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update car image based on selected color (using dummy elements)
                const colorValue = this.getAttribute('data-color');
                const colorName = this.getAttribute('data-name') || colorValue;
                const carAngle = dummyRotateSlider.value;
                const viewType = dummyViewToggle.getAttribute('data-view');
                
                // Update current vehicle configuration
                currentVehicle.specs.color = colorName;
                currentVehicle.options.colorPrice = parseInt(this.getAttribute('data-price')) || 0;
                currentVehicle.options.colorValue = colorValue;
                
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
                
                // Update current vehicle configuration
                const wheelName = this.getAttribute('data-name') || this.textContent.trim();
                currentVehicle.specs.wheels = wheelName;
                currentVehicle.options.wheelPrice = parseInt(this.getAttribute('data-price')) || 0;
                
                // Update price
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
                
                // Update current vehicle configuration
                const seatType = this.getAttribute('data-name') || this.textContent.trim();
                currentVehicle.options.seatType = seatType;
                currentVehicle.options.seatPrice = parseInt(this.getAttribute('data-price')) || 0;
                
                updateInteriorConfig();
                updatePriceSummary();
            });
        });
        
        materialOptions.forEach(option => {
            option.addEventListener('click', function() {
                materialOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Update current vehicle configuration
                const materialType = this.getAttribute('data-name') || this.textContent.trim();
                currentVehicle.options.materialType = materialType;
                currentVehicle.options.materialPrice = parseInt(this.getAttribute('data-price')) || 0;
                
                updateInteriorConfig();
                updatePriceSummary();
            });
        });
        
        // Update the interior configuration
        function updateInteriorConfig() {
            const seatType = currentVehicle.options.seatType || '';
            const materialType = currentVehicle.options.materialType || '';
            currentVehicle.specs.interior = `${seatType} ${materialType}`.trim() || 'Nero Leather';
        }
        
        // Feature and accessory toggles
        const featureOptions = document.querySelectorAll('.feature-option');
        const accessoryOptions = document.querySelectorAll('.accessory-option');
        
        featureOptions.forEach(option => {
            option.addEventListener('click', function() {
                this.classList.toggle('active');
                
                // Update current vehicle configuration
                const featureName = this.getAttribute('data-name') || this.textContent.trim();
                const featurePrice = parseInt(this.getAttribute('data-price')) || 0;
                
                if (!currentVehicle.options.features) {
                    currentVehicle.options.features = [];
                }
                
                if (this.classList.contains('active')) {
                    // Add feature
                    currentVehicle.options.features.push({
                        name: featureName,
                        price: featurePrice
                    });
                } else {
                    // Remove feature
                    currentVehicle.options.features = currentVehicle.options.features.filter(
                        feature => feature.name !== featureName
                    );
                }
                
                updatePriceSummary();
            });
        });
        
        accessoryOptions.forEach(option => {
            option.addEventListener('click', function() {
                this.classList.toggle('active');
                
                // Update current vehicle configuration
                const accessoryName = this.getAttribute('data-name') || this.textContent.trim();
                const accessoryPrice = parseInt(this.getAttribute('data-price')) || 0;
                
                if (!currentVehicle.options.accessories) {
                    currentVehicle.options.accessories = [];
                }
                
                if (this.classList.contains('active')) {
                    // Add accessory
                    currentVehicle.options.accessories.push({
                        name: accessoryName,
                        price: accessoryPrice
                    });
                } else {
                    // Remove accessory
                    currentVehicle.options.accessories = currentVehicle.options.accessories.filter(
                        accessory => accessory.name !== accessoryName
                    );
                }
                
                updatePriceSummary();
            });
        });
        
        // Helper function to update car image based on selected options (now just logs info)
        function updateCarImage(color, angle, viewType) {
            // Since we've removed the car-preview, we just log info
            console.log(`Selected options - Color: ${color}, Angle: ${angle}, View: ${viewType}`);
        }
        
        // Function to update price summary based on selected options
        function updatePriceSummary() {
            // Base price
            let basePrice = currentVehicle.basePrice; // Would be dynamic based on selected model
            
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
            if (basePriceElement) basePriceElement.textContent = `$${basePrice.toLocaleString()}`;
            if (colorPriceElement) colorPriceElement.textContent = `$${colorPrice.toLocaleString()}`;
            if (wheelsPriceElement) wheelsPriceElement.textContent = `$${wheelsPrice.toLocaleString()}`;
            if (interiorPriceElement) interiorPriceElement.textContent = `$${interiorPrice.toLocaleString()}`;
            if (featuresPriceElement) featuresPriceElement.textContent = `$${featuresPrice.toLocaleString()}`;
            if (accessoriesPriceElement) accessoriesPriceElement.textContent = `$${accessoriesPrice.toLocaleString()}`;
            
            // Calculate and update total price
            const totalPrice = basePrice + colorPrice + wheelsPrice + interiorPrice + featuresPrice + accessoriesPrice;
            currentVehicle.totalPrice = totalPrice;
            
            if (totalPriceElement) totalPriceElement.textContent = `$${totalPrice.toLocaleString()}`;
        }
        
        // Initialize with default selections
        const defaultColor = document.querySelector('.color-option');
        if (defaultColor) {
            defaultColor.classList.add('active');
            currentVehicle.specs.color = defaultColor.getAttribute('data-name') || 'Rosso Corsa';
            currentVehicle.options.colorPrice = parseInt(defaultColor.getAttribute('data-price')) || 0;
            currentVehicle.options.colorValue = defaultColor.getAttribute('data-color') || 'red';
        }
        
        const defaultWheel = document.querySelector('.wheel-option');
        if (defaultWheel) {
            defaultWheel.classList.add('active');
            currentVehicle.specs.wheels = defaultWheel.getAttribute('data-name') || 'Standard Wheels';
            currentVehicle.options.wheelPrice = parseInt(defaultWheel.getAttribute('data-price')) || 0;
        }
        
        const defaultSeat = document.querySelector('.seat-option');
        if (defaultSeat) {
            defaultSeat.classList.add('active');
            currentVehicle.options.seatType = defaultSeat.getAttribute('data-name') || 'Sport Seats';
            currentVehicle.options.seatPrice = parseInt(defaultSeat.getAttribute('data-price')) || 0;
        }
        
        const defaultMaterial = document.querySelector('.material-option');
        if (defaultMaterial) {
            defaultMaterial.classList.add('active');
            currentVehicle.options.materialType = defaultMaterial.getAttribute('data-name') || 'Nero Leather';
            currentVehicle.options.materialPrice = parseInt(defaultMaterial.getAttribute('data-price')) || 0;
        }
        
        // Initialize interior config
        updateInteriorConfig();
        
        // Initialize price summary
        updatePriceSummary();
        
        // Function to add configured vehicle to cart
        function addConfiguredVehicleToCart() {
            // Create a cart-friendly version of the configuration
            const cartItem = {
                id: `custom-${currentVehicle.model}-${Date.now()}`,
                type: 'vehicle',
                name: currentVehicle.name,
                price: `$${currentVehicle.totalPrice.toLocaleString()}`,
                image: '/api/placeholder/300/200', // In a real app, this would be the actual vehicle image
                specs: {
                    year: currentVehicle.specs.year,
                    color: currentVehicle.specs.color,
                    interior: currentVehicle.specs.interior,
                    wheels: currentVehicle.specs.wheels || 'Standard',
                    engine: currentVehicle.specs.engine
                }
            };
            
            // Add features as additional specs if selected
            if (currentVehicle.options.features && currentVehicle.options.features.length > 0) {
                cartItem.specs.features = currentVehicle.options.features.map(f => f.name).join(', ');
            }
            
            // Add accessories as additional specs if selected
            if (currentVehicle.options.accessories && currentVehicle.options.accessories.length > 0) {
                cartItem.specs.accessories = currentVehicle.options.accessories.map(a => a.name).join(', ');
            }
            
            // Get existing cart or create new one
            let cart = [];
            try {
                const savedCart = localStorage.getItem('carverse_cart');
                if (savedCart) {
                    cart = JSON.parse(savedCart);
                }
            } catch (e) {
                console.error('Error parsing saved cart:', e);
                cart = [];
            }
            
            // Add item to cart
            cart.push(cartItem);
            
            // Save cart to localStorage
            localStorage.setItem('carverse_cart', JSON.stringify(cart));
            
            return cartItem;
        }
        
        // Add to cart button functionality
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                // Add vehicle to cart
                const cartItem = addConfiguredVehicleToCart();
                
                // Show success notification
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.innerHTML = `
                    <div class="notification-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="notification-content">
                        <h3>Vehicle Added to Cart</h3>
                        <p>${cartItem.name} has been added to your cart.</p>
                    </div>
                    <div class="notification-actions">
                        <button class="view-cart-btn">View Cart</button>
                        <button class="continue-btn">Continue Shopping</button>
                    </div>
                    <button class="close-notification"><i class="fas fa-times"></i></button>
                `;
                
                document.body.appendChild(notification);
                
                // Show notification
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                // Set up notification buttons
                notification.querySelector('.view-cart-btn').addEventListener('click', function() {
                    window.location.href = 'cart.html';
                });
                
                notification.querySelector('.continue-btn').addEventListener('click', function() {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                });
                
                notification.querySelector('.close-notification').addEventListener('click', function() {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                });
                
                // Auto-hide notification after 5 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 5000);
                
                // Add notification CSS if it doesn't exist
                if (!document.getElementById('notification-style')) {
                    const style = document.createElement('style');
                    style.id = 'notification-style';
                    style.textContent = `
                        .notification {
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            width: 350px;
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                            padding: 20px;
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                            transform: translateX(400px);
                            opacity: 0;
                            transition: all 0.3s ease;
                            z-index: 1000;
                        }
                        
                        .notification.show {
                            transform: translateX(0);
                            opacity: 1;
                        }
                        
                        .notification-icon {
                            font-size: 2rem;
                            color: #2ecc71;
                            margin-bottom: 10px;
                        }
                        
                        .notification-content h3 {
                            margin: 0 0 5px;
                            color: var(--primary-color);
                        }
                        
                        .notification-content p {
                            margin: 0;
                            color: #555;
                        }
                        
                        .notification-actions {
                            display: flex;
                            gap: 10px;
                            margin-top: 10px;
                        }
                        
                        .view-cart-btn {
                            background-color: var(--secondary-color);
                            color: var(--text-dark);
                            border: none;
                            padding: 8px 15px;
                            border-radius: 5px;
                            cursor: pointer;
                            flex-grow: 1;
                            font-weight: 500;
                        }
                        
                        .continue-btn {
                            background-color: #f5f5f5;
                            color: #333;
                            border: none;
                            padding: 8px 15px;
                            border-radius: 5px;
                            cursor: pointer;
                            flex-grow: 1;
                            font-weight: 500;
                        }
                        
                        .close-notification {
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            background: none;
                            border: none;
                            font-size: 1rem;
                            color: #999;
                            cursor: pointer;
                        }
                    `;
                    document.head.appendChild(style);
                }
            });
        }
        
        // Save configuration button
        const saveConfigBtn = document.querySelector('.save-config');
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', function() {
                // Create config object
                const config = {
                    ...currentVehicle,
                    savedAt: new Date().toISOString()
                };
                
                // Save to localStorage
                let savedConfigs = [];
                try {
                    const configs = localStorage.getItem('carverse_saved_configs');
                    if (configs) {
                        savedConfigs = JSON.parse(configs);
                    }
                } catch (e) {
                    console.error('Error parsing saved configs:', e);
                    savedConfigs = [];
                }
                
                // Add new config
                savedConfigs.push(config);
                
                // Save back to localStorage
                localStorage.setItem('carverse_saved_configs', JSON.stringify(savedConfigs));
                
                // Show confirmation
                alert('Configuration saved! You can access it from your account.');
            });
        }
        
        // Share configuration button
        const shareConfigBtn = document.querySelector('.share-config');
        if (shareConfigBtn) {
            shareConfigBtn.addEventListener('click', function() {
                // Create a shareable URL with config data
                const configData = {
                    model: currentVehicle.model,
                    name: currentVehicle.name,
                    specs: currentVehicle.specs,
                    options: currentVehicle.options,
                    totalPrice: currentVehicle.totalPrice
                };
                
                // Encode configuration as URL parameter
                const encodedConfig = btoa(JSON.stringify(configData));
                const shareUrl = `${window.location.origin}${window.location.pathname}?config=${encodedConfig}`;
                
                // Copy URL to clipboard
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('Shareable link copied to clipboard!');
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                    
                    // Fallback - show URL for manual copying
                    prompt('Copy this shareable link:', shareUrl);
                });
            });
        }
        
        // Check for shared configuration in URL
        const urlParams = new URLSearchParams(window.location.search);
        const sharedConfig = urlParams.get('config');
        
        if (sharedConfig) {
            try {
                // Decode and parse configuration
                const configData = JSON.parse(atob(sharedConfig));
                
                // Apply configuration to UI
                applyConfiguration(configData);
                
                // Show notification
                alert('Shared configuration loaded!');
                
                // Remove URL parameter after loading
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (e) {
                console.error('Error loading shared configuration:', e);
            }
        }
        
        // Apply saved configuration to UI
        function applyConfiguration(config) {
            // Set current vehicle
            currentVehicle = {
                ...currentVehicle,
                ...config
            };
            
            // Update UI based on configuration
            // This would require selecting the appropriate options in the UI
            // based on the loaded configuration
            
            // For this demo, we just update the price
            updatePriceSummary();
        }
    }
});