

// Step 1 - Select and store the tbody HTML Element.
// INSIGHT: We'll be storing the item entires in the
// tbody. Storing this HTMLElement will give us better
// access to add new items.
var tBody = document.querySelector('tbody');

// Step 2 - Select and store the item template HTML Element.
// INSIGHT: HTML templates are handy for keeping your
// HTML out of your JavaScript. This makes portability easier.
var item = document.querySelector('#itemTemplate');

// Step 3 - Select and store the following HTML Elements:
// INSIGHT: This form will give the user the ability to
// provide information about a new to do item.
// Step 3a - The Item Name field
var itemName = document.querySelector('input[name="itemName"]');

// Step 3b - The Due Date field
var dueDate = document.querySelector('input[name="dueDate"]');

// Step 3c - The 'Create New Item' button for adding a new item
// INSIGHT: We'll listen to the click event on this
// button. That should tell us the user is ready to
// add the information to a new item.
var createNewItem = document.querySelector('#addNewItem');

// Step 4 - Add a click event listener to the HTML Element
// you stored in Step 3c (should've been the 'Create New Item')
// button.

createNewItem.addEventListener('click', function (){
  //Check if itemName and dueDate are blank, if so alert the user and exit the function
  if(itemName.value == "" && dueDate.value == ""){
    alert("You must enter a name and due date!");
    return false;
  }else if(itemName.value == ""){
    alert("You must enter a name!");
    return false;
  }else if(dueDate.value == ""){
    alert("You must enter a due date!");
    return false;
  }
  //Store the HTML Template in a variable 
  let content = itemTemplate.content;
  
  //Import the template into a new Node
  let newItemRow = document.importNode(content, true);
  
  //Assign the item-entry cell the value of the the itemName user input
  newItemRow.querySelector('.item-entry').textContent = itemName.value;
  
  //Assign the item-due-date cell the value of the dueDate user input
  newItemRow.querySelector('.item-due-date').textContent = dueDate.value;  

  //Assign removeItem function to delete button
  newItemRow.querySelector(".item-delete").onclick = removeItem;
  
  //Assign editItem function to edit button
  newItemRow.querySelector('.item-edit').onclick = editItem;
  
  //Reset the input fields
  itemName.value = "";
  dueDate.value = "";
  
  //Prepend the item to the top of the table body
  tBody.prepend(newItemRow);
});

//This function allows the user to remove a list item
function removeItem(event){
  //The child of the tBody is a tr (tableRow). The child we are removing is the closest table row to the event target
  // This is the table row that contains the clicked DELETE button
  tBody.removeChild(event.target.closest('tr'));
};
  
//This function allows the user to edit a list item
function editItem(event){

  //Store the row to be edited in a variable
  let itemToEdit = event.target.closest('tr');
  
  //Add the CONTENTEDITABLE attribute to the item for inline editing
  //NOTE: WE DO NOT WANT TO ALLOW THE USER TO EDIT THE BUTTONS, WE EXCLUDE THEM
  itemToEdit.setAttribute('contenteditable', 'true');
  itemToEdit.querySelector('.item-actions').removeAttribute('contenteditable');  

  //Trigger focus on the element
  itemToEdit.focus();
  
  //Add a blur event listener to the item. Blur occurs when an item has lost focus
  //In this context, when the user clicks off of the item, it will no longer be editable
  //until they click the EDIT button again
  itemToEdit.addEventListener('blur', function(){
    itemToEdit.removeAttribute('contenteditable');
  })
};

//This function collapses and expands the new item form
let collapseButton = document.querySelector('#collapseButton');

const newItemForm = document.querySelector('#newItemForm');

collapseButton.addEventListener('click', function(){
  if(newItemForm.classList.contains('visible')){
    newItemForm.classList.remove('visible');
    newItemForm.classList.add('nonVisible');
  }else{
    newItemForm.classList.remove('nonVisible');
    newItemForm.classList.add('visible');
  }
});


// Step 7e - Create a way for the user to edit the date:
// INSIGHT: This will take some thought but will demonstrate
// your understanding of JavaScript.

// BONUS: Use prototyping, objects, storage solutions, frameworks,
// and/or date plugins to demonstrate your knowledge and outside
// learning.