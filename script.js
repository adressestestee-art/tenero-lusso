// La liste des produits
const products = [
    {
        id: 1,
        name: "T-shirt NYF",
        price: 30,
        description: "Un T-shirt de qualité supérieure avec le logo NYF. Coupe décontractée, parfait pour le style urbain.",
        img: "./images/t-shirt.png",
        gallery: ["./images/t-shirt.png", "./images/t-shirt-alt.png"]
    },
    {
        id: 2,
        name: "Hoodie NYF",
        price: 60,
        description: "Hoodie confortable en coton épais. Idéal pour les soirées fraîches, il allie confort et style.",
        img: "./images/hoodie.png",
        gallery: ["./images/hoodie.png"]
    },
    {
        id: 3,
        name: "Jogger NYF",
        price: 50,
        description: "Pantalon de jogging avec logo discret, conçu pour le mouvement et le confort. Tissu respirant.",
        img: "./images/jogger.png",
        gallery: ["./images/jogger.png", "./images/jogger-alt.png"]
    },
    {
        id: 4,
        name: "Casquette NYF",
        price: 25,
        description: "Casquette noire classique avec logo NYF brodé. Taille ajustable.",
        img: "./images/cap.png",
        gallery: ["./images/cap.png"]
    }
];

// Fonctions du panier
function addToCart(id) {
    const product = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

function updateCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    if (!cartItemsList) return;
    
    cartItemsList.innerHTML = '';
    let total = 0;

    const productCounts = {};
    cart.forEach(product => {
        productCounts[product.id] = (productCounts[product.id] || 0) + 1;
    });

    Object.keys(productCounts).forEach(id => {
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            const count = productCounts[id];
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${product.name} x${count}</span>
                <span>${product.price * count} €</span>
                <button onclick="removeFromCart(${id})">Supprimer</button>
            `;
            cartItemsList.appendChild(li);
            total += product.price * count;
        }
    });
    
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.textContent = total;
    }
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(p => p.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartPage();
    }
}

//
            </a>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
        `;
        container.appendChild(prodDiv);
    });
}

function displayProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);

    const container = document.getElementById("product-details");
    if (!container || !product) {
        return;
    }

    let imageGalleryHTML = `<img id="main-product-image" src="${product.img}" alt="${product.name}">`;
    if (product.gallery && product.gallery.length > 1) {
        imageGalleryHTML += `<div class="thumbnail-gallery">`;
        product.gallery.forEach((imgSrc, index) => {
            imageGalleryHTML += `<img src="${imgSrc}" alt="${product.name} vue ${index + 1}" class="thumbnail" onclick="changeMainImage('${imgSrc}')">`;
        });
        imageGalleryHTML += `</div>`;
    }
// Fonction pour afficher les produits sur la page boutique
function displayProducts() {
    const productsContainer = document.querySelector('.product-container');
    if (!productsContainer) return;

    // Liste des deux produits à afficher
    const products = [
        { id: '3', name: 'Sweat à Capuche', price: '19,99 €', image: 'images/vetement_3.jpg' },
        { id: '4', name: 'T-shirt Basique', price: '19,99 €', image: 'images/vetement_4.jpg' }
    ];

    productsContainer.innerHTML = ''; // Vide le conteneur avant d'ajouter les produits

    products.forEach(product => {
        const productElement = document.createElement('a');
        productElement.href = `produit.html?id=${product.id}`;
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info-text">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}
    container.innerHTML = `
        <div class="product-image">
            ${imageGalleryHTML}
        </div>
        <div class="product-info">
            <h2>${product.name}</h2>
            <p class="price">${product.price} €</p>
            <p class="description">${product.description}</p>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
        </div>
    `;
}

function changeMainImage(newSrc) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = newSrc;
    }
}

// Exécution des fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayProducts();
    displayProductDetails();
    updateCartPage();
});
// Fonction pour le carrousel d'images
function startCarousel() {
    const carouselContainer = document.querySelector('.carousel-bg');
    if (!carouselContainer) {
        // Le conteneur du carrousel n'existe pas sur cette page, on arrête la fonction.
        return;
    }

    const images = carouselContainer.querySelectorAll('img');
    let imagesLoadedCount = 0;

    // Attendre que toutes les images soient chargées
    images.forEach(img => {
        if (img.complete) {
            imagesLoadedCount++;
        } else {
            img.addEventListener('load', () => {
                imagesLoadedCount++;
                if (imagesLoadedCount === images.length) {
                    // Toutes les images sont chargées, on peut démarrer le carrousel
                    runCarousel();
                }
            });
        }
    });

    // Si toutes les images sont déjà dans le cache, on lance le carrousel
    if (imagesLoadedCount === images.length) {
        runCarousel();
    }

    function runCarousel() {
        let currentIndex = 0;

        // Montrer la première image immédiatement
        images[currentIndex].classList.add('active');

        // Changer d'image toutes les 5 secondes
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 5000);
    }
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
// Fonction pour la galerie de vignettes produits
function setupProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery .thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const newImageSrc = thumbnail.src.replace('_thumb.jpg', '.jpg');
                mainImage.src = newImageSrc;
            });
        });
    }
}
// Fonction pour les animations d'apparition progressives
function setupFadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.product, .product-details-container, .page-content');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // ... tes fonctions existantes
    startCarousel();
    setupDropdownMenu();
    setupProductGallery();
    setupFadeInOnScroll(); /* Ajoute cette ligne */
});
// Fonction pour charger les détails d'un produit
function loadProductDetails() {
    const productDetailsContainer = document.querySelector('.product-details-container');
    if (!productDetailsContainer) return;

    const products = [
        { id: '1', name: 'Veste en Cuir Élégante', price: '499,99 €', description: 'Confectionnée à la main avec un cuir de première qualité, cette veste allie l\'héritage du streetwear et un savoir-faire artisanal. Une pièce intemporelle pour un style affirmé.', image: 'images/vetement_1.jpg' },
        { id: '2', name: 'Pantalon Cargo Moderne', price: '129,99 €', description: 'Un pantalon polyvalent, pensé pour le mouvement et le confort. Ses multiples poches et sa coupe contemporaine en font un indispensable de votre dressing.', image: 'images/vetement_2.jpg' },
        { id: '3', name: 'Sweat à Capuche Luxueux', price: '89,99 €', description: 'Le parfait équilibre entre confort et élégance. Fabriqué en coton ultra-doux, ce sweat est rehaussé de détails discrets qui le rendent unique.', image: 'images/vetement_3.jpg' },
        { id: '4', name: 'T-shirt Basique Sophistiqué', price: '49,99 €', description: 'Un classique revisité pour une qualité irréprochable. Ce T-shirt est coupé dans un jersey de coton épais, offrant un tombé parfait et une durabilité exceptionnelle.', image: 'images/vetement_4.jpg' },
        { id: '5', name: 'Baskets Urbaines Premium', price: '159,99 €', description: 'Légères et robustes, ces baskets sont conçues pour la vie urbaine. Leur design minimaliste s\'associe à une semelle amortissante pour un confort absolu.', image: 'images/vetement_5.jpg' },
        { id: '6', name: 'Casquette Brodée Signature', price: '39,99 €', description: 'Une casquette qui exprime votre style avec élégance. Confectionnée dans un twill de coton, elle arbore un logo brodé pour une finition soignée.', image: 'images/vetement_6.jpg' },
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = products.find(p => p.id === productId);

    if (product) {
        document.querySelector('.product-info h2').textContent = product.name;
        document.querySelector('.product-info .price').textContent = product.price;
        document.querySelector('.product-info .description').textContent = product.description;
        document.getElementById('main-product-image').src = product.image;
    } else {
        productDetailsContainer.innerHTML = '<h2>Produit non trouvé</h2>';
    }
}
