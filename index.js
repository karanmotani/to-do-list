
// Todo Class
// properties:
//  @ name - string
//  @ complete = boolean
//  @ priority = number

function Todo(todoName) {
  
  let name = todoName;
  let priority = 1;
  let complete = true;
  
  this.getName = function() {
    return name;
  }
  
  this.getPriority = function() {
    return priority;
  }
  
  this.getComplete = function() {
    return complete;
  }

  this.update = function(todo) {
    let obj = {
      name: todo.name,
      complete: todo.complete,
      priority: todo.priority
    };
  
    name = obj.name || this.getName();
    complete = obj.complete || this.getComplete();
    priority = obj.priority || this.getPriority();
  }

}

// TodoList Class
// properties:
//  @ name - string
//  @ todos = array<Todo>

function TodoList(todoListName) {
  let name = todoListName;
  let todos = [];


  // Adds todo list item to todos array
  // params
  // @ todo - Todo()
  this.addTodo = function(todo) {
    if(todo instanceof Todo){
        todos.push(todo);
        return todos;
      }

    return false;

  }

  // Removes todo list item from todos array
  // param
  // @ index - index of the Todo to be removed
  this.removeTodo = function(index) {
    if(index < todos.length) {
      todos.splice(index, 1);
    }
  }

  // Updates todo list item at position
  // param
  // @ index - index of the Todo to be removed
  // @ todoObj - the Todo Obj that is to be updated
  this.updateTodo = function(index, todoObj) {
    if(index < todos.length && todoObj) {
      let todo = todos[index];
      todo.update(todoObj);
      return todo;
    }

    return false;
  }


  this.getTodos = function() {
        return todos;
    }

}


// User Class
// properties:
//  @ name - string
//  @ email - string
//  @ phone - string
function User(username, useremail, userphone) {
  let name = username;
  let email = useremail;
  let phone = userphone;
}

// App Class - Singleton
function App() {
  let user = null;
  this.todoList = new TodoList("My To-Do List");
  

  // Creates a new user for the application
  // params
  // @obj - Object
  //   + name - string 
  //   + email - string 
  //   + phone - string 
  this.createUser = function(obj) {
    let name = obj.name;
    let email = obj.email;
    let phone = obj.phone;

    if(name && email && phone) {   
     return this.user = new User(name,email,phone);  
    }

    else { 
     return false
    }

  }

/*  
  this.getTodoList = function() {
    return todoList;
  }
*/

}


// Creates a new user for the application

let MyApp = new App();



// Start test suite;

MyApp.createUser({
  name : "Karan Motani",
  email : "karan.motani94@gmail.com",
  phone : "+1 214-906-3353"
});


MyApp.todoList.addTodo(new Todo("Eat"));
MyApp.todoList.addTodo(new Todo("Sleep"));
MyApp.todoList.addTodo(new Todo("Code"));
MyApp.todoList.addTodo(new Todo("Repeat"));

console.log(MyApp.todoList.getTodos());

MyApp.todoList.removeTodo("2")

console.log(MyApp.todoList.getTodos());

let obj = {
  name: "Don't repeat",
  complete: true,
  priority: 2
}

MyApp.todoList.updateTodo(2, obj);

console.log(MyApp.todoList.getTodos()[2].getName());
console.log(MyApp.todoList.getTodos()[2].getPriority());
console.log(MyApp.todoList.getTodos()[2].getComplete());