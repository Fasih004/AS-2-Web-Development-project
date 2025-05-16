// Fixed Cart Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const cartItems = document.querySelector('.cart-items');
    const itemCount = document.getElementById('item-count');
    const savedItems = document.querySelector('.saved-items');
    const savedCount = document.getElementById('saved-count');
    const toggleSavedBtn = document.querySelector('.toggle-saved');
    const savedItemsList = document.querySelector('.saved-items-list');
    const clearCartBtn = document.getElementById('clear-cart');
    const saveCartBtn = document.getElementById('save-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    
    // Modals
    const removeModal = document.getElementById('remove-modal');
    const cartSavedModal = document.getElementById('cart-saved-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelRemoveBtn = document.getElementById('cancel-remove');
    const confirmRemoveBtn = document.getElementById('confirm-remove');
    
    // Cart state
    let currentCart = [];
    let savedForLater = [];
    let itemToRemove = null;
    
    // Initialize cart from localStorage if available
    initializeCart();
    
    function initializeCart() {
        // Attempt to load cart from localStorage
        const savedCart = localStorage.getItem('carverse_cart');
        const savedItemsData = localStorage.getItem('carverse_saved_items');
        
        if (savedCart) {
            try {
                currentCart = JSON.parse(savedCart);
                // Update UI with saved cart items
                renderCartItems();
            } catch (e) {
                console.error('Error parsing saved cart:', e);
                currentCart = [];
            }
        }
        
        if (savedItemsData) {
            try {
                savedForLater = JSON.parse(savedItemsData);
                // Update UI if needed
                renderSavedItems();
            } catch (e) {
                console.error('Error parsing saved items:', e);
                savedForLater = [];
            }
        }
        
        // Check if cart is empty and show empty state if needed
        if (currentCart.length === 0 && cartItems && cartItems.children.length === 0) {
            // Check for newly added customized vehicle from localStorage
            const pendingCustomVehicle = localStorage.getItem('carverse_pending_custom_vehicle');
            
            if (pendingCustomVehicle) {
                try {
                    // Parse the custom vehicle data
                    const customVehicleData = JSON.parse(pendingCustomVehicle);
                    addCustomVehicleToCart(customVehicleData);
                    
                    // Remove the pending vehicle after processing
                    localStorage.removeItem('carverse_pending_custom_vehicle');
                } catch (e) {
                    console.error('Error parsing custom vehicle data:', e);
                    showEmptyCartState();
                }
            } else {
                // If cart is still empty, show empty state
                if (cartItems && cartItems.children.length === 0) {
                    showEmptyCartState();
                }
            }
        }
        
        // Update item count
        updateItemCount();
    }
    
    // Render cart items from currentCart array
    function renderCartItems() {
        if (!cartItems || currentCart.length === 0) return;
        
        // Clear current items
        cartItems.innerHTML = '';
        
        // Add each item to the cart
        currentCart.forEach(item => {
            let itemHTML = '';
            
            if (item.type === 'vehicle') {
                // Vehicle item with custom options
                itemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="item-type">Vehicle Reservation</div>
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="image-counter">1/4</div>
                            <div class="image-nav">
                                <button class="image-prev"><i class="fas fa-chevron-left"></i></button>
                                <button class="image-next"><i class="fas fa-chevron-right"></i></button>
                            </div>
                        </div>
                        <div class="item-details">
                            <div class="item-main-info">
                                <h3>${item.name}</h3>
                                <div class="item-price">${item.price}</div>
                            </div>
                            <div class="item-specs">
                                ${renderVehicleSpecs(item)}
                            </div>
                            <div class="reservation-status">
                                <div class="status-badge">Reservation Pending</div>
                                <div class="deposit-info">
                                    Deposit Required: $${formatNumber(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * 0.1)}
                                </div>
                            </div>
                            <div class="item-config">
                                <button class="outline-btn">Edit Configuration</button>
                            </div>
                            <div class="item-actions">
                                <button class="action-btn remove-item"><i class="fas fa-trash-alt"></i> Remove</button>
                                <button class="action-btn save-for-later"><i class="fas fa-bookmark"></i> Save for Later</button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (item.type === 'accessory') {
                // Accessory item with quantity
                itemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="item-type">Accessory</div>
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <div class="item-main-info">
                                <h3>${item.name}</h3>
                                <div class="item-price">${item.price}</div>
                            </div>
                            <div class="item-description">
                                <p>${item.description || 'Premium accessory for your luxury vehicle.'}</p>
                            </div>
                            <div class="quantity-selector">
                                <label for="quantity-${item.id}">Quantity:</label>
                                <div class="quantity-controls">
                                    <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                                    <input type="number" id="quantity-${item.id}" class="quantity-input" value="${item.quantity || 1}" min="1" max="10">
                                    <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                            <div class="item-subtotal">
                                Subtotal: <span class="amount">${formatCurrency(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * (item.quantity || 1))}</span>
                            </div>
                            <div class="item-actions">
                                <button class="action-btn remove-item"><i class="fas fa-trash-alt"></i> Remove</button>
                                <button class="action-btn save-for-later"><i class="fas fa-bookmark"></i> Save for Later</button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Service package
                itemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="item-type">Service Package</div>
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <div class="item-main-info">
                                <h3>${item.name}</h3>
                                <div class="item-price">${item.price}</div>
                            </div>
                            <div class="item-description">
                                <p>${item.description || '3-year comprehensive maintenance package including all scheduled services, wear and tear items, and priority scheduling.'}</p>
                            </div>
                            <div class="package-details">
                                ${renderPackageDetails(item)}
                            </div>
                            <div class="item-actions">
                                <button class="action-btn remove-item"><i class="fas fa-trash-alt"></i> Remove</button>
                                <a href="#" class="action-link">View Full Details</a>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            cartItems.innerHTML += itemHTML;
        });
        
        // Update item count
        updateItemCount();
    }
    
    // Render vehicle specs
    function renderVehicleSpecs(vehicle) {
        if (!vehicle.specs) {
            return `
                <div class="spec-item">
                    <span class="spec-label">Year:</span>
                    <span class="spec-value">2023</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Color:</span>
                    <span class="spec-value">Custom</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Interior:</span>
                    <span class="spec-value">Premium Leather</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Engine:</span>
                    <span class="spec-value">Standard</span>
                </div>
            `;
        }
        
        let specsHTML = '';
        
        // Generate HTML for each specification
        for (const key in vehicle.specs) {
            specsHTML += `
                <div class="spec-item">
                    <span class="spec-label">${formatSpecLabel(key)}:</span>
                    <span class="spec-value">${vehicle.specs[key]}</span>
                </div>
            `;
        }
        
        return specsHTML;
    }
    
    // Format specification label
    function formatSpecLabel(key) {
        return key.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    // Render package details
    function renderPackageDetails(packageItem) {
        if (!packageItem.details || packageItem.details.length === 0) { 
            return `
                <div class="detail-item"><i class="fas fa-check"></i> Oil changes and fluid top-ups</div>
                <div class="detail-item"><i class="fas fa-check"></i> Brake pads and rotors</div>
                <div class="detail-item"><i class="fas fa-check"></i> Filter replacements</div>
                <div class="detail-item"><i class="fas fa-check"></i> 24/7 Roadside assistance</div>
            `;
        }
         
        let detailsHTML = '';
        
        // Generate HTML for each detail
        packageItem.details.forEach(detail => {
            detailsHTML += `<div class="detail-item"><i class="fas fa-check"></i> ${detail}</div>`;
        });
        
        return detailsHTML;
    }
    
    // Format number with commas
    function formatNumber(number) {
        return Math.round(number).toLocaleString('en-US');
    }
    
    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    }
    
    // Add custom vehicle to cart
    function addCustomVehicleToCart(vehicleData) {
        // Create cart item from vehicle data
        const cartItem = {
            id: vehicleData.id || `custom-vehicle-${Date.now()}`,
            type: 'vehicle',
            name: vehicleData.name || 'Custom Vehicle',
            price: vehicleData.price || '$500,000',
            image: vehicleData.image || '/api/placeholder/300/200',
            specs: vehicleData.specs || {
                year: '2023',
                color: vehicleData.color || 'Custom',
                interior: vehicleData.interior || 'Premium Leather',
                engine: vehicleData.engine || 'Standard'
            }
        };
        
        // Add to cart array
        currentCart.push(cartItem);
        
        // Save to localStorage
        localStorage.setItem('carverse_cart', JSON.stringify(currentCart));
        
        // Render cart items
        if (document.querySelector('.empty-cart')) {
            // Remove empty cart state and restore cart structure
            document.querySelector('.cart-content').innerHTML = `
                <div class="cart-main">
                    <div class="cart-header">
                        <h2>Your Selections (<span id="item-count">1</span>)</h2>
                        <div class="cart-actions">
                            <button class="text-btn" id="clear-cart">Clear Cart</button>
                            <button class="text-btn" id="save-cart">Save Cart</button>
                        </div>
                    </div>
                    <div class="cart-items"></div>
                </div>
                <div class="cart-sidebar">
                    <!-- Order summary content would be here -->
                </div>
            `;
            
            // Re-initialize elements
            cartItems = document.querySelector('.cart-items');
            itemCount = document.getElementById('item-count');
            clearCartBtn = document.getElementById('clear-cart');
            saveCartBtn = document.getElementById('save-cart');
            
            // Add event listeners again
            if (clearCartBtn) {
                clearCartBtn.addEventListener('click', clearCartHandler);
            }
            
            if (saveCartBtn) {
                saveCartBtn.addEventListener('click', saveCartHandler);
            }
        }
        
        // Render cart items
        renderCartItems();
        
        // Update order summary
        updateOrderSummary();
        
        // Show notification
        showNotification('Custom vehicle added to cart');
    }
    
    function showEmptyCartState() {
        // Get the empty cart template
        const template = document.getElementById('empty-cart-template');
        const cartContent = document.querySelector('.cart-content');
        
        if (template && cartContent) {
            // Clone the template content
            const emptyCartEl = template.content.cloneNode(true);
            
            // Clear the cart content and append the empty state
            cartContent.innerHTML = '';
            cartContent.appendChild(emptyCartEl);
        }
    }
    
    // Event Delegation for Cart Items
    if (cartItems) {
        cartItems.addEventListener('click', function(e) {
            // Remove item button
            if (e.target.closest('.remove-item')) {
                const cartItem = e.target.closest('.cart-item');
                if (cartItem) {
                    itemToRemove = cartItem.dataset.id;
                    openRemoveModal();
                }
            }
            
            // Save for later button
            else if (e.target.closest('.save-for-later')) {
                const cartItem = e.target.closest('.cart-item');
                if (cartItem) {
                    saveItemForLater(cartItem);
                }
            }
            
            // Edit configuration button
            else if (e.target.closest('.outline-btn') && e.target.textContent.includes('Edit Configuration')) {
                const cartItem = e.target.closest('.cart-item');
                if (cartItem) {
                    editItemConfiguration(cartItem);
                }
            }
            
            // Quantity controls
            else if (e.target.closest('.quantity-btn')) {
                const quantityBtn = e.target.closest('.quantity-btn');
                const cartItem = quantityBtn.closest('.cart-item');
                
                if (cartItem) {
                    const quantityInput = cartItem.querySelector('.quantity-input');
                    let quantity = parseInt(quantityInput.value);
                    
                    if (quantityBtn.classList.contains('decrease')) {
                        // Decrease quantity
                        if (quantity > 1) {
                            quantity--;
                            quantityInput.value = quantity;
                            updateItemQuantity(cartItem, quantity);
                        }
                    } else if (quantityBtn.classList.contains('increase')) {
                        // Increase quantity
                        quantity++;
                        quantityInput.value = quantity;
                        updateItemQuantity(cartItem, quantity);
                    }
                }
            }
            
            // Image navigation
            else if (e.target.closest('.image-prev') || e.target.closest('.image-next')) {
                const navBtn = e.target.closest('.image-prev') || e.target.closest('.image-next');
                const cartItem = navBtn.closest('.cart-item');
                
                if (cartItem) {
                    navigateItemImages(cartItem, navBtn.classList.contains('image-next'));
                }
            }
        });
        
        // Listen for quantity input changes
        cartItems.addEventListener('change', function(e) {
            if (e.target.classList.contains('quantity-input')) {
                const cartItem = e.target.closest('.cart-item');
                const quantity = parseInt(e.target.value);
                
                if (cartItem && !isNaN(quantity) && quantity > 0) {
                    updateItemQuantity(cartItem, quantity);
                } else {
                    // Reset to 1 if invalid
                    e.target.value = 1;
                    updateItemQuantity(cartItem, 1);
                }
            }
        });
    }
    
    // Save item for later
    function saveItemForLater(cartItem) {
        const itemId = cartItem.dataset.id;
        const itemName = cartItem.querySelector('h3').textContent;
        const itemPrice = cartItem.querySelector('.item-price').textContent;
        const itemImage = cartItem.querySelector('.item-image img').src;
        
        // Add animation before removing
        cartItem.classList.add('item-removed');
        
        // Wait for animation to complete
        setTimeout(() => {
            // Remove from cart
            cartItem.remove();
            
            // Update item count
            updateItemCount();
            
            // Add to saved items
            const savedItemHTML = `
                <div class="saved-item" data-id="${itemId}">
                    <div class="saved-image">
                        <img src="${itemImage}" alt="${itemName}">
                    </div>
                    <div class="saved-details">
                        <h4>${itemName}</h4>
                        <div class="saved-price">${itemPrice}</div>
                    </div>
                    <div class="saved-actions">
                        <button class="outline-btn add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;
            
            savedItemsList.innerHTML += savedItemHTML;
            savedCount.textContent = savedItemsList.querySelectorAll('.saved-item').length;
            
            // Ensure saved items section is visible
            savedItems.style.display = 'block';
            
            // Show success message
            showNotification('Item saved for later');
            
            // Check if cart is now empty
            if (cartItems.childElementCount === 0) {
                showEmptyCartState();
            }
        }, 300);
    }
    
    // Update item quantity and subtotal
    function updateItemQuantity(cartItem, quantity) {
        // Update subtotal if it exists
        const subtotalEl = cartItem.querySelector('.item-subtotal .amount');
        if (subtotalEl) {
            const priceText = cartItem.querySelector('.item-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
            const subtotal = price * quantity;
            
            // Format subtotal as currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            // Add animation class
            subtotalEl.classList.add('price-changed');
            
            // Update subtotal text
            subtotalEl.textContent = formatter.format(subtotal);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                subtotalEl.classList.remove('price-changed');
            }, 500);
            
            // Update order summary
            updateOrderSummary();
        }
    }
    
    // Navigate through item images
    function navigateItemImages(cartItem, isNext) {
        const counter = cartItem.querySelector('.image-counter');
        if (counter) {
            const [current, total] = counter.textContent.split('/').map(num => parseInt(num.trim()));
            let newIndex;
            
            if (isNext) {
                newIndex = current < total ? current + 1 : 1;
            } else {
                newIndex = current > 1 ? current - 1 : total;
            }
            
            // Update counter
            counter.textContent = `${newIndex}/${total}`;
            
            // In a real implementation, you would change the image source here
            // For this demo, we'll simulate a change with a subtle animation
            const image = cartItem.querySelector('.item-image img');
            image.style.opacity = '0.5';
            
            setTimeout(() => {
                // This would be where you change the image source
                // image.src = newImageSource;
                image.style.opacity = '1';
            }, 200);
        }
    }
    
    // Edit item configuration
    function editItemConfiguration(cartItem) {
        const itemId = cartItem.dataset.id;
        
        // In a real implementation, this would open a configuration modal or redirect to the customize page
        // For this demo, we'll show a notification
        showNotification('Redirecting to configuration page...');
        
        // Simulate redirection
        setTimeout(() => {
            window.location.href = 'customize.html?item=' + itemId;
        }, 1500);
    }
    
    // Remove item modal
    function openRemoveModal() {
        if (removeModal) {
            removeModal.classList.add('active');
        }
    }
    
    // Close all modals
    function closeModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    // Update item count
    function updateItemCount() {
        if (itemCount) {
            const count = cartItems ? cartItems.querySelectorAll('.cart-item').length : 0;
            itemCount.textContent = count;
        }
    }
    
    // Update order summary
    function updateOrderSummary() {
        // Calculate subtotal
        let subtotal = 0;
        let accessoriesTotal = 0;
        let vehicleTotal = 0;
        
        if (!cartItems) return;
        
        cartItems.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.item-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
            
            // Check if this is a vehicle or accessory/service
            const itemType = item.querySelector('.item-type').textContent.toLowerCase();
            
            if (itemType.includes('vehicle')) {
                vehicleTotal += price;
            } else {
                // For accessories/services, consider quantity
                const quantityInput = item.querySelector('.quantity-input');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                accessoriesTotal += price * quantity;
            }
            
            subtotal += price;
        });
        
        // Update summary values
        const summaryItems = document.querySelectorAll('.summary-item');
        summaryItems.forEach(item => {
            const label = item.querySelector('.summary-label').textContent.toLowerCase();
            const valueEl = item.querySelector('.summary-value');
            
            // Format as currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            if (label.includes('subtotal')) {
                valueEl.textContent = formatter.format(subtotal);
            } else if (label.includes('vehicle')) {
                valueEl.textContent = formatter.format(vehicleTotal);
            } else if (label.includes('accessories')) {
                valueEl.textContent = formatter.format(accessoriesTotal);
            }
        });
        
        // Calculate and update total
        const shippingValue = document.querySelector('.summary-item:nth-child(4) .summary-value');
        const taxesValue = document.querySelector('.summary-item:nth-child(5) .summary-value');
        
        // Extract shipping and taxes values
        const shipping = shippingValue ? parseFloat(shippingValue.textContent.replace(/[^0-9.-]+/g, '')) : 0;
        const taxes = taxesValue ? parseFloat(taxesValue.textContent.replace(/[^0-9.-]+/g, '')) : 0;
        
        // Calculate total
        const total = subtotal + shipping + taxes;
        
        // Update total in UI
        const totalValueEl = document.querySelector('.total-value');
        if (totalValueEl) {
            totalValueEl.classList.add('price-changed');
            totalValueEl.textContent = formatter.format(total);
            
            setTimeout(() => {
                totalValueEl.classList.remove('price-changed');
            }, 500);
        }
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Update message and show
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide after delay
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Event Listeners for Saved Items
    if (savedItems) {
        // Toggle saved items visibility
        if (toggleSavedBtn) {
            toggleSavedBtn.addEventListener('click', function() {
                if (savedItemsList.style.display === 'none') {
                    savedItemsList.style.display = 'grid';
                    toggleSavedBtn.textContent = 'Hide';
                } else {
                    savedItemsList.style.display = 'none';
                    toggleSavedBtn.textContent = 'Show';
                }
            });
        }
        
        // Add saved item back to cart
        if (savedItemsList) {
            savedItemsList.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-to-cart')) {
                    const savedItem = e.target.closest('.saved-item');
                    if (savedItem) {
                        addSavedItemToCart(savedItem);
                    }
                }
            });
        }
    }
    
    // Add saved item back to cart
    function addSavedItemToCart(savedItem) {
        const itemId = savedItem.dataset.id;
        const itemName = savedItem.querySelector('h4').textContent;
        const itemPrice = savedItem.querySelector('.saved-price').textContent;
        const itemImage = savedItem.querySelector('.saved-image img').src;
        
        // Remove from saved items
        savedItem.remove();
        
        // Update saved count
        if (savedCount) {
            savedCount.textContent = savedItemsList.querySelectorAll('.saved-item').length;
        }
        
        // Check if cart was empty
        const wasEmpty = document.querySelector('.empty-cart');
        if (wasEmpty) {
            // Remove empty cart state
            wasEmpty.remove();
            
            // Restore cart structure
            const cartContent = document.querySelector('.cart-content');
            cartContent.innerHTML = `
                <div class="cart-main">
                    <div class="cart-header">
                        <h2>Your Selections (<span id="item-count">1</span>)</h2>
                        <div class="cart-actions">
                            <button class="text-btn" id="clear-cart">Clear Cart</button>
                            <button class="text-btn" id="save-cart">Save Cart</button>
                        </div>
                    </div>
                    <div class="cart-items"></div>
                </div>
                <div class="cart-sidebar">
                    <!-- Order summary content would be here -->
                </div>
            `;
        }
        
        // Add simplified item to cart
        const cartItemHTML = `
            <div class="cart-item item-added" data-id="${itemId}">
                <div class="item-type">Accessory</div>
                <div class="item-image">
                    <img src="${itemImage}" alt="${itemName}">
                </div>
                <div class="item-details">
                    <div class="item-main-info">
                        <h3>${itemName}</h3>
                        <div class="item-price">${itemPrice}</div>
                    </div>
                    <div class="item-description">
                        <p>Premium accessory for your luxury vehicle.</p>
                    </div>
                    <div class="quantity-selector">
                        <label for="quantity-${itemId}">Quantity:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                            <input type="number" id="quantity-${itemId}" class="quantity-input" value="1" min="1" max="10">
                            <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="item-subtotal">
                        Subtotal: <span class="amount">${itemPrice}</span>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn remove-item"><i class="fas fa-trash-alt"></i> Remove</button>
                        <button class="action-btn save-for-later"><i class="fas fa-bookmark"></i> Save for Later</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add to cart
        if (cartItems) {
            cartItems.innerHTML += cartItemHTML;
        }
        
        // Update item count
        updateItemCount();
        
        // Update order summary
        updateOrderSummary();
        
        // Show notification
        showNotification('Item added to cart');
        
        // Hide saved items section if empty
        if (savedItemsList && savedItemsList.querySelectorAll('.saved-item').length === 0 && savedItems) {
            savedItems.style.display = 'none';
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            const addedItem = cartItems.querySelector('.item-added');
            if (addedItem) {
                addedItem.classList.remove('item-added');
            }
        }, 500);
    }
    
    // Event Listeners for Related Products
    const relatedItems = document.querySelector('.related-items');
    if (relatedItems) {
        relatedItems.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const relatedItem = e.target.closest('.related-item');
                if (relatedItem) {
                    addRelatedItemToCart(relatedItem);
                }
            }
        });
    }
    
    // Add related item to cart
    function addRelatedItemToCart(relatedItem) {
        const itemId = relatedItem.dataset.id;
        const itemName = relatedItem.querySelector('h4').textContent;
        const itemPrice = relatedItem.querySelector('.related-price').textContent;
        const itemImage = relatedItem.querySelector('.related-image img').src;
        
        // Check if cart was empty
        const wasEmpty = document.querySelector('.empty-cart');
        if (wasEmpty) {
            // Remove empty cart state and restore cart structure
            // This would be similar to the code in addSavedItemToCart
        }
        
        // Add to cart with animation
        const cartItemHTML = `
            <div class="cart-item item-added" data-id="${itemId}">
                <div class="item-type">Accessory</div>
                <div class="item-image">
                    <img src="${itemImage}" alt="${itemName}">
                </div>
                <div class="item-details">
                    <div class="item-main-info">
                        <h3>${itemName}</h3>
                        <div class="item-price">${itemPrice}</div>
                    </div>
                    <div class="item-description">
                        <p>Premium accessory for your luxury vehicle.</p>
                    </div>
                    <div class="quantity-selector">
                        <label for="quantity-${itemId}">Quantity:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                            <input type="number" id="quantity-${itemId}" class="quantity-input" value="1" min="1" max="10">
                            <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="item-subtotal">
                        Subtotal: <span class="amount">${itemPrice}</span>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn remove-item"><i class="fas fa-trash-alt"></i> Remove</button>
                        <button class="action-btn save-for-later"><i class="fas fa-bookmark"></i> Save for Later</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add to cart
        if (cartItems) {
            cartItems.innerHTML += cartItemHTML;
        }
        
        // Update count and summary
        updateItemCount();
        updateOrderSummary();
        
        // Show notification
        showNotification('Item added to cart');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            const addedItem = cartItems.querySelector('.item-added');
            if (addedItem) {
                addedItem.classList.remove('item-added');
            }
        }, 500);
    }
    
    // Clear cart handler
    function clearCartHandler() {
        if (confirm('Are you sure you want to clear your cart?')) {
            // Remove all items
            if (cartItems) {
                cartItems.innerHTML = '';
            }
            
            // Update count
            updateItemCount();
            
            // Show empty state
            showEmptyCartState();
            
            // Show notification
            showNotification('Cart cleared');
            
            // Clear localStorage
            localStorage.removeItem('carverse_cart');
        }
    }
    
    // Save cart handler
    function saveCartHandler() {
        // In a real implementation, this would save the cart to localStorage or server
        // For this demo, we'll just show the modal
        if (cartSavedModal) {
            cartSavedModal.classList.add('active');
        }
    }
    
    // Set up clear cart button
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCartHandler);
    }
    
    // Set up save cart button
    if (saveCartBtn) {
        saveCartBtn.addEventListener('click', saveCartHandler);
    }
    
    // Modal close buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Cancel remove button
    if (cancelRemoveBtn) {
        cancelRemoveBtn.addEventListener('click', function() {
            itemToRemove = null;
            closeModals();
        });
    }
    
    // Confirm remove button
    if (confirmRemoveBtn) {
        confirmRemoveBtn.addEventListener('click', function() {
            if (itemToRemove) {
                // Find and remove the item
                const itemToRemoveEl = cartItems.querySelector(`.cart-item[data-id="${itemToRemove}"]`);
                
                if (itemToRemoveEl) {
                    // Add animation
                    itemToRemoveEl.classList.add('item-removed');
                    
                    // Wait for animation to complete
                    setTimeout(() => {
                        // Remove the item
                        itemToRemoveEl.remove();
                        
                        // Update counts and summary
                        updateItemCount();
                        updateOrderSummary();
                        
                        // Show notification
                        showNotification('Item removed from cart');
                        
                        // Check if cart is empty
                        if (cartItems.childElementCount === 0) {
                            showEmptyCartState();
                        }
                        
                        // Update cart in localStorage
                        updateCartStorage();
                    }, 300);
                }
                
                // Reset item to remove
                itemToRemove = null;
                
                // Close modal
                closeModals();
            }
        });
    }
    
    // Update cart in localStorage
    function updateCartStorage() {
        const cartItemElements = cartItems.querySelectorAll('.cart-item');
        const cartData = [];
        
        cartItemElements.forEach(item => {
            const itemId = item.dataset.id;
            const itemType = item.querySelector('.item-type').textContent.toLowerCase();
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = item.querySelector('.item-price').textContent;
            const itemImage = item.querySelector('.item-image img').src;
            
            // Create cart item object
            const cartItem = {
                id: itemId,
                type: itemType.includes('vehicle') ? 'vehicle' : 
                      itemType.includes('service') ? 'service' : 'accessory',
                name: itemName,
                price: itemPrice,
                image: itemImage
            };
            
            // Add quantity if it's an accessory
            if (cartItem.type === 'accessory') {
                const quantityInput = item.querySelector('.quantity-input');
                if (quantityInput) {
                    cartItem.quantity = parseInt(quantityInput.value) || 1;
                }
            }
            
            // Add to cart data
            cartData.push(cartItem);
        });
        
        // Save to localStorage
        localStorage.setItem('carverse_cart', JSON.stringify(cartData));
    }
    
    // Financing calculator functionality
    const downPaymentInput = document.getElementById('down-payment');
    const termOptions = document.querySelectorAll('.term-option');
    
    // Update financing when down payment changes
    if (downPaymentInput) {
        downPaymentInput.addEventListener('input', updateFinancingEstimate);
    }
    
    // Update financing when term changes
    if (termOptions.length > 0) {
        termOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                termOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update financing estimate
                updateFinancingEstimate();
            });
        });
    }
    
    // Update financing estimate
    function updateFinancingEstimate() {
        // Get total price from order summary
        const totalValueEl = document.querySelector('.total-value');
        if (!totalValueEl) return;
        
        const totalPrice = parseFloat(totalValueEl.textContent.replace(/[^0-9.-]+/g, ''));
        
        // Get down payment
        const downPayment = downPaymentInput ? parseFloat(downPaymentInput.value) : 100000;
        
        // Get selected term
        const activeTerm = document.querySelector('.term-option.active');
        const term = activeTerm ? parseInt(activeTerm.dataset.term) : 48;
        
        // Interest rate based on term (simplified)
        let interestRate;
        switch (term) {
            case 36:
                interestRate = 4.49;
                break;
            case 48:
                interestRate = 4.99;
                break;
            case 60:
                interestRate = 5.49;
                break;
            case 72:
                interestRate = 5.99;
                break;
            default:
                interestRate = 4.99;
        }
        
        // Calculate loan amount
        const loanAmount = totalPrice - downPayment;
        
        // Calculate monthly payment (simplified)
        const monthlyInterest = interestRate / 100 / 12;
        const monthlyPayment = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, term)) / 
                              (Math.pow(1 + monthlyInterest, term) - 1);
        
        // Calculate total cost
        const totalCost = (monthlyPayment * term) + downPayment;
        
        // Update UI
        const monthlyPaymentEl = document.querySelector('.estimate-item:nth-child(1) .estimate-value');
        const interestRateEl = document.querySelector('.estimate-item:nth-child(2) .estimate-value');
        const totalCostEl = document.querySelector('.estimate-item:nth-child(3) .estimate-value');
        
        if (monthlyPaymentEl && interestRateEl && totalCostEl) {
            // Format as currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            // Add animation class
            monthlyPaymentEl.classList.add('price-changed');
            totalCostEl.classList.add('price-changed');
            
            // Update values
            monthlyPaymentEl.textContent = formatter.format(monthlyPayment);
            interestRateEl.textContent = interestRate.toFixed(2) + '%';
            totalCostEl.textContent = formatter.format(totalCost);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                monthlyPaymentEl.classList.remove('price-changed');
                totalCostEl.classList.remove('price-changed');
            }, 500);
        }
    }
    
    // Delivery options
    const deliveryOptions = document.querySelectorAll('input[name="delivery-method"]');
    
    if (deliveryOptions.length > 0) {
        deliveryOptions.forEach(option => {
            option.addEventListener('change', updateDeliveryOption);
        });
    }
    
    // Update delivery option
    function updateDeliveryOption() {
        const selectedOption = document.querySelector('input[name="delivery-method"]:checked');
        if (selectedOption) {
            const deliveryDetails = selectedOption.closest('.delivery-option').querySelector('.delivery-details');
            const deliveryCostText = deliveryDetails.querySelector('.delivery-cost').textContent;
            const deliveryCost = parseFloat(deliveryCostText.replace(/[^0-9.-]+/g, ''));
            
            // Update shipping cost in summary
            const shippingValueEl = document.querySelector('.summary-item:nth-child(4) .summary-value');
            if (shippingValueEl) {
                // Format as currency
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                });
                
                // Add animation class
                shippingValueEl.classList.add('price-changed');
                
                // Update value
                shippingValueEl.textContent = formatter.format(deliveryCost);
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    shippingValueEl.classList.remove('price-changed');
                }, 500);
                
                // Update order summary
                updateOrderSummary();
            }
        }
    }
    
    // Apply promo code button
    const applyPromoBtn = document.querySelector('.apply-promo');
    
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoInput = document.querySelector('.promo-field input');
            if (promoInput && promoInput.value.trim() !== '') {
                applyPromoCode(promoInput.value);
                promoInput.value = '';
            }
        });
    }
    
    // Apply promo code
    function applyPromoCode(code) {
        // In a real implementation, this would validate the code against a database
        // For this demo, we'll accept any code
        
        // Show success message
        showNotification('Promo code applied: 10% discount');
        
        // Add a promo code item to the summary
        const summaryItems = document.querySelector('.summary-items');
        const promoCode = document.querySelector('.promo-code');
        
        // Create a new summary item for the discount
        const discountItem = document.createElement('div');
        discountItem.className = 'summary-item';
        
        // Get total before discount
        const totalValueEl = document.querySelector('.total-value');
        const totalBeforeDiscount = parseFloat(totalValueEl.textContent.replace(/[^0-9.-]+/g, ''));
        
        // Calculate 10% discount
        const discountAmount = totalBeforeDiscount * 0.1;
        
        // Format as currency
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
        
        // Set discount HTML
        discountItem.innerHTML = `
            <div class="summary-label">Discount (Promo: ${code})</div>
            <div class="summary-value">-${formatter.format(discountAmount)}</div>
        `;
        
        // Check if discount already exists and remove it
        const existingDiscount = document.querySelector('.summary-label').textContent.includes('Discount');
        if (existingDiscount) {
            existingDiscount.closest('.summary-item').remove();
        }
        
        // Insert discount before total
        if (promoCode && summaryItems) {
            const totalItem = document.querySelector('.summary-total');
            if (totalItem) {
                summaryItems.insertBefore(discountItem, totalItem);
            } else {
                summaryItems.appendChild(discountItem);
            }
            
            // Update the order summary
            updateOrderSummary();
            
            // Add animation to discount
            discountItem.classList.add('price-changed');
            setTimeout(() => {
                discountItem.classList.remove('price-changed');
            }, 500);
        }
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // In a real implementation, this would redirect to checkout page
            // For this demo, we'll show a notification
            showNotification('Redirecting to checkout...');
            
            // Simulate redirect after delay
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1500);
        });
    }
    
    // Continue shopping button
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            // Navigate back to showroom
            window.location.href = 'showroom.html';
        });
    }
    
    // Add notification CSS if it doesn't exist
    if (!document.getElementById('notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background-color: var(--primary-color);
                color: white;
                padding: 12px 25px;
                border-radius: 5px;
                font-size: 0.9rem;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                z-index: 2000;
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize financing calculator
    updateFinancingEstimate();
}); 