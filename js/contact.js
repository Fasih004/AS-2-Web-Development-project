// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contactForm = document.getElementById('contact-form');
    const vehicleInterestGroup = document.getElementById('vehicle-interest-group');
    const positionGroup = document.getElementById('position-group');
    const resumeGroup = document.getElementById('resume-group'); 
    const inquiryTypeGroup = document.getElementById('inquiry-type-group');

    // Location Tabs
    const locationTabs = document.querySelectorAll('.location-tab'); 
    const locationContents = document.querySelectorAll('.location-content');

    // FAQ Accordions
    const faqItems = document.querySelectorAll('.faq-item');
 
    // Modal Elements
    const successModal = document.getElementById('success-modal');  
    const closeModalBtn = document.querySelector('.close-modal');
    const closeSuccessModalBtn = document.getElementById('close-success-modal');

    // File Upload
    const resumeInput = document.getElementById('resume');
    const fileNameDisplay = document.querySelector('.file-name');
    const uploadBtn = document.querySelector('.upload-btn');

    // Live Chat Button
    const chatBtn = document.querySelector('.chat-btn');

    // Form Fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const inquiryTypeSelect = document.getElementById('inquiry-type');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy-policy');

    // Error Message Elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const inquiryError = document.getElementById('inquiry-error');
    const messageError = document.getElementById('message-error');
    const privacyError = document.getElementById('privacy-error');
    const formStatusDot = document.querySelector('.status-dot');
    const formStatusText = document.querySelector('.status-text');

    // Initialize form state
    let currentTab = 'general';
    
    // Custom input validation styling
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            
            // Validate on blur if required
            if (input.hasAttribute('required') && input.value.trim() === '') {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
    });
    
    // Check for URL parameters to open specific tabs or scroll to form
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const scrollToForm = urlParams.get('form');
    
    // Initialize with specific tab if requested
    if (tabParam) {
        const targetTab = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
    
    // Scroll to form if requested
    if (scrollToForm === 'true') {
        setTimeout(() => {
            document.querySelector('.contact-form-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
    
    // Tab Navigation Handler
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Get the tab data
            currentTab = btn.getAttribute('data-tab');
            
            // Reset form
            contactForm.reset();
            resetFormErrors();
            
            // Show/hide specific fields based on the selected tab
            switch(currentTab) {
                case 'sales':
                    vehicleInterestGroup.classList.remove('hidden');
                    positionGroup.classList.add('hidden');
                    resumeGroup.classList.add('hidden');
                    inquiryTypeGroup.classList.remove('hidden');
                    break;
                case 'careers':
                    vehicleInterestGroup.classList.add('hidden');
                    positionGroup.classList.remove('hidden');
                    resumeGroup.classList.remove('hidden');
                    inquiryTypeGroup.classList.add('hidden');
                    break;
                default:
                    vehicleInterestGroup.classList.add('hidden');
                    positionGroup.classList.add('hidden');
                    resumeGroup.classList.add('hidden');
                    inquiryTypeGroup.classList.remove('hidden');
            }
        });
    });
    
    // Location Tabs Handler
    locationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            locationTabs.forEach(t => t.classList.remove('active'));
            locationContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const region = tab.getAttribute('data-region');
            document.getElementById(`${region}-locations`).classList.add('active');
        });
    });
    
    // FAQ Accordion Handler
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // File Upload Handler
    if (resumeInput) {
        resumeInput.addEventListener('change', () => {
            if (resumeInput.files.length > 0) {
                fileNameDisplay.textContent = resumeInput.files[0].name;
            } else {
                fileNameDisplay.textContent = 'No file selected';
            }
        });
        
        uploadBtn.addEventListener('click', () => {
            resumeInput.click();
        });
    }
    
    // Form Validation
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name');
            return false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else {
            hideError(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Please enter your email address');
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailInput, emailError);
            return true;
        }
    }
    
    function validateInquiryType() {
        if (currentTab !== 'careers' && inquiryTypeSelect.value === '') {
            showError(inquiryTypeSelect, inquiryError, 'Please select an inquiry type');
            return false;
        } else {
            hideError(inquiryTypeSelect, inquiryError);
            return true;
        }
    }
    
    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Please enter your message');
            return false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Please provide more details in your message');
            return false;
        } else {
            hideError(messageInput, messageError);
            return true;
        }
    }
    
    function validatePrivacyPolicy() {
        if (!privacyCheckbox.checked) {
            showError(privacyCheckbox, privacyError, 'You must agree to the Privacy Policy');
            return false;
        } else {
            hideError(privacyCheckbox, privacyError);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
    
    function hideError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('active');
    }
    
    function resetFormErrors() {
        // Hide all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('active');
        });
        
        // Remove error class from inputs
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.classList.remove('error');
        });
        
        // Reset form status
        formStatusDot.className = 'status-dot';
        formStatusText.textContent = 'All fields marked with * are required';
    }
    
    // Form Submission Handler
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate the form
        const nameValid = validateName();
        const emailValid = validateEmail();
        const inquiryValid = currentTab === 'careers' ? true : validateInquiryType();
        const messageValid = validateMessage();
        const privacyValid = validatePrivacyPolicy();
        
        // If all validations pass
        if (nameValid && emailValid && inquiryValid && messageValid && privacyValid) {
            // Show submitting status
            formStatusDot.className = 'status-dot';
            formStatusText.textContent = 'Submitting...';
            
            // Simulate form submission (replace with actual AJAX in production)
            setTimeout(() => {
                // Show success status
                formStatusDot.className = 'status-dot success';
                formStatusText.textContent = 'Message sent successfully!';
                
                // Show success modal
                successModal.classList.add('active');
                
                // Reset form
                contactForm.reset();
                
                // Reset file upload display if it exists
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = 'No file selected';
                }
                
                // Show correct fields based on current tab
                if (currentTab === 'sales') {
                    vehicleInterestGroup.classList.remove('hidden');
                } else if (currentTab === 'careers') {
                    positionGroup.classList.remove('hidden');
                    resumeGroup.classList.remove('hidden');
                    inquiryTypeGroup.classList.add('hidden');
                } else {
                    vehicleInterestGroup.classList.add('hidden');
                    positionGroup.classList.add('hidden');
                    resumeGroup.classList.add('hidden');
                }
            }, 1500);
        } else {
            // Show error status
            formStatusDot.className = 'status-dot error';
            formStatusText.textContent = 'Please correct the errors above';
        }
    });
    
    // Modal Handlers
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }
    
    if (closeSuccessModalBtn) {
        closeSuccessModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.classList.remove('active');
        }
    });
    
    // Live Chat Button Handler
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            // Create a chat widget dynamically
            const chatWidget = document.createElement('div');
            chatWidget.className = 'chat-widget';
            chatWidget.innerHTML = `
                <div class="chat-header">
                    <h3>Live Chat Support</h3>
                    <button class="close-chat"><i class="fas fa-times"></i></button>
                </div>
                <div class="chat-messages">
                    <div class="message system">
                        <p>Welcome to CarVerse Live Chat! Our luxury automotive specialist will be with you shortly.</p>
                    </div>
                    <div class="message system">
                        <p>While you wait, feel free to describe how we can assist you today.</p>
                    </div>
                </div>
                <div class="chat-input">
                    <textarea placeholder="Type your message here..."></textarea>
                    <button class="send-message"><i class="fas fa-paper-plane"></i></button>
                </div>
            `;
            
            document.body.appendChild(chatWidget);
            
            // Show the chat widget with animation
            setTimeout(() => {
                chatWidget.classList.add('active');
            }, 10);
            
            // Set up close button functionality
            const closeChat = chatWidget.querySelector('.close-chat');
            closeChat.addEventListener('click', () => {
                chatWidget.classList.remove('active');
                setTimeout(() => {
                    chatWidget.remove();
                }, 300);
            });
            
            // Set up send message functionality
            const sendButton = chatWidget.querySelector('.send-message');
            const messageInput = chatWidget.querySelector('textarea');
            const messagesContainer = chatWidget.querySelector('.chat-messages');
            
            sendButton.addEventListener('click', () => {
                if (messageInput.value.trim() !== '') {
                    // Add user message
                    const userMessage = document.createElement('div');
                    userMessage.className = 'message user';
                    userMessage.innerHTML = `<p>${messageInput.value}</p>`;
                    messagesContainer.appendChild(userMessage);
                    
                    // Clear input
                    messageInput.value = '';
                    
                    // Scroll to bottom
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    
                    // Simulate agent response after a delay
                    setTimeout(() => {
                        const agentMessage = document.createElement('div');
                        agentMessage.className = 'message agent';
                        agentMessage.innerHTML = `
                            <div class="agent-info">
                                <div class="agent-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="agent-name">CarVerse Support</div>
                            </div>
                            <p>Thank you for your message. This is a demo of our live chat feature. In a real implementation, our luxury automotive specialists would respond to your inquiry.</p>
                        `;
                        messagesContainer.appendChild(agentMessage);
                        
                        // Scroll to bottom again
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }, 1000);
                }
            });
            
            // Allow sending message with Enter key
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendButton.click();
                }
            });
        });
    }
    
    // Phone Number Formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Get the input value and remove all non-digits
            let input = e.target.value.replace(/\D/g, '');
            
            // Format the phone number in international format
            if (input.length > 0) {
                // International format for UAE
                if (input.length <= 3) {
                    input = '+' + input;
                } else if (input.length <= 6) {
                    input = '+' + input.substring(0, 3) + ' ' + input.substring(3);
                } else if (input.length <= 9) {
                    input = '+' + input.substring(0, 3) + ' ' + input.substring(3, 6) + ' ' + input.substring(6);
                } else {
                    input = '+' + input.substring(0, 3) + ' ' + input.substring(3, 6) + ' ' + input.substring(6, 9) + ' ' + input.substring(9);
                }
            }
            
            e.target.value = input;
        });
    }
    
    // Character counter for message field
    if (messageInput) {
        // Create character counter element
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.textContent = '0/500';
        
        // Insert after textarea
        messageInput.parentNode.insertBefore(charCounter, messageInput.nextSibling);
        
        // Update counter on input
        messageInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 500; // Set your desired max length
            
            // Update counter text
            charCounter.textContent = `${currentLength}/${maxLength}`;
            
            // Change color when approaching limit
            if (currentLength > maxLength * 0.8) {
                charCounter.classList.add('warning');
            } else {
                charCounter.classList.remove('warning');
            }
            
            // Stop input when max is reached
            if (currentLength >= maxLength) {
                this.value = this.value.substring(0, maxLength);
                charCounter.textContent = `${maxLength}/${maxLength}`;
                charCounter.classList.add('limit-reached');
            } else {
                charCounter.classList.remove('limit-reached');
            }
        });
    }
    
    // Initialize Map (placeholder for actual map implementation)
    initializeMap();
    
    // Add scroll-to-top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top-btn';
    scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Function to initialize the map
    function initializeMap() {
        // This is a placeholder for actual map implementation
        // In a real implementation, you would use Google Maps or another mapping service
        
        const mapContainer = document.querySelector('.map-container');
        
        // If map container exists
        if (mapContainer) {
            // Create placeholder map with location markers
            const mapPlaceholder = document.createElement('div');
            mapPlaceholder.className = 'map-placeholder';
            mapPlaceholder.innerHTML = `
                <div class="map-background"></div>
                <div class="map-markers">
                    <div class="map-marker" style="top: 35%; left: 55%;" data-location="Dubai">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>Dubai Headquarters</h4>
                            <p>Sheikh Mohammed bin Rashid Boulevard</p>
                        </div>
                    </div>
                    <div class="map-marker" style="top: 36%; left: 54%;" data-location="Abu Dhabi">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>Abu Dhabi Showroom</h4>
                            <p>Yas Marina Circuit, Yas Island</p>
                        </div>
                    </div>
                    <div class="map-marker" style="top: 25%; left: 45%;" data-location="London">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>London Showroom</h4>
                            <p>Mayfair, 123 Park Lane</p>
                        </div>
                    </div>
                    <div class="map-marker" style="top: 28%; left: 47%;" data-location="Monaco">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>Monaco Showroom</h4>
                            <p>Monte Carlo, 7 Avenue des Spélugues</p>
                        </div>
                    </div>
                    <div class="map-marker" style="top: 30%; left: 25%;" data-location="New York">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>New York Showroom</h4>
                            <p>Manhattan, 456 Fifth Avenue</p>
                        </div>
                    </div>
                    <div class="map-marker" style="top: 40%; left: 22%;" data-location="Miami">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>Miami Showroom</h4>
                            <p>Miami Beach, 789 Collins Avenue</p>
                        </div>
                    </div>
                    <div class="map-marker" style="top: 35%; left: 78%;" data-location="Tokyo">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>Tokyo Showroom</h4>
                            <p>Ginza, 789 Chuo Street</p>
                        </div>
                    </div>
                    <div class="map-marker" style="top: 50%; left: 75%;" data-location="Singapore">
                        <div class="marker-pin"></div>
                        <div class="marker-tooltip">
                            <h4>Singapore Showroom</h4>
                            <p>Marina Bay, 10 Bayfront Avenue</p>
                        </div>
                    </div>
                </div>
            `;
            
            // Replace the static image with our interactive map placeholder
            mapContainer.innerHTML = '';
            mapContainer.appendChild(mapPlaceholder);
            
            // Add event listeners to markers for interactivity
            const markers = document.querySelectorAll('.map-marker');
            markers.forEach(marker => {
                marker.addEventListener('mouseenter', () => {
                    marker.classList.add('active');
                });
                
                marker.addEventListener('mouseleave', () => {
                    marker.classList.remove('active');
                });
                
                marker.addEventListener('click', () => {
                    const location = marker.getAttribute('data-location');
                    
                    // Find the corresponding location tab and activate it
                    let region = '';
                    
                    // Determine the region based on the location
                    if (location === 'Dubai' || location === 'Abu Dhabi') {
                        region = 'middle-east';
                    } else if (location === 'London' || location === 'Monaco') {
                        region = 'europe';
                    } else if (location === 'New York' || location === 'Miami') {
                        region = 'north-america';
                    } else if (location === 'Tokyo' || location === 'Singapore') {
                        region = 'asia';
                    }
                    
                    // Click the corresponding region tab
                    if (region) {
                        const regionTab = document.querySelector(`.location-tab[data-region="${region}"]`);
                        if (regionTab) {
                            regionTab.click();
                            
                            // Scroll to the locations section
                            document.querySelector('.global-locations').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
        }
    }
});