// Liste des produits (copie-coller depuis script.js pour être indépendant)
const products = [
    {id: 1, name: "T-shirt NYF", price: 30, description: "Un T-shirt de qualité supérieure avec le logo NYF. Coupe décontractée, parfait pour le style urbain.", img: "./images/t-shirt.png"},
    {id: 2, name: "Hoodie NYF", price: 60, description: "Hoodie confortable en coton épais. Idéal pour les soirées fraîches, il allie confort et style.", img: "./images/hoodie.png"},
    {id: 3, name: "Jogger NYF", price: 50, description: "Pantalon de jogging avec logo discret, conçu pour le mouvement et le confort. Tissu respirant.", img: "./images/jogger.png"},
    {id: 4, name: "Casquette NYF", price: 25, description: "Casquette noire classique avec logo NYF brodé. Taille ajustable.", img: "./images/cap.png"}
];

function displayProductDetails() {
    // Récupère l'ID du produit depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Trouve le produit correspondant
    const product = products.find(p => p.id === productId);

    const container = document.getElementById("product-details");
    if (!product || !container) {
        container.innerHTML = "<p>Produit non trouvé.</p>";
        return;
    }

    container.innerHTML = `
        <div class="product-image">
            <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h2>${product.name}</h2>
            <p class="price">${product.price} €</p>
            <p class="description">${product.description}</p>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
            <a href="index.html" class="back-link">Retour à la boutique</a>
        </div>
    `;
}

// Appelle la fonction pour afficher les détails du produit
displayProductDetails();
