const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const timedPrompt = require("./timed_prompt");


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
};

module.exports = viewEmployeeOptions;