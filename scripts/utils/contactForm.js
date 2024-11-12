function displayModal() {
  const modal = document.getElementById("contact_modal");
  const header = document.querySelector("header");
  const main = document.getElementById("main");
  modal.style.display = "block";
  header.style.display = "none";
  main.style.display = "none";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const header = document.querySelector("header");
  const main = document.getElementById("main");
  modal.style.display = "none";
  header.style.display = "block";
  main.style.display = "block";
}
