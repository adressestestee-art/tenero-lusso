document.addEventListener('DOMContentLoaded', () => {

    // --- GESTION DU MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- GESTION DU BANDEAU DE COOKIES ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    if (cookieBanner && acceptButton) {
        // Vérifie si l'utilisateur a déjà accepté les cookies
        if (localStorage.getItem('cookiesAccepted')) {
            cookieBanner.style.display = 'none';
        }

        // Cache le bandeau quand le bouton est cliqué
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }


    // --- GESTION DU FORMULAIRE DE NEWSLETTER ---
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            const emailInput = document.getElementById('email-input');
            const email = emailInput.value;
            if (email) {
                alert(`Merci pour votre inscription à notre newsletter !`);
                emailInput.value = ''; // Réinitialise le champ après envoi
            }
        });
    }

});
