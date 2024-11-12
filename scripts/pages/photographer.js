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

  console.log("media:", mediaByUser);

  const sumLike = mediaByUser.reduce((accumulateur, media) => {
    return accumulateur + media.likes;
  }, 0);

  if (!mediaByUser) {
    console.error("media introuvable");
    return;
  }

  const articleSection = document.querySelector(".articleSection");
  // console.log(articleSection);
  const totalLiked = document.querySelector(".totalLiked");

  totalLiked.innerHTML = `${sumLike}<i class="fa-regular fa-heart"></i>`;

  mediaByUser.forEach((media) => {
    // Vérifie si media contient une image ou une vidéo
    // console.log(media.image);

    const mediaContent = media.image
      ? `<img src="./assets/photographers/${media.image}" alt="${media.title}" class="articleImg"/>`
      : `<video controls class="articleVideo">
           <source src="./assets/photographers/${media.video}" type="video/mp4">
         </video>`;

    articleSection.innerHTML += `
      <div class="article">
        ${mediaContent} 
        <div class="articleInfos">
          <h2 class="articleTitle">${media.title}</h2>
          <p class="likes">
            <span>${media.likes}</span>
            <i class="fa-regular fa-heart" ></i>
            <i class="fa-solid fa-heart"></i>
          </p>
        </div>
      </div>`;
  });

  const mediaElements = articleSection.querySelectorAll(
    ".articleImg, .articleVideo"
  );
  // console.log(mediaElements);
  mediaElements.forEach((el, index) => {
    el.addEventListener("click", (e) => {
// Sélection des éléments nécessaires
const carouselModal = document.getElementById("carouselModal");
const carouselMediaContainer = document.getElementById("carouselMediaContainer");
let currentMediaIndex = 0;

// Fonction pour afficher le média actuel dans le carrousel
function showMedia() {
  const media = mediaByUser[currentMediaIndex];
  
  // Vérifiez si le média contient une image ou une vidéo
  const mediaContent = media.image 
    ? `<img src="/assets/photographers/${media.image}" alt="${media.title}" class="carouselImage">`
    : `<video controls class="carouselVideo">
         <source src="/assets/photographers/${media.video}" type="video/mp4">
         Votre navigateur ne supporte pas la lecture de vidéos.
       </video>`;

  // Insère le contenu dans le conteneur du carrousel
  carouselMediaContainer.innerHTML = mediaContent;
}

// Fonction pour ouvrir le carrousel et afficher le média cliqué en premier
function openCarousel(index) {
  currentMediaIndex = index; // Définit l'index du média actuel sur l'index cliqué
  showMedia(); // Affiche le média actuel
  carouselModal.style.display = "block"; // Affiche la modale
}

// Fonction pour fermer le carrousel
function closeCarousel() {
  carouselModal.style.display = "none";
}

// Navigation vers le média suivant
function showNextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaByUser.length;
  showMedia();
}

// Navigation vers le média précédent
function showPreviousMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaByUser.length) % mediaByUser.length;
  showMedia();
}

// Ajouter les événements de clic aux boutons de navigation et de fermeture
document.getElementById("nextBtn").addEventListener("click", showNextMedia);
document.getElementById("prevBtn").addEventListener("click", showPreviousMedia);
document.querySelector(".closeBtn").addEventListener("click", closeCarousel);

// Ferme la modale si on clique en dehors
window.addEventListener("click", (event) => {
  if (event.target === carouselModal) {
    closeCarousel();
  }
});

// Ajoute un événement de clic sur chaque image et vidéo pour ouvrir le carrousel
document.querySelectorAll(".articleImg, .articleVideo").forEach((mediaElement, index) => {
  mediaElement.addEventListener("click", () => openCarousel(index));
});

      
    });
  });
}

getPhotgraphersMediasById();
