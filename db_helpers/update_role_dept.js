const inquirer = require("inquirer");
const dbQuery = require("./db_queries");
const timedPrompt = require("./timed_prompt");

const updateRolesDepartment = async () => {
  const allDeptData = await dbQuery.allFrom("department");
  const allRoleData = await dbQuery.allFrom("role");

  const roleArr = ["(RETURN)"];
  const deptArr = ["Never Mind (Return)"];

  for (let index = 0; index < allDeptData.length; index++) {
    deptArr.push(allDeptData[index].name);
  }

  for (let index = 0; index < allRoleData.length; index++) {
    roleArr.push(allRoleData[index].title);
  }

  const chooseRole = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedRole",
          message: "Which role would you like to assign to a dept?",
          choices: roleArr,
        },
      ])
      .then((data) => {
        if (data.selectedRole == "Never Mind (Return)") {
          console.log("\n");
          timedPrompt();

          return;
        } else {
          chooseDept(data.selectedRole);
        }
      });
  };

  chooseRole();

  const chooseDept = (selectedRole) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedDept",
          message: `What is the new assigned dept for ${selectedRole}`,
          choices: deptArr,
        },
      ])
      .then(async (data) => {
        const allDeptData = await dbQuery.allFrom("department");
        const allRoleData = await dbQuery.allFrom("role");

        let newDeptId = 0;
        let roleId = 0;

        // This loop is getting the selected role's id
        for (let index = 0; index < allRoleData.length; index++) {
            const roleCheck = allRoleData[index].title;

          if (selectedRole == roleCheck) {
            roleId = allRoleData[index].id;

            break;
          }
        }

        //This loop is for getting the new dept id
        for (let index = 0; index < allDeptData.length; index++) {

          const deptCheck = allDeptData[index].name;

          if (data.selectedDept == deptCheck) {
            newDeptId = allDeptData[index].id;

            break;
          }
        }

        console.log(`Roleid: ${roleId} and newDeptID: ${newDeptId}`);
        dbQuery.updateRolesDept(selectedRole, roleId, newDeptId);
        timedPrompt();
      });
  };
};

module.exports = updateRolesDepartment;
