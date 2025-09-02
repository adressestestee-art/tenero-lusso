const products = [
    {id: 1, name: "T-shirt Urban", price: 25, img: "https://via.placeholder.com/200x200?text=T-shirt+Urban"},
    {id: 2, name: "Hoodie Street", price: 45, img: "https://via.placeholder.com/200x200?text=Hoodie+Street"},
    {id: 3, name: "Casquette Cool", price: 20, img: "https://via.placeholder.com/200x200?text=Casquette+Cool"},
    {id: 4, name: "Pantalon Jogger", price: 35, img: "https://via.placeholder.com/200x200?text=Pantalon+Jogger"}
];

let cart = [];

function displayProducts() {
    const container = document.getElementById("products");
    container.innerHTML = "";
    products.forEach(product => {
        const prodDiv = document.createElement("div");
        prodDiv.className = "product";
        prodDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Prix: ${product.price} €</p>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
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
        const response = await fetch('http://localhost:3000/orders', {
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
