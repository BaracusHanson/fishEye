// Fonction pour récupérer l'ID depuis l'URL
function getPhotographerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id"); // Récupère la valeur du paramètre 'id'
}

// Fonction pour récupérer les données des photographes depuis le fichier JSON
async function getPhotographers() {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

// Fonction pour afficher les détails d'un photographe
async function showPhotographerDetails() {
  const photographerId = getPhotographerIdFromURL();
  const photographers = await getPhotographers();

  // Trouve le photographe correspondant à l'ID récupéré
  const photographer = photographers.find(
    (p) => p.id === parseInt(photographerId)
  );

  console.log(photographer);
  // Vérifie si le photographe existe
  if (!photographer) {
    console.error("Photographe introuvable");
    return;
  }

  // Affiche les détails dans la section .photograph-header
  const photographersHeaderText = document.querySelector(".text");
  const photographersHeaderImg = document.querySelector(".photographerImg");

  const img = document.createElement("img");
  img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
  img.setAttribute("alt", photographer.name);

  const h1 = document.createElement("h1");
  h1.textContent = photographer.name;

  const location = document.createElement("p");
  location.textContent = `${photographer.city}, ${photographer.country}`;

  const tagline = document.createElement("p");
  tagline.textContent = photographer.tagline;

  const price = document.querySelector(".price");
  // console.log(price);
  price.innerHTML = `${photographer.price}&euro;/jour`;



  // Ajouter les éléments au header
  photographersHeaderImg.appendChild(img);
  photographersHeaderText.appendChild(h1);
  photographersHeaderText.appendChild(location);
  photographersHeaderText.appendChild(tagline);
  price.appendChild(price);
  totalLiked.appendChild(totalLiked);
}

// Appel de la fonction pour afficher les détails du photographe au chargement de la page
showPhotographerDetails();

/**
 * gestion photos des photographer
 *
 */

// Fonction pour récupérer les données MEDIAS des photographes depuis le fichier JSON

async function getPhotgraphersMediasById() {
  async function getPhotographers() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data.media;
  }

  const photographerId = getPhotographerIdFromURL();
  const medias = await getPhotographers();
  // console.log(photographerId);
  // console.log(medias);

  const mediaByUser = medias.filter(
    (m) => m.photographerId === parseInt(photographerId)
  );

  console.log(mediaByUser);
  const sumLike = mediaByUser.reduce((accumulateur, media) => {
    return accumulateur + media.likes
  }, 0);
  console.log(sumLike);
  if (!mediaByUser) {
    console.error("media introuvable");
    return;
  }

  const articleSection = document.querySelector(".articleSection");
  const article = document.querySelector(".article");
  console.log(articleSection);
  const totalLiked = document.querySelector(".totalLiked");
  
  totalLiked.innerHTML = `${sumLike}<i class="fa-regular fa-heart"></i>`;

  mediaByUser.forEach((media) => {
    // Vérifie si media contient une image ou une vidéo
    const mediaContent = media.image 
      ? `<img src="./assets/photographers/${media.image}" alt="${media.title}" class="articleImg"/>`
      : `<video controls class="articleVideo">
           <source src="./assets/photographers/${media.video}" type="video/mp4">
           Votre navigateur ne supporte pas la lecture de vidéos.
         </video>`;
  
    articleSection.innerHTML += `
      <div class="article">
        ${mediaContent} <!-- Insère soit l'image soit la vidéo -->
        <div class="articleInfos">
          <h2 class="articleTitle">${media.title}</h2>
          <p class="likes">
            <span>${media.likes}</span>
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
          </p>
        </div>
      </div>`;
  });
  

  articleSection.appendChild(article);
  console.log(article);
}

getPhotgraphersMediasById();
