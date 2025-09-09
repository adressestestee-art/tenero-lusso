document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fermer le menu si un lien est cliqué
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // --- Carrousel automatique ---
    const carouselItems = document.querySelectorAll('.carousel-item');
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

    function startAutoSlide() {
        if (carouselItems.length > 1) {
            autoSlideInterval = setInterval(nextSlide, 5000); // Défile toutes les 5 secondes
        }
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
        // On vérifie si l'utilisateur a déjà accepté les cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');

        if (!cookiesAccepted) {
            // Si non, on affiche la bannière
            cookieBanner.classList.remove('hidden');
        } else {
            // Si oui, on cache la bannière
            cookieBanner.classList.add('hidden');
        }

        acceptCookiesBtn.addEventListener('click', () => {
            // Quand le bouton est cliqué, on sauvegarde l'acceptation
            localStorage.setItem('cookiesAccepted', 'true');
            // Et on cache la bannière
            cookieBanner.classList.add('hidden');
        });
    }
});
