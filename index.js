const inquirer = require('inquirer');


const toDoPrompt = () => {
inquirer
.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'selectedToDo',
        choices: ['View all departments', 'View all Roles', 'View all employees', 'Add a department', 'Add a role', 'Add a employee', 'Update an employee role'],
    }
])
.then(data => {
    console.log(data.selectedToDo);
})}




toDoPrompt();