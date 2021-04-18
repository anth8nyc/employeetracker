DROP DATABASE IF EXISTS empTrackDB;

CREATE DATABASE empTrackDB;

USE empTrackDB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(45) NULL,
  lastname VARCHAR(45) NULL,
  roleid INT,
  managerid INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (firstname, lastname, roleid, managerid)
VALUES ("Anthony", "Castillo", 1, 1),
("Ben", "Montgomery", 1, 1),
("Addie", "Olson", 2, 1),
("Christina", "Nguyen", 2, 2);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2),
  departmentid INT,
  PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, departmentid)
VALUES ("Manager", 89500.00, 1),
("Engineer", 69500.00, 1),
("Designer", 59500.00, 2),
("Manager", 79500.00, 2);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  deptname VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (deptname)
VALUES ("Code"),("Design"),("Finance")
