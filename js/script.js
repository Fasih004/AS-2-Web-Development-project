// Carousel
const carouselItems = document.querySelectorAll('.carousel-item');
if (carouselItems.length) {
    let current = 0;
    carouselItems[current].classList.add('active');
    setInterval(() => {
        carouselItems[current].classList.remove('active');
        current = (current + 1) % carouselItems.length;
        carouselItems[current].classList.add('active');
    }, 5000);
}

// Quiz Logic
const quizContainer = document.getElementById('quiz-container');
const questions = document.querySelectorAll('.question');
const resultDiv = document.getElementById('result');
const moodResult = document.getElementById('mood-result');
const moodDescription = document.getElementById('mood-description');
const outfitSuggestions = document.getElementById('outfit-suggestions');
const moodMusic = document.getElementById('mood-music');

if (quizContainer) {
    let currentQuestion = 0;
    let scores = { main: 0, chill: 0, bold: 0, creative: 0 };

    quizContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-option')) {
            const value = e.target.dataset.value;
            scores[value]++;
            questions[currentQuestion].classList.add('hidden');
            currentQuestion++;
            if (currentQuestion < questions.length) {
                questions[currentQuestion].classList.remove('hidden');
            } else {
                showResult();
            }
        }
    });

    function showResult() {
        resultDiv.classList.remove('hidden');
        const maxMood = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        const moodInfo = {
            main: {
                name: 'Main Character Energy',
                description: 'You’re ready to steal the show! Bold, vibrant, and confident.',
                music: 'assets/music/main.mp3',
                outfits: [
                    { name: 'Glitter Jacket', price: 89, sizes: ['S', 'M', 'L'], image: 'assets/images/main1.jpg' },
                    { name: 'Red Mini Dress', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/main2.jpg' },
                    { name: 'Gold Boots', price: 99, sizes: ['S', 'M', 'L'], image: 'assets/images/main3.jpg' },
                    { name: 'Sequin Skirt', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/main4.jpg' },
                    { name: 'Statement Necklace', price: 29, sizes: ['One Size'], image: 'assets/images/main5.jpg' },
                    { name: 'Velvet Blazer', price: 79, sizes: ['S', 'M', 'L'], image: 'assets/images/main6.jpg' },
                    { name: 'High-Waist Jeans', price: 49, sizes: ['S', 'M', 'L'], image: 'assets/images/main7.jpg' },
                    { name: 'Crop Top', price: 39, sizes: ['S', 'M', 'L'], image: 'assets/images/main8.jpg' },
                    { name: 'Sunglasses', price: 19, sizes: ['One Size'], image: 'assets/images/main9.jpg' },
                    { name: 'Leather Belt', price: 29, sizes: ['S', 'M', 'L'], image: 'assets/images/main10.jpg' }
                ]
            },
            chill: {
                name: 'Chill Vibes',
                description: 'You’re all about comfort and calm. Cozy and cool.',
                music: 'assets/music/chill.mp3',
                outfits: [
                    { name: 'Oversized Hoodie', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/chill1.jpg' },
                    { name: 'Joggers', price: 49, sizes: ['S', 'M', 'L'], image: 'assets/images/chill2.jpg' },
                    { name: 'Slip-On Sneakers', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/chill3.jpg' },
                    { name: 'Knit Beanie', price: 19, sizes: ['One Size'], image: 'assets/images/chill4.jpg' },
                    { name: 'Flannel Shirt', price: 39, sizes: ['S', 'M', 'L'], image: 'assets/images/chill5.jpg' },
                    { name: 'Loose T-Shirt', price: 29, sizes: ['S', 'M', 'L'], image: 'assets/images/chill6.jpg' },
                    { name: 'Denim Jacket', price: 79, sizes: ['S', 'M', 'L'], image: 'assets/images/chill7.jpg' },
                    { name: 'Scarf', price: 25, sizes: ['One Size'], image: 'assets/images/chill8.jpg' },
                    { name: 'Socks', price: 15, sizes: ['One Size'], image: 'assets/images/chill9.jpg' },
                    { name: 'Backpack', price: 49, sizes: ['One Size'], image: 'assets/images/chill10.jpg' }
                ]
            },
            bold: {
                name: 'Bold Rebel',
                description: 'You’re fierce and unapologetic. Make a statement.',
                music: 'assets/music/bold.mp3',
                outfits: [
                    { name: 'Leather Jacket', price: 99, sizes: ['S', 'M', 'L'], image: 'assets/images/bold1.jpg' },
                    { name: 'Ripped Jeans', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/bold2.jpg' },
                    { name: 'Combat Boots', price: 89, sizes: ['S', 'M', 'L'], image: 'assets/images/bold3.jpg' },
                    { name: 'Graphic Tee', price: 39, sizes: ['S', 'M', 'L'], image: 'assets/images/bold4.jpg' },
                    { name: 'Choker Necklace', price: 19, sizes: ['One Size'], image: 'assets/images/bold5.jpg' },
                    { name: 'Studded Belt', price: 29, sizes: ['S', 'M', 'L'], image: 'assets/images/bold6.jpg' },
                    { name: 'Cargo Pants', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/bold7.jpg' },
                    { name: 'Sunglasses', price: 25, sizes: ['One Size'], image: 'assets/images/bold8.jpg' },
                    { name: 'Bandana', price: 15, sizes: ['One Size'], image: 'assets/images/bold9.jpg' },
                    { name: 'Chain Bracelet', price: 29, sizes: ['One Size'], image: 'assets/images/bold10.jpg' }
                ]
            },
            creative: {
                name: 'Creative Flow',
                description: 'You’re artistic and unique. Express your imagination.',
                music: 'assets/music/creative.mp3',
                outfits: [
                    { name: 'Bohemian Dress', price: 79, sizes: ['S', 'M', 'L'], image: 'assets/images/creative1.jpg' },
                    { name: 'Patterned Scarf', price: 25, sizes: ['One Size'], image: 'assets/images/creative2.jpg' },
                    { name: 'Ankle Boots', price: 89, sizes: ['S', 'M', 'L'], image: 'assets/images/creative3.jpg' },
                    { name: 'Oversized Shirt', price: 49, sizes: ['S', 'M', 'L'], image: 'assets/images/creative4.jpg' },
                    { name: 'Statement Earrings', price: 19, sizes: ['One Size'], image: 'assets/images/creative5.jpg' },
                    { name: 'Wide-Leg Pants', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/creative6.jpg' },
                    { name: 'Beret', price: 29, sizes: ['One Size'], image: 'assets/images/creative7.jpg' },
                    { name: 'Tote Bag', price: 39, sizes: ['One Size'], image: 'assets/images/creative8.jpg' },
                    { name: 'Layered Necklace', price: 25, sizes: ['One Size'], image: 'assets/images/creative9.jpg' },
                    { name: 'Kimono Jacket', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/creative10.jpg' }
                ]
            }
        };
        moodResult.textContent = moodInfo[maxMood].name;
        moodDescription.textContent = moodInfo[maxMood].description;
        moodMusic.src = moodInfo[maxMood].music;
        outfitSuggestions.innerHTML = moodInfo[maxMood].outfits.map(item => `
            <div class="product-card bg-white p-4 rounded-lg shadow-lg">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded">
                <h4 class="text-lg font-bold">${item.name}</h4>
                <p>$${item.price}</p>
                <select class="size-select border p-2 w-full mt-2">
                    ${item.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
                <button class="add-to-cart bg-yellow-400 text-black px-4 py-2 rounded mt-2 w-full" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to Cart</button>
            </div>
        `).join('');
    }
}

// Shop Logic
const moodTabs = document.querySelectorAll('.mood-tab');
const productsDiv = document.getElementById('products');
const topSelect = document.getElementById('top-select');
const bottomSelect = document.getElementById('bottom-select');
const accessorySelect = document.getElementById('accessory-select');
const mixPreview = document.getElementById('mix-preview');

if (moodTabs.length) {
    const products = {
        main: [
            { name: 'Glitter Jacket', price: 89, sizes: ['S', 'M', 'L'], image: 'assets/images/main1.jpg', type: 'top', reviews: ['Love the sparkle!', 'Perfect for parties!'] },
            { name: 'Red Mini Dress', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/main2.jpg', type: 'top', reviews: ['So vibrant!', 'Great fit!'] },
            { name: 'Gold Boots', price: 99, sizes: ['S', 'M', 'L'], image: 'assets/images/main3.jpg', type: 'accessory', reviews: ['Super stylish!', 'Comfy too!'] },
            { name: 'Sequin Skirt', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/main4.jpg', type: 'bottom', reviews: ['Eye-catching!', 'Love it!'] },
            { name: 'Statement Necklace', price: 29, sizes: ['One Size'], image: 'assets/images/main5.jpg', type: 'accessory', reviews: ['Perfect accent!', 'Great quality!'] },
            { name: 'Velvet Blazer', price: 79, sizes: ['S', 'M', 'L'], image: 'assets/images/main6.jpg', type: 'top', reviews: ['So chic!', 'Love the texture!'] },
            { name: 'High-Waist Jeans', price: 49, sizes: ['S', 'M', 'L'], image: 'assets/images/main7.jpg', type: 'bottom', reviews: ['Great fit!', 'Super comfy!'] },
            { name: 'Crop Top', price: 39, sizes: ['S', 'M', 'L'], image: 'assets/images/main8.jpg', type: 'top', reviews: ['So cute!', 'Perfect for summer!'] },
            { name: 'Sunglasses', price: 19, sizes: ['One Size'], image: 'assets/images/main9.jpg', type: 'accessory', reviews: ['Love these!', 'Great style!'] },
            { name: 'Leather Belt', price: 29, sizes: ['S', 'M', 'L'], image: 'assets/images/main10.jpg', type: 'accessory', reviews: ['Sturdy!', 'Looks great!'] }
        ],
        chill: [
            { name: 'Oversized Hoodie', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/chill1.jpg', type: 'top', reviews: ['So cozy!', 'Perfect for lounging!'] },
            { name: 'Joggers', price: 49, sizes: ['S', 'M', 'L'], image: 'assets/images/chill2.jpg', type: 'bottom', reviews: ['Super comfy!', 'Great fit!'] },
            { name: 'Slip-On Sneakers', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/chill3.jpg', type: 'accessory', reviews: ['Easy to wear!', 'Love these!'] },
            { name: 'Knit Beanie', price: 19, sizes: ['One Size'], image: 'assets/images/chill4.jpg', type: 'accessory', reviews: ['Warm and cute!', 'Great quality!'] },
            { name: 'Flannel Shirt', price: 39, sizes: ['S', 'M', 'L'], image: 'assets/images/chill5.jpg', type: 'top', reviews: ['Soft fabric!', 'Perfect for fall!'] },
            { name: 'Loose T-Shirt', price: 29, sizes: ['S', 'M', 'L'], image: 'assets/images/chill6.jpg', type: 'top', reviews: ['So comfy!', 'Great for casual days!'] },
            { name: 'Denim Jacket', price: 79, sizes: ['S', 'M', 'L'], image: 'assets/images/chill7.jpg', type: 'top', reviews: ['Love the style!', 'Perfect layering piece!'] },
            { name: 'Scarf', price: 25, sizes: ['One Size'], image: 'assets/images/chill8.jpg', type: 'accessory', reviews: ['So soft!', 'Great for winter!'] },
            { name: 'Socks', price: 15, sizes: ['One Size'], image: 'assets/images/chill9.jpg', type: 'accessory', reviews: ['Cute design!', 'Comfy!'] },
            { name: 'Backpack', price: 49, sizes: ['One Size'], image: 'assets/images/chill10.jpg', type: 'accessory', reviews: ['Spacious!', 'Great for school!'] }
        ],
        bold: [
            { name: 'Leather Jacket', price: 99, sizes: ['S', 'M', 'L'], image: 'assets/images/bold1.jpg', type: 'top', reviews: ['So badass!', 'Great quality!'] },
            { name: 'Ripped Jeans', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/bold2.jpg', type: 'bottom', reviews: ['Edgy vibe!', 'Perfect fit!'] },
            { name: 'Combat Boots', price: 89, sizes: ['S', 'M', 'L'], image: 'assets/images/bold3.jpg', type: 'accessory', reviews: ['Super sturdy!', 'Love these!'] },
            { name: 'Graphic Tee', price: 39, sizes: ['S', 'M', 'L'], image: 'assets/images/bold4.jpg', type: 'top', reviews: ['Cool design!', 'Great for concerts!'] },
            { name: 'Choker Necklace', price: 19, sizes: ['One Size'], image: 'assets/images/bold5.jpg', type: 'accessory', reviews: ['Perfect accessory!', 'Love it!'] },
            { name: 'Studded Belt', price: 29, sizes: ['S', 'M', 'L'], image: 'assets/images/bold6.jpg', type: 'accessory', reviews: ['Adds edge!', 'Great quality!'] },
            { name: 'Cargo Pants', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/bold7.jpg', type: 'bottom', reviews: ['So cool!', 'Lots of pockets!'] },
            { name: 'Sunglasses', price: 25, sizes: ['One Size'], image: 'assets/images/bold8.jpg', type: 'accessory', reviews: ['Love the vibe!', 'Great style!'] },
            { name: 'Bandana', price: 15, sizes: ['One Size'], image: 'assets/images/bold9.jpg', type: 'accessory', reviews: ['Versatile!', 'Cool accessory!'] },
            { name: 'Chain Bracelet', price: 29, sizes: ['One Size'], image: 'assets/images/bold10.jpg', type: 'accessory', reviews: ['Edgy!', 'Great quality!'] }
        ],
        creative: [
            { name: 'Bohemian Dress', price: 79, sizes: ['S', 'M', 'L'], image: 'assets/images/creative1.jpg', type: 'top', reviews: ['So flowy!', 'Love the pattern!'] },
            { name: 'Patterned Scarf', price: 25, sizes: ['One Size'], image: 'assets/images/creative2.jpg', type: 'accessory', reviews: ['Beautiful design!', 'Great accessory!'] },
            { name: 'Ankle Boots', price: 89, sizes: ['S', 'M', 'L'], image: 'assets/images/creative3.jpg', type: 'accessory', reviews: ['Super stylish!', 'Comfy too!'] },
            { name: 'Oversized Shirt', price: 49, sizes: ['S', 'M', 'L'], image: 'assets/images/creative4.jpg', type: 'top', reviews: ['Perfect for layering!', 'Love it!'] },
            { name: 'Statement Earrings', price: 19, sizes: ['One Size'], image: 'assets/images/creative5.jpg', type: 'accessory', reviews: ['So unique!', 'Great quality!'] },
            { name: 'Wide-Leg Pants', price: 59, sizes: ['S', 'M', 'L'], image: 'assets/images/creative6.jpg', type: 'bottom', reviews: ['Super comfy!', 'Love the style!'] },
            { name: 'Beret', price: 29, sizes: ['One Size'], image: 'assets/images/creative7.jpg', type: 'accessory', reviews: ['So artsy!', 'Perfect fit!'] },
            { name: 'Tote Bag', price: 39, sizes: ['One Size'], image: 'assets/images/creative8.jpg', type: 'accessory', reviews: ['Spacious!', 'Love the design!'] },
            { name: 'Layered Necklace', price: 25, sizes: ['One Size'], image: 'assets/images/creative9.jpg', type: 'accessory', reviews: ['Beautiful!', 'Great quality!'] },
            { name: 'Kimono Jacket', price: 69, sizes: ['S', 'M', 'L'], image: 'assets/images/creative10.jpg', type: 'top', reviews: ['So unique!', 'Love the flow!'] }
        ]
    };

    moodTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const mood = tab.dataset.mood;
            productsDiv.innerHTML = products[mood].map(item => `
                <div class="product-card bg-white p-4 rounded-lg shadow-lg">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded">
                    <h4 class="text-lg font-bold">${item.name}</h4>
                    <p>$${item.price}</p>
                    <select class="size-select border p-2 w-full mt-2">
                        ${item.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                    <button class="add-to-cart bg-yellow-400 text-black px-4 py-2 rounded mt-2 w-full" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to Cart</button>
                    <div class="reviews mt-2">
                        <p class="font-bold">Reviews:</p>
                        ${item.reviews.map(review => `<p>${review}</p>`).join('')}
                    </div>
                </div>
            `).join('');

            // Populate mix-and-match dropdowns
            topSelect.innerHTML = '<option value="">Select Top</option>' + products[mood].filter(item => item.type === 'top').map(item => `<option value="${item.image}">${item.name}</option>`).join('');
            bottomSelect.innerHTML = '<option value="">Select Bottom</option>' + products[mood].filter(item => item.type === 'bottom').map(item => `<option value="${item.image}">${item.name}</option>`).join('');
            accessorySelect.innerHTML = '<option value="">Select Accessory</option>' + products[mood].filter(item => item.type === 'accessory').map(item => `<option value="${item.image}">${item.name}</option>`).join('');
        });
    });

    topSelect.addEventListener('change', updateMixPreview);
    bottomSelect.addEventListener('change', updateMixPreview);
    accessorySelect.addEventListener('change', updateMixPreview);

    function updateMixPreview() {
        mixPreview.innerHTML = '';
        if (topSelect.value) mixPreview.innerHTML += `<img src="${topSelect.value}" class="w-32 h-32 object-cover rounded m-2">`;
        if (bottomSelect.value) mixPreview.innerHTML += `<img src="${bottomSelect.value}" class="w-32 h-32 object-cover rounded m-2">`;
        if (accessorySelect.value) mixPreview.innerHTML += `<img src="${accessorySelect.value}" class="w-32 h-32 object-cover rounded m-2">`;
    }
}

// Cart Logic
let cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        const image = e.target.dataset.image;
        const size = e.target.previousElementSibling.value;
        cart.push({ name, price, image, size });
        updateCart();
    }
});

function updateCart() {
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div>
                    <h4 class="text-lg font-bold">${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>$${item.price}</p>
                </div>
            </div>
        `).join('');
        cartTotal.textContent = cart.reduce((total, item) => total + item.price, 0);
    }
}