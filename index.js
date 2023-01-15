const inquirer = require("inquirer");
const dbQuery = require("./server");

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
          timedPrompt();
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

// This function makes the question prompt be delayed so that the console
// can log the returned results correctly without overlapping
const timedPrompt = () => {
  setTimeout(() => {
    toDoPrompt();
  }, 500);
};

const fullName = (first, last) => {
  return first + " " + last;
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
        const employeeFullName = fullName(
          allEmployeeData[index].first_name,
          allEmployeeData[index].last_name
        );
        employeeArr.push(employeeFullName);
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

          timedPrompt();
        });
  }
};

const deleteDept = async () => {
  const allDepartmentData = await dbQuery.allFrom("department");

  //This pushes all the dept names to an array for the department choices in the prompt
  const deptNameArray = ['(RETURN)'];

  for (let index = 0; index < allDepartmentData.length; index++) {
    deptNameArray.push(allDepartmentData[index].name);
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteDeptName",
        message: "What is the department you would like to delete?",
        choices: deptNameArray,
      },
    ])
    .then((data) => {
      if (data.deleteDeptName == '(RETURN)') {
        console.log("\n");
          timedPrompt(); 

          return;
        } else {
          dbQuery.deleteDept(data.deleteDeptName);
          timedPrompt();
      }
    });
};

const updateManager = async () => {
  const allEmployeeData = await dbQuery.allFrom("employee");

  const managerArr = ["No one"];
  const employeeArr = ["Never Mind (Return)"];

  for (let index = 0; index < allEmployeeData.length; index++) {
    const employeeFullName = fullName(
      allEmployeeData[index].first_name,
      allEmployeeData[index].last_name
    );

    employeeArr.push(employeeFullName);
    managerArr.push(employeeFullName);
  }

  let selectedEmployee = "";

  const chooseEmployee = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedEmployee",
          message: "Which employee's manager would you like to update?",
          choices: employeeArr,
        },
      ])
      .then((data) => {
        if (data.selectedEmployee == "Never Mind (Return)") {
          console.log("\n");
          timedPrompt(); 

          return;
        } else {
          selectedEmployee = data.selectedEmployee;
          chooseManager();
        }
      });
  };

  chooseEmployee();

  const chooseManager = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedManager",
          message: "Who is the new manager?",
          choices: managerArr,
        },
      ])
      .then(async (data) => {
        const allEmployeeData = await dbQuery.allFrom("employee");

        const employee = selectedEmployee;
        
        let newManager = data.selectedManager;
        let prevManager = "";
        let prevManagerId = 0;
        let employeeId = 0;
        let newManagerId = 0;

        // This loop is getting the selected employee's id and current manager id
        for (let index = 0; index < allEmployeeData.length; index++) {
          const employeeCheck = fullName(
            allEmployeeData[index].first_name,
            allEmployeeData[index].last_name
          );

          if (employee == employeeCheck) {
            prevManagerId = allEmployeeData[index].manager_id;
            employeeId = allEmployeeData[index].id;

            break;
          }
        }

        //This loop gets the new manager's id
        for (let index = 0; index < allEmployeeData.length; index++) {
          const employeeCheck = fullName(
            allEmployeeData[index].first_name,
            allEmployeeData[index].last_name
          );

          if (newManager == employeeCheck) {
            newManagerId = allEmployeeData[index].id;

            break;
          } 
          if (newManager == "No one") {
            newManagerId = null;
            newManager = "no one";
          }

          
        }

        //This loop uses the previous manager id to get the manager's name
        for (let index = 0; index < allEmployeeData.length; index++) {
          const employeeCheck = allEmployeeData[index].id;

          if (prevManagerId == employeeCheck) {
            prevManager = fullName(
              allEmployeeData[index].first_name,
              allEmployeeData[index].last_name
            );

            break;
          } 

          if (prevManagerId == null) {
            prevManager = 'no one';
          }
        }

        dbQuery.updateManager(
          employee,
          prevManager,
          newManager,
          employeeId,
          newManagerId
        );
        timedPrompt();
      });
  };
};

// Initializes prompt
toDoPrompt();
