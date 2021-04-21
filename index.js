const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');

const Employee = require("./lib/models/Employee");
const Role = require("./lib/models/Role");
const Department = require("./lib/models/Department");
const empquestions = require("./lib/questions/empquestions")
const updatequestions = require("./lib/questions/updatequestions")
const rolequestions = require("./lib/questions/rolequestions")
const deptquestions = require("./lib/questions/deptquestions")
const empData = require("./lib/data/empData")
const roleData = require("./lib/data/roleData")
const deptData = require("./lib/data/deptData")

let employees = []

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'empTrackDB',

});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    promptUser();
});

// Main Prompt Menu

function promptUser(){

    connection.query(`SELECT employeeid, firstname, lastname, title, deptname, salary, managerid, concat(firstname,' ',lastname) as combinedname FROM employee JOIN roles ON employee.roleid = roles.id JOIN department ON roles.departmentid = department.deptid`, 
        
      (err, res) => {    
        if (err) throw err;
        employees = res
        return res
      }
    );

    connection.query(`SELECT title, salary, departmentid, deptname FROM roles JOIN department ON roles.departmentid = department.deptid`,
    
      (err, res) => {    
        if (err) throw err;  
        roles = res
        return res
      }
    );

    connection.query(`SELECT * FROM department`,
    
      (err, res) => {    
      
        if (err) throw err;  
        departments = res
        return res
      }
    );

    // employeenames = employees.map(employee => employee.combinedname);
    // console.log(employees);
    
    console.log(`Employee Manager!`);



    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'selectioncriteria',
        choices: ['View All Employees', 'View All Roles', `View All Departments`,
          'Add an Employee', `Add a Role`, `Add a Department`, `Update an Employee`, `Update Roles`,
          `Remove an Employee`, `Remove a Role`, `Remove a Department`, `Exit`]
    })
    .then((data)=>{
      console.log(data)
      switch (data.selectioncriteria) {
      
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;


        case 'Add an Employee':
          addEmployee();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add a Department':
          addDepartment();
          break;    
        

        case 'Update an Employee':
          updateEmployee();
          break;  


        case 'Remove an Employee':
          removeEmployee();
          break;
        
      
        case 'Exit':
          connection.end();
          process.exit();
        default:      
          break;
      };
    });
};



// View Functions

function viewAllEmployees(){
    connection.query(
        `SELECT employee.employeeid as ID, concat(employee.firstname,' ',employee.lastname) as Name, title as Role, deptname as Department, 
        salary as Salary, concat(manager.firstname,' ',manager.lastname) as Manager 
        FROM employee 
        LEFT JOIN employee as manager ON employee.managerid = manager.employeeid
        JOIN roles ON employee.roleid = roles.id 
        JOIN department ON roles.departmentid = department.deptid
        `, 
        // `SELECT employee.firstname, employee.lastname, title, deptname, 
        // salary, concat(employee.firstname,' ',employee.lastname) as combinedname, concat(manager.firstname,' ',manager.lastname) as managerName 
        // FROM employee 
        // LEFT JOIN employee as manager ON employee.managerid = manager.employeeid
        // JOIN roles ON employee.roleid = roles.id 
        // JOIN department ON roles.departmentid = department.deptid
        // `, 
    
        (err, res) => {
            
          if (err) throw err;
          console.table(res);
          promptUser();
        }
    );
};

function viewAllRoles(){
    connection.query('SELECT * FROM roles', (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
};

function viewAllDepartments(){
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

// Add Functions

function addEmployee(){
    
  empquestions().then(data => inquirer.prompt(data))
    .then((data)=>{
        
      if (data.managerid === 'Not Applicable'){data.managerid = null}

      let addedEmployee = new Employee (data.firstname, data.lastname, data.roleid, data.managerid)

        console.log('Adding the new employee...\n');
        const query = connection.query(
          'INSERT INTO employee SET ?',
          {
            firstname: addedEmployee.firstName,
            lastname: addedEmployee.lastName,
            roleid: addedEmployee.roleid,
            managerid: addedEmployee.managerid,
          },
          (err, res) => {
            if (err) throw err;
    
            console.log(`${res.affectedRows} added!\n`);
          }
        );

        console.log(query.sql);
        promptUser();
        return addedEmployee
    });

};

function addRole(){
    
  rolequestions().then(data => inquirer.prompt(data))
  // inquirer.prompt(empquestions(data => console.log(data)))
    .then((data)=>{
        
      let [chosenDepartment] = departments.filter(department => department.deptname === data.deptname)
      let departmentid = chosenDepartment.deptid
      console.log('departmentid: '+ departmentid)
      console.log('departments:')
      console.table(departments)
      console.log(data)
      console.log(chosenDepartment)

      let addedRole = new Role (data.title, data.salary, departmentid)

        console.log('Adding the new role...\n');
        const query = connection.query(
          'INSERT INTO roles SET ?',
          {
            title: addedRole.title,
            salary: addedRole.salary,
            departmentid: addedRole.departmentid,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} added!\n`);
          }
        );

        console.log(query.sql);
        promptUser();
        return addedRole
    });

};

function addDepartment(){
    
  deptquestions().then(data => inquirer.prompt(data))
  // inquirer.prompt(empquestions(data => console.log(data)))
    .then((data)=>{
        
      let addedDepartment = new Department (data.deptname)

        console.log('Adding the new department...\n');
        const query = connection.query(
          'INSERT INTO department SET ?',
          {
            deptname: addedDepartment.deptname,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} added!\n`);
          }
        );
        promptUser();
        return addedDepartment
    });

};

// Remove Functions

function removeEmployee(){
    
  employeenames = employees.map(employee => employee.combinedname);
  console.log(employeenames)

  inquirer.prompt({
      type: 'list',
      message: 'Who would you like to remove?',
      name: 'removeEmp',
      choices: [...employeenames, 'Cancel']
  })
  .then((data)=>{
      
      let removedEmployeeName = data.removeEmp
      if (removedEmployeeName === 'Cancel'){promptUser();}
      else{

          let removedEmployee = employees.filter(emp => emp.combinedname === removedEmployeeName)
     
          console.log('Removing the employee...\n');
          connection.query(
        'DELETE FROM employee WHERE ?',
        {
          employeeid: removedEmployee[0].employeeid
        },
        (err, res) => {
          if (err) throw err;
  
          console.log(`${res.affectedRows} was removed.\n`);
        }
        );

          promptUser();
          return removedEmployee
      }

  });

};

// Update Functions

function updateEmployee(){

  employeenames = employees.map(employee => employee.combinedname);
  console.log(employeenames)

  inquirer.prompt({
    type: 'list',
    message: 'Who would you like to update?',
    name: 'updateEmp',
    choices: [...employeenames, 'Cancel']
  })
  .then((data)=>{

    let updateEmployeeName = data.updateEmp
    if (updateEmployeeName === 'Cancel'){promptUser();}
    else{

      let updatedEmployee = employees.filter(emp => emp.combinedname === updateEmployeeName)
      console.log('Updating ' + updateEmployeeName + '...\n');
      
      updatequestions().then(data => inquirer.prompt(data))
      .then((data)=>{
        
        connection.query(
              
          'UPDATE employee SET ? WHERE ?',    
          [
            {
              firstname: data.firstname,
              lastname: data.lastname,
              roleid: data.roleid,
              managerid: data.managerid
            },
            {
              employeeid: updatedEmployee[0].employeeid
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} updated!\n`);
            // Call deleteProduct AFTER the UPDATE completes
          }
        );
        promptUser();
      }) 
      return updatedEmployee
    }
  });
};
