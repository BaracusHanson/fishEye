const openning = document.getElementById("Contactez-moi");
openning.addEventListener("click", displayModal);
let action;
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const modal1 = document.querySelector(".modal");
  modal1.style.display = "inline-block";
  modal.style.display = "flex";
  modal.style.position = "fixed";
  modal.style.top = "0";

}

const close = document.querySelector(".close");

close.addEventListener("click", closeModal);
function closeModal() {
  const modal1 = document.querySelector(".modal");
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal1.style.display = "none";
}
