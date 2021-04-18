const mysql = require('mysql');
const inquirer = require('inquirer');

const Employee = require("./lib/Employee");
const empquestions = require("./lib/empquestions")

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

function promptUser(){

    connection.query(`SELECT employeeid, firstname, lastname, title, deptname, salary, managerid, concat(firstname,' ',lastname) as combinedname FROM employee JOIN roles ON employee.roleid = roles.id JOIN department ON roles.departmentid = department.id`, 
        
        (err, res) => {    
            if (err) throw err;
            employees = res
            return res
        }
    );
    
    console.log(`Employee Manager!`);
    console.log(employees);
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'selectioncriteria',
        choices: ['View All Employees', 'View All Roles', 'Add an Employee', `Remove an Employee`, `Update an Employee`, `Exit`]
    })
    .then((data)=>{
      console.log(data)
      switch (data.selectioncriteria) {
      
        case 'Add an Employee':
          addEmployee();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Remove an Employee':
          removeEmployee();
          break;
        case 'Update an Employee':
          afterConnection();
          break;
        case 'Exit':
          connection.end();
          process.exit();
        default:      
          break;
        
      };
    });
};


function addEmployee(){
    
    inquirer.prompt([...empquestions])
    .then((data)=>{
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



function viewAllEmployees(){
    connection.query(
        `SELECT firstname, lastname, title, deptname, salary, managerid, concat(firstname,' ',lastname) as combinedname FROM employee JOIN roles ON employee.roleid = roles.id JOIN department ON roles.departmentid = department.id`, 
    
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
