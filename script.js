// La liste des produits
const products = [
    {id: 1, name: "T-shirt NYF", price: 30, description: "Un T-shirt de qualité supérieure avec le logo NYF. Coupe décontractée, parfait pour le style urbain.", img: "./images/t-shirt.png"},
    {id: 2, name: "Hoodie NYF", price: 60, description: "Hoodie confortable en coton épais. Idéal pour les soirées fraîches, il allie confort et style.", img: "./images/hoodie.png"},
    {id: 3, name: "Jogger NYF", price: 50, description: "Pantalon de jogging avec logo discret, conçu pour le mouvement et le confort. Tissu respirant.", img: "./images/jogger.png"},
    {id: 4, name: "Casquette NYF", price: 25, description: "Casquette noire classique avec logo NYF brodé. Taille ajustable.", img: "./images/cap.png"}
];

let cart = [];

// Fonctions pour gérer les sections
function showSection(sectionId) {
    document.getElementById('shop-section').classList.add('hidden');
    document.getElementById('product-details-section').classList.add('hidden');
    document.getElementById('about-section').classList.add('hidden');
    document.getElementById('contact-section').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

// Fonction pour afficher la page d'accueil avec les produits
function displayProducts() {
    const container = document.getElementById("products");
    container.innerHTML = "";
    products.forEach(product => {
        const prodDiv = document.createElement("div"); // On revient à une div
        prodDiv.className = "product";
        prodDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" onclick="showProductDetails(${product.id})">
            <div class="product-info-text" onclick="showProductDetails(${product.id})">
                <h3>${product.name}</h3>
                <p>${product.price} €</p>
            </div>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
        `;
        container.appendChild(prodDiv);
    });
}

// ... (le reste de ton script.js)

// Fonction pour afficher les détails d'un produit
function showProductDetails(id) {
    const product = products.find(p => p.id === id);
    const container = document.getElementById("product-details");
    
    if (!product || !container) {
        container.innerHTML = "<p>Produit non trouvé.</p>";
        return;
    }

    // Crée la galerie d'images
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
    showSection('product-details-section');
}

// Nouvelle fonction pour changer l'image principale au clic sur une miniature
function changeMainImage(newSrc) {
    document.getElementById('main-product-image').src = newSrc;
}

// ... (le reste de ton script.js)

// Fonctions du panier (à conserver de ton code précédent)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    let total = 0;
    
    // Pour éviter les doublons dans le panier
    const productCounts = {};
    cart.forEach(product => {
        productCounts[product.id] = (productCounts[product.id] || 0) + 1;
    });

    Object.keys(productCounts).forEach(id => {
        const product = products.find(p => p.id === parseInt(id));
        const count = productCounts[id];
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${product.name} x${count}</span>
            <span>${product.price * count} €</span>
            <button onclick="removeFromCart(${id})">Supprimer</button>
        `;
        cartItemsList.appendChild(li);
        total += product.price * count;
    });

    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('cart-total').textContent = total;
}

function removeFromCart(id) {
    const index = cart.findIndex(p => p.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Gestion de la navigation
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('shop-section');
});
document.getElementById('about-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('about-section');
});
document.getElementById('contact-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('contact-section');
});
document.getElementById('back-to-shop-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('shop-section');
});

// Initialisation de la page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
    showSection('shop-section'); // Affiche la boutique par défaut
});
const products = [
    {
        id: 1, 
        name: "T-shirt NYF", 
        price: 30, 
        description: "Un T-shirt de qualité supérieure avec le logo NYF. Coupe décontractée, parfait pour le style urbain.", 
        img: "./images/t-shirt.png",
        gallery: ["./images/t-shirt.png", "./images/t-shirt-alt.png"] // Nouvelle galerie d'images
    },
    {
        id: 2, 
        name: "Hoodie NYF", 
        price: 60, 
        description: "Hoodie confortable en coton épais. Idéal pour les soirées fraîches, il allie confort et style.", 
        img: "./images/hoodie.png",
        gallery: ["./images/hoodie.png"] // Une seule image pour le moment
    },
    {
        id: 3, 
        name: "Jogger NYF", 
        price: 50, 
        description: "Pantalon de jogging avec logo discret, conçu pour le mouvement et le confort. Tissu respirant.", 
        img: "./images/jogger.png",
        gallery: ["./images/jogger.png", "./images/jogger-alt.png"] // Nouvelle galerie d'images
    },
    {
        id: 4, 
        name: "Casquette NYF", 
        price: 25, 
        description: "Casquette noire classique avec logo NYF brodé. Taille ajustable.", 
        img: "./images/cap.png",
        gallery: ["./images/cap.png"] // Une seule image pour le moment
    }
];
// ... (le reste des fonctions et de la liste de produits)

// Gestion de la navigation
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('shop-section');
});
document.getElementById('about-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('about-section');
});
document.getElementById('contact-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('contact-section');
});
document.getElementById('cart-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('cart-section');
});
document.getElementById('back-to-shop-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('shop-section');
});

// Initialisation de la page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
    showSection('shop-section'); // Affiche la boutique par défaut
});

let cart = [];

