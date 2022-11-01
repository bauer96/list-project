// VERSION 1.2 NOW

// select everything
// select the item-form
const itemForm = document.querySelector('.item-form');

// select the input box
const itemInput = document.querySelector('.item-input');

// select the <ul> with class="todo-items"
const myItemsList = document.querySelector('.list-items');

// array which stores every todos
let myItems = [];

let user = "Hannes"

// toast modal section 
let displayBtn = document.querySelector('.display-btn');
let closeBtn = document.querySelector('.close-btn');
let notificationBox = document.querySelector('.notification-box');
let action;


closeBtn.addEventListener('click', function() {
    notificationBox.classList.remove('active');
    clearTimeout(action)
})


itemForm.addEventListener('submit', function(event) {
    
    notificationBox.innerHTML = ` <i class="fa-solid fa-check"></i> <p> ${user} has added ${itemInput.value} </p>`
    notificationBox.classList.add('active');
     action = setTimeout(function() {
    notificationBox.classList.remove('active')}, 3000);
event.preventDefault()
addItem(itemInput.value);
})
// add an eventListener on form, and listen for submit event
itemForm.addEventListener('keypress', function(event) {
    if (event.key === "Enter")  {
        notificationBox.innerHTML = ` <i class="fa-solid fa-check"></i> <p> ${user} has added ${itemInput.value} </p>`
        notificationBox.classList.add('active');
         action = setTimeout(function() {
        notificationBox.classList.remove('active')}, 3000);
  // prevent the page from reloading when submitting the form
  
  event.preventDefault();

  addItem(itemInput.value);
     } // call addTodo function with input box current value
});

function checkInput() {
    if(itemInput.value.length > 0) {
        console.log("item generated");
    } else {
       alert("Item can not generated");
    }
}

// function to add todo
function addItem(item) {
    checkInput()
  // if item is not empty
  if (item !== '') {
    // make a todo object, which has id, name, and completed properties
    const newItem = {
      id: Date.now(),
      name: item,
      completed: false,
      user: user
    };

// then add it to todos array
    myItems.push(newItem);

    // alert for add items to listItems array 
   // alert(`Tamara hat ${itemInput.value} zur Liste hinzugefügt`)

    addToLocalStorage(myItems); // then store it in localStorage
// finally clear the input box value

    itemInput.value = '';
  }
}

// function to render given todos to screen
function renderItem(myItems) {

  // clear everything inside <ul> with class=todo-items
  myItemsList.innerHTML = '';

// run through each item inside todos
  myItems.forEach(function(item) {

    // check if the item is completed

    const checked = item.completed ? 'checked': null;
// make a <li> element and fill it

    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>

    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>

    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <i class="delete-button fa-solid fa-square-minus"></i>
      
    `;

    // finally add the <li> to the <ul>
    myItemsList.append(li);
  });
}

// function to add todos to local storage
function addToLocalStorage(myItems) {

  // conver the array to string then store it.
  localStorage.setItem('myItems', JSON.stringify(myItems));

  // render them to screen
  renderItem(myItems);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('myItems');

  // if reference exists
  if (reference) {

    // converts back to array and store it in todos array
    myItems = JSON.parse(reference);
    renderItem(myItems);
  }
}
// toggle the value to completed and not completed
function toggle(id) {
  myItems.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });
addToLocalStorage(myItems);
}
// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteItem(id) {
  // filters out the <li> with the id and updates the todos array
  myItems = myItems.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
// update the localStorage
  addToLocalStorage(myItems);
}
// initially get everything from localStorage
getFromLocalStorage();
// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
myItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
// check if that is a delete-button
  if (event.target.classList.contains('fa-square-minus')) {
    notificationBox.innerHTML = ` <i class="fa-solid fa-check"></i> <p> ${user} has deleted ${itemInput}</p>`
    notificationBox.classList.add('active');
     action = setTimeout(function() {
    notificationBox.classList.remove('active')}, 3000);
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteItem(event.target.parentElement.getAttribute('data-key'));
  }
});
