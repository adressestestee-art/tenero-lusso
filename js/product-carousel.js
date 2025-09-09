document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Supprime la classe 'active' de toutes les miniatures
                thumbnails.forEach(t => t.classList.remove('active'));

                // Ajoute la classe 'active' à la miniature cliquée
                thumbnail.classList.add('active');

                // Change l'image principale
                mainImage.src = thumbnail.src;
            });
        });
    }
});
