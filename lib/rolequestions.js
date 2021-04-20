const roleData = require("./roleData");
const deptData = require("./deptData");
const mysql = require("mysql");

function getRoleQuestions() {
  return deptData().then((departments) => {
    const rolequestions = [
      {
        type: "input",
        message: "What is the title of the role?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary for this position?",
        name: "salary",
      },
      {
        type: "list",
        message: "What department is this role in?",
        name: "deptname",
        choices: departments.map((dept) => dept.deptname),
      },

    ];
    return rolequestions;
  });
}
console.log(getRoleQuestions());
getRoleQuestions().then(data => console.log(data));
module.exports = getRoleQuestions;
