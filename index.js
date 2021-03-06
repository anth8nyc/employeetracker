const mysql = require('mysql');
const inquirer = require('inquirer');

const Employee = require("./lib/models/Employee");
const Role = require("./lib/models/Role");
const Department = require("./lib/models/Department");
const empquestions = require("./lib/questions/empquestions")
const rolequestions = require("./lib/questions/rolequestions")
const deptquestions = require("./lib/questions/deptquestions")
const updatequestions = require("./lib/questions/updatequestions")
const updateroleQ = require("./lib/questions/updateroleQ")

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
    promptUser();
});

////////////////////
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

    
    console.log(`  //////////////////////\n // Employee Manager //\n//////////////////////`);



    inquirer.prompt({
        
      type: 'list',
      message: 'What would you like to do?',
      name: 'selectioncriteria',
      choices: [`View Employee Data`, `Add Employee Data`, `Update Employee Data`,`Remove Employee Data`, `Exit`]

    })
    .then((data)=>{

      switch (data.selectioncriteria) {
      
        case 'View Employee Data':
          inquirer.prompt({
            type: 'list',
            message: 'What would you like to view?',
            name: 'viewcriteria',
            choices: [`View All Employees`, `View All Roles`, `View All Departments`, `View Employees by Manager`, `Cancel`]}).then((data)=>{
              switch (data.viewcriteria) {
                case `View All Employees`:
                  viewAllEmployees();
                  break;
                case 'View All Roles':
                  viewAllRoles();
                  break;
                case 'View All Departments':
                  viewAllDepartments();
                  break;
                case 'View Employees by Manager':
                  viewEmployeesByManager();
                  break;
                case 'Cancel':
                  promptUser();
                default:
                  break;
              }
            })
          break;

        case 'Add Employee Data':
          inquirer.prompt({
            type: 'list',
            message: 'What would you like to add?',
            name: 'addcriteria',
            choices: [`Add an Employee`, `Add a Role`, `Add a Department`, `Cancel`]}).then((data)=>{
              switch (data.addcriteria) {
                
                case 'Add an Employee':
                  addEmployee();
                  break;
                case 'Add a Role':
                  addRole();
                  break;
                case 'Add a Department':
                  addDepartment();
                  break;
                case 'Cancel':
                  promptUser();
                default:
                  break;
              }
            })
          break;

        case 'Update Employee Data':
          inquirer.prompt({
            type: 'list',
            message: 'What would you like to update?',
            name: 'updatecriteria',
            choices: [`Update an Employee`, `Update Roles`, `Update Department`, `Cancel`]}).then((data)=>{
              switch (data.updatecriteria) {
                
                case 'Update an Employee':
                  updateEmployee();
                  break;  
                case 'Update Roles':
                  updateRole();
                  break;  
                case 'Update Department':
                  updateDepartment();
                  break;
                case 'Cancel':
                  promptUser();
                default:
                  break;
              }
            })
          break;

        case 'Remove Employee Data':
          inquirer.prompt({
            type: 'list',
            message: 'What would you like to remove?',
            name: 'removecriteria',
            choices: [`Remove an Employee`, `Remove a Role`, `Remove a Department`, `Cancel`]}).then((data)=>{
              switch (data.removecriteria) {
                
                case 'Remove an Employee':
                  removeEmployee();
                  break; 
                case 'Remove a Role':
                  removeRole();
                  break;
                case 'Remove a Department':
                  removeDepartment();
                  break;
                case 'Cancel':
                  promptUser();
                default:
                  break;
              }
            })
          break;

        case 'Exit':
          connection.end();
          process.exit();
        default:      
          break;
      };
    });
};


////////////////////
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
        (err, res) => {
            
          if (err) throw err;
          console.table(res);
          promptUser();
        }
    );
};

function viewEmployeesByManager(){

  employeenames = employees.map(employee => employee.combinedname)

  inquirer.prompt({
    type: 'list',
    message: `Which manager's team would you like to see?`,
    name: 'manageEmp',
    choices: [...employeenames, 'Cancel']
  })
  .then((data)=>{
    
    let managerEmployeeName = data.manageEmp
    if (managerEmployeeName === 'Cancel'){promptUser();}
    else{
    
      connection.query(
        `SELECT employee.employeeid as ID, concat(employee.firstname,' ',employee.lastname) as Name, title as Role, deptname as Department, 
        salary as Salary, concat(manager.firstname,' ',manager.lastname) as Manager 
        FROM employee 
        LEFT JOIN employee as manager ON employee.managerid = manager.employeeid
        JOIN roles ON employee.roleid = roles.id 
        JOIN department ON roles.departmentid = department.deptid
        `, 
        
        (err, res) => {            
          if (err) throw err;
          let team = res.filter(emp => emp.Manager === managerEmployeeName)
          console.table(team)
          promptUser();
        }
      );
    }
  }) 
};

function viewAllRoles(){
    connection.query(`
      SELECT deptname as Department, title as Title, salary as Salary
      FROM roles
      LEFT JOIN department ON roles.departmentid = department.deptid
      ORDER BY deptname`, (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
};

function viewAllDepartments(){
  connection.query('SELECT deptname as Department FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

////////////////////
// Add Functions

function addEmployee(){
    
  empquestions().then(data => inquirer.prompt(data))
    .then((data)=>{
        
      if (data.managerid === 'Not Applicable'){data.managerid = null}

      let addedEmployee = new Employee (data.firstname, data.lastname, data.roleid, data.managerid)

        console.log('Adding the new employee...\n');
        connection.query(
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

        promptUser();
        return addedEmployee
    });

};

function addRole(){
    
  rolequestions().then(data => inquirer.prompt(data))
    .then((data)=>{
        
      let addedRole = new Role (data.title, data.salary, data.departmentid)

        console.log('Adding the new role...\n');
        connection.query(
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

        promptUser();
        return addedRole
    });

};

function addDepartment(){
    
  deptquestions().then(data => inquirer.prompt(data))
    .then((data)=>{
        
      let addedDepartment = new Department (data.deptname)

        console.log('Adding the new department...\n');
        connection.query(
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

////////////////////
// Remove Functions

function removeEmployee(){
    
  employeenames = employees.map(employee => employee.combinedname);

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

function removeRole(){
    
  rolelist = roles.map(role => role.title);
  // console.log(rolelist)

  inquirer.prompt({
      type: 'list',
      message: 'What role would you like to remove?',
      name: 'removeRole',
      choices: [...rolelist, 'Cancel']
  })
  .then((data)=>{
      
      let removedRoleTitle = data.removeRole
      if (removedRoleTitle === 'Cancel'){promptUser();}
      else{

          let removedRole = roles.filter(role => role.title === removedRoleTitle)
     
          console.log('Removing the role...\n');
          connection.query(
        'DELETE FROM roles WHERE ?',
        {
          title: removedRoleTitle
        },
        (err, res) => {
          if (err) throw err;
  
          console.log(`${res.affectedRows} was removed.\n`);
        }
        );

          promptUser();
          return removedRole
      }

  });

};

////////////////////
// Update Functions

function updateEmployee(){

  employeenames = employees.map(employee => employee.combinedname);

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
          }
        );
        promptUser();
      }) 
      return updatedEmployee
    }
  });
};

function updateRole(){

  rolelist = roles.map(role => role.title);

  inquirer.prompt({
    type: 'list',
    message: 'Which role would you like to update?',
    name: 'updateRole',
    choices: [...rolelist, 'Cancel']
  })
  .then((data)=>{

    let updateRoleName = data.updateRole
    if (updateRoleName === 'Cancel'){promptUser();}
    else{

      let updatedRole = roles.filter(role => role.title === updateRoleName)
      console.log('Updating ' + updateRoleName + '...\n');
      
      updateroleQ().then(data => inquirer.prompt(data))
      .then((data)=>{
        
        connection.query(
              
          'UPDATE roles SET ? WHERE ?',    
          [
            {
              title: data.title,
              salary: data.salary,
              departmentid: data.departmentid,
            },
            {
              title: updatedRole[0].title
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} updated!\n`);
          }
        );
        promptUser();
      }) 
      return updatedRole
    }
  });
};

function updateDepartment(){

  deptlist = departments.map(dept => dept.deptname);

  inquirer.prompt({
    type: 'list',
    message: 'Which department would you like to rename?',
    name: 'updateDept',
    choices: [...deptlist, 'Cancel']
  })
  .then((data)=>{

    let updateDeptName = data.updateDept
    if (updateDeptName === 'Cancel'){promptUser();}
    else{

      let updatedDept = departments.filter(dept => dept.deptname === updateDeptName)
      console.log('Updating ' + updateDeptName + '...\n');
      
      deptquestions().then(data => inquirer.prompt(data))
      .then((data)=>{
        
        connection.query(
              
          'UPDATE department SET ? WHERE ?',    
          [
            {
              deptname: data.deptname,
            },
            {
              deptname: updatedDept[0].deptname
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} updated!\n`);
          }
        );
        promptUser();
      }) 
      return updatedDept
    }
  });
};
