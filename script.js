document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------- Open and Close buttons for cart ----------------------------- */
  const openCartBtn = document.getElementById("openCartFromHeader");
  const cart = document.querySelector(".cart");
  const overlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCartBtn");

  function openCart() {
    cart.classList.add("active");
    overlay.classList.add("active");
  }

  function closeCart() {
    cart.classList.remove("active");
    overlay.classList.remove("active");
  }

  if (openCartBtn) openCartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);


  /* ---------------------------- Cart Functions ----------------------------- */
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  let cartTotal = 0;
  let cartData = [];

  // updates cart
  function updateCartTotal() {
    cartTotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalEl.textContent = `P${cartTotal}`;
  }

  // visuals of item
  function renderCart() {
    cartItemsEl.innerHTML = "";
    cartData.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-price">P${item.price}</span>
        <span class="item-quantity">x${item.quantity}</span>
        <button class="remove-item" data-index="${index}">✕</button>
      `;
      cartItemsEl.appendChild(cartItem);
    });

    // Add n remove item
    const removeBtns = cartItemsEl.querySelectorAll(".remove-item");
    removeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.index);
        cartData.splice(idx, 1);
        renderCart();
        updateCartTotal();
      });
    });
  }

  /* ---------------------------- Menu add to cart ----------------------------- */
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const nameEl = product.querySelector("h3");
    const priceEl = product.querySelector("p");

    if (!nameEl || !priceEl) return;

    const name = nameEl.textContent.trim();
    const priceText = priceEl.textContent.trim();
    const cleanedPrice = priceText.replace(/[^0-9]/g, ""); 
    const priceNum = parseFloat(cleanedPrice);

    // puts the "add to cart" on each menu
    const btn = document.createElement("button");
    btn.className = "add-to-cart-btn";
    btn.textContent = "Add to Cart";

    // when click it will update menu
    btn.addEventListener("click", () => {
      const existingItem = cartData.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartData.push({ name: name, price: priceNum, quantity: 1 });
      }
      renderCart();
      updateCartTotal();
      openCart(); 
    });

    product.appendChild(btn);
  });

});
