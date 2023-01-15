const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const addANew = require("./add_a_new");
const viewEmployeeOptions = require("./view_all_employees_options");
const deleteDept = require("./delete_dept");
const deleteRole = require("./delete_role");
const deleteEmployee = require("./delete_employee");
const updateManager = require("./update_manager");
const updateEmployeeRole = require("./update_employee_role");
const updateRolesDepartment = require("./update_role_dept");
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
          "Add a role",
          "Delete a role",
          "Update a role's dept\n",
          "View all employees",
          "Add an employee",
          "Delete an employee",
          "Update an employee's role",
          "Update an employee's manager\n",
          "View total of salaries by dept\n",
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
        case "Delete a role":
          deleteRole();
          break;
        case "Update a role's dept\n":
          updateRolesDepartment();
          break;
        case "Add a role":
          addANew("role");
          break;
        case "View all employees":
          dbQuery.allEmployees();
          viewEmployeeOptions();
          //timedPrompt();
          break;
        case "Add an employee":
          addANew("employee");
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "Update an employee's role":
            updateEmployeeRole();
          break;
        case "Update an employee's manager\n":
          updateManager();
          break;
        case "View total of salaries by dept\n":
          dbQuery.sumOfSalaries();
          timedPrompt();
          break;
      }
    });
};

module.exports = toDoPrompt;
