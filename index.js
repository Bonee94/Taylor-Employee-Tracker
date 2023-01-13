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
          "Add a department",
          "Delete a department",
          "View all roles",
          "Add a role",
          "View all employees",
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
        case "Add a department":
          addANew("department");
          break;
        // case "Delete a department":
        //   addANew("department");
        //   break;
        case "View all roles":
          dbQuery.allRoles();
          timedPrompt();
          break;
        case "Add a role":
          addANew("role");
          break;
        case "View all employees":
          dbQuery.allEmployees();
          timedPrompt();
          break;
          case "Add a employee":
          addANew("employee");
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

// This function operates a switch call for adding either an employee, a role or a new department
const addANew = async (choice) => {
  switch (choice) {
    case "department":
      inquirer
        .prompt([
          {
            type: "input",
            name: "newDeptName",
            message: "What is the name of the department?",
          },
        ])
        .then((data) => {
          const newDeptTrimmed = data.newDeptName.trim();
          console.log(`Added ${newDeptTrimmed} to the database`);
          dbQuery.addDept(newDeptTrimmed);
          timedPrompt();
        });
      break;
    case "role":
      const allDepartmentData = await dbQuery.allFrom("department");

      //This pushes all the dept names to an array for the department choices in the prompt
      const deptNameArray = [];

      for (let index = 0; index < allDepartmentData.length; index++) {
        deptNameArray.push(allDepartmentData[index].name);
      }

      inquirer
        .prompt([
          {
            type: "input",
            name: "newRoleName",
            message: "What is the name of the role?",
          },
          {
            type: "input",
            name: "newRoleSalary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "newRoleDept",
            message: "Which department does the role belong to?",
            choices: deptNameArray,
          },
        ])
        .then(async (data) => {
          console.log(data);

          for (let index = 0; index < allDepartmentData.length; index++) {
            if (allDepartmentData[index].name == data.newRoleDept) {
              const newRoleTitleTrimmed = data.newRoleName.trim();

              dbQuery.addRole(`${newRoleTitleTrimmed}`, data.newRoleSalary, allDepartmentData[index].id);

              console.log('\n');

              timedPrompt();

              break;
            }
          }
        });

      break;
    case "employee":
      
  }
};

// Initializes prompt
toDoPrompt();
