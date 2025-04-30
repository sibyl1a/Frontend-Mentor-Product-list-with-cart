const products = [
  {name: "Waffle", description: "Waffle with Berries", price: 6.50, image:"images/image-waffle-desktop.jpg"},
  {name: "Crème Brûlée", description: "Vanilla Bean Crème Brûlée", price: 7.00, image:"images/image-creme-brulee-desktop.jpg"},
  {name: "Macaron", description: "Macaron Mix of Five", price: 8.00, image:"images/image-macaron-desktop.jpg"},
  {name: "Tiramisu", description: "Classic Tiramisu", price: 5.50, image:"images/image-tiramisu-desktop.jpg"},
  {name: "Baklava", description: "Pistachio Baklava", price: 4.00, image:"images/image-baklava-desktop.jpg"},
  {name: "Pie", description: "Lemon Meringue Pie", price: 5.00, image:"images/image-meringue-desktop.jpg"},
  {name: "Cake", description: "Red Velvet Cake", price: 4.50, image:"images/image-cake-desktop.jpg"},
  {name: "Brownie", description: "Salted Caramel Brownie", price: 5.50, image:"images/image-brownie-desktop.jpg"},
  {name: "Panna Cotta", description: "Vanilla Panna Cotta", price: 6.50, image:"images/image-panna-cotta-desktop.jpg"},
];

const container = document.getElementById("product-list");
let cartItems = [];

products.forEach(product => {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
    </div>
    <div class="buttons">
        <button type="button" class="button-listing">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg> Add to Cart
        </button>
        <div class="button-hidden">
          <button class="minus">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" alt="decrease"/></svg>
          </button>
          <span class="qty">1</span>
          <button class="plus">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" alt="increase"/></svg>
          </button>
      </div>
    </div>
  `;

  const buttonInActive = card.querySelector('.button-listing');
  const buttonActive = card.querySelector('.button-hidden');
  const plusButton = card.querySelector('.plus');
  const minusButton = card.querySelector('.minus');
  const value = card.querySelector('.qty');
  const img = card.querySelector('img');

  buttonInActive.addEventListener('click', () => {
      buttonInActive.style.display = 'none';
      buttonActive.style.display = 'flex';
      img.style.border = '2px solid #C73B0F';
      img.style.borderRadius = '8px';
      const yourItem = cartItems.find(item => item.name === product.name);
      if (yourItem) {
          yourItem.quantity += 1;
      } else {
          cartItems.push({...product, quantity: 1});
      }
      cartUpdate();
  });

  plusButton.addEventListener('click', () => {
      let currentValue = parseInt(value.textContent);
      value.textContent = currentValue + 1;
      const yourItem = cartItems.find(item => item.name === product.name);
      if (yourItem) {
          yourItem.quantity += 1;
      }
      cartUpdate();
  });

  minusButton.addEventListener('click', () => {
      let currentValue = parseInt(value.textContent);
      if (currentValue > 1) {
          value.textContent = currentValue - 1;
          const yourItem = cartItems.find(item => item.name === product.name);
          if (yourItem) {
              yourItem.quantity -= 1;
          }
          cartUpdate();
      } else {
          buttonInActive.style.display = 'flex';
          buttonActive.style.display = 'none';
          img.style.border = '2px solid transparent';
          cartItems = cartItems.filter(item => item.name !== product.name);
          cartUpdate();
      }
  });

  container.appendChild(card);
});

function cartUpdate() {
  const cart = document.getElementById('cart');
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cartCount === 0) {
      cart.innerHTML = `
          <h1>Your Cart (<span>0</span>)</h1>
          <img src="https://raw.githubusercontent.com/sibyl1a/Frontend-Mentor-Product-list-with-cart/335026c686d9b953e4c4e0286a4070805ffebf62/illustration-empty-cart.svg" alt="Your cart">
          <p>Your added items will appear here</p>`;
  } else {
      cart.innerHTML = `
          <h1>Your Cart (<span>${cartCount}</span>)</h1>
          <div class="cart-items">
              ${cartItems.map(item => `
                  <div class="cart-item">
                      <div class="cart-item-name">${item.description}</div>
                      <div class="item-info">
                          <span class="cart-item-quantity">${item.quantity}x</span>
                          <span class="cart-item-price"><span class="mark">@ </span>$${item.price.toFixed(2)}</span>
                          <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                          <button type="button" class="delete-item-cart" data-name="${item.name}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                          </button>
                      </div>
                      <hr>
                  </div>
              `).join('')}
          </div>
          <div id="cart-total">
              <p>Order Total <span>$${cartTotal.toFixed(2)}</span></p>
          </div>
          <div id="carbon-neutral">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
              <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>
          <div id="confirm-order">
              <button type="submit" id="confirm-button">Confirm Order</button>
          </div>
      `;

      const deleteButtons = document.querySelectorAll('.delete-item-cart');
      deleteButtons.forEach(button => {
          button.addEventListener('click', () => {
              const itemName = button.dataset.name;
              cartItems = cartItems.filter(item => item.name !== itemName);

              const productCard = document.querySelector(`.card img[alt="${itemName}"]`).closest('.card');
              if (productCard) {
                  const buttonInActive = productCard.querySelector('.button-listing');
                  const buttonActive = productCard.querySelector('.button-hidden');
                  const img = productCard.querySelector('img');
                  const qty = productCard.querySelector('.qty');

                  buttonInActive.style.display = 'flex';
                  buttonActive.style.display = 'none';
                  img.style.border = 'none';
                  qty.textContent = '1';
              }

              cartUpdate();
          });
      });
  }
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'confirm-button') {
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    overlay.style.display='flex';
    modalSubmit.style.display='flex';
    modalSubmit.innerHTML = `
      <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
        <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
      </svg>                
      <h2><strong><span>Order</span><span> Confirmed</span></strong></h2>
      <p>We hope you enjoy your food!</p>
      <div class="order-details">
        ${cartItems
          .map((item) => `
            <div class="order-info-submit">
              <div class="image-div">
                <img src="${item.image}" class="cart-item-image">
              </div>
              <div class="order-main-info">
                <div class="cart-item-name">${item.description}</div>
                <span class="cart-item-quantity-price">
                  <span class="cart-item-quantity">${item.quantity}x</span>
                  <span class="mark">@ </span>
                  <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </span>
              </div>
              <div class="submit-total">
                <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <hr>
          `).join('')}
        <div id="cart-total-sub">
          <p>Order Total</p>
          <span>$${cartTotal.toFixed(2)}</span>
        </div>
      </div>
        </div>
          <button id="close-modal">Start New Order</button>
        </div>
`;
  }
  if (event.target.id === 'close-modal') {
    cartItems = [];
    document.querySelectorAll('.card').forEach(card => {
      const buttonInActive = card.querySelector('.button-listing');
      const buttonActive = card.querySelector('.button-hidden');
      const img = card.querySelector('img');
      const qty = card.querySelector('.qty');
      buttonInActive.style.display = 'flex';
      buttonActive.style.display = 'none';
      img.style.border = 'none';
      qty.textContent = '1';
    });
    cartUpdate();
    overlay.style.display = 'none';
    modalSubmit.style.display = 'none';   
  }
});
