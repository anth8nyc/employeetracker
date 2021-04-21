DROP DATABASE IF EXISTS empTrackDB;

CREATE DATABASE empTrackDB;

USE empTrackDB;

CREATE TABLE employee (
  employeeid INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(45) NULL,
  lastname VARCHAR(45) NULL,
  roleid INT,
  managerid INT NULL,
  PRIMARY KEY (employeeid)
);

INSERT INTO employee (firstname, lastname, roleid, managerid)
VALUES ("Anthony", "Castillo", 1, 1),
("Ben", "Montgomery", 4, 1),
("Addie", "Olson", 2, 1),
("Christina", "Nguyen", 3, 2);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2),
  departmentid INT,
  PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, departmentid)
VALUES ("Code Manager", 89500.00, 1),
("Engineer", 69500.00, 1),
("Designer", 59500.00, 2),
("Design Manager", 79500.00, 2);

CREATE TABLE department (
  deptid INT NOT NULL AUTO_INCREMENT,
  deptname VARCHAR(45) NULL,
  PRIMARY KEY (deptid)
);

INSERT INTO department (deptname)
VALUES ("Code"),("Design"),("Finance"),("HR");

SELECT concat(firstname,' ',lastname) as combinedname from employee;

-- Displays employee name, job title, department, manager id 
SELECT firstname, lastname, title, salary, departmentid, managerid
FROM employee
RIGHT JOIN roles ON employee.roleid = roles.id;

-- Displays department name, job title, salary 
SELECT deptname, title, salary, departmentid
FROM roles
RIGHT JOIN department ON roles.departmentid = department.deptid;

-- Displays employee name, job title, department, manager id 
SELECT employeeid, firstname, lastname, title, deptname, salary, managerid, concat(firstname,' ',lastname) as combinedname
FROM employee
JOIN roles ON employee.roleid = roles.id
JOIN department ON roles.departmentid = department.deptid;

SELECT title, salary, departmentid, deptname
FROM roles
JOIN department ON roles.departmentid = department.deptid;
