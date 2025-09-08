// Fonction pour le carrousel d'images d'arrière-plan
function startCarousel() {
    const images = document.querySelectorAll('.carousel-bg img');
    if (images.length === 0) return;

    let currentIndex = 0;
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 5000); // Change l'image toutes les 5 secondes
}

// Fonction pour le menu déroulant sur mobile
function setupDropdownMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Données des produits (pour la page produit.html)
const products = [
    {
        id: '1',
        name: 'T-shirt Basique',
        price: '49,99 €',
        description: 'Un classique revisité pour une qualité irréprochable. Ce T-shirt est coupé dans un jersey de coton épais, offrant un tombé parfait et une durabilité exceptionnelle.',
        image: 'images/t-shirt.png',
        imageAlt: 'images/t-shirt-alt.png'
    },
    {
        id: '2',
        name: 'Jogging Confort',
        price: '89,99 €',
        description: 'Le parfait équilibre entre confort et élégance. Ce jogging est conçu pour un style décontracté, idéal pour vos moments de détente ou pour un look urbain.',
        image: 'images/jogger.png',
        imageAlt: 'images/jogger-alt.png'
    }
];

// Fonction pour charger les détails d'un produit (sur la page produit.html)
function loadProductDetails() {
    const productDetailsContainer = document.querySelector('.product-details-container');
    if (!productDetailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = products.find(p => p.id === productId);

    if (product) {
        document.querySelector('.product-info h2').textContent = product.name;
        document.querySelector('.product-info .price').textContent = product.price;
        document.querySelector('.product-info .description').textContent = product.description;

        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-gallery .thumbnail');

        mainImage.src = product.image;
        mainImage.alt = product.name;

        if (thumbnails[0]) {
            thumbnails[0].src = product.image;
            thumbnails[0].alt = `${product.name} - Vue de face`;
        }
        if (thumbnails[1]) {
            thumbnails[1].src = product.imageAlt;
            thumbnails[1].alt = `${product.name} - Vue de dos`;
        }

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src;
            });
        });
    } else {
        productDetailsContainer.innerHTML = '<h2>Produit non trouvé</h2><a href="boutique.html">Retour à la boutique</a>';
    }
}

// Lancement de toutes les fonctions une fois que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    // Si la page est la page d'accueil, lancer le carrousel
    if (document.body.classList.contains('homepage')) {
        startCarousel();
    }
    // Si la page est la page de détails produit, charger les détails
    if (document.body.classList.contains('product-detail-page')) {
        loadProductDetails();
    }
    setupDropdownMenu();
});
