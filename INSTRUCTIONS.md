# Weekend Challenge: Client-Server-Database To-Do List App

Hello Primers! 

Welcome to another weekend challenge!

This weekend is all about building a CRUD application to show yourself (and us!) that you now have a handle on the different parts of the stack.

You are now a person who has developed enough of a conceptual understanding to build out a full-stack CRUD app that has a client, server, and database. That's remarkable. Truly. ❤️

## Your "First" To-Do List App

You are going to create *your very first full-stack to-do list app*.

You know when you'll probably build another to-do list app? **Every time** you're learning to use a new language or framework to build CRUD apps!

As software developers, our job is to learn new stuff often. You'll probably be building lots more to-do list apps.

## Requirements:

* Create a front-end experience that allows a user to create a to-do item.
* When a to-do item is created:
    * It should be stored inside the database table.
    * The DOM should update and display the new to-do item.
* Each to-do item should have a button to 'Complete' or 'Delete' it.
* When a to-do item is completed:
    * Its `isComplete` value (in the database table) should be updated to `TRUE`.
    * A CSS class of `completed` should be applied to the to-do item.
        * This class should make it visually clear that the to-do is complete.
        * Example, the background of the to-do item could change from gray to green.
            * *Not a requirement, but*: It'd greatly improve the user experience if the "complete" button appears to be somehow checked-off or disabled when a to-do has been marked as completed.
* When a to-do item is deleted:
  * It should be removed from the database table.
  * The DOM should update to show that list no longer includes the deleted to-do item.

## Styling

Use CSS styling to move the aesthetic of the page beyond the basic HTML look. Quick wins, if you're pressed for time:
  - Background color of the page.
  - Font family and size.
  - Text color & or background color of tasks *to show whether or not they have been completed*.

## Approach

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

## Create Your Database

Create a new database through Postico. Name it `weekend-to-do-app`. Then, run the queries found `database.sql` to create a `todos` table and populate it with two initial to-do items.

## Testing Requirements:

1. The input you use to collect "to-do text" user input must have:
    * `data-testid="toDoTextInput"`
2. The button that a user clicks to "create" a new to-do must have:
  * `data-testid="submitButton"`
3. Each rendered to-do item must have:
    * `data-testid="toDoItem"`
    * It doesn't matter what HTML element you choose to use to represent a single to-do item, but it must have this attribute applied. Examples:
      * ```js
          <li data-testid="toDoItem">...</li>
          <tr data-testid="toDoItem">...</tr>
          <div data-testid="toDoItem">...</div>
          <article data-testid="toDoItem">...</article>
        ```
4. Each to-do item's "delete" button must have:
    * `data-testid="deleteButton"`
5. Each to-do item's "mark complete" button must have:
    * `data-testid="completeButton"`
6. Each completed to-do item must have:
    * A CSS class of `completed` applied to its `data-testid="toDoItem"` element.
    * Examples of "completed" to-do items:
      * ```js
          <li data-testid="toDoItem" class="completed">...</li>
          <tr data-testid="toDoItem" class="completed">...</tr>
          <div data-testid="toDoItem" class="completed">...</div>
          <article data-testid="toDoItem" class="completed">...</article>
        ```
7. Do not modify the seed data inside `database.sql`. The Cypress tests expect your app to initially load with these two to-do items:
    * Build a CRUD app
    * Make my app look nice

---

## Stretch Goals

Add Bootstrap to the front end and style it up!
-  Buttons -- make the creation buttons and completion buttons green and the delete red.
-  Inputs -- make your text inputs styled in the bootstrap way
-  Responsive -- make your app responsive to different screen sizes.

Add a "confirm" pop-up!
- In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task.
    - Some library-based options are Bootstrap Modals or Sweet Alerts. You'll need to Google for these, but be sure to source these via CDN links. (`npm install` will **not** work for client-side CSS/JS libraries until we get to React week.)

Add a `"completedAt" TIMESTAMPTZ` column to the `"todos"` table!
- When a to-do is marked as completed, this column should reflect exactly when that happend.
- Be sure to show the completed date on the frontend in a pretty format.
