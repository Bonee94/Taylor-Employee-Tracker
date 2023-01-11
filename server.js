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
};

//dbQuery.showTables();

//dbQuery.allRoles();

module.exports = dbQuery;