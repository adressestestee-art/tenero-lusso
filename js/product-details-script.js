import products from './product.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('main-product-image').src = product.mainImage;
        document.getElementById('main-product-image').alt = product.name;
    } else {
        document.querySelector('.product-details-container').innerHTML = '<h2>Produit non trouvé.</h2>';
    }
});
