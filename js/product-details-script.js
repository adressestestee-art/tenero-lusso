import products from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    // Récupère l'identifiant du produit depuis l'URL (ex: t-shirt-basique)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Trouve le bon produit dans le tableau de données
    const product = products.find(p => p.id === productId);

    if (product) {
        // Met à jour les éléments de la page avec les informations du produit
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('main-product-image').src = product.mainImage;
        document.getElementById('main-product-image').alt = product.name;
    } else {
        // Gérer le cas où le produit n'existe pas
        document.querySelector('.product-details-container').innerHTML = '<h2>Produit non trouvé.</h2>';
    }
});
