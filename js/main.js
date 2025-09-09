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

    // --- GESTION DU CARROUSEL ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
            showSlide(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        });
    }

    // --- GESTION DES FORMULAIRES ---
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    // Soumission du formulaire de newsletter
    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email-input');
            const email = emailInput.value;

            try {
                const response = await fetch(newsletterForm.action, {
                    method: newsletterForm.method,
                    body: new FormData(newsletterForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    newsletterMessage.textContent = "Merci pour votre inscription !";
                    newsletterMessage.classList.remove('error');
                    newsletterMessage.classList.add('success');
                    emailInput.value = '';
                } else {
                    newsletterMessage.textContent = "Erreur, veuillez réessayer plus tard.";
                    newsletterMessage.classList.remove('success');
                    newsletterMessage.classList.add('error');
                }
            } catch (error) {
                newsletterMessage.textContent = "Erreur, veuillez réessayer plus tard.";
                newsletterMessage.classList.remove('success');
                newsletterMessage.classList.add('error');
            }

            setTimeout(() => {
                newsletterMessage.textContent = '';
                newsletterMessage.classList.remove('success', 'error');
            }, 5000);
        });
    }

    // Soumission du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (email && message) {
                alert("Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.");
                contactForm.reset();
            }
        });
    }
});
