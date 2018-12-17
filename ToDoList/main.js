//Store the Table Body
var tBody = document.querySelector('tbody');

//Store the HTML template for to do list and completed table
var itemTemplate = document.querySelector('#itemTemplate');

//Set Collapse Buttons To Correct State
var collapseButton = document.querySelector('#collapseButton');
collapseButton.querySelector('.formUp').classList.toggle('buttonInvisible');

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

//Array of items
var itemArray = [];

//function to create new item object
function Item(name, date){
  this.name = name;
  this.date = date;
  this.complete = false;
}

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

  //create item object
  var item = new Item(itemName.value, dueDate.value);

  //Store it in the items array
  itemArray.push(item);

  //Store the HTML Template in a variable
  let content = itemTemplate.content
  
  //Import the template into a new Node
  let newItemRow = document.importNode(content, true);
  
  //Assign the item-entry cell the value of the the itemName user input
  newItemRow.querySelector('.item-entry').textContent = item.name
  
  //Assign the item-due-date cell the value of the dueDate user input
  newItemRow.querySelector('.item-due-date').textContent = item.date;  
  //Assign removeItem function to delete button
  newItemRow.querySelector(".item-delete").onclick = removeItem;
  
  //Assign editItem function to edit button
  newItemRow.querySelector('.item-edit').onclick = function() {editItem(event, item)};
  //Assign pushItem function to push button
  newItemRow.querySelector('.item-push').onclick = function() {statusToggle(event, item)};

  newItemRow.querySelector('.item-down').onclick = function() {itemDown(item)};

  newItemRow.querySelector('.item-up').onclick = function() {itemUp(item)};
  
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
function editItem(event, item){

  //Store the row to be edited in a variable
  var itemToEdit = event.target.closest('tr');

  //Store all variables for table interactivity
  let successButton = itemToEdit.querySelector('.item-success');
  let editButton = itemToEdit.querySelector('.item-edit');
  let itemNameCell = itemToEdit.querySelector('.item-entry');
  let itemDueDateCell = itemToEdit.querySelector('.item-due-date');

  var dateEdited = false;

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
    dateEdited = true;
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

    //if the item name is not null but we havent touched the date
    if(itemNameCell.textContent !== "" && dateEdited === false){
      //Store new item name and repopulate the table
      item.name = itemNameCell.textContent;
  
      repopulateTable();
    }else if(itemNameCell.textContent !== "" && dateEdited === true){ //item name is changed, date is changed
      //if date has not been selected
      if(itemToEdit.querySelector('input[name="newDueDate"]').value === ""){
        alert("Edit Failed - Date cannot be blank");

        //Put date cell back to item date
        itemToEdit.querySelector('.item-due-date').textContent = item.date;

        repopulateTable();

        //Reset dateEdited check variable
        dateEdited = false;
      }else{ //if a new date has been chosen
        item.date = itemToEdit.querySelector('input[name="newDueDate"]').value;

        //Store new item name and repopulate table
        item.name = itemNameCell.textContent; 
        repopulateTable();

        //Reset dateEdited check variable
        dateEdited = false;
      }
    }else if(itemNameCell.textContent === "" && dateEdited === false){
      alert("Edit Failed - Item name cannot be blank");
      repopulateTable();
    }else if(itemNameCell.textContent === "" && dateEdited === true){
      alert("Edit Failed - Item name cannot be blank");
      repopulateTable();
      dateEdited = false;
    }
  });
};


function statusToggle(event, item){
  if(item.complete === false){
    item.complete = true;
    event.target.closest('tr').classList.add('table-success');
  }else{
    item.complete = false;
    event.target.closest('tr').classList.remove('table-success');
  }
};

//This function repopulates the table with the itemArray
function repopulateTable(){
    //Create array of table rows
    let tmp = Array.from(document.querySelectorAll('tbody > tr'));

    //For each table row, remove
    for(let node of tmp){
      node.remove();
    }
  
    for(let item of itemArray){  
    //Store the HTML Template in a variable
    let content = itemTemplate.content
    
    //Import the template into a new Node
    let newItemRow = document.importNode(content, true);
    
    //Assign the item-entry cell the value of the the itemName user input
    newItemRow.querySelector('.item-entry').textContent = item.name
    
    //Assign the item-due-date cell the value of the dueDate user input
    newItemRow.querySelector('.item-due-date').textContent = item.date;  
    //Assign removeItem function to delete button
    newItemRow.querySelector(".item-delete").onclick = removeItem;
    
    //Assign editItem function to edit button
    newItemRow.querySelector('.item-edit').onclick = function() {editItem(event, item)};
    //Assign pushItem function to push button
    newItemRow.querySelector('.item-push').onclick = function() {statusToggle(event,item)};
  
    newItemRow.querySelector('.item-down').onclick = function() {itemDown(item)};

    newItemRow.querySelector('.item-up').onclick = function() {itemUp(item)};

    if(item.complete === true){
      newItemRow.querySelector('tr').classList.add('table-success');
    }else{
      newItemRow.querySelector('tr').classList.remove('table-success');
    }
      
    //Prepend the item to the top of the table body
    tBody.prepend(newItemRow);
    }
}

//This function allows the user to bump an item up in the table, indicating greater importance!
function itemDown(item){
  //Store the item's index. We use index -1 because we are prepending the rows to the table
  var index = itemArray.indexOf(item);
  var indexBelow = index - 1;

  if(index === 0){
    return false;
  }

  //Remove item from array
  itemArray.splice(index, 1);
  //Insert item into the array index just below it
  itemArray.splice(indexBelow, 0, item);

  repopulateTable();
}

function itemUp(item){
    //Store the item's index. We use index +1 because we are prepending the rows to the table
    var index = itemArray.indexOf(item);

    if(index === itemArray.length -1){
      return false;
    }
  
    //Remove item from array
    itemArray.splice(index, 1);
    //Insert item into the array index just above it
    itemArray.splice(index + 1, 0, item);

    repopulateTable();
};

const newItemForm = document.querySelector('#newItemForm');

//This function collapses and expands the new item form
collapseButton.addEventListener('click', function(){
  if(newItemForm.classList.contains('visible')){
    newItemForm.classList.remove('visible');
    newItemForm.classList.add('nonVisible');

    collapseButton.querySelector('.formUp').classList.toggle('buttonInvisible');
    collapseButton.querySelector('.formDown').classList.toggle('buttonInvisible');

  }else{
    newItemForm.classList.remove('nonVisible');
    newItemForm.classList.add('visible');

    collapseButton.querySelector('.formUp').classList.toggle('buttonInvisible');
    collapseButton.querySelector('.formDown').classList.toggle('buttonInvisible');
  }
});

var successTemplate = document.querySelector('#popup');

function popup(){
  let content = successTemplate.content;
}

