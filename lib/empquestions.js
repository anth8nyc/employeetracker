const empData = require("./empData");
const mysql = require("mysql");

function getEmployeeQuestions() {
  return empData().then((employees) => {
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
        // choices: [...empData().then((employees) => employees.map(employee => employee.title))]
        choices: ["1", "2"],
      },
      {
        type: "list",
        message: `Who is the employee's manager?`,
        name: "managername",
        choices: employees.map((employee) => employee.combinedname),
      },
    ];
    return empquestions;
  });
}
console.log(getEmployeeQuestions());
getEmployeeQuestions().then(data => console.log(data));
module.exports = getEmployeeQuestions;
