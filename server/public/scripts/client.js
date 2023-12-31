console.log('JS is sourced!');

/** This function runs when a new to do item is being submitted */
function createToDo(event) {
    console.log("this is the createToDo function");
    event.preventDefault();
    let newToDo = {
        text : document.getElementById("todotext").value
    }

    console.log(newToDo);
    axios({
        method: 'POST',
        url: '/todos',
        data: newToDo
    }).then((response) => {
    document.getElementById("todotext").value = " ";
    getToDos();
    }).catch((error) => {
        console.log("POST /todos error", error);
    })
}

/** This function deletes a todo row,
 * and removes the item from the db.
 */
function deleteToDo(event){
  console.log('this is the deleteToDo function');
  let clickedButton = event.target;
  let theTableRow = clickedButton.closest('tr');
  let toDoId = Number(theTableRow.getAttribute('data-toDoId'));

  swal.fire({
    title: "Confirm Delete",
    showCancelButton: true,
    confirmButtonText: "Delete",
    text: "Are you sure you want to delete this to do?",
    icon: "warning",
  }).then((result) => {
    if (result.isConfirmed){Swal.fire(
  
  axios({
    method: 'DELETE',
    url: `/todos/${toDoId}`
  }). then((response) => {
    getToDos();
  }). catch((error) => {
    console.log("DELETE /todos/:id failed:", error);
  }))}
})
}

/** This function gets the complete list of songs from db */
function getToDos() {
    console.log("this is the getToDos() function");
    axios({
      method: 'GET',
      url: '/todos'
    }).then((response) => {
      let toDoItems = response.data;
      // console.log(toDoItems);
      renderToDos(toDoItems)
    }).catch((error) => {
      console.log("GET /todos resulted in an error:", error);
    })
  }

/** This function changes the todo item to be complete */
function markAsComplete(event){
  console.log('this is the markAsComplete function');
  let clickedButton = event.target;
  let theTableRow = clickedButton.closest('tr');
  let toDoId = Number(theTableRow.getAttribute('data-toDoId'));

  axios({
    method: 'PUT',
    url: `/todos/${toDoId}`
  }). then((response) => {
    getToDos();
  }).catch((error) => {
    console.log("PUT /todos/:id fail:", error);
  })
}

/** This function loads when the DOM initially loads */
function onReady(){
    console.log("This is the function that loads on initial load");
    getToDos()
}

/** This function renders the todos in the html from db */
function renderToDos(todoArray) {
    console.log("this is the renderToDos function");
    const toDoTable = document.getElementById("toDoTable");
    toDoTable.innerHTML = '';


    for (let todo of todoArray){
      let markAsCompleteHTML = '';
      let timeDate = todo.completedAt;
      let dateCompleted = '';
      if (timeDate){dateCompleted = timeDate.split("T")[0]}

      if (todo.isComplete){markAsCompleteHTML =
        `
        <tr class="table-active" data-testid="toDoItem" data-toDoId="${todo.id}">
        <th scope="row"></>
        <td>${todo.text}</td>
        <td>${dateCompleted}</td>
        <td><button type="button" class="btn btn-success" data-testid="completeButton" disabled>Complete</button></td>
        <td ><button type="button" class="btn btn-danger" data-testid="deleteButton" onclick="deleteToDo(event)" >Delete</button></td>
        </tr>
        `
      } else {markAsCompleteHTML =
`
      <tr data-testid="toDoItem" data-toDoId="${todo.id}">
      <th scope="row"></>
      <td>${todo.text}</td>
      <td>${dateCompleted}</td>
      <td><button type="button" class="btn btn-success" data-testid="completeButton" onclick="markAsComplete(event)" >Complete</button></td>
      <td><button type="button" class="btn btn-danger" data-testid="deleteButton" onclick="deleteToDo(event)" >Delete</button></td>
      </tr>
      `
      }
      toDoTable.innerHTML += markAsCompleteHTML

  }
}

//Item's under here load on startup
onReady();
