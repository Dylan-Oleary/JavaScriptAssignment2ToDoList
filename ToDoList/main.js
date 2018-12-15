//Store the Table Body
var tBody = document.querySelector('tbody');

//Store the HTML template
var itemTemplate = document.querySelector('#itemTemplate');

//Store the item name input field
var itemName = document.querySelector('input[name="itemName"]');

//Store the due date input field
var dueDate = document.querySelector('input[name="dueDate"]');

//Change the dueDate field to input type = date. We have to use this route if we want placeholder
dueDate.addEventListener('focus', function(){
  event.target.type = 'date';
})

dueDate.addEventListener('blur', function(){
  event.target.type = 'text';
})

//Store the create new item button
var createNewItem = document.querySelector('#addNewItem');

//Add a click listener to createNewItem button and create a new item and add it to the list
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
  var userChoice = confirm('Are you sure you want to delete this task?');
  if(userChoice == true){
    tBody.removeChild(event.target.closest('tr'));
  }else{
    return false;
  }
};
  
//This function allows the user to edit a list item
function editItem(event){

  //Store the row to be edited in a variable
  var itemToEdit = event.target.closest('tr');

  //Store all variables for table interactivity
  let successButton = itemToEdit.querySelector('.item-success');
  let editButton = itemToEdit.querySelector('.item-edit');
  let itemNameCell = itemToEdit.querySelector('.item-entry');
  let itemDueDateCell = itemToEdit.querySelector('.item-due-date');

  //Switch edit button for successful edit button
  successButton.classList.remove('buttonInvisible');
  editButton.classList.add('buttonInvisible');
  
  //Add the CONTENTEDITABLE attribute to the item for inline editing
  //NOTE: WE DO NOT WANT TO ALLOW THE USER TO EDIT THE BUTTONS, WE EXCLUDE THEM
  itemNameCell.setAttribute('contenteditable', true);
  itemDueDateCell.setAttribute('contenteditable', true);
  
  //Trigger focus on the item name entry cell
  itemNameCell.focus();
  
  //When selecting the due date cell, switch the cell to a date picker
  itemDueDateCell.addEventListener('focus', function(){
    //Create the date input
    let dueDateSelector = '<input name="newDueDate" type="date" class="tableDate form-control">';

    //Remove the contenteditable, so as to not allow user keystrokes
    itemDueDateCell.removeAttribute('contenteditable');

    itemDueDateCell.innerHTML = dueDateSelector;
  });

  //Event listener to finish the item editing process
  successButton.addEventListener('click', function(){
    //Step 1 - Remove the success button and display the edit button
    successButton.classList.add('buttonInvisible');
    editButton.classList.remove('buttonInvisible');

    //Step 2 - Make the content uneditable
    itemNameCell.removeAttribute('contenteditable');

    //Update the date to reflect the new Date
    var newDueDate = document.querySelector('input[name="newDueDate"]');
    originalDueDateCell = '<td class="item-due-date">' + newDueDate.value + '</td>';
    itemDueDateCell.innerHTML = originalDueDateCell;

    //Reset the new due date value for more editing
    newDueDate.value = "";
  });
};

// function pushItem(itemName, dueDate){
//   //Store the HTML Template in a variable 
//   let content = itemTemplate.content;
  
//   //Import the template into a new Node
//   let newItemRow = document.importNode(content, true);
  
//   //Assign the item-entry cell the value of the the itemName user input
//   newItemRow.querySelector('.item-entry').textContent = itemName;
  
//   //Assign the item-due-date cell the value of the dueDate user input
//   newItemRow.querySelector('.item-due-date').textContent = dueDate;  

//   console.log(itemName, dueDate);
//   //Assign removeItem function to delete button
//   newItemRow.querySelector(".item-delete").onclick = removeItem;
  
//   //Assign editItem function to edit button
//   newItemRow.querySelector('.item-edit').onclick = editItem;

//   //Assign pushItem function to push button
//   newItemRow.querySelector('.item-push').onclick = function(){pushItem(itemName, dueDate)};
    
//   //Prepend the item to the top of the table body
//   tBody.prepend(newItemRow);
// };


//Store the Collapse button
var collapseButton = document.querySelector('#collapseButton');

const newItemForm = document.querySelector('#newItemForm');

//This function collapses and expands the new item form
collapseButton.addEventListener('click', function(){
  if(newItemForm.classList.contains('visible')){
    newItemForm.classList.remove('visible');
    newItemForm.classList.add('nonVisible');
  }else{
    newItemForm.classList.remove('nonVisible');
    newItemForm.classList.add('visible');
  }
});

