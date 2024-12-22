document.addEventListener("DOMContentLoaded", () => {
  let allProducts = [];
  let likedProducts = [];

  // Top Header
  document.getElementById("top-header").innerHTML = `
      <a href="#"><i class="fas fa-phone"></i> Kundservice</a>
      <a href="#"><i class="fas fa-map-marker-alt"></i> Hitta lagerplats</a>
  `;

  // Main Header and Navbar
  document.getElementById("header").innerHTML = `
      <div class="search-bar">
          <img src="images/logo.png" alt="Webshop Logo">
          <div class="input-group">
              <input type="text" id="search-bar" placeholder="Search...">
              <button id="search-button">Search</button>
          </div>
          <a href="#" class="cart-link">
              <i class="fas fa-shopping-cart"></i> Varukorg
          </a>
          <a href="#" class="like-link">
              <i class="fas fa-heart"></i> <span id="like-count">0</span> Gillar
          </a>
          <a href="#" class="cart-link">
              <i class="fas fa-credit-card"></i> Gå till kassan
          </a>
      </div>
      <nav class="navbar">
          <ul class="nav-menu">
              <li><a href="#">Dator & Surfplatta</a></li>
              <li><a href="#">Datorkomponenter</a></li>
              <li><a href="#">Gaming</a></li>
              <li><a href="#">TV</a></li>
              <li><a href="#">Ljud</a></li>
              <li><a href="#">Mobil & Smartwatch</a></li>
              <li><a href="#">Outlet</a></li>
              <li><a href="#">Tjänster</a></li>
              <li><a href="#">Varumärken</a></li>
          </ul>
      </nav>
  `;

  // Load Products
  async function loadProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      allProducts = products;
      renderProducts(products);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }

  // Render Products
  function renderProducts(products) {
    const container = document.querySelector(".product-container");
    container.innerHTML = "";
    products.forEach((product) => {
      const productHTML = `
              <div class="product-item">
                  <button class="like-button" data-id="${product.id}">
                      <i class="fas fa-heart"></i>
                  </button>
                  <img src="${product.image}" alt="${product.title}">
                  <span>${product.title}</span>
                  <span>${Math.round(product.price * 10)} SEK</span>
                  <button class="add-to-cart">Lägg i varukorg</button>
              </div>`;
      container.insertAdjacentHTML("beforeend", productHTML);
    });

    document
      .querySelectorAll(".like-button")
      .forEach((btn) =>
        btn.addEventListener("click", (e) =>
          toggleLike(e.target.closest(".like-button").dataset.id)
        )
      );
  }

  // Toggle Like
  function toggleLike(id) {
    if (likedProducts.includes(id))
      likedProducts = likedProducts.filter((i) => i !== id);
    else likedProducts.push(id);
    document.getElementById("like-count").textContent = likedProducts.length;
  }

  // Search Products
  document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  });

  loadProducts();
});
