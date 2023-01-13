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

// This function operates a switch call for adding either a new employee, a new role or a new department
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
          for (let index = 0; index < allDepartmentData.length; index++) {
            if (allDepartmentData[index].name == data.newRoleDept) {
              const newRoleTitleTrimmed = data.newRoleName.trim();

              dbQuery.addRole(
                `${newRoleTitleTrimmed}`,
                data.newRoleSalary,
                allDepartmentData[index].id
              );

              console.log("\n");

              timedPrompt();

              break;
            }
          }
        });

      break;
    case "employee":
      const allRoleData = await dbQuery.allFrom("role");
      const allEmployeeData = await dbQuery.allFrom("employee");

      const roleArr = [];
      const employeeArr = ["None"];

      for (let index = 0; index < allEmployeeData.length; index++) {
        employeeArr.push(
          allEmployeeData[index].first_name +
            " " +
            allEmployeeData[index].last_name
        );
      }

      for (let index = 0; index < allRoleData.length; index++) {
        roleArr.push(allRoleData[index].title);
      }

      inquirer
        .prompt([
          {
            type: "input",
            name: "newEmployeeFirstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "newEmployeeLastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "newEmployeeRole",
            message: "What is the employee's role?",
            choices: roleArr,
          },
          {
            type: "list",
            name: "newEmployeeManager",
            message: "Who is the employee's manager?",
            choices: employeeArr,
          },
        ])
        .then(async (data) => {
          const firstName = data.newEmployeeFirstName.trim();
          const lastName = data.newEmployeeLastName.trim();
          const allRoleData = await dbQuery.allFrom("role");
          const dataEmployee = await dbQuery.allFrom("employee");

          const fullName = (first, last) => {
            return first + " " + last;
          };

          let roleId = 0;
          let managerId = 0;

          for (let hold = 0; hold < roleArr.length; hold++) {
            if (allRoleData[hold].title == data.newEmployeeRole) {
              roleId = allRoleData[hold].id;

              break;
            }
          }

          for (let index = 0; index < employeeArr.length; index++) {
            let employeeFirst = dataEmployee[index].first_name;
            let employeeLast = dataEmployee[index].last_name;

            let fullNameAnswer = fullName(employeeFirst, employeeLast);

            if (fullNameAnswer == data.newEmployeeManager) {
              managerId = dataEmployee[index].id;

              break;
            } else if ("None" == data.newEmployeeManager) {
              managerId = null;

              break;
            }
          }

          dbQuery.addEmployee(firstName, lastName, roleId, managerId);

          console.log(" ");

          timedPrompt();
        });
  }
};

// Initializes prompt
toDoPrompt();
