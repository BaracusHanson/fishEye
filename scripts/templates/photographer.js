function photographerTemplate(data) {
    const { name, portrait, tagline, city, country, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const p1 = document.createElement( 'p' );
        const p2 = document.createElement( 'p' );
        const p3 = document.createElement( 'p' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        p1.textContent = `${city}, ${country}`;
        p2.textContent = tagline;
        p2.innerHTML = `${price}&euro;/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}