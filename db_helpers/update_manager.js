const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const timedPrompt = require("./timed_prompt");

const fullName = (first, last) => {
  return first + " " + last;
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

module.exports = updateManager;