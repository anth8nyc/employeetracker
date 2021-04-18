const mysql = require('mysql');
const inquirer = require('inquirer');

const Employee = require("./lib/Employee");
const empquestions = require("./lib/empquestions")

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

    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'selectioncriteria',
        choices: ['View All Employees', 'Add an Employee', `Remove an Employee`, `Update an Employee`, `Exit`]
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
        case 'Remove an Employees':
          afterConnection();
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

function viewAllEmployees(){
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
};
