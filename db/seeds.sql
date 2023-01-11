INSERT INTO department (id, name)
VALUES  (001, 'Sales'),
        (002, 'Customer Service');

INSERT INTO role(id, title, salary, department_id)
VALUES  (001, 'Sales Manager', 100000, 001),
        (002, 'Sales Rep', 65000, 001),
        (003, 'Customer Service Manager', 90000, 002),
        (004, 'Customer Service Rep', 50000, 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, 'Steven', 'Jackson', 003, NULL),
        (002, 'John', 'Baker', 004, 001),
        (003, 'Melissa', 'Wright', 001, NULL),
        (004, 'Danny', 'Potts', 002, 003);
