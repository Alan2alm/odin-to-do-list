/*Aqui ya se importa los demas modulos y se lleva a cabo las funciones en orden para cada situacion
implementada en los anteriores modulos, como por ejemplo el agregar un nuevo task*/

import "./style.css";
import {displayMenus} from "./modules/displayDOMs.js";
import {displayForms} from "./modules/FormDOMs.js";
//import {todo, tasksControl, proyect} from "./modules/to-dos.js";

/*event.preventDefault(); para desactivar el envio del form*/

const addTaskBtn = document.getElementById("addTaskBtn");
const closeBtn = document.getElementById("close-btn");
const confirmBtn = document.getElementById("confirm-btn");

const projBtn = document.getElementById("proyBtn");
const allTaskBtn = document.getElementById("allTaskBtn");
const todayBtn = document.getElementById("todayBtn");
const weekBtn = document.getElementById("weekBtn");


addTaskBtn.addEventListener('click', ()=>{
    displayForms.addTaskForm();
});
closeBtn.addEventListener('click', function(event){
    displayForms.closeForm(event);
});
confirmBtn.addEventListener('click', function(event){
    displayForms.confirmForm(event);
});

projBtn.addEventListener('click', ()=>{
    displayMenus.showProjects();
});
allTaskBtn.addEventListener('click', ()=>{
    displayMenus.showAllTasks();
});
todayBtn.addEventListener('click', ()=>{
    displayMenus.showTodayTasks();
});
weekBtn.addEventListener('click', ()=>{
    displayMenus.showWeekTasks();
});

displayMenus.showAllTasks();