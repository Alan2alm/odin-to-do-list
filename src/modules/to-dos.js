/*  to-dos > projects > index
    think where to put the DOMs, in index or in a different .js like doms.js > index.js and in index.js link each DOM to the functions from project  */
// DOMForm > todos > projects > DOMdisplays > index
//The add a task (to-do) is implemented in the sidebar with the form being hidden or display:none in css
class todo {
    constructor (title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
    }


}

