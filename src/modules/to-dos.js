/*  to-dos > projects > index
    think where to put the DOMs, in index or in a different .js like doms.js > index.js and in index.js link each DOM to the functions from project  */
// DOMForm > todos > projects > DOMdisplays > index
//The add a task (to-do) is implemented in the sidebar with the form being hidden or display:none in css
/*Este modulo importa las estructuras de los modulos DOMs y hace uso de la base de dato(LocalStorage)
para guardar y imprimir los datos de los task y los proyectos*/

import {format, parseISO} from 'date-fns';

export class todo {
    constructor (title, dueDate, description, priority, proyTitle = "", isCompleted = false){
        this._title = title;
        this._dueDate = parseISO(dueDate);
        this._priority = priority;
        this._isCompleted = false;
        this._description = description;
        this._proyTitle = proyTitle;
        this._isCompleted = isCompleted;
    }

    get title(){
        return this._title;
    }

    set title(titleText){
        this._title = titleText;
    }

    get dueDate(){
        return this._dueDate;
    }

    set dueDate(valueDate){
        this._dueDate = valueDate;
    }

    get priority(){
        return this._priority;
    }

    set priority(valuePriority){
        this._priority = valuePriority;
    }

    get isCompleted(){
        return this._isCompleted;
    }

    set isCompleted(Value){
        this._isCompleted = Value;
    }

    get description(){
        return this._description;
    }

    set description(text){
        this._description = text;
    }

    get proyTitle(){
        return this._proyTitle;
    }

    set proyTitle(title){
        this._proyTitle = title;
    }

    toJSON(){
        let stat, priorityName;
        if(this._isCompleted === true){
            stat = "Completed"
        }else{
            stat = "Not Completed"
        };

        switch(this._priority){
            case "1":
                priorityName = "Low Priority";
                break;
            case "2":
                priorityName = "Middle Priority";
                break;
            case "3":
                priorityName = "High Priority";
                break;
        };

        return {
            title: this._title,
            dueDate: format(this._dueDate, 'dd/MM/yyyy', new Date()),
            priority: priorityName,
            status: stat,
            description: this._description,
            proyect: this._proyTitle
        };
    }

};

export const tasksControl = (function (){
    
    let tasksArray = [];
    let projArray = [];
    
    const storeTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        loadProjs();
    };
    const loadTasks = () => {
        if(localStorage.getItem('tasks') !== null){
            tasksArray = JSON.parse(localStorage.getItem('tasks'));
        }
    };
    const addTask = (task) => {
        tasksArray.push(task);
        storeTasks();
    };
    const deleteTask = (taskNeeded) => {
        loadTasks();
        let newTasksArray = tasksArray.filter(task => task.title !== taskNeeded.title);
        tasksArray = newTasksArray;
        storeTasks();
    };
    const modifyTask = (task) => {
        const updatedTasks = tasksArray.map(taskObj =>
            taskObj.title === task.title ? task : taskObj
            //encuentra el obj task que se este buscando, por nombre, y le implementa todos los datos dados
            // nombObj => condicion ? modificacion
        );
        tasksArray = updatedTasks;
        storeTasks();
    };

    const conditionTask = (task) =>{
        loadTasks();
        if(tasksArray.find(t => t.title == task.title)){modifyTask(task)}else{addTask(task)}
    };

    const loadProjs = () => {
        loadTasks();
        projArray = [];
        for (let task of tasksArray) {
            if (!projArray.includes(task.proyect)) {
                projArray.push(task.proyect);
            }
        };
        console.log(projArray);
        localStorage.setItem('projects', JSON.stringify(projArray));
    };

    
    return {addTask, deleteTask, modifyTask, loadTasks, conditionTask, loadProjs};
})();

export class proyect {
    constructor (title){
        this._title = title;
        this._todos = [];
        this.searchTasks();
    }

    get title(){
        return this._title;
    }

    set title(newTitle){   
        this._title = newTitle;
    }

    get todos(){
        return this._todos;
    }

    set todos(tasksArray){
        this._todos = tasksArray;
    }

    searchTasks (){
        if(localStorage.getItem("tasks") !== null){
            let tempArray = JSON.parse(localStorage.getItem("tasks"));
            tempArray.forEach(task => {
                if(task.proyect === this.title){
                    this._todos.push(task);
                }
            });
        }
    }

    hasTasks(){
        return (this._todos.length !== 0);
    }
}
