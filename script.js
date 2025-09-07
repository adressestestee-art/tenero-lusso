// Fonction pour le carrousel d'images d'arrière-plan
function startCarousel() {
    const images = document.querySelectorAll('.carousel-bg img');
    if (images.length === 0) return;

    let currentIndex = 0;
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 5000); // Change l'image toutes les 5 secondes
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
    const fadeElements = document.querySelectorAll('.product, .product-details-container, .page-content, .product-section');

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

// Fonction pour gérer l'affichage recto/verso des produits
function setupProductFlip() {
    const productSections = document.querySelectorAll('.product-section');

    productSections.forEach(section => {
        const images = section.querySelectorAll('.product-image');
        let isFront = true;

        section.addEventListener('click', () => {
            if (isFront) {
                images[0].classList.add('hidden');
                images[1].classList.remove('hidden');
            } else {
                images[1].classList.add('hidden');
                images[0].classList.remove('hidden');
            }
            isFront = !isFront;
        });
    });
}

// Lancement de toutes les fonctions une fois que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    startCarousel();
    setupDropdownMenu();
    setupProductGallery();
    setupFadeInOnScroll();
    setupProductFlip();
});
