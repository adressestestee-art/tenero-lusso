// js/carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-bg img');
    let currentIndex = 0;

    function nextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    setInterval(nextImage, 9000); // Change l'image toutes les 3 secondes
});
