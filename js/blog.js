document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-container');

    // On va chercher le fichier de données JSON
    fetch('data/blog-posts.json')
        .then(response => response.json())
        .then(posts => {
            // Pour chaque article dans le fichier JSON...
            posts.forEach(post => {
                // ...on crée un élément <a> pour l'article
                const articleLink = document.createElement('a');
                articleLink.href = post.link;
                articleLink.classList.add('blog-article');

                // On crée et remplit l'image
                const image = document.createElement('img');
                image.src = post.image;
                image.alt = post.title;

                // On crée le conteneur d'informations
                const infoDiv = document.createElement('div');
                infoDiv.classList.add('article-info');

                // On crée et remplit le titre
                const title = document.createElement('h3');
                title.textContent = post.title;

                // On crée et remplit la date
                const date = document.createElement('p');
                date.classList.add('article-date');
                date.textContent = post.date;

                // On crée et remplit l'aperçu
                const preview = document.createElement('p');
                preview.classList.add('article-preview');
                preview.textContent = post.preview;

                // On assemble tous les éléments
                infoDiv.appendChild(title);
                infoDiv.appendChild(date);
                infoDiv.appendChild(preview);
                articleLink.appendChild(image);
                articleLink.appendChild(infoDiv);

                // Et on ajoute l'article complet à la page
                blogContainer.appendChild(articleLink);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des articles de blog :', error));
});
