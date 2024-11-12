async function getPhotographers() {

  let datas = await fetch("../data/photographers.json");
  const photographers = await datas.json();

  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    userCardDOM.addEventListener("click", () => {
      const photographerId = photographer.id;
      // Redirection vers photographer.html avec l'ID dans l'URL
      const url = new URL("photographer.html", window.location.origin);
      url.searchParams.set("id", photographerId);
      window.location.href = url.toString();
    });
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
