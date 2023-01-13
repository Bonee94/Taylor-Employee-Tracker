// Dotenv is for making a secure connection to mysql
require("dotenv").config();
// console.table is for displaying passed json data in a console table
const cTable = require("console.table");

const mysql = require("mysql2");

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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
    INNER JOIN department ON role.department_id = department.id;
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
          return resolve(console.log("\n" + `Added ${name} to the database`));
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
            console.log("\n" + `Added ${roleName} to the database`)
          );
        }
      );
    });
  },

  addEmployee(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`
        ,
        (err) => {
          if (err) {
            return reject(console.log(err));
          }
          return resolve(
            console.log("\n" + `Added ${firstName} ${lastName} to the database`)
          );
        }
      );
    });
  },
};

module.exports = dbQuery;
