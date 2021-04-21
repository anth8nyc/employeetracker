const deptData = require("../data/roleData");

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

module.exports = getDeptQuestions;
