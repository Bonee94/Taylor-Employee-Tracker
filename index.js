const inquirer = require("inquirer");
const dbQuery = require("./server");

const toDoPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "selectedToDo",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add a employee",
          "Update an employee role",
        ],
      },
    ])
    .then((data) => {
      //console.log(data.selectedToDo);
      console.log("\n");

      switch (data.selectedToDo) {
        case "View all departments":
          dbQuery.allDept();
          timedPrompt();
          break;
        case "View all roles":
          dbQuery.allRoles();
          timedPrompt();
          break;
        case "View all employees":
          dbQuery.allEmployees();
          timedPrompt();
          break;
      }
    });
};

// This function makes the question prompt be delayed so that the console
// can log the returned results correctly without overlapping
const timedPrompt = () => {
  setTimeout(() => {
    toDoPrompt();
  }, 500);
};

// Initializes prompt
toDoPrompt();
