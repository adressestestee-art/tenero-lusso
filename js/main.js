document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ... (code précédent pour le menu mobile)

    // Gestion du bandeau de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    // Vérifie si l'utilisateur a déjà accepté les cookies
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        if (cookieBanner) {
            cookieBanner.classList.add('hidden');
        }
    } else {
        if (cookieBanner) {
            cookieBanner.classList.remove('hidden');
        }
    }

    // Gère le clic sur le bouton "Accepter"
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            if (cookieBanner) {
                // Ajoute la classe 'hidden' pour déclencher l'animation de disparition
                cookieBanner.classList.add('hidden');
                
                // Enregistre le choix de l'utilisateur dans le stockage local
                localStorage.setItem('cookiesAccepted', 'true');
            }
        });
    }
});
                
                // Masque le bandeau complètement après l'animation (500ms)
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 500); 
            }
            // ... (code précédent pour le menu et les cookies)

    // Gestion du formulaire de newsletter
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
     
