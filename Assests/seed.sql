USE employeeTrackerDB;

INSERT INTO department (name)
VALUES ("Development"), ("Sales"), ("Legal"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 80000.00, 1), ("Sales Associate", 70000.00, 2), ("Lawyer", 85000.00, 3), ("Engineer", 90000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("TJ", "Hutchinson", 1, NULL), ("Paige", "Tran", 2, 1), ("Andrew", "Tran", 3, NULL), ("Ron", "Compton", 4,2);