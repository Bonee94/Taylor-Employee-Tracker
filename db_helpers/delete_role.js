const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const timedPrompt = require("./timed_prompt");

const deleteRole = async () => {
  const allRoleData = await dbQuery.allFrom("role");

  //This pushes all the dept names to an array for the role choices in the prompt
  const roleNameArray = ['(RETURN)'];

  for (let index = 0; index < allRoleData.length; index++) {
    roleNameArray.push(allRoleData[index].title);
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteRoleName",
        message: "What is the role you would like to delete?",
        choices: roleNameArray,
      },
    ])
    .then((data) => {
      if (data.deleteRoleName == '(RETURN)') {
        console.log("\n");
          timedPrompt(); 

          return;
        } else {
          dbQuery.deleteRole(data.deleteRoleName);
          timedPrompt();
      }
    });
};

module.exports = deleteRole;