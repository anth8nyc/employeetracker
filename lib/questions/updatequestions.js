const empData = require("../data/empData");
const roleData = require("../data/roleData");

function getUpdateQuestions() {
  
    return empData().then((employees) => {
        return roleData().then((roles) => {
    
          const updatequestions = [
            {
              type: "input",
              message: "What is their new first name?",
              name: "firstname",
            },
            {
              type: "input",
              message: "What is their new last name?",
              name: "lastname",
            },
            {
              type: "list",
              message: "What is their new role?",
              name: "roleid",
              choices: roles.map(role => ({value: role.id, name: role.title})),
            },
            {
              type: "list",
              message: `Who is the employee's new manager?`,
              name: "managerid",
              choices: employees.map(employee => ({value: employee.employeeid, name: employee.combinedname})),
            },
          ];
          return updatequestions;
        })
    });

    // {
    //     type: 'checkbox',
    //     message: 'What criteria would you like to update?',
    //     name: 'updatecrit',
    //     choices: ['First Name', 'Last Name', 'Role', 'Manager']
    // },    
}
// console.log(getUpdateQuestions());
// getUpdateQuestions().then(data => console.log(data));
module.exports = getUpdateQuestions;
