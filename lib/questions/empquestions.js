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
          choices: [...rolelist]
        },
        {
          type: "list",
          message: `Who is the employee's manager?`,
          name: "managerid",
          choices: [...employeenames, 'Not Applicable']
        },
      ];
      return empquestions;
    })
  });
}

module.exports = getEmployeeQuestions;
