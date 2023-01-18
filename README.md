# Taylor's Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Links](#links)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Github](#github)

## Links

- [Video Walkthrough](https://drive.google.com/file/d/1qSfd0_OfielypGElZwLy4nTdnvabMqan/view)
- [Github Project Repo](https://github.com/Bonee94/Taylor-Employee-Tracker)

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installation

To install the necessary dependencies, run the following command:

- npm i

To create and seed database, run the following MYSQL command:

- SOURCE ./db/schema.sql;

## Usage

- This application is to create and track a list of employee's. Along with their corresponding roles and managers. As well as track the available roles in the company and the departments that they belong to.

## Contributing

- No contributions allowed.

## License

- This project is licensed under the MIT License.
- https://www.mit.edu/~amini/LICENSE.md

## Github

You can find more of my work at [bonee94](https://github.com/bonee94).
