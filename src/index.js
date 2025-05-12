import "./style.css";
import {} from "./modules/displayDOMs.js";

const addTaskBtn = document.querySelector("#addTaskBtn");
const modulForm = document.querySelector("#newTaskTab");

addTaskBtn.addEventListener('click', ()=>{
    modulForm.show();

});