document.addEventListener('DOMContentLoaded', function () {
  // hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });
  }

  // glide slider
  if (typeof Glide !== 'undefined') {
    new Glide('#glide1', {
      type: 'carousel',
      perView: 1,
      autoplay: 4500,
      hoverpause: true,
      gap: 0
    }).mount();
  }

  // fetch and render products on index page
  async function loadProducts() {
    const el = document.getElementById('products');
    if (!el) return;
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const products = await res.json();
      el.innerHTML = products.map(p => `
        <article class="product-item">
          <a class="product-thumb" href="productDetails.html">
            <img src="./images/product-1.jpg" alt="${p.name}" />
          </a>
          <div class="product-info">
            <span>Category</span>
            <a class="product-title">${p.name}</a>
            <h4>$${p.price}</h4>
          </div>
          <ul class="icons">
            <li><button aria-label="Add to wishlist" class="icon-btn"><i class="bx bx-heart"></i></button></li>
            <li><button aria-label="Quick view" class="icon-btn"><i class="bx bx-search"></i></button></li>
            <li><button aria-label="Add to cart" class="icon-btn"><i class="bx bx-cart"></i></button></li>
          </ul>
        </article>`).join('');
    } catch (err) {
      el.innerHTML = '<p>Unable to load products.</p>';
    }
  }
  loadProducts();
});
