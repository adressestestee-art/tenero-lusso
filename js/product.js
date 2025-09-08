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

export function loadProductDetails() {
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
