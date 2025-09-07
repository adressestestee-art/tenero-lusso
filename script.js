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

// Fonctions d'affichage des produits
function displayProducts() {
    const container = document.getElementById("products");
    if (!container) return; 

    container.innerHTML = "";
    products.forEach(product => {
        const prodDiv = document.createElement("div");
        prodDiv.className = "product";
        prodDiv.innerHTML = `
            <a href="produit.html?id=${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info-text">
                    <h3>${product.name}</h3>
                    <p>${product.price} €</p>
                </div>
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

// Exécution des fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // ... tes fonctions existantes (updateCartCount, displayProducts, etc.)
    startCarousel();
    setupDropdownMenu();
});
