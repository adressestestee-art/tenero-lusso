const BACKEND_URL = "https://tenero-lusso.onrender.com"; // <== Remplace par ton URL Render

const products = [
    {id: 1, name: "T-shirt NYF", price: 30, description: "Un T-shirt de qualité supérieure avec le logo NYF. Coupe décontractée, parfait pour le style urbain.", img: "./images/t-shirt.png"},
    {id: 2, name: "Hoodie NYF", price: 60, description: "Hoodie confortable en coton épais. Idéal pour les soirées fraîches, il allie confort et style.", img: "./images/hoodie.png"},
    {id: 3, name: "Jogger NYF", price: 50, description: "Pantalon de jogging avec logo discret, conçu pour le mouvement et le confort. Tissu respirant.", img: "./images/jogger.png"},
    {id: 4, name: "Casquette NYF", price: 25, description: "Casquette noire classique avec logo NYF brodé. Taille ajustable.", img: "./images/cap.png"}
];

let cart = [];

function displayProducts() {
    const container = document.getElementById("products");
    if (!container) return; 

    container.innerHTML = "";
    products.forEach(product => {
        const prodDiv = document.createElement("a"); // C'est ici qu'on crée le lien
        prodDiv.href = `product-details.html?id=${product.id}`; // Le lien avec l'ID du produit
        prodDiv.className = "product";
        prodDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info-text">
                <h3>${product.name}</h3>
                <p>${product.price} €</p>
            </div>
            <button onclick="event.preventDefault(); addToCart(${product.id})">Ajouter au panier</button>
        `;
        container.appendChild(prodDiv);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.price} € <button onclick="removeFromCart(${index})">Supprimer</button>`;
        cartItems.appendChild(li);
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = total;
}

document.getElementById("checkout-btn").addEventListener("click", async () => {
    if(cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/orders`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({items: cart})
        });

        if(response.ok) {
            alert("Commande passée avec succès !");
            cart = [];
            updateCart();
        } else {
            alert("Erreur lors de la commande.");
        }
    } catch (error) {
        alert("Impossible de contacter le serveur.");
    }
});

displayProducts();
