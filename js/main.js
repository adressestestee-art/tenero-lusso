document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Gestion du bandeau de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    // Vérifie si l'utilisateur a déjà accepté les cookies
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
    } else {
        if (cookieBanner) {
            cookieBanner.style.display = 'flex';
        }
    }

    // Cache le bandeau quand le bouton est cliqué
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            if (cookieBanner) {
                cookieBanner.classList.add('hidden');
                // Enregistre le choix de l'utilisateur
                localStorage.setItem('cookiesAccepted', 'true');
                // Masque le bandeau après l'animation
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 500);
            }
        });
    }
});
