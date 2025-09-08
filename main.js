import { setupDropdownMenu } from './menu.js';
import { startCarousel } from './carousel.js';
import { loadProductDetails } from './product.js';

document.addEventListener('DOMContentLoaded', () => {
    // Lancer la logique du menu sur toutes les pages
    setupDropdownMenu();

    // Lancer le carrousel uniquement sur la page d'accueil
    if (document.body.classList.contains('homepage')) {
        startCarousel();
    }

    // Lancer la logique des produits uniquement sur la page de détails
    if (document.body.classList.contains('product-detail-page')) {
        loadProductDetails();
    }
});
