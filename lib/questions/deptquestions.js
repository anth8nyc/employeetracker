const deptData = require("../data/roleData");
const mysql = require("mysql");

function getDeptQuestions() {
  return deptData().then((roles) => {
    const deptquestions = [
      {
        type: "input",
        message: "What should the name of the department be?",
        name: "deptname",
      }
    ];
    return deptquestions;
  });
}
// console.log(getDeptQuestions());
// getDeptQuestions().then(data => console.log(data));
module.exports = getDeptQuestions;
