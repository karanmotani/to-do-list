
// Todo Class
// properties:
//  @ name - string
//  @ complete = boolean
//  @ priority = number

function Todo(todoName) {
  
  let name = todoName;
  let priority = 1;
  let complete = false;
  let id =  "todo-" + Math.round((new Date()).getTime() / 1000);
  
  this.getName = function() {
    return name;
  }
  
  this.getPriority = function() {
    return priority;
  }
  
  this.getComplete = function() {
    return complete;
  }

  this.getID = function() {
    return id;
  }

  this.update = function(todo) {
    let obj = {
      name: todo.name,
      complete: todo.complete,
      priority: todo.priority
    };
  
    if(obj.complete != undefined) {
      complete = obj.complete;
    }

    if(obj.name !== undefined) {
      name = obj.name;
    }

//    name = obj.name || this.getName(); 
    priority = obj.priority || this.getPriority();
  }

 // return this.getName(), this.getPriority(), this.getComplete();

}


// function lists() {
//   let todolists = [];


//   // Adds todo list item to todos array
//   // params
//   // @ todolist - TodoList()
//   this.addTodoList = function(todolist) {
//     if(todolist instanceof TodoList) {
//       todolists.push(todolist);
//       return todolists;
//     }

//     return false;

//   }
// }


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
//      delete todos[index];
        todos.splice(index, 1);
    }
  }

  // Updates todo list item at position
  // param
  // @ index - index of the Todo to be removed
  // @ todoObj - the Todo Obj that is to be updated
  this.updateTodo = function(index, todoObj) {
    if(index < todos.length && todoObj) {

      console.log(todoObj);
      console.log(index);
      let todo = todos[index];
      return todo.update(todoObj);
    }

    return false;
  }


  this.getTodos = function() {
    return todos;
  }

  this.sortTodos = function(sortingArray) {
    return (todos = todos.sort(sortingArray));
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
    name: "",
    listName: ""
  
  };


  let user = null;
  app.todoList = [];
  app.lists = null;
  // app.todoList = new TodoList("My To-Do List");
  
  

  // Adds a new TodoList to the application
  // params
  // @evt - Native Click Event

  function _addTodoList (evt) {
    // app.todoList = new TodoList(todoListName);
    
    let todoListName = app.state.listName;
    console.log(todoListName);

    // $("#todoListName").val("");
    // app.state.listName = "";

    if(!todoListName)
      return;
    
    app.todoList.push(new TodoList(todoListName));
    let index = app.todoList.length - 1;
    
    console.log(index);
    
    app.lists = app.todoList[index];

    console.log(app.lists);

    $('#todo-list').append(`<input type='radio' id='todoLists' checked name='lists' value=${index}>${todoListName}`);
    $('#todoListName').val("");

    app.render();

  }



  function _switchTodoList(evt) {
    let index = $(evt.target).val();
    app.lists = app.todoList[index];
    app.render();
  }






  // Callback for user input
  // params
  // @evt - Native Keyup Event

  function _onKeyUp(evt) {

      switch(this.id) {

      case "todoName":
      app.state.name = this.value;
      break;

      case "todoListName":
      app.state.listName = this.value;
      break;
    
    }

  
  }




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




  // Adding new Todo to the application
  // params
  // @evt - Native Click Event

  function _AddTodo(evt) {
  
    let inputName = app.state.name;

    $("#todoName").val("");
    app.state.name = "";

    if(!inputName)
      return;

    app.lists.addTodo(new Todo(inputName));
    app.render();
  }


  // Remove a todo from application
  // params
  // @evt - Native Click Event

  function _RemoveTodo(evt) {

    let todoIndex = $('.todo-Remove').index(evt.target);
    console.log(todoIndex);

    app.lists.removeTodo(todoIndex);
    app.render();

  }


  // Updating complete status of todo item
  // params
  // @evt - Native Click Event

  function _CheckTodo(evt) {

    let todoIndex = $('.todo-Check').index(evt.target);
    let complete = $(evt.target).is(':checked');
    
    console.log('Getting status before: ' + app.lists.todoList.getTodos()[todoIndex].getComplete());
   
    app.lists.updateTodo(todoIndex, {complete: complete});

    console.log('Getting status after: ' + app.lists.todoList.getTodos()[todoIndex].getComplete());
    app.render();

  }


  // Changing the name of the todo item
  // params
  // @evt - Native Blur Event

  function _EditTodo(evt) {

    let editName = evt.target.value;
    let todoIndex = $('.todo-Name').index(evt.target);

    console.log(todoIndex);
    app.lists.updateTodo(todoIndex, {name: editName});
    app.render();

  }


  // Changing the name of the todo item
  // params
  // @evt - Native Keyup Event

  function _EditTodoEnter(evt) {

    if(evt.keyCode == 13) {

      let editName = evt.target.value;
      let todoIndex = $('.todo-Name').index(evt.target);
      app.lists.updateTodo(todoIndex, {name: editName});
      app.render();

    }

  }


  // Changing the priority of the todo item
  // params
  // @evt - Native Blur Event

  function _EditPriority(evt) {

    let editPriority = evt.target.value;
    let todoIndex = $('.todo-Priority').index(evt.target);
    
    app.lists.updateTodo(todoIndex, {priority: editPriority}); 

    function sortingArray(a, b) {
      return b.getPriority() - a.getPriority();
    }

    app.lists.todoList.sortTodos(sortingArray);
    app.render();

  }


  // Changing the priority of the todo item
  // params
  // @evt - Native Keyup Event

  function _EditPriorityEnter(evt) {

    if(evt.keyCode == 13) {

      let editPriority = evt.target.value;
      let todoIndex = $('.todo-Priority').index(evt.target);
     
      app.lists.updateTodo(todoIndex, {priority: editPriority});
      
      function sortingArray(a, b) {
        return b.getPriority() - a.getPriority();
      }

      app.lists.sortTodos(sortingArray);
      app.render();

    }

  }


  app.createTodoView = function(todo, index) {

    let check = "";

    if(todo.getComplete() === true)
      check = "checked"

    return ( 
        "<div class='todo'>"
    +     "<input type='checkbox' class='todo-Check' value='None' data-id='" + todo.getID() + "' data-index='" + index + "' " + check + "/>"
    +     "<input type='text' class='todo-Name' value='" + todo.getName() + "' data-id='"+todo.getID()+"' data-index='"+index+"'/>"
    +     "<button class='todo-Remove' data-id='"+todo.getID()+"' data-index='"+index+"'>X</button>"
    +     "<input type='text' class='todo-Priority' value = '" + todo.getPriority() + "' data-id='" + todo.getID() + "' data-index='" + index + "'/>"
    +   "</div>"
    );
  }


  app.removeListeners = function() {
    $('.todo-Remove').off('click', _RemoveTodo);
    $('.todo-Check').off('click', _CheckTodo);
    $('.todo-Name')
      .off('keyup', _EditTodoEnter)
      .off('blur', _EditTodo);
    $('.todo-Priority')
      .off('keyup', _EditPriorityEnter)
      .off('blur', _EditPriority);
    $('input[type=radio]').off('click',_switchTodoList);
  }


  app.attachListeners = function() {
    $('.todo-Remove').on('click', _RemoveTodo);
    $('.todo-Check').on('click', _CheckTodo);
    $('.todo-Name')
      .on('keyup', _EditTodoEnter)
      .on('blur', _EditTodo);
    $('.todo-Priority')
      .on('keyup', _EditPriorityEnter)
      .on('blur', _EditPriority);
    $('input[type=radio]').on('click',_switchTodoList);
  }


  app.render = function() {

    let list = app.lists.getTodos();

    let todoView = 
      list.map(function(item, index){          
        return( 
          app.createTodoView(item, index)
        )
    });

    app.removeListeners();
      
    app.$todos.html(todoView);

    app.attachListeners();

  } 



  app.init = function() {

    app.$addTodoButton = $('#submit');
    app.$addTodoListButton = $('#addTodoList');
    app.$todos = $('#todoList')

    $("input.userInputs").keyup(_onKeyUp);
    $("input.todoListInputs").keyup(_onKeyUp);

    app.$addTodoButton.click(_AddTodo);
    app.$addTodoListButton.click(_addTodoList);
    // $("input.todoListInputs").keypress(function(evt){
    //   if(evt.which === 13) {
    //     _addTodoList($(evt.target).val());
    //   }
    // });

  }

  return app;

})();