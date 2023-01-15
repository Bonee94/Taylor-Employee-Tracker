SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(employee_t2.first_name, " ", employee_t2.last_name) AS manager
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      LEFT JOIN employee as employee_t2
      ON employee.manager_id = employee_t2.id

      
      ORDER BY manager;


      CONCAT(employee_t2.first_name, " ", employee_t2.last_name) AS manager, role.salary, department.name AS department, role.title, employee.last_name, employee.first_name, employee.id