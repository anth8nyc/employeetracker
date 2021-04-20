// const updatequestions = [
//     {
//         type: 'checkbox',
//         message: 'What criteria would you like to update?',
//         name: 'updatecrit',
//         choices: ['First Name', 'Last Name', 'Role', 'Manager']
//     },
//     {
//         type: 'input',
//         message: 'What is their new first name?',
//         name: 'firstname',
//     },
//     {
//         type: 'input',
//         message: 'What is their new last name?',
//         name: 'lastname',
//     },
//     {
//         type: 'list',
//         message: 'What is their new role?',
//         name: 'roleid',
//         choices: ['1', '2', '3'],
//     },
//     {
//         type: 'list',
//         message: `Who is the employee's new manager?`,
//         name: 'managerid',
//         choices:['1', '2', '3'],
//     },
// ];

// module.exports = updatequestions

const empData = require("./empData");
const mysql = require("mysql");

function getUpdateQuestions() {
  return empData().then((employees) => {
    
    const updatequestions = [
        {
            type: 'checkbox',
            message: 'What criteria would you like to update?',
            name: 'updatecrit',
            choices: ['First Name', 'Last Name', 'Role', 'Manager']
        },
        {
            type: 'input',
            message: 'What is their new first name?',
            name: 'firstname',
        },
        {
            type: 'input',
            message: 'What is their new last name?',
            name: 'lastname',
        },
        {
            type: 'list',
            message: 'What is their new role?',
            name: 'roleid',
            choices: ['1', '2', '3'],
        },
        {
            type: 'list',
            message: `Who is the employee's new manager?`,
            name: 'managerid',
            choices: employees.map((employee) => employee.combinedname),
        },
    ];

    return updatequestions;
  });

}
console.log(getUpdateQuestions());
getUpdateQuestions().then(data => console.log(data));
module.exports = getUpdateQuestions;
