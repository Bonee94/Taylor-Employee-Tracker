const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const timedPrompt = require("./timed_prompt");

const fullName = (first, last) => {
  return first + " " + last;
};

const updateEmployeeRole = async () => {
  const allEmployeeData = await dbQuery.allFrom("employee");
  const allRoleData = await dbQuery.allFrom("role");

  const roleArr = ["(RETURN)"];
  const employeeArr = ["Never Mind (Return)"];

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

  const chooseEmployee = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedEmployee",
          message: "Which employee's role would you like to update?",
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
          chooseRole(selectedEmployee);
        }
      });
  };

  chooseEmployee();

  const chooseRole = (selectedEmployee) => {
    console.log(`made it here ${selectedEmployee}`);
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedRole",
          message: "What is the new role for this employee?",
          choices: roleArr,
        },
      ])
      .then(async (data) => {
        const allEmployeeData = await dbQuery.allFrom("employee");
        const allRoleData = await dbQuery.allFrom("role");

        let employeeId = 0;
        let newRoleId = 0;

        // This loop is getting the selected employee's id
        for (let index = 0; index < allEmployeeData.length; index++) {
          const employeeCheck = fullName(
            allEmployeeData[index].first_name,
            allEmployeeData[index].last_name
          );

          if (selectedEmployee == employeeCheck) {
            employeeId = allEmployeeData[index].id;

            break;
          }
        }
        //This loop is for getting the new role id
        for (let index = 0; index < allRoleData.length; index++) {
          const roleCheck = allRoleData[index].title;

          if (data.selectedRole == roleCheck) {
            newRoleId = allRoleData[index].id;

            break;
          }
        }

        dbQuery.updateRole(selectedEmployee, employeeId, newRoleId);
        timedPrompt();
      });
  };
};

module.exports = updateEmployeeRole;
