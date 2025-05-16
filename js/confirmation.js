// Confirmation Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const downloadConfirmationBtn = document.querySelector('.download-confirmation');
    const emailConfirmationBtn = document.querySelector('.email-confirmation');
    const addToCalendarBtn = document.querySelector('.add-to-calendar');
    const updateAddressBtn = document.querySelector('.update-address');
    const viewReceiptBtn = document.querySelector('.view-receipt');
    const viewDetailsLink = document.querySelector('.view-details');
    const startChatBtn = document.querySelector('.start-chat');
    const documentDownloadBtns = document.querySelectorAll('.document-download');
    const createAccountBtn = document.querySelector('.create-account-btn');
    const skipAccountBtn = document.querySelector('.skip-account-btn');
    const emailNotificationCheckbox = document.getElementById('email-notifications');
    const smsNotificationCheckbox = document.getElementById('sms-notifications');
    const shareOptions = document.querySelectorAll('.share-option');
    const chatModal = document.getElementById('chat-modal');
    const calendarModal = document.getElementById('calendar-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const calendarOptions = document.querySelectorAll('.calendar-option');
    
    // DOM Elements - Chat Interface
    const chatInput = document.querySelector('.chat-input');
    const sendMessageBtn = document.querySelector('.send-message-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Initialize the confirmation page
    initializeConfirmation();
    
    function initializeConfirmation() {
        // Retrieve order details from sessionStorage or simulate them
        loadOrderDetails();
        
        // Show success animation
        animateCheckmark();
        
        // Set up status tracker
        initializeStatusTracker();
        
        // Send confirmation email (simulated)
        setTimeout(() => {
            console.log('Confirmation email sent');
        }, 2000);
    }
    
    // Load order details (in a real app, this would come from the server)
    function loadOrderDetails() {
        const orderDetails = sessionStorage.getItem('carverse_order_details');
        
        if (orderDetails) {
            // Parse and display order details
            const orderData = JSON.parse(orderDetails);
            // Update the page with order data
            updateOrderDisplay(orderData);
        } else {
            // Use default data from the HTML
            console.log('Using default order details from HTML');
        }
        
        // Set current date for order date
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const orderDateElements = document.querySelectorAll('.order-date');
        orderDateElements.forEach(el => {
            if (el) el.textContent = dateStr;
        });
    }
    
    // Update the page with order data
    function updateOrderDisplay(orderData) {
        // This would update all the order details on the page
        // For example:
        // document.querySelector('.order-number').textContent = orderData.orderNumber;
        // document.querySelector('.vehicle-name').textContent = orderData.vehicleName;
        // etc.
        console.log('Order data updated on page', orderData);
    }
    
    // Animate the checkmark
    function animateCheckmark() {
        const checkmark = document.querySelector('.checkmark.draw');
        if (checkmark) {
            checkmark.style.animation = 'none';
            setTimeout(() => {
                checkmark.style.animation = 'checkmark 0.8s ease-in-out forwards';
            }, 100);
        }
    }
    
    // Initialize the status tracker
    function initializeStatusTracker() {
        const statusSteps = document.querySelectorAll('.status-step');
        
        // Mark first step as active (already done in HTML)
        
        // Set up future animations for each step
        // In a real app, these would be triggered by server updates
        if (statusSteps.length > 1) {
            // Simulate progression of status steps (for demo purposes)
            let currentStep = 0;
            
            // In a real app, this would connect to your order tracking system
            // This is just for demonstration
            const simulateOrderProgress = false; // Set to true to see the simulation
            
            if (simulateOrderProgress) {
                const progressInterval = setInterval(() => {
                    currentStep++;
                    
                    if (currentStep < statusSteps.length) {
                        // Mark the next step as active
                        statusSteps[currentStep].classList.add('active');
                    } else {
                        // All steps complete
                        clearInterval(progressInterval);
                    }
                }, 3000); // Each step activates after 3 seconds (for demo)
            }
        }
    }
    
    // Download Confirmation Button
    if (downloadConfirmationBtn) {
        downloadConfirmationBtn.addEventListener('click', function() {
            // In a real app, this would generate and download a PDF
            // This is a simplified simulation
            simulateFileDownload('CarVerse_Order_Confirmation_CV-58721394.pdf');
        });
    }
    
    // Email Confirmation Button
    if (emailConfirmationBtn) {
        emailConfirmationBtn.addEventListener('click', function() {
            // Show a success message when clicked
            showToast('Confirmation email sent successfully!');
        });
    }
    
    // Add to Calendar Button
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() {
            if (calendarModal) {
                calendarModal.classList.add('active');
            }
        });
    }
    
    // Calendar Options
    if (calendarOptions.length > 0) {
        calendarOptions.forEach(option => {
            option.addEventListener('click', function() {
                // In a real app, this would add the event to the respective calendar
                // Close the modal after selection
                if (calendarModal) {
                    calendarModal.classList.remove('active');
                }
                
                // Show success message
                showToast('Event added to calendar successfully!');
            });
        });
    }
    
    // Update Address Button
    if (updateAddressBtn) {
        updateAddressBtn.addEventListener('click', function() {
            // In a real app, this would open an address edit form
            // For demo, just show a message
            showToast('An address update form will be emailed to you.');
        });
    }
    
    // View Receipt Button
    if (viewReceiptBtn) {
        viewReceiptBtn.addEventListener('click', function() {
            // In a real app, this would show or download the receipt
            simulateFileDownload('CarVerse_Receipt_TRX-29384756.pdf');
        });
    }
    
    // View Production Details Link
    if (viewDetailsLink) {
        viewDetailsLink.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would navigate to a detailed production page
            showToast('Production details page will be available soon.');
        });
    }
    
    // Document Download Buttons
    if (documentDownloadBtns.length > 0) {
        documentDownloadBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get document name from parent element
                const docNameEl = this.closest('.document-item').querySelector('h4');
                const docName = docNameEl ? docNameEl.textContent : 'Document';
                
                // Simulate download
                simulateFileDownload(`CarVerse_${docName.replace(/\s+/g, '_')}.pdf`);
            });
        });
    }
    
    // Simulate file download
    function simulateFileDownload(filename) {
        // Create a toast notification
        showToast(`Downloading ${filename}...`);
        
        // In a real app, this would trigger a real file download
        console.log(`File download initiated: ${filename}`);
        
        // Simulate download complete after a delay
        setTimeout(() => {
            showToast(`${filename} downloaded successfully!`);
        }, 2000);
    }
    
    // Create Account Button
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function() {
            const accountPassword = document.getElementById('account-password');
            const accountConfirmPassword = document.getElementById('account-confirm-password');
            
            // Simple validation
            if (!accountPassword || !accountPassword.value) {
                showToast('Please enter a password.', 'error');
                return;
            }
            
            if (accountPassword.value !== accountConfirmPassword.value) {
                showToast('Passwords do not match.', 'error');
                return;
            }
            
            // In a real app, this would create the account
            // For demo, just show success message
            showToast('Account created successfully! Welcome to CarVerse.');
            
            // Hide account creation section
            const accountCreation = document.querySelector('.account-creation');
            if (accountCreation) {
                accountCreation.style.display = 'none';
            }
        });
    }
    
    // Skip Account Button
    if (skipAccountBtn) {
        skipAccountBtn.addEventListener('click', function() {
            // Hide account creation section
            const accountCreation = document.querySelector('.account-creation');
            if (accountCreation) {
                accountCreation.style.display = 'none';
            }
        });
    }
    
    // Notification Preferences
    if (emailNotificationCheckbox || smsNotificationCheckbox) {
        const updateNotificationPreferences = function() {
            // In a real app, this would save preferences to the server
            // Get the current preferences
            const emailEnabled = emailNotificationCheckbox ? emailNotificationCheckbox.checked : false;
            const smsEnabled = smsNotificationCheckbox ? smsNotificationCheckbox.checked : false;
            
            console.log(`Notification preferences updated: Email: ${emailEnabled}, SMS: ${smsEnabled}`);
        };
        
        if (emailNotificationCheckbox) {
            emailNotificationCheckbox.addEventListener('change', updateNotificationPreferences);
        }
        
        if (smsNotificationCheckbox) {
            smsNotificationCheckbox.addEventListener('change', updateNotificationPreferences);
        }
    }
    
    // Share Options
    if (shareOptions.length > 0) {
        shareOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the platform from the class name
                const classes = this.classList;
                let platform = '';
                
                if (classes.contains('facebook')) platform = 'Facebook';
                else if (classes.contains('twitter')) platform = 'Twitter';
                else if (classes.contains('instagram')) platform = 'Instagram';
                else if (classes.contains('linkedin')) platform = 'LinkedIn';
                else if (classes.contains('whatsapp')) platform = 'WhatsApp';
                
                // In a real app, this would open the sharing dialog
                showToast(`Sharing to ${platform}...`);
            });
        });
    }
    
    // Chat Support
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
            
            // Simulate concierge response after a delay
            setTimeout(() => {
                const responses = [
                    "Hello! This is Sarah, your personal luxury concierge. How can I assist with your Ferrari SF90 Stradale order today?",
                    "Thank you for your message. I'm reviewing your order details now and will provide you with an update shortly.",
                    "I'd be happy to help with that. As your dedicated concierge, I'm here to ensure your CarVerse experience exceeds expectations.",
                    "Your vehicle is currently in the first stage of our production process. I'll send you detailed updates as it progresses.",
                    "Is there anything specific about your order or the delivery process that you'd like me to explain in more detail?"
                ];
                
                // Get random response
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                // Add agent response
                addChatMessage(randomResponse, 'agent');
            }, 1500);
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
    
    // Toast notification system
    function showToast(message, type = 'success') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        // Check if toast container exists, if not create it
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            
            setTimeout(() => {
                toast.remove();
                
                // Remove container if empty
                if (!toastContainer.hasChildNodes()) {
                    toastContainer.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Add toast styles dynamically
    function addToastStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .toast {
                min-width: 250px;
                max-width: 350px;
                padding: 15px 20px;
                border-radius: 5px;
                background-color: white;
                color: #333;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .toast.success {
                border-left: 4px solid #2ecc71;
            }
            
            .toast.error {
                border-left: 4px solid #e74c3c;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Add toast styles when DOM is loaded
    addToastStyles();
});

document.addEventListener('DOMContentLoaded', function() {
    // Download confirmation button
    const downloadConfirmationBtn = document.querySelector('.download-confirmation');
    if (downloadConfirmationBtn) {
        downloadConfirmationBtn.addEventListener('click', function() {
            const content = `
CarVerse Order Confirmation
===========================
Order Number: CV-58721394
Order Date: ${new Date().toLocaleDateString()}
Customer: John Smith

Vehicle: Ferrari SF90 Stradale (2023)
Color: Rosso Corsa
Interior: Nero Leather
Engine: 4.0L V8 Hybrid

Additional Items:
- Premium Maintenance Package ($15,000)
- Carbon Fiber Wheel Set ($12,500)

Subtotal: $527,500
Shipping & Handling: $5,000
Taxes: $26,375
Promotional Discount: -$2,750
Total: $556,125

Deposit Paid: $50,000
Balance Due: $506,125

Estimated Delivery: August 3 - August 17, 2025

Thank you for your exclusive CarVerse purchase.
For assistance, contact your personal concierge at +971 4 456 7890.
`;
            downloadTextFile('CarVerse_Order_Confirmation_CV-58721394.txt', content);
        });
    }

    // View receipt  button
    const viewReceiptBtn = document.querySelector('.view-receipt');
    if (viewReceiptBtn) {
        viewReceiptBtn.addEventListener('click', function() {
            const content = `
CarVerse Payment Receipt
=======================
Transaction ID: TRX-29384756
Transaction Date: ${new Date().toLocaleDateString()}
Payment Method: Credit Card (VISA •••• 4567)

Customer: John Smith
Email: john.smith@example.com

Item: Ferrari SF90 Stradale Deposit
Amount Paid: $50,000.00

This receipt confirms your deposit payment for your Ferrari SF90 Stradale.
The remaining balance of $506,125 will be due prior to delivery.

CarVerse Luxury Automobiles LLC
Emirates International Bank
Account Number: 88844455566677
IBAN: AE123456789012345678901
SWIFT/BIC: EIBAEXDXXX

Thank you for choosing CarVerse.
`;
            downloadTextFile('CarVerse_Receipt_TRX-29384756.txt', content);
        });
    }

    // Document downloads
    const documentDownloadBtns = document.querySelectorAll('.document-download');
    if (documentDownloadBtns.length > 0) {
        documentDownloadBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get document name from parent element
                const docItem = this.closest('.document-item');
                const docNameEl = docItem ? docItem.querySelector('h4') : null;
                const docName = docNameEl ? docNameEl.textContent : 'Document';
                
                let content = '';
                let filename = '';
                
                // Create content based on document type
                switch(docName) {
                    case 'Order Confirmation':
                        content = `
CarVerse Order Confirmation
===========================
Order Number: CV-58721394
Order Date: ${new Date().toLocaleDateString()}

This document confirms your order with CarVerse.
`;
                        filename = 'CarVerse_Order_Confirmation.txt';
                        break;
                        
                    case 'Deposit Receipt':
                        content = `
CarVerse Deposit Receipt
=======================
Transaction ID: TRX-29384756
Amount: $50,000.00
Date: ${new Date().toLocaleDateString()}

This document confirms your deposit payment.
`;
                        filename = 'CarVerse_Deposit_Receipt.txt';
                        break;
                        
                    case 'Vehicle Specifications':
                        content = `
Ferrari SF90 Stradale Specifications
===================================
Year: 2023
Color: Rosso Corsa
Interior: Nero Leather
Engine: 4.0L V8 Hybrid
Power: 986 hp (combined)
0-60 mph: 2.5 seconds
Top Speed: 211 mph

Dimensions:
- Length: 4,710 mm
- Width: 1,972 mm
- Height: 1,186 mm
- Wheelbase: 2,650 mm

Features:
- Carbon ceramic brakes
- Electronic limited-slip differential
- 8-speed dual-clutch transmission
- Adaptive suspension
- Carbon fiber body components
`;
                        filename = 'Ferrari_SF90_Specifications.txt';
                        break;
                        
                    case 'Terms & Conditions':
                        content = `
CarVerse Terms & Conditions
==========================
Last Updated: ${new Date().toLocaleDateString()}

1. Order & Deposit
   The deposit is non-refundable and confirms your vehicle reservation.

2. Production & Delivery
   Estimated delivery dates are approximate and subject to change.

3. Final Payment
   Full payment must be received before vehicle delivery.

4. Cancellation Policy
   Orders cancelled after production has begun are subject to a 20% fee.

5. Vehicle Specifications
   Minor changes to specifications may occur during production.

For the complete terms and conditions, please visit www.carverse.com/terms
`;
                        filename = 'CarVerse_Terms_and_Conditions.txt';
                        break;
                        
                    default:
                        content = `CarVerse document: ${docName}`;
                        filename = 'CarVerse_Document.txt';
                }
                
                // Download the file
                downloadTextFile(filename, content);
            });
        });
    }

    // Function to create and download a text file
    function downloadTextFile(filename, content) {
        // Create a blob with the content
        const blob = new Blob([content], { type: 'text/plain' });
        
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        
        // Append the link to the body, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Release the blob URL
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    }
});