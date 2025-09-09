document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fermer le menu si un lien est cliqué (pour les ancres)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // --- Carrousel automatique ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    }

    // Démarrer le défilement automatique
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change l'image toutes les 5 secondes
    }

    // Arrêter le défilement automatique (utile pour la navigation manuelle)
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Gestion des boutons de navigation (arrête le défilement auto temporairement)
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide(); // Redémarre après une action manuelle
        });

        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide(); // Redémarre après une action manuelle
        });
    }

    // Initialisation du carrousel
    if (carouselItems.length > 0) {
        showSlide(currentIndex);
        startAutoSlide();
    }

    // --- Formulaire de newsletter ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email-input');
            const email = emailInput.value;

            if (email) {
                // Ici, vous enverriez normalement les données à votre backend ou Formspree
                // Pour cet exemple, nous simulons une réponse
                newsletterMessage.textContent = 'Inscription réussie ! Merci.';
                newsletterMessage.classList.remove('error');
                newsletterMessage.classList.add('success');
                emailInput.value = ''; // Réinitialise le champ
            } else {
                newsletterMessage.textContent = 'Veuillez entrer une adresse email valide.';
                newsletterMessage.classList.remove('success');
                newsletterMessage.classList.add('error');
            }
            newsletterMessage.style.opacity = 1;
            setTimeout(() => {
                newsletterMessage.style.opacity = 0;
            }, 3000); // Le message disparaît après 3 secondes
        });
    }

    // --- Bandeau de cookies ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        // Vérifie si l'utilisateur a déjà accepté les cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');

        if (!cookiesAccepted) {
            cookieBanner.classList.remove('hidden');
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.add('hidden');
        });
    }

    // --- Page de détail produit (si applicable) ---
    // Vous pouvez laisser ce code si vous l'avez déjà ou le retirer si vous ne l'utilisez pas encore
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainProductImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                mainProductImage.src = thumbnail.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
        // Active la première miniature par défaut
        if (thumbnails[0]) {
            thumbnails[0].classList.add('active');
        }
    }
});
