document.addEventListener('DOMContentLoaded', () => {

   const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active'); // Ajout de cette ligne
    });
}

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

// Gérer le bouton d'acceptation des cookies
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesButton = document.getElementById('accept-cookies');

if (cookieBanner && acceptCookiesButton) {
    // Vérifier si le cookie a déjà été accepté
    const isCookieAccepted = localStorage.getItem('cookieAccepted');

    if (!isCookieAccepted) {
        cookieBanner.classList.remove('hidden'); // S'assurer qu'il est visible au chargement
    }

    acceptCookiesButton.addEventListener('click', () => {
        // Enregistrer le consentement de l'utilisateur
        localStorage.setItem('cookieAccepted', 'true');
        // Ajouter la classe pour masquer la bannière
        cookieBanner.classList.add('hidden');
    });
}
