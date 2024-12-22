console.log("JavaScript is running!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed!");

  let allProducts = []; // För att lagra alla produkter från API:t
  let campaignProducts = []; // För kampanjprodukter

  // Top Header
  document.getElementById("top-header").innerHTML = `
        <a href="#">Kundservice</a>
        <a href="#">Hitta lagerplats</a>
    `;

  // Main Header
  document.getElementById("header").innerHTML = `
  <div class="search-bar">
      <img src="img/logo.png" alt="Webshop Logo" class="webshop-logo">
      <div class="input-group">
          <input type="text" class="form-control" id="search-bar" placeholder="Search...">
          <button class="btn btn-outline-secondary" id="search-button" type="button">Search</button>
      </div>
      <a href="#" class="cart-link">
          <i class="fas fa-shopping-cart"></i> Gå till kassan
      </a>
  </div>
  <nav class="navbar">
      <ul class="nav-menu nav-left">
          <li><a href="#">Dator & Surfplatta</a></li>
          <li><a href="#">Datorkomponenter</a></li>
          <li><a href="#">Gaming</a></li>
          <li><a href="#">Hem & Fritid</a></li>
          <li><a href="#">TV</a></li>
          <li><a href="#">Ljud</a></li>
          <li><a href="#">Mobil & Smartwatch</a></li>
          <li><a href="#">Vitvaror</a></li>
      </ul>
      <ul class="nav-menu nav-right">
          <li><a href="#">Outlet</a></li>
          <li><a href="#">Tjänster</a></li>
          <li><a href="#">Varumärken</a></li>
      </ul>
  </nav>
`;

  // Funktion för att visa produkter
  function renderProducts(products) {
    const productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = ""; // Rensa tidigare produkter

    if (products.length === 0) {
      productContainer.innerHTML = `<p>Inga produkter hittades.</p>`;
      return;
    }

    products.forEach((product) => {
      const item = document.createElement("div");
      item.className = "product-item";
      item.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <span>${product.title}</span>
                <span>${product.price.toFixed(2)} USD</span>
            `;
      productContainer.appendChild(item);
    });
  }

  // Funktion för att visa kampanjprodukter
  function renderCampaigns() {
    const campaignContainer = document.querySelectorAll(".campaign");
    campaignProducts.slice(0, 2).forEach((product, index) => {
      campaignContainer[index].innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="campaign-text">
                    <h3>${product.title}</h3>
                    <p>Perfekt elektronik för din vardag! Nu endast ${product.price.toFixed(
                      2
                    )} USD.</p>
                </div>
            `;
    });
  }

  // Funktion för att hämta produkter från API efter kategori
  async function loadProductsByCategory(category) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const products = await response.json();
      allProducts = products; // Spara alla produkter för sökfunktion
      campaignProducts = products; // Spara samma produkter för kampanjer
      renderProducts(allProducts.slice(0, 8)); // Visa de första 8 produkterna
      renderCampaigns(); // Visa kampanjprodukter
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  }

  // Funktion för att söka i produkter
  function searchProducts(query) {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts);
  }

  // Lägg till event-lyssnare för sök
  document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-bar").value;
    searchProducts(query);
  });

  document.getElementById("search-bar").addEventListener("input", () => {
    const query = document.getElementById("search-bar").value;
    searchProducts(query);
  });

  // Ladda produkter vid sidstart
  loadProductsByCategory("electronics");

  // Footer
  document.getElementById("footer").innerHTML = `
        <div class="footer-content">
            <div><span>Address: Your School Address</span></div>
            <div><span>Tel: 123-456-789</span></div>
            <div><a href="#">Site Map</a></div>
        </div>
    `;
});
