document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Range Sliders Initialization
    if (document.getElementById('price-slider')) {
        const priceSlider = document.getElementById('price-slider');
        
        if (typeof noUiSlider !== 'undefined') {
            // Only create if it hasn't been initialized
            if (!priceSlider.noUiSlider) {
                noUiSlider.create(priceSlider, {
                    start: [50000, 500000],
                    connect: true,
                    step: 5000,
                    range: {
                        'min': 50000,
                        'max': 500000
                    },
                    format: {
                        to: function(value) {
                            return Math.round(value);
                        },
                        from: function(value) {
                            return Number(value);
                        }
                    }
                });
                
                const priceMin = document.getElementById('price-min');
                const priceMax = document.getElementById('price-max');
                
                priceSlider.noUiSlider.on('update', function(values, handle) {
                    if (handle === 0) {
                        priceMin.innerHTML = '$' + parseInt(values[0]).toLocaleString();
                    } else {
                        priceMax.innerHTML = '$' + parseInt(values[1]).toLocaleString();
                    }
                });
            }
        }
    }
    
    if (document.getElementById('mileage-slider')) {
        const mileageSlider = document.getElementById('mileage-slider');
        
        if (typeof noUiSlider !== 'undefined') {
            // Only create if it hasn't been initialized
            if (!mileageSlider.noUiSlider) {
                noUiSlider.create(mileageSlider, {
                    start: [0, 50000],
                    connect: true,
                    step: 1000,
                    range: {
                        'min': 0,
                        'max': 50000
                    },
                    format: {
                        to: function(value) {
                            return Math.round(value);
                        },
                        from: function(value) {
                            return Number(value);
                        }
                    }
                });
                
                const mileageMin = document.getElementById('mileage-min');
                const mileageMax = document.getElementById('mileage-max');
                
                mileageSlider.noUiSlider.on('update', function(values, handle) {
                    if (handle === 0) {
                        mileageMin.innerHTML = parseInt(values[0]).toLocaleString() + ' miles';
                    } else {
                        mileageMax.innerHTML = parseInt(values[1]).toLocaleString() + ' miles';
                    }
                });
            }
        }
    }
    
    // Car Filtering
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const carCards = document.querySelectorAll('.car-card');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            loadingOverlay.classList.add('active');
            
            // Get filter values
            const makeFilter = document.getElementById('make').value;
            const modelFilter = document.getElementById('model').value;
            const yearFilter = document.getElementById('year').value;
            const bodyTypeFilter = document.getElementById('body-type').value;
            
            const priceRange = document.getElementById('price-slider').noUiSlider.get();
            const minPrice = parseInt(priceRange[0]);
            const maxPrice = parseInt(priceRange[1]);
            
            const mileageRange = document.getElementById('mileage-slider').noUiSlider.get();
            const minMileage = parseInt(mileageRange[0]);
            const maxMileage = parseInt(mileageRange[1]);
            
            // Filter cars
            carCards.forEach(card => {
                const cardMake = card.getAttribute('data-make');
                const cardYear = parseInt(card.getAttribute('data-year'));
                const cardPrice = parseInt(card.getAttribute('data-price'));
                const cardMileage = parseInt(card.getAttribute('data-mileage'));
                const cardBodyType = card.getAttribute('data-body-type');
                
                let shouldShow = true;
                
                if (makeFilter && cardMake !== makeFilter) {
                    shouldShow = false;
                }
                
                if (yearFilter && cardYear !== parseInt(yearFilter)) {
                    shouldShow = false;
                }
                
                if (bodyTypeFilter && cardBodyType !== bodyTypeFilter) {
                    shouldShow = false;
                }
                
                if (cardPrice < minPrice || cardPrice > maxPrice) {
                    shouldShow = false;
                }
                
                if (cardMileage < minMileage || cardMileage > maxMileage) {
                    shouldShow = false;
                }
                
                // Handle model filter (to be implemented with dynamic data)
                
                if (shouldShow) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Hide loading overlay after a short delay
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
            }, 500);
        });
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset all filters
            document.getElementById('make').value = '';
            document.getElementById('model').value = '';
            document.getElementById('year').value = '';
            document.getElementById('body-type').value = '';
            
            // Reset range sliders
            document.getElementById('price-slider').noUiSlider.set([50000, 500000]);
            document.getElementById('mileage-slider').noUiSlider.set([0, 50000]);
            
            // Show all cars
            carCards.forEach(card => {
                card.style.display = 'block';
            });
        });
    }
    
    // Featured Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    function showSlide(index) {
        if (!slides.length) return;
        
        // Ensure index is within bounds
        index = Math.max(0, Math.min(index, slides.length - 1));
        
        // Move all slides
        slides.forEach(slide => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!slides.length) return;
            
            const newIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!slides.length) return;
            
            const newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            clearInterval(slideInterval); // Stop auto-sliding when user interacts
            
            // Restart auto-slide after interaction
            slideInterval = setInterval(function() {
                const newIndex = (currentSlide + 1) % slides.length;
                showSlide(newIndex);
            }, 5000);
        });
    });
    
    // Auto slide every 5 seconds
    let slideInterval;
    if (slides.length > 0) {
        // Initialize first slide
        showSlide(0);
        
        // Start auto-sliding
        slideInterval = setInterval(function() {
            const newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }, 5000);
        
        // Pause auto slide on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', function() {
                clearInterval(slideInterval);
                slideInterval = setInterval(function() {
                    const newIndex = (currentSlide + 1) % slides.length;
                    showSlide(newIndex);
                }, 5000);
            });
        }
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const inventoryGrid = document.querySelector('.inventory-grid');
            const carCards = Array.from(document.querySelectorAll('.car-card'));
            
            // Sort the cards based on selection
            carCards.sort(function(a, b) {
                if (sortValue === 'price-asc') {
                    const priceA = parseInt(a.getAttribute('data-price'));
                    const priceB = parseInt(b.getAttribute('data-price'));
                    return priceA - priceB;
                } else if (sortValue === 'price-desc') {
                    const priceA = parseInt(a.getAttribute('data-price'));
                    const priceB = parseInt(b.getAttribute('data-price'));
                    return priceB - priceA;
                } else if (sortValue === 'newest') {
                    const yearA = parseInt(a.getAttribute('data-year'));
                    const yearB = parseInt(b.getAttribute('data-year'));
                    return yearB - yearA;
                } else if (sortValue === 'mileage') {
                    const mileageA = parseInt(a.getAttribute('data-mileage'));
                    const mileageB = parseInt(b.getAttribute('data-mileage'));
                    return mileageA - mileageB;
                }
                // For 'featured' and default cases, keep original order
                return 0;
            });
            
            // Remove all cards and re-append them in the new order
            carCards.forEach(card => {
                inventoryGrid.appendChild(card);
            });
        });
    }
    
    // Grid/List view toggle functionality
    const gridBtn = document.querySelector('.view-btn.grid');
    const listBtn = document.querySelector('.view-btn.list');
    const inventoryGrid = document.querySelector('.inventory-grid');
    
    if (gridBtn && listBtn && inventoryGrid) {
        gridBtn.addEventListener('click', function() {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            inventoryGrid.classList.remove('list-view');
        });
        
        listBtn.addEventListener('click', function() {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            inventoryGrid.classList.add('list-view');
        });
    }
    
    // Financing Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const vehiclePrice = parseFloat(document.getElementById('vehicle-price').value.replace(/,/g, ''));
            const downPayment = parseFloat(document.getElementById('down-payment').value.replace(/,/g, ''));
            const loanTerm = parseInt(document.getElementById('loan-term').value);
            const interestRate = parseFloat(document.getElementById('interest-rate').value);
            
            // Calculate loan amount
            const loanAmount = vehiclePrice - downPayment;
            
            // Calculate monthly interest rate
            const monthlyRate = interestRate / 100 / 12;
            
            // Calculate monthly payment
            const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
            
            // Calculate total interest
            const totalInterest = (monthlyPayment * loanTerm) - loanAmount;
            
            // Update results
            document.getElementById('monthly-payment').textContent = '$' + monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            document.getElementById('total-loan').textContent = '$' + loanAmount.toLocaleString();
            document.getElementById('total-interest').textContent = '$' + totalInterest.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        });
    }
    
    // Favorite and Compare functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const compareButtons = document.querySelectorAll('.compare-btn');
    const savedVehiclesList = document.getElementById('saved-vehicles-list');
    const savedActions = document.getElementById('saved-actions');
    const emptySavedMessage = document.getElementById('empty-saved-message');
    
    // Saved vehicles array
    let savedVehicles = [];
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-heart"></i>';
                
                // Get car info
                const carCard = this.closest('.car-card');
                const carName = carCard.querySelector('.car-name').textContent;
                const carPrice = carCard.querySelector('.car-price').textContent;
                const carImage = carCard.querySelector('.car-image').src;
                
                // Create unique ID for the car
                const carId = carName.toLowerCase().replace(/\s+/g, '-');
                
                // Add to saved vehicles if not already there
                if (!savedVehicles.includes(carId)) {
                    savedVehicles.push(carId);
                    
                    // Create saved vehicle card
                    createSavedVehicleCard(carId, carName, carPrice, carImage);
                }
            } else {
                this.innerHTML = '<i class="far fa-heart"></i>';
                
                // Get car info and remove from saved vehicles
                const carCard = this.closest('.car-card');
                const carName = carCard.querySelector('.car-name').textContent;
                const carId = carName.toLowerCase().replace(/\s+/g, '-');
                
                savedVehicles = savedVehicles.filter(id => id !== carId);
                
                // Remove from saved vehicles list
                const savedCard = document.getElementById('saved-' + carId);
                if (savedCard) {
                    savedCard.remove();
                }
            }
            
            // Show/hide empty message and actions
            updateSavedVehiclesUI();
        });
    });
    
    function createSavedVehicleCard(id, name, price, image) {
        const savedCard = document.createElement('div');
        savedCard.className = 'saved-vehicle-card';
        savedCard.id = 'saved-' + id;
        
        savedCard.innerHTML = `
            <img src="${image}" alt="${name}">
            <div class="saved-vehicle-info">
                <h3>${name}</h3>
                <p>${price}</p>
            </div>
            <button class="remove-saved" data-id="${id}"><i class="fas fa-times"></i></button>
        `;
        
        savedVehiclesList.appendChild(savedCard);
        
        // Add click event to remove button
        savedCard.querySelector('.remove-saved').addEventListener('click', function() {
            const carId = this.getAttribute('data-id');
            
            // Remove from saved vehicles array
            savedVehicles = savedVehicles.filter(id => id !== carId);
            
            // Remove card
            savedCard.remove();
            
            // Find and update the favorite button in the listing
            document.querySelectorAll('.car-card').forEach(card => {
                const cardName = card.querySelector('.car-name').textContent;
                const cardId = cardName.toLowerCase().replace(/\s+/g, '-');
                
                if (cardId === carId) {
                    const favoriteBtn = card.querySelector('.favorite-btn');
                    favoriteBtn.classList.remove('active');
                    favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
                }
            });
            
            // Update UI
            updateSavedVehiclesUI();
        });
    }
    
    function updateSavedVehiclesUI() {
        if (savedVehicles.length > 0) {
            emptySavedMessage.style.display = 'none';
            savedActions.classList.remove('hidden');
        } else {
            emptySavedMessage.style.display = 'block';
            savedActions.classList.add('hidden');
        }
    }
    
    // Compare functionality
    const compareAllBtn = document.querySelector('.compare-all-btn');
    const compareModal = document.getElementById('compare-modal');
    const closeCompareBtn = document.getElementById('close-compare');
    
    if (compareAllBtn) {
        compareAllBtn.addEventListener('click', function() {
            if (savedVehicles.length < 2) {
                alert('Please save at least 2 vehicles to compare.');
                return;
            }
            
            // Show compare modal
            compareModal.classList.add('active');
            
            // Create comparison table
            createComparisonTable();
        });
    }
    
    if (closeCompareBtn) {
        closeCompareBtn.addEventListener('click', function() {
            compareModal.classList.remove('active');
        });
    }
    
    function createComparisonTable() {
        const compareVehicles = document.getElementById('compare-vehicles');
        compareVehicles.innerHTML = '';
        
        // Create comparison table structure
        const table = document.createElement('table');
        table.className = 'comparison-table';
        
        // Create headers with car names
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Feature</th>';
        
        savedVehicles.forEach(carId => {
            const savedCard = document.getElementById('saved-' + carId);
            const carName = savedCard.querySelector('h3').textContent;
            headerRow.innerHTML += `<th>${carName}</th>`;
        });
        
        table.appendChild(headerRow);
        
        // Add rows for different features
        const features = [
            'Price',
            'Year',
            'Mileage',
            'Body Type',
            'Engine',
            'Transmission',
            'Drivetrain',
            'Fuel Type',
            'Exterior Color',
            'Interior Color'
        ];
        
        features.forEach(feature => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${feature}</td>`;
            
            savedVehicles.forEach(carId => {
                // In a real implementation, these values would be pulled from a database
                row.innerHTML += `<td>Data for ${feature}</td>`;
            });
            
            table.appendChild(row);
        });
        
        compareVehicles.appendChild(table);
    }
    
    // Value Estimator
    const estimateBtn = document.getElementById('estimate-value-btn');
    const estimateResults = document.getElementById('estimate-results');
    
    if (estimateBtn) {
        estimateBtn.addEventListener('click', function() {
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            loadingOverlay.classList.add('active');
            
            // Get form values
            const make = document.getElementById('est-make').value;
            const model = document.getElementById('est-model').value;
            const year = document.getElementById('est-year').value;
            const mileage = document.getElementById('est-mileage').value;
            const condition = document.querySelector('input[name="condition"]:checked').value;
            
            // Validate form
            if (!make || !model || !year || !mileage) {
                alert('Please fill out all fields.');
                loadingOverlay.classList.remove('active');
                return;
            }
            
            // Simulate API call delay
            setTimeout(() => {
                // Generate estimate (in a real app, this would be from an API)
                let baseValue;
                
                switch (make) {
                    case 'ferrari':
                        baseValue = 250000;
                        break;
                    case 'lamborghini':
                        baseValue = 230000;
                        break;
                    case 'aston-martin':
                        baseValue = 180000;
                        break;
                    case 'bentley':
                        baseValue = 170000;
                        break;
                    case 'rolls-royce':
                        baseValue = 350000;
                        break;
                    case 'porsche':
                        baseValue = 100000;
                        break;
                    case 'mclaren':
                        baseValue = 280000;
                        break;
                    case 'tesla':
                        baseValue = 90000;
                        break;
                    default:
                        baseValue = 150000;
                }
                
                // Apply adjustments
                const currentYear = new Date().getFullYear();
                const yearAdjustment = (year - (currentYear - 10)) * 0.05 * baseValue;
                
                const mileageAdjustment = -(mileage / 10000) * 0.05 * baseValue;
                
                let conditionMultiplier;
                switch (condition) {
                    case 'excellent':
                        conditionMultiplier = 1.1;
                        break;
                    case 'good':
                        conditionMultiplier = 1;
                        break;
                    case 'fair':
                        conditionMultiplier = 0.9;
                        break;
                    case 'poor':
                        conditionMultiplier = 0.75;
                        break;
                    default:
                        conditionMultiplier = 1;
                }
                
                // Calculate estimated value
                let estimatedValue = (baseValue + yearAdjustment + mileageAdjustment) * conditionMultiplier;
                
                // Ensure value is not negative
                estimatedValue = Math.max(estimatedValue, 10000);
                
                // Format values
                const formattedEstimate = '$' + Math.round(estimatedValue).toLocaleString();
                const estimateRange = '$' + Math.round(estimatedValue * 0.9).toLocaleString() + ' - $' + Math.round(estimatedValue * 1.1).toLocaleString();
                
                // Display results
                estimateResults.innerHTML = `
                    <h3>Your ${year} ${make.replace('-', ' ')} ${model.replace('-', ' ')} is worth approximately:</h3>
                    <div class="estimate-value">${formattedEstimate}</div>
                    <p class="estimate-range">Estimated Value Range: ${estimateRange}</p>
                    <div class="estimate-details">
                        <p>This estimate is based on the vehicle's make, model, year, mileage, and condition. Actual market value may vary based on additional factors including optional features, service history, and local market conditions.</p>
                    </div>
                    <div class="estimate-actions">
                        <button class="list-now-btn">List Your Car Now</button>
                        <button class="get-offers-btn">Get Offers from Dealers</button>
                    </div>
                `;
                
                // Show results
                estimateResults.style.display = 'block';
                
                // Hide loading overlay
                loadingOverlay.classList.remove('active');
                
                // Scroll to results
                estimateResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Add event listeners for action buttons
                estimateResults.querySelector('.list-now-btn').addEventListener('click', function() {
                    document.querySelector('a[href="#listing-form"]').click();
                });
                
                estimateResults.querySelector('.get-offers-btn').addEventListener('click', function() {
                    alert('We\'ll connect you with local dealers. A representative will contact you shortly.');
                });
            }, 1500);
        });
    }
    
    // Photo Upload Preview
    const photoUploadArea = document.getElementById('photo-upload-area');
    const fileInput = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    
    if (photoUploadArea && fileInput) {
        photoUploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        photoUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--secondary-color)';
            this.style.backgroundColor = '#f9f9f9';
        });
        
        photoUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'transparent';
        });
        
        photoUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'transparent';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileUpload();
            }
        });
        
        fileInput.addEventListener('change', handleFileUpload);
        
        function handleFileUpload() {
            if (!fileInput.files.length) return;
            
            const files = Array.from(fileInput.files);
            
            files.forEach(file => {
                if (!file.type.match('image.*')) return;
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const preview = document.createElement('div');
                    preview.className = 'photo-preview-item';
                    preview.innerHTML = `
                        <img src="${e.target.result}" alt="Uploaded Photo">
                        <button type="button" class="remove-photo"><i class="fas fa-times"></i></button>
                    `;
                    
                    photoPreview.appendChild(preview);
                    
                    // Add click event for remove button
                    preview.querySelector('.remove-photo').addEventListener('click', function() {
                        preview.remove();
                    });
                };
                
                reader.readAsDataURL(file);
            });
        }
    }
    
    // Dynamic model options based on make selection
    const makeSelects = [
        document.getElementById('make'),
        document.getElementById('est-make'),
        document.getElementById('listing-make')
    ];
    
    const modelSelects = [
        document.getElementById('model'),
        document.getElementById('est-model'),
        document.getElementById('listing-model')
    ];
    
    // Model options for each make
    const modelOptions = {
        'aston-martin': ['DB12', 'Vantage', 'DBS', 'DBX'],
        'bentley': ['Continental GT', 'Flying Spur', 'Bentayga', 'Mulliner'],
        'ferrari': ['296 GTB', 'SF90', 'Roma', 'F8 Tributo', 'Purosangue'],
        'lamborghini': ['Huracán', 'Aventador', 'Urus', 'Revuelto'],
        'mclaren': ['765LT', 'Artura', '720S', 'GT'],
        'porsche': ['911', 'Taycan', 'Panamera', 'Cayenne', 'Macan'],
        'rolls-royce': ['Spectre', 'Ghost', 'Phantom', 'Cullinan'],
        'tesla': ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster']
    };
    
    makeSelects.forEach((makeSelect, index) => {
        if (makeSelect && modelSelects[index]) {
            makeSelect.addEventListener('change', function() {
                const selectedMake = this.value;
                const modelSelect = modelSelects[index];
                
                // Clear existing options
                modelSelect.innerHTML = '<option value="">Select Model</option>';
                
                // Add new options based on selected make
                if (selectedMake && modelOptions[selectedMake]) {
                    modelOptions[selectedMake].forEach(model => {
                        const option = document.createElement('option');
                        option.value = model.toLowerCase().replace(/\s+/g, '-');
                        option.textContent = model;
                        modelSelect.appendChild(option);
                    });
                }
            });
        }
    });
    
    // Form Preview and Submit handling
    const previewBtn = document.getElementById('listing-preview-btn');
    const submitBtn = document.getElementById('listing-submit-btn');
    
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            // Validate form
            const requiredFields = document.querySelectorAll('.listing-form [required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            loadingOverlay.classList.add('active');
            
            // Simulate delay
            setTimeout(() => {
                // Show preview modal (would be created in real implementation)
                alert('Preview functionality would show a modal with form data');
                
                // Hide loading overlay
                loadingOverlay.classList.remove('active');
            }, 1000);
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            const requiredFields = document.querySelectorAll('.listing-form [required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Check terms agreement
            const termsCheckbox = document.getElementById('listing-terms');
            if (!termsCheckbox.checked) {
                alert('Please agree to the Terms and Conditions.');
                return;
            }
            
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            loadingOverlay.classList.add('active');
            
            // Simulate form submission delay
            setTimeout(() => {
                // Show success message (would redirect to dashboard in real implementation)
                alert('Your listing has been submitted successfully! It will be reviewed and published shortly.');
                
                // Reset form
                document.querySelector('.listing-form').reset();
                
                // Hide loading overlay
                loadingOverlay.classList.remove('active');
                
                // Redirect to top of page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 2000);
        });
    }
});