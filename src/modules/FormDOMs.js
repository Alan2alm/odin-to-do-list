/*Este modulo corresponde a las funciones DOMs que deben mostrar los formulario y avisos cuando se 
elige agregar un task o proyect, y cuando se elige editar o eliminar un task o proyect*/

import {todo, tasksControl} from "./to-dos.js";
import {parse, format} from 'date-fns';

export const displayForms = (function(){

    const modulForm = document.getElementById("newTaskTab");
    const task_title = document.getElementById("task_title");
    const task_date = document.getElementById("task_date");
    const task_priority = document.getElementById("task_priority");
    const task_status = document.getElementById("task_checker");
    const statusDisplay = document.querySelector(".task_status");
    const task_description = document.getElementById("task_description");
    const proy_title = document.getElementById("proy_title");

    const clearForm = () =>{
        task_title.value = "";
        task_date.value = "";
        task_description.value = "";
        task_priority.value = 1;
        proy_title.value = "";
        task_status.checked = false;
        statusDisplay.style.display = "hidden";

    };

    const addTaskForm = () => {
        modulForm.showModal();
        clearForm();
        tasksControl.loadProjs();
    };

    const confirmForm = (event) => {
        event.preventDefault();
        if(task_title.value !== "" && task_date.value !== "" && task_description.value !== ""){
            let newTask = new todo(task_title.value, task_date.value, task_description.value, task_priority.value, proy_title.value, task_status.checked);
            tasksControl.conditionTask(newTask);
            modulForm.close();
        }
        clearForm();
    };

    const closeForm = (event) => {
        event.preventDefault();
        modulForm.close();
        clearForm();
    };

    const modifyTaskForm = (event) => {
        clearForm();
        let node = event.target;
        node = node.parentNode;
        node = node.parentNode;
        node = node.querySelector("#boxInfo");
        let nodeTitle = node.querySelector("#taskName");
        let nodeDescription = node.querySelector("#taskDescription");
        modulForm.showModal();
        statusDisplay.style.display = "flex";
        let tasks = [];
        tasks = JSON.parse(localStorage.getItem('tasks'));
        let task = tasks.find(task => task.title.toLowerCase() === nodeTitle.textContent.toLowerCase() && task.description.toLowerCase() === nodeDescription.textContent.toLowerCase());
        switch(task.priority){
            case "Low Priority":
                task_priority.value = 1;
                break;
            case "Middle Priority":
                task_priority.value = 2;
                break;
            case "High Priority":
                task_priority.value = 3;
                break;
        }
        let date = parse(task.dueDate, 'dd/MM/yyyy', new Date());
        let formatDate = format(date, 'yyyy-MM-dd');
        let stat = false;
        if(task.status === "Completed"){
            stat = true;
        };
        task_title.value = task.title;
        task_date.value = formatDate;
        task_status.checked = stat;
        task_description.value = task.description;
        proy_title.value = task.proyect;
    };
    const deleteTask = (event) => {
        let node = event.target;
        node = node.parentNode;
        node = node.parentNode;
        node = node.querySelector("#boxInfo");
        let nodeTitle = node.querySelector("#taskName");
        let nodeDescription = node.querySelector("#taskDescription");
        let confirmAlert = confirm('Delete this Task?');
        if(confirmAlert){
            let tasks = [];
            tasks = JSON.parse(localStorage.getItem('tasks'));
            let task = tasks.find(task => task.title.toLowerCase() === nodeTitle.textContent.toLowerCase() && task.description.toLowerCase() === nodeDescription.textContent.toLowerCase());
            tasksControl.deleteTask(task);
            node = node.parentNode;
            node.remove();
        };
    };

    return{addTaskForm, modifyTaskForm, deleteTask, confirmForm, closeForm};
})();
