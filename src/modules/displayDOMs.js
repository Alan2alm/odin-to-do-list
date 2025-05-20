/*Este modulo tiene que tener constructores/fabricas que se encarguen de mostrar las 
paginas correspondientes a cada boton, como por ejemplo el boton today 
debe mostrar aquellas tareas que correspondan al dia de hoy*/

/*muestra los datos dependiendo de la pagina que se elija*/

/*Se puede hacer una fabrica para cada boton o una fabrica para todos los botones*/

import {format, isSameDay, isSameWeek, parse} from 'date-fns';
import {displayForms} from "./FormDOMs.js";
import { tasksControl } from './to-dos.js';

export const displayMenus = (function(){
    const titleBox = document.querySelector("#mainTitle");
    const tasksList = document.querySelector(".tasksList");

    const clearMain = () => {
        titleBox.textContent = "";
        tasksList.textContent = "";
    };

    const createTitle = (mainTitle) => {
        titleBox.textContent = mainTitle;
    };

    const taskTransfer = (newTask) => {
        let taskBox = document.createElement("div");
        let boxInfo = document.createElement("div");
        let boxOptions = document.createElement("div");

        let taskName = document.createElement("div");
        let taskDueDate = document.createElement("div");
        let taskPriority = document.createElement("div");
        let taskStatus = document.createElement("div");
        let taskProy = document.createElement("div");
        let taskDescription = document.createElement("div");

        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        editBtn.addEventListener('click', function(event){displayForms.modifyTaskForm(event)});
        deleteBtn.addEventListener('click', function(event){displayForms.deleteTask(event)});

        taskBox.className = "taskBox";
        boxInfo.id = "boxInfo";
        boxOptions.id = "boxOptions";

        taskName.id = "taskName";
        taskDueDate.id = "taskDueDate";
        taskPriority.id = "taskPriority";
        taskStatus.id = "taskStatus";
        taskProy.id = "taskProy";
        taskDescription.id = "taskDescription";

        editBtn.id = "editBtn";
        deleteBtn.id = "deleteBtn";

        taskName.textContent = newTask.title;
        taskDueDate.textContent = newTask.dueDate;
        taskPriority.textContent = newTask.priority;
        taskStatus.textContent = newTask.status;
        if (newTask.proyect === ""){
            taskProy.textContent = `Proyect: None`
        }else{taskProy.textContent = `Proyect: ${newTask.proyect}`};
        taskDescription.textContent = newTask.description;
        
        editBtn.textContent = "Edit";
        deleteBtn.textContent = "Dlt";

        boxInfo.appendChild(taskName);
        boxInfo.appendChild(taskDueDate);
        boxInfo.appendChild(taskPriority);
        boxInfo.appendChild(taskStatus);
        boxInfo.appendChild(taskProy);
        boxInfo.appendChild(taskDescription);

        boxOptions.appendChild(editBtn);
        boxOptions.appendChild(deleteBtn);

        taskBox.appendChild(boxInfo);
        taskBox.appendChild(boxOptions);

        tasksList.appendChild(taskBox);
        return taskBox;
    };

    const showAllTasks = () => {
        if(localStorage.getItem('tasks') === null){
            clearMain();
            createTitle("There's no tasks");
        }else{
            clearMain();
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log(tasks);
            createTitle("All Tasks");
            tasks.forEach(task => {
                taskTransfer(task);
            });
        }
    };
    const showTodayTasks = () => {
        if(localStorage.getItem('tasks') === null){
            clearMain();
            createTitle("There's no tasks");
        }else{
            clearMain();
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log(tasks);
            createTitle("Today Tasks");
            let taskDate = new Date();
            let actualDate = new Date();
            tasks.forEach(task => {
                taskDate = parse(task.dueDate, 'dd/MM/yyyy', new Date());
                if(isSameDay(taskDate, actualDate)){
                    taskTransfer(task);
                }
            });
        }
    };
    const showWeekTasks = () => {
        if(localStorage.getItem('tasks') === null){
            clearMain();
            createTitle("There's no tasks");
        }else{
            clearMain();
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log(tasks);
            createTitle("This Week Tasks");
            let taskDate = new Date();
            let actualDate = new Date();
            tasks.forEach(task => {
                taskDate = parse(task.dueDate, 'dd/MM/yyyy', new Date());
                console.log(task.dueDate);
                console.log(taskDate);
                if(isSameWeek(taskDate, actualDate)){
                    taskTransfer(task);
                }
            });
        }
    };

    //hacer el showProyects
    const showProjects = () => {
        if(localStorage.getItem('tasks') === null){
            clearMain();
            createTitle("There's no tasks");
        }else{
            clearMain();
            createTitle("Projects");
            tasksControl.loadProjs();
            let projects = JSON.parse(localStorage.getItem("projects"));
            projects.forEach(proj => {
                projBox(proj);
            });
        }
    };

    const displayTasks = (event) => {
        if(localStorage.getItem('tasks') === null){
            clearMain();
            createTitle("There's no tasks");
        }else{
            let node = event.target;
            node = node.parentNode;
            node = node.parentNode;
            node = node.querySelector("#boxInfo");
            let nodeTitle = node.querySelector("#projName");
            createTitle(nodeTitle.textContent);
            clearMain();
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.forEach(task =>{
                if(task.proyect === nodeTitle.textContent){
                    taskTransfer(task);
                }
            });
        }
    };

    const projBox = (project) => {
        let taskBox = document.createElement("div");
        let boxInfo = document.createElement("div");
        let boxOptions = document.createElement("div");

        let taskName = document.createElement("div");

        let openBtn = document.createElement("button");

        openBtn.addEventListener('click', function(event){displayTasks(event)});

        taskBox.className = "taskBox";
        boxInfo.id = "boxInfo";
        boxOptions.id = "boxOptions";

        taskName.id = "projName";

        openBtn.id = "openBtn";

        taskName.textContent = project;
        
        openBtn.textContent = "Open";

        boxInfo.appendChild(taskName);

        boxOptions.appendChild(openBtn);

        taskBox.appendChild(boxInfo);
        taskBox.appendChild(boxOptions);

        tasksList.appendChild(taskBox);
    }

    return{clearMain, showAllTasks, showTodayTasks, showWeekTasks, showProjects};
})();

