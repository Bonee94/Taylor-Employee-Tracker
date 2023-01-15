const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const addANew = require("./add_a_new");
const deleteDept = require("./delete_dept");
const updateManager = require("./update_manager");
const timedPrompt = require("./timed_prompt");

const toDoPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do? \n",
        name: "selectedToDo",
        choices: [
          "View all departments",
          "Add a department",
          "Delete a department\n",
          "View all roles",
          "Add a role\n",
          "View all employees",
          "Add an employee",
          "Update an employee's manager\n",
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
        case "Add a department":
          addANew("department");
          break;
        case "Delete a department\n":
          deleteDept();
          break;
        case "View all roles":
          dbQuery.allRoles();
          timedPrompt();
          break;
        case "Add a role\n":
          addANew("role");
          break;
        case "View all employees":
          dbQuery.allEmployees();
            const viewEmployeeOptions = () => {
                setTimeout(() => {
                    inquirer
                      .prompt([
                        {
                          type: "list",
                          message:
                            "Would you like to group employees by manager or dept?",
                          name: "orderBy",
                          choices: ["Manager", "Dept", "No thank you (Return)"],
                        },
                      ])
                      .then((answer) => {
                        console.log("\n")
                        switch (answer.orderBy) {
                          case "Manager":
                            dbQuery.employeeGroupBy("manager");
                            viewEmployeeOptions();
                            break;
                          case "Dept":
                            dbQuery.employeeGroupBy("department");
                            viewEmployeeOptions();
                            break;
                          case "No thank you (Return)":
                            timedPrompt();
                            break;
                        }
                      });
                  }, 500);
            }
            viewEmployeeOptions();
          //timedPrompt();
          break;
        case "Add an employee":
          addANew("employee");
          break;
        case "Update an employee's manager\n":
          updateManager();
          break;
      }
    });
};

module.exports = toDoPrompt;

// // This function makes the question prompt be delayed so that the console
// // can log the returned results correctly without overlapping
// const timedPrompt = () => {
//   setTimeout(() => {
//     toDoPrompt();
//   }, 500);
// };
