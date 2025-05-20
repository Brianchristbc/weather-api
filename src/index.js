import "./style.css";
import { submitForm } from "./visual-crossing.js";
console.log("hi");

const formButton = document.getElementById("submit-form");
formButton.addEventListener("click", (event) => {
  submitForm();
  event.preventDefault();
});
