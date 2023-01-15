const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const timedPrompt = require("./timed_prompt");

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

module.exports = deleteDept;