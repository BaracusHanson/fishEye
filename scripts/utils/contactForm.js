function displayModal() {
  const modal = document.getElementById("contact_modal");
  const modal1 = document.querySelector(".modal");
  const header = document.querySelector("header");
  const main = document.getElementById("main");
  modal.style.display = "flex";
  modal1.style.display = "inline-block";
  header.style.display = "none";
  main.style.display = "none";
  
}

function closeModal() {
  const modal1 = document.querySelector(".modal");
  const modal = document.getElementById("contact_modal");
  const header = document.querySelector("header");
  const main = document.getElementById("main");
  modal.style.display = "none";
  header.style.display = "block";
  main.style.display = "block";
  modal1.style.display = "none";
}
