// console.table is for displaying passed json data in a console table
require("console.table");
// This import creates the connection for our database
const db = require("../config/connection");

const dbQuery = {
  showTables() {
    return new Promise((resolve, reject) => {
      db.query(`SHOW tables;`, (err, result) => {
        if (err) {
          return reject(console.log(err));
        }
        return resolve(console.table(result));
      });
    });
  },

  allFrom(location) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${location};`, (err, result) => {
        if (err) {
          return reject(console.log(err));
        }
        return resolve(result);
      });
    });
  },

  // This method returns all employee roles in desired table format and prints to console
  allRoles() {
    return new Promise((resolve, reject) => {
      db.query(
        `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id;
    `,
        (err, result) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(console.table(result));
        }
      );
    });
  },

  allDept() {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT department.id, department.name
        FROM department
        ORDER BY department.name;
        `,
        (err, result) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(console.table(result));
        }
      );
    });
  },

  allEmployees() {
    return new Promise((resolve, reject) => {
      db.query(
        `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(employee_t2.first_name, " ", employee_t2.last_name) AS manager
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      LEFT JOIN employee as employee_t2
      ON employee.manager_id = employee_t2.id

      
      ORDER BY employee.id ASC;
    `,
        (err, result) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(console.table(result));
        }
      );
    });
  },

  employeeGroupBy(choice) {
    return new Promise((resolve, reject) => {
      db.query(
        `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(employee_t2.first_name, " ", employee_t2.last_name) AS manager
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      LEFT JOIN employee as employee_t2
      ON employee.manager_id = employee_t2.id

      
      ORDER BY ${choice};
    `,
        (err, result) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(console.table(result));
        }
      );
    });
  },

  addDept(name) {
    return new Promise((resolve, reject) => {
      db.query(
        `
      INSERT INTO department (name)
      VALUES ('${name}');      
    `,

        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log("\n" + `Added ${name} to the database` + "\n")
          );
        }
      );
    });
  },

  addRole(roleName, roleSalary, roleDeptId) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO role (title, salary, department_id)
      VALUES ('${roleName}', ${roleSalary}, ${roleDeptId}); `,

        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log("\n" + `Added ${roleName} to the database` + "\n")
          );
        }
      );
    });
  },

  addEmployee(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId});`,
        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log(
              "\n" + `Added ${firstName} ${lastName} to the database` + "\n"
            )
          );
        }
      );
    });
  },

  deleteDept(deptName) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM department WHERE name = '${deptName}';`, (err) => {
        if (err) {
          return reject(console.log(err));
        }
        return resolve(
          console.log("\n" + `Deleted ${deptName} from the database` + "\n")
        );
      });
    });
  },

  deleteRole(roleName) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM role WHERE role.title = '${roleName}';`, (err) => {
        if (err) {
          return reject(console.log(err));
        }
        return resolve(
          console.log("\n" + `Deleted ${roleName} from the database` + "\n")
        );
      });
    });
  },

  deleteEmployee(firstName, lastName) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM employee 
        WHERE employee.first_name = '${firstName}'
        AND employee.last_name = '${lastName}';`,
        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log(
              "\n" + `Deleted ${firstName} ${lastName} from the database` + "\n"
            )
          );
        }
      );
    });
  },

  updateManager(
    employeeName,
    prevManager,
    newManager,
    employeeId,
    newManagerId
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE employee
        SET manager_id = ${newManagerId}
        WHERE employee.id = ${employeeId};`,
        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log(
              "\n" +
                `Updated ${employeeName}'s manager from ${prevManager} to ${newManager} in the database` +
                "\n"
            )
          );
        }
      );
    });
  },

  updateRole(employeeName, employeeId, newRoleId) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE employee
        SET role_id = ${newRoleId}
        WHERE employee.id = ${employeeId};`,
        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log(
              "\n" + `Updated ${employeeName}'s role in the database` + "\n"
            )
          );
        }
      );
    });
  },

  updateRolesDept(roleTitle, roleId, deptId) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE role
        SET department_id = ${deptId}
        WHERE role.id = ${roleId};`,
        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log(
              "\n" + `Updated ${roleTitle}'s belonging to dept in the database` + "\n"
            )
          );
        }
      );
    });
  },

  sumOfSalaries() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT department.name AS department, SUM(role.salary) AS total_employee_salary
        FROM department
        INNER JOIN role ON department.id = role.department_id
        GROUP BY department;`,
        (err, result) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(console.table(result));
        }
      );
    });
  },
};

module.exports = dbQuery;
