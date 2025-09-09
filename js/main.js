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
     console.log('État des cookies :', localStorage.getItem('cookiesAccepted')); 
    // Vérifie si l'utilisateur a déjà accepté les cookies
    // Si la propriété "cookiesAccepted" est dans le stockage local, on n'affiche pas le bandeau.
    if (localStorage.getItem('cookiesAccepted')) {
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
                // On ajoute la classe "hidden" pour l'animation
                cookieBanner.classList.add('hidden');
                
                // Enregistre le choix de l'utilisateur dans le stockage local
                localStorage.setItem('cookiesAccepted', 'true');
                
                // Masque le bandeau complètement après l'animation (500ms)
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 500); 
            }
        });
    }
});
