// Dotenv is for making a secure connection to mysql
require("dotenv").config();
// console.table is for displaying passed json data in a console table
const cTable = require("console.table");

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const dbQuery = {
  showTables() {
    db.query(`SHOW tables;`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  },
  allFrom(location) {
    db.query(`SELECT * FROM ${location};`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  },

  // This method returns all employee roles in desired table format and prints to console
  allRoles() {
    db.query(
      `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    INNER JOIN department ON role.department_id = department.id;
    `,

      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      }
    );
  },

  allDept() {
    db.query(
      `
    SELECT department.id, department.name
    FROM department
    ORDER BY department.name;
    `,

      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      }
    );
  },

  allEmployees() {
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
          console.log(err);
        }
        console.table(result);
      }
    );
  },

  addDept(name) {
    db.query(
      `
      INSERT INTO department (name)
      VALUES ('${name}');      
    `,

      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("\n" + `Added ${name} to the database`);
      }
    );
  },
};

//dbQuery.showTables();

//dbQuery.allRoles();

module.exports = dbQuery;
