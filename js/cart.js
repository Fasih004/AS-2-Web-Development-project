let cart = [
    {
      name: "Chill Vibes Hoodie",
      image: "assets/images/chill-vibes-hoodie.jpg",
      price: 40.00,
      quantity: 1,
    },
    {
      name: "Bold Rebel Jacket",
      image: "assets/images/bold-rebel-jacket.jpg",
      price: 80.00,
      quantity: 2,
    },
  ];
  
  function displayCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    let total = 0;
  
    cartItemsContainer.innerHTML = '';
  
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <p><strong>${item.name}</strong></p>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p><strong>Total: $${itemTotal}</strong></p>
        </div>
        <button class="remove-item-btn" onclick="removeItem('${item.name}')">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  
    const totalElement = document.querySelector('.cart-summary p');
    totalElement.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
  }
  
  function removeItem(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    displayCart();
  }
  
  function goToCheckout() {
    alert("Proceeding to checkout...");
    // You could redirect to a checkout page if needed
  }
  
  displayCart();
  