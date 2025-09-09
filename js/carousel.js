document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-bg img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    setInterval(nextImage, 200000); // Change l'image toutes les 5 secondes
    showImage(currentIndex); // Affiche la première image au chargement
});
