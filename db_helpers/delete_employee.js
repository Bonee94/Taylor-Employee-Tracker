const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const timedPrompt = require("./timed_prompt");

const deleteEmployee = async () => {
  const allEmployeeData = await dbQuery.allFrom("employee");

  //This pushes all the employee names to an array for the employee choices in the prompt
  const employeeNameArray = ["(RETURN)"];

  const fullName = (first, last) => {
    return first + " " + last;
  };

  for (let index = 0; index < allEmployeeData.length; index++) {
    const employeeFullName = fullName(
      allEmployeeData[index].first_name,
      allEmployeeData[index].last_name
    );
    employeeNameArray.push(employeeFullName);
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteEmployeeName",
        message: "Who is the employee you would like to delete?",
        choices: employeeNameArray,
      },
    ])
    .then(async (data) => {
      if (data.deleteEmployeeName == "(RETURN)") {
        console.log("\n");
        timedPrompt();

        return;
      } else {

        const allEmployeeData = await dbQuery.allFrom("employee");

        for (let index = 0; index < allEmployeeData.length; index++) {
          const firstName = allEmployeeData[index].first_name;
          const lastName = allEmployeeData[index].last_name;

          const employeeFullName = fullName(firstName, lastName);

          if (employeeFullName == data.deleteEmployeeName) {
            dbQuery.deleteEmployee(firstName, lastName);
            timedPrompt();

            break;
          }
        }
      }
    });
};

module.exports = deleteEmployee;
