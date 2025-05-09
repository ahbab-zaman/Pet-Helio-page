// Product details
const product = {
  name: "Helio Pet Device™",
  price: 249.0,
  image: "./assets/pet-banner.png", // Use your product image
};

// Cart state
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const addToCartBtn = document.querySelector(".btn");
const quantityValue = document.querySelector(".value");
const quantityIncrease = document.querySelectorAll(".inc-dre")[1]; // Second button is +
const quantityDecrease = document.querySelectorAll(".inc-dre")[0]; // First button is -
const cartDrawer = document.querySelector(".cart-drawer");
const closeDrawer = document.querySelector(".close");
const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceElement = document.querySelector(".total-price");
const basePriceElement = document.querySelector(".base-price");
const discountPriceElement = document.querySelector(".discount-price");

// Function to save cart to local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to calculate total price
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Function to render cart items
function renderCart() {
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="cart-item-decrease">-</button>
            <span>${item.quantity}</span>
            <button class="cart-item-increase">+</button>
          </div>
        </div>
        <div class="cart-total">
          <div class="cart-item-total">$${
            item.price * item.quantity.toFixed(2)
          }</div>
          <button class="cart-item-delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `;
    cartItemsContainer.appendChild(cartItem);

    // Event listeners for quantity buttons and delete
    const decreaseBtn = cartItem.querySelector(".cart-item-decrease");
    const increaseBtn = cartItem.querySelector(".cart-item-increase");
    const deleteBtn = cartItem.querySelector(".cart-item-delete");

    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        cart[index] = item;
        saveCart();
        renderCart();
      }
    });

    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      cart[index] = item;
      saveCart();
      renderCart();
    });

    deleteBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
  calculateTotal();
}

// Event listener for Add to Cart button
addToCartBtn.addEventListener("click", () => {
  const quantity = parseInt(quantityValue.textContent);
  const existingItem = cart.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    });
  }

  saveCart();
  renderCart();
  cartDrawer.classList.add("open");
});

// Event listener for quantity increase/decrease on product page
quantityIncrease.addEventListener("click", () => {
  let quantity = parseInt(quantityValue.textContent);
  quantity++;
  quantityValue.textContent = quantity;
});

quantityDecrease.addEventListener("click", () => {
  let quantity = parseInt(quantityValue.textContent);
  if (quantity > 1) {
    quantity--;
    quantityValue.textContent = quantity;
  }
});

// Event listener to close drawer
closeDrawer.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
});

// Initial values
const basePrice = 249.0;
const discountPrice = 369.0;
let quantity = parseInt(quantityValue.textContent);

// Function to update total price
function updateTotalPrice() {
  const total = basePrice * quantity;
  basePriceElement.textContent = `$${total.toFixed(2)}`;
  discountPriceElement.textContent = `$${discountPrice.toFixed(2)}`;
}

// Event listener for quantity increase
quantityIncrease.addEventListener("click", () => {
  quantity++;
  quantityValue.textContent = quantity;
  updateTotalPrice();
});

// Event listener for quantity decrease
quantityDecrease.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityValue.textContent = quantity;
    updateTotalPrice();
  }
});

// Initial price update
updateTotalPrice();

// Initial render of cart on page load
renderCart();
