document.addEventListener('DOMContentLoaded', function() {
    // Featured Reviews Carousel
    const slides = document.querySelectorAll('.featured-review-card');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    let currentIndex = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Initialize with first slide
    if (slides.length > 0) {
        showSlide(0);
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-advance carousel every 5 seconds
    let carouselInterval = setInterval(() => {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    }, 5000);
    
    // Pause auto-advance on mouse hover
    const carouselContainer = document.querySelector('.reviews-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => {
                const newIndex = (currentIndex + 1) % slides.length;
                showSlide(newIndex);
            }, 5000);
        });
    }
    
    // Filter and Sort Functionality
    const makeFilter = document.getElementById('filter-make');
    const ratingFilter = document.getElementById('filter-rating');
    const sortSelect = document.getElementById('filter-sort');
    const searchInput = document.getElementById('review-search');
    const reviewCards = document.querySelectorAll('.review-card');
    
    function filterAndSortReviews() {
        const makeValue = makeFilter ? makeFilter.value : '';
        const ratingValue = ratingFilter ? parseFloat(ratingFilter.value) : 0;
        const sortValue = sortSelect ? sortSelect.value : 'newest';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        // Filter reviews
        reviewCards.forEach(card => {
            const cardMake = card.getAttribute('data-make');
            const cardRating = parseFloat(card.getAttribute('data-rating'));
            
            // Get text content for search
            const reviewTitle = card.querySelector('.review-title').textContent.toLowerCase();
            const reviewText = card.querySelector('.review-text').textContent.toLowerCase();
            const carName = card.querySelector('.car-details h3').textContent.toLowerCase();
            
            // Check if card matches all filters
            const matchesMake = !makeValue || cardMake === makeValue;
            const matchesRating = !ratingValue || cardRating >= ratingValue;
            const matchesSearch = !searchTerm || 
                                 reviewTitle.includes(searchTerm) || 
                                 reviewText.includes(searchTerm) || 
                                 carName.includes(searchTerm);
            
            // Show or hide based on filters
            if (matchesMake && matchesRating && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Sort visible reviews
        const visibleCards = Array.from(reviewCards).filter(card => card.style.display !== 'none');
        
        visibleCards.sort((a, b) => {
            // Get sort values based on sort type
            let valueA, valueB;
            
            if (sortValue === 'newest' || sortValue === 'oldest') {
                // Parse dates from format "Month Day, Year"
                valueA = new Date(a.querySelector('.date').textContent);
                valueB = new Date(b.querySelector('.date').textContent);
                
                return sortValue === 'newest' ? valueB - valueA : valueA - valueB;
            } else if (sortValue === 'highest' || sortValue === 'lowest') {
                valueA = parseFloat(a.getAttribute('data-rating'));
                valueB = parseFloat(b.getAttribute('data-rating'));
                
                return sortValue === 'highest' ? valueB - valueA : valueA - valueB;
            }
            
            return 0;
        });
        
        // Reorder cards in the DOM
        const reviewsGrid = document.querySelector('.reviews-grid');
        visibleCards.forEach(card => {
            reviewsGrid.appendChild(card);
        });
    }
    
    // Add event listeners to filters
    if (makeFilter) {
        makeFilter.addEventListener('change', filterAndSortReviews);
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterAndSortReviews);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndSortReviews);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSortReviews);
    }
    
    // "Helpful" button functionality
    const helpfulBtns = document.querySelectorAll('.helpful-btn');
    
    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Parse current count
            let text = this.textContent;
            let count = parseInt(text.match(/\((\d+)\)/)[1]);
            
            // Update count based on active state
            if (this.classList.contains('active')) {
                count += 1;
            } else {
                count -= 1;
            }
            
            // Update button text
            this.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${count})`;
        });
    });
    
    // Share button functionality
    const shareBtns = document.querySelectorAll('.share-btn');
    
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real implementation, this would show sharing options
            alert('Share options would appear here.');
        });
    });
    
    // Write Review Modal
    const writeReviewBtn = document.getElementById('write-review-btn');
    const reviewModal = document.getElementById('write-review-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const reviewForm = document.getElementById('review-form');
    
    function openModal() {
        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
    
    function closeModal() {
        reviewModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === reviewModal) {
            closeModal();
        }
    });
    
    // Star Rating in Review Form
    const starRating = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating-value');
    
    starRating.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Update star appearance
            starRating.forEach((s, index) => {
                if (index < rating) {
                    s.className = 'fas fa-star';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = parseInt(ratingInput.value);
            
            // Reset star appearance based on current rating
            starRating.forEach((s, index) => {
                if (index < currentRating) {
                    s.className = 'fas fa-star';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Set star appearance
            starRating.forEach((s, index) => {
                if (index < rating) {
                    s.className = 'fas fa-star';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
    });
    
    // Photo Upload Functionality
    const uploadArea = document.querySelector('.upload-area');
    const photoInput = document.getElementById('review-photos');
    const photoPreview = document.getElementById('photo-preview');
    
    if (uploadArea && photoInput) {
        uploadArea.addEventListener('click', function() {
            photoInput.click();
        });
        
        photoInput.addEventListener('change', function() {
            const files = Array.from(this.files);
            
            files.forEach(file => {
                if (!file.type.match('image.*')) return;
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'photo-preview-item';
                    
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Uploaded photo">
                        <button class="remove-photo"><i class="fas fa-times"></i></button>
                    `;
                    
                    photoPreview.appendChild(previewItem);
                    
                    // Add event listener to remove button
                    previewItem.querySelector('.remove-photo').addEventListener('click', function() {
                        previewItem.remove();
                    });
                };
                
                reader.readAsDataURL(file);
            });
        });
        
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--secondary-color)';
            this.style.backgroundColor = '#f9f9f9';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = '';
            
            if (e.dataTransfer.files.length > 0) {
                photoInput.files = e.dataTransfer.files;
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                photoInput.dispatchEvent(event);
            }
        });
    }
    
    // Form Submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const car = document.getElementById('review-car').value;
            const rating = document.getElementById('rating-value').value;
            const title = document.getElementById('review-title').value;
            const text = document.getElementById('review-text').value;
            const name = document.getElementById('reviewer-name').value;
            const ownership = document.getElementById('ownership-length').value;
            
            if (!car || !rating || !title || !text || !name || !ownership) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Simulate form submission
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Submitting your review...</p>
            `;
            document.body.appendChild(loadingOverlay);
            
            // Simulate delay
            setTimeout(() => {
                // Remove loading overlay
                document.body.removeChild(loadingOverlay);
                
                // Close modal
                closeModal();
                
                // Show success message
                alert('Your review has been submitted successfully! It will be published after moderation.');
                
                // Reset form
                reviewForm.reset();
                
                // Reset star rating
                starRating.forEach(star => {
                    star.className = 'far fa-star';
                });
                ratingInput.value = 0;
                
                // Clear photo preview
                if (photoPreview) {
                    photoPreview.innerHTML = '';
                }
            }, 1500);
        });
    }
    
    // Pagination functionality
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real implementation, this would load a new page of reviews
            // For this demo, we'll just update the active state
            
            // Remove active class from all buttons
            pageBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button (if it's not the next button)
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // If next button is clicked, activate the next page number
            if (this.classList.contains('next')) {
                const activePage = document.querySelector('.page-btn.active');
                const nextPage = activePage.nextElementSibling;
                
                if (nextPage && !nextPage.classList.contains('next')) {
                    activePage.classList.remove('active');
                    nextPage.classList.add('active');
                }
            }
            
            // Scroll to top of reviews section
            document.querySelector('.reviews-grid').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Add loading style for CSS
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            color: #fff;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid var(--secondary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});