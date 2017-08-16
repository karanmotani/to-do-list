
// Todo Class
// properties:
//  @ name - string
//  @ complete = boolean
//  @ priority = number

function Todo(todoName) {
  
  let name = todoName;
  let priority = 1;
  let complete = false;
  
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

  return this.getName(), this.getPriority(), this.getComplete();

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

MyApp = (function(){

  let app = {};

  app.state = {
    name: ""
  
  };


  let user = null;
  app.todoList = new TodoList("My To-Do List");
  
  
  // Creates a new user for the application
  // params
  // @obj - Object
  //   + name - string 
  //   + email - string 
  //   + phone - string 
  app.createUser = function(obj) {
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


  // Callback for user input

  function _onKeyUp(evt){

    //console.log(this.id);

    switch(this.id){

      case "todoName":
      app.state.name = this.value;
      break;

    }

    // console.log(app.state);

  }

  // Callback for adding, Updating and Removing To-Dos

  function _getInputs(evt) {

    let abc = app.state.name;
    var ncp = app.todoList.addTodo(new Todo(abc));
    var abcd = app.todoList.getTodos()[0].getName();
    $('.list').append(abcd);

  }


  app.init = function(){

    $('#submit').click(_getInputs);
    $("input.userInputs").keyup(_onKeyUp);

  }

  return app;

})();


// Start test suite;

MyApp.createUser({
  name : "Karan Motani",
  email : "karan.motani94@gmail.com",
  phone : "+1 214-906-3353"
});
