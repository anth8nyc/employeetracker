const deptData = require("./roleData");
const mysql = require("mysql");

function getDeptQuestions() {
  return deptData().then((roles) => {
    const deptquestions = [
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "deptname",
      }
    ];
    return deptquestions;
  });
}
// console.log(getDeptQuestions());
// getDeptQuestions().then(data => console.log(data));
module.exports = getDeptQuestions;
