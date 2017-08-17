
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
      delete todos[index];
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

    switch(this.id){

      case "todoName":
      app.state.name = this.value;
      break;

    }

  }


  // Callback for adding, Updating and Removing To-Dos

  function _getInputs(evt) {

    let name = app.state.name;
    app.todoList.addTodo(new Todo(name));
    console.log(app.todoList.getTodos());

    let size = app.todoList.getTodos().length;
    let index = app.todoList.getTodos().length;

    // Clear my new todo input element
    $("#todoName").val("");

    let todoId = "todo"+(size-1);

    // Creating i/p field, checkbox and remove button for new todo element
    $('#todoList').append(
      "<div class='todo' id='" + todoId +"'>" +
        "<input type='text' value='" + name + "' class='todoInput' id='input" + (size-1) +" ' />" +
        "<input type='checkbox' class='todoCheckbox' data-index='"+ (index-1) +"' id='checkbox1' />" +
        "<button button-index='"+ (index-1) +"' ><i class='fa fa-times-circle' aria-hidden='true' class='todoRemove'></i></button>" +
      "</div>"
    );
    
    
    // The to-do item checked done
    $('div#'+todoId +" > input[type=checkbox]").on('change', function() {  
      let index = $(this).attr('data-index');
      app.todoList.updateTodo(index, {complete: true});
      console.log(app.todoList.getTodos()[index].getName());
      console.log("Toggled todo with index : " + index);
    });

    // Removing the To-do item from the list
    $('div#'+todoId +" > button").on('click', function() {
      let buttonIndex = $(this).attr('button-index');
      console.log("Touched: " + buttonIndex);

      console.log(app.todoList.getTodos()[buttonIndex].getName());
      app.todoList.removeTodo(buttonIndex);
      $('div#'+todoId).remove();

      console.log("Removed todo with index : " + buttonIndex);
      console.log(app.todoList.getTodos());
    });
      

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
