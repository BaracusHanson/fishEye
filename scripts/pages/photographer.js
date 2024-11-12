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
  

  
    // Ajouter les éléments au header
    photographersHeaderImg.appendChild(img);
    photographersHeaderText.appendChild(h1);
    photographersHeaderText.appendChild(location);
    photographersHeaderText.appendChild(tagline);
  }
  
  // Appel de la fonction pour afficher les détails du photographe au chargement de la page
  showPhotographerDetails();
  