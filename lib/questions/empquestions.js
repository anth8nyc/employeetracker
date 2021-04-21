const empData = require("../data/empData");
const roleData = require("../data/roleData");

function getEmployeeQuestions() {
  
  return empData().then((employees) => {
    return roleData().then((roles) => {

      rolelist = roles.map(role => ({value: role.id, name: role.title}))
      employeenames = employees.map(employee => ({value: employee.employeeid, name: employee.combinedname}))

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
          // choices: roles.map(role => ({value: role.id, name: role.title})),
          choices: [...rolelist]
        },
        {
          type: "list",
          message: `Who is the employee's manager?`,
          name: "managerid",
          // choices: employees.map(employee => ({value: employee.employeeid, name: employee.combinedname})),
          choices: [...employeenames, 'Not Applicable']
        },
      ];
      return empquestions;
    })
  });
}

// getEmployeeQuestions().then(data => console.log(data));
module.exports = getEmployeeQuestions;
