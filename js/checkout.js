// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements - Login/Guest Toggle
    const guestBtn = document.querySelector('.toggle-btn[data-option="guest"]');
    const loginBtn = document.querySelector('.toggle-btn[data-option="login"]');
    const loginForm = document.querySelector('.login-form');
    
    // DOM Elements - Shipping
    const differentBillingCheckbox = document.getElementById('different-billing');
    const billingAddressSection = document.getElementById('billing-address');
    
    // DOM Elements - Delivery Options
    const standardDeliveryRadio = document.getElementById('standard-delivery');
    const expeditedDeliveryRadio = document.getElementById('expedited-delivery');
    const showroomPickupRadio = document.getElementById('showroom-pickup');
    const showroomOptions = document.getElementById('showroom-options');
    const shippingCostElement = document.getElementById('shipping-cost');
    
    // DOM Elements - Payment Methods
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardPaymentForm = document.getElementById('card-payment');
    const bankPaymentForm = document.getElementById('bank-payment');
    const financingPaymentForm = document.getElementById('financing-payment');
    
    // DOM Elements - Financing Calculator
    const downPaymentInput = document.getElementById('down-payment');
    const termButtons = document.querySelectorAll('.term-button');
    
    // DOM Elements - Form Submission
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const termsCheckbox = document.getElementById('terms');
    
    // DOM Elements - Modals
    const chatModal = document.getElementById('chat-modal');
    const startChatBtn = document.getElementById('start-chat');
    const processingModal = document.getElementById('processing-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // DOM Elements - Chat Interface
    const chatInput = document.querySelector('.chat-input');
    const sendMessageBtn = document.querySelector('.send-message-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    // DOM Elements - Promo Code
    const removePromoBtn = document.querySelector('.remove-promo');
    
    // Initialize the checkout form
    initializeCheckout();
    
    function initializeCheckout() {
        // Check for any cart items in localStorage
        loadCartItems();
        
        // Initialize the form fields with any saved data
        loadSavedCustomerData();
        
        // Initialize payment forms visibility
        updatePaymentForms('card');
        
        // Calculate initial financing
        updateFinancingEstimate();
    }
    
    // Load cart items from localStorage
    function loadCartItems() {
        try {
            const savedCart = localStorage.getItem('carverse_cart');
            
            if (savedCart) {
                const cartItems = JSON.parse(savedCart);
                
                // Update order summary with cart totals
                // This would be implemented in a real application
                console.log('Cart loaded with', cartItems.length, 'items');
            }
        } catch (e) {
            console.error('Error loading cart:', e);
        }
    }
    
    // Load saved customer data if available
    function loadSavedCustomerData() {
        try {
            const savedCustomerData = localStorage.getItem('carverse_customer_data');
            
            if (savedCustomerData) {
                const customerData = JSON.parse(savedCustomerData);
                
                // Fill in form fields with saved data
                // This would be implemented in a real application
                console.log('Customer data loaded');
            }
        } catch (e) {
            console.error('Error loading customer data:', e);
        }
    }
    
    // Guest/Login Toggle Functionality
    if (guestBtn && loginBtn && loginForm) {
        guestBtn.addEventListener('click', function() {
            guestBtn.classList.add('active');
            loginBtn.classList.remove('active');
            loginForm.style.display = 'none';
        });
        
        loginBtn.addEventListener('click', function() {
            loginBtn.classList.add('active');
            guestBtn.classList.remove('active');
            loginForm.style.display = 'block';
        });
    }
    
    // Different Billing Address Toggle
    if (differentBillingCheckbox && billingAddressSection) {
        differentBillingCheckbox.addEventListener('change', function() {
            billingAddressSection.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    // Delivery Options Functionality
    if (showroomPickupRadio && showroomOptions) {
        // Show showroom options when showroom pickup is selected
        showroomPickupRadio.addEventListener('change', function() {
            if (this.checked) {
                showroomOptions.style.display = 'block';
                updateShippingCost(0);
            } else {
                showroomOptions.style.display = 'none';
            }
        });
        
        // Handle standard delivery selection
        if (standardDeliveryRadio) {
            standardDeliveryRadio.addEventListener('change', function() {
                if (this.checked) {
                    showroomOptions.style.display = 'none';
                    updateShippingCost(5000);
                }
            });
        }
        
        // Handle expedited delivery selection
        if (expeditedDeliveryRadio) {
            expeditedDeliveryRadio.addEventListener('change', function() {
                if (this.checked) {
                    showroomOptions.style.display = 'none';
                    updateShippingCost(8500);
                }
            });
        }
    }
    
    // Update shipping cost in order summary
    function updateShippingCost(cost) {
        if (shippingCostElement) {
            // Format cost as currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            // Add animation class
            shippingCostElement.classList.add('price-changed');
            
            // Update cost
            shippingCostElement.textContent = formatter.format(cost);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                shippingCostElement.classList.remove('price-changed');
            }, 500);
            
            // Update order summary totals
            updateOrderSummary();
        }
    }
    
    // Update order summary totals
    function updateOrderSummary() {
        // Get all the cost elements
        const subtotalEl = document.querySelector('.summary-item:nth-child(1) .summary-value');
        const vehicleEl = document.querySelector('.summary-item:nth-child(2) .summary-value');
        const accessoriesEl = document.querySelector('.summary-item:nth-child(3) .summary-value');
        const shippingEl = document.querySelector('.summary-item:nth-child(4) .summary-value');
        const taxesEl = document.querySelector('.summary-item:nth-child(5) .summary-value');
        const totalEl = document.querySelector('.total-value');
        
        // Get the cost values
        const subtotal = parseFloat(subtotalEl.textContent.replace(/[^0-9.-]+/g, ''));
        const vehicle = parseFloat(vehicleEl.textContent.replace(/[^0-9.-]+/g, ''));
        const accessories = parseFloat(accessoriesEl.textContent.replace(/[^0-9.-]+/g, ''));
        const shipping = parseFloat(shippingEl.textContent.replace(/[^0-9.-]+/g, ''));
        const taxes = parseFloat(taxesEl.textContent.replace(/[^0-9.-]+/g, ''));
        
        // Check for promo discount
        let discount = 0;
        const promoEl = document.querySelector('.promo-savings');
        if (promoEl) {
            discount = parseFloat(promoEl.textContent.replace(/[^0-9.-]+/g, ''));
        }
        
        // Calculate total
        const total = subtotal + shipping + taxes - discount;
        
        // Format as currency
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
        
        // Update total
        if (totalEl) {
            totalEl.classList.add('price-changed');
            totalEl.textContent = formatter.format(total);
            
            setTimeout(() => {
                totalEl.classList.remove('price-changed');
            }, 500);
        }
    }
    
    // Payment Method Selection
    if (paymentOptions.length > 0) {
        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                paymentOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Show corresponding payment form
                const paymentMethod = this.getAttribute('data-method');
                updatePaymentForms(paymentMethod);
            });
        });
    }
    
    // Update payment forms visibility
    function updatePaymentForms(method) {
        if (cardPaymentForm) cardPaymentForm.style.display = method === 'card' ? 'block' : 'none';
        if (bankPaymentForm) bankPaymentForm.style.display = method === 'bank' ? 'block' : 'none';
        if (financingPaymentForm) financingPaymentForm.style.display = method === 'financing' ? 'block' : 'none';
    }
    
    // Financing Calculator
    if (termButtons.length > 0) {
        termButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                termButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update financing estimate
                updateFinancingEstimate();
            });
        });
    }
    
    if (downPaymentInput) {
        downPaymentInput.addEventListener('input', updateFinancingEstimate);
    }
    
    // Update financing estimate
    function updateFinancingEstimate() {
        // Get vehicle price
        const vehiclePriceEl = document.querySelector('.financing-summary .summary-row:first-child .summary-value');
        if (!vehiclePriceEl) return;
        
        // Get vehicle price value
        const vehiclePrice = parseFloat(vehiclePriceEl.textContent.replace(/[^0-9.-]+/g, ''));
        
        // Get down payment
        const downPayment = downPaymentInput ? parseFloat(downPaymentInput.value) : 100000;
        
        // Update down payment display
        const downPaymentEl = document.querySelector('.financing-summary .summary-row:nth-child(2) .summary-value');
        if (downPaymentEl) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            downPaymentEl.textContent = formatter.format(downPayment);
        }
        
        // Calculate amount to finance
        const amountToFinance = vehiclePrice - downPayment;
        
        // Update amount to finance display
        const amountToFinanceEl = document.querySelector('.financing-summary .summary-row:nth-child(3) .summary-value');
        if (amountToFinanceEl) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            amountToFinanceEl.textContent = formatter.format(amountToFinance);
        }
        
        // Get selected term
        const activeTermBtn = document.querySelector('.term-button.active');
        const term = activeTermBtn ? parseInt(activeTermBtn.getAttribute('data-term')) : 48;
        
        // Update term display
        const termEl = document.querySelector('.financing-summary .summary-row:nth-child(5) .summary-value');
        if (termEl) {
            termEl.textContent = term + ' months';
        }
        
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
        
        // Update interest rate display
        const interestRateEl = document.querySelector('.financing-summary .summary-row:nth-child(4) .summary-value');
        if (interestRateEl) {
            interestRateEl.textContent = interestRate.toFixed(2) + '%';
        }
        
        // Calculate monthly payment (simplified)
        const monthlyInterest = interestRate / 100 / 12;
        const monthlyPayment = amountToFinance * (monthlyInterest * Math.pow(1 + monthlyInterest, term)) / 
                               (Math.pow(1 + monthlyInterest, term) - 1);
        
        // Update monthly payment display
        const monthlyPaymentEl = document.querySelector('.financing-summary .summary-row.highlight .summary-value');
        if (monthlyPaymentEl) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            // Add animation class
            monthlyPaymentEl.classList.add('price-changed');
            
            // Update value
            monthlyPaymentEl.textContent = formatter.format(monthlyPayment);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                monthlyPaymentEl.classList.remove('price-changed');
            }, 500);
        }
    }
    
    // Card Number Formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Add spaces every 4 digits
            if (value.length > 0) {
                value = value.match(/.{1,4}/g).join(' ');
            }
            
            e.target.value = value;
        });
    }
    
    // Card Expiry Date Formatting
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value;
        });
    }
    
    // Remove Promo Code
    if (removePromoBtn) {
        removePromoBtn.addEventListener('click', function() {
            // Get parent promo element
            const promoElement = this.closest('.promocode-applied');
            
            if (promoElement) {
                // Add fade out animation
                promoElement.style.opacity = '0';
                promoElement.style.height = promoElement.offsetHeight + 'px';
                
                // After animation, remove element
                setTimeout(() => {
                    promoElement.style.height = '0';
                    promoElement.style.marginTop = '0';
                    promoElement.style.padding = '0';
                    
                    setTimeout(() => {
                        promoElement.remove();
                        
                        // Update order summary
                        updateOrderSummary();
                    }, 300);
                }, 300);
            }
        });
    }
    
    // Form Validation
    function validateForm() {
        let isValid = true;
        
        // Basic validation for required fields
        const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightField(field, true);
            } else {
                highlightField(field, false);
            }
        });
        
        // Validate terms acceptance
        if (termsCheckbox && !termsCheckbox.checked) {
            isValid = false;
            const termsLabel = document.querySelector('label[for="terms"]');
            if (termsLabel) termsLabel.classList.add('error');
        } else {
            const termsLabel = document.querySelector('label[for="terms"]');
            if (termsLabel) termsLabel.classList.remove('error');
        }
        
        return isValid;
    }
    
    // Highlight field with error
    function highlightField(field, isError) {
        if (isError) {
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMessage = field.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'This field is required';
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            
            // Remove error message if it exists
            const errorMessage = field.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    }
    
    // Place Order Button
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Show processing modal
                if (processingModal) {
                    processingModal.classList.add('active');
                }
                
                // Simulate order processing
                setTimeout(() => {
                    // Hide processing modal
                    if (processingModal) {
                        processingModal.classList.remove('active');
                    }
                    
                    // Clear cart in localStorage
                    localStorage.removeItem('carverse_cart');
                    
                    // Redirect to confirmation page
                    window.location.href = 'confirmation.html';
                }, 3000);
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Chat Support Modal
    if (startChatBtn && chatModal) {
        startChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            chatModal.classList.add('active');
        });
    }
    
    // Chat Message Sending
    if (chatInput && sendMessageBtn && chatMessages) {
        // Send message on button click
        sendMessageBtn.addEventListener('click', sendChatMessage);
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
    
    // Send chat message
    function sendChatMessage() {
        const message = chatInput.value.trim();
        
        if (message) {
            // Add user message
            addChatMessage(message, 'user');
            
            // Clear input
            chatInput.value = '';
            
            // Simulate agent response after a delay
            setTimeout(() => {
                const responses = [
                    "Thank you for your message. A concierge specialist will be with you shortly.",
                    "I'd be happy to assist with your vehicle purchase. What specific information do you need?",
                    "Thank you for choosing CarVerse. How can I assist with your luxury vehicle order today?",
                    "Your satisfaction is our priority. Please let me know how I can enhance your CarVerse experience."
                ];
                
                // Get random response
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                // Add agent response
                addChatMessage(randomResponse, 'agent');
            }, 1000);
        }
    }
    
    // Add chat message to the chat window
    function addChatMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${type}`;
        messageEl.innerHTML = `<p>${message}</p>`;
        
        // Add to chat messages
        chatMessages.appendChild(messageEl);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Close Modal Buttons
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Find parent modal
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the place order button
    const placeOrderBtn = document.querySelector('.place-order-btn'); 
    
    // Add click event listener
    if (placeOrderBtn) { 
        placeOrderBtn.addEventListener('click', function(e) { 
            e.preventDefault();
            
            // Show processing modal if it exists
            const processingModal = document.getElementById('processing-modal');
            if (processingModal) {
                processingModal.classList.add('active');
            }
            
            // Delay for 2 seconds to show the processing animation
            setTimeout(function() {
                // Redirect to confirmation page
                window.location.href = 'confirmation.html';
            }, 2000);
        });
    }
});