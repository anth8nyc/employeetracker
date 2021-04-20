const empData = require("./empData");
const roleData = require("./roleData");

function getEmployeeQuestions() {
  
  return empData().then((employees) => {
    return roleData().then((roles) => {

      const empquestions = [
        {
          type: "input",
          message: "What is their first name?",
          name: "firstname",
        },
        {
          type: "input",
          message: "What is their last name?",
          name: "lastname",
        },
        {
          type: "list",
          message: "What is their role?",
          name: "roleid",
          choices: roles.map(role => ({value: role.id, name: role.title})),
        },
        {
          type: "list",
          message: `Who is the employee's manager?`,
          name: "managerid",
          choices: employees.map(employee => ({value: employee.employeeid, name: employee.combinedname})),
        },
      ];
      return empquestions;
    })
  });
}

// getEmployeeQuestions().then(data => console.log(data));
module.exports = getEmployeeQuestions;
