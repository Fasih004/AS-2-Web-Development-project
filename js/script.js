// ========== Fade-in on Load ==========
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
  
  // ========== Quiz Logic ==========
  const quizForm = document.getElementById('quiz-form');
  const resultSection = document.getElementById('quiz-result');
  const resultText = document.getElementById('result-text');
  const resultLink = document.getElementById('result-link');
  const moodAudio = document.getElementById('mood-audio');
  
  const moodMap = {
    'main': {
      mood: "Main Character Energy",
      music: 'audio/main-character.mp3',
      link: 'shop.html?mood=main'
    },
    'chill': {
      mood: "Chill Vibes",
      music: 'audio/chill.mp3',
      link: 'shop.html?mood=chill'
    },
    'bold': {
      mood: "Bold Rebel",
      music: 'audio/bold.mp3',
      link: 'shop.html?mood=bold'
    },
    'relaxed': {
      mood: "Relaxed Sunday",
      music: 'audio/relaxed.mp3',
      link: 'shop.html?mood=relaxed'
    },
    'power': {
      mood: "Productivity Power",
      music: 'audio/productivity.mp3',
      link: 'shop.html?mood=power'
    },
    'party': {
      mood: "Night Out",
      music: 'audio/party.mp3',
      link: 'shop.html?mood=party'
    }
  };
  
  quizForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const answers = Array.from(quizForm.querySelectorAll('input[type="radio"]:checked'));
    if (answers.length < 6) {
      alert('Please answer all questions!');
      return;
    }
  
    // Tally scores (basic example)
    const moodCounts = {};
    answers.forEach(ans => {
      const mood = ans.value;
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });
  
    const topMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
  
    const moodResult = moodMap[topMood];
    resultText.textContent = `You got: ${moodResult.mood}`;
    resultLink.href = moodResult.link;
    resultSection.style.display = 'block';
  
    if (moodAudio) {
      moodAudio.src = moodResult.music;
      moodAudio.play();
    }
  });
  
  // ========== Product Loader by Mood ==========
  const urlParams = new URLSearchParams(window.location.search);
  const selectedMood = urlParams.get('mood');
  
  const productData = {
    main: [/* Array of 10+ products for Main Character Energy */],
    chill: [/* Array of 10+ products for Chill Vibes */],
    bold: [/* ... */],
    relaxed: [/* ... */],
    power: [/* ... */],
    party: [/* ... */]
  };
  
  const productGrid = document.querySelector('.products-grid');
  
  if (productGrid && selectedMood && productData[selectedMood]) {
    const products = productData[selectedMood];
    productGrid.innerHTML = '';
  
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="info">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <select>
            <option>Select Size</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
          <button onclick="addToCart('${product.name}')">Add to Cart</button>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }
  
  // ========== Add to Cart (Basic Stub) ==========
  function addToCart(productName) {
    alert(`${productName} added to cart!`);
    // Extend this with real cart logic if needed
  }
  
  // ========== Lookbook Upload ==========
  const lookForm = document.querySelector('.submit-look-form');
  lookForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thank you for submitting your look! We'll review and showcase it soon.");
    lookForm.reset();
  });
  