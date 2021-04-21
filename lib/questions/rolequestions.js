const deptData = require("../data/deptData");

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
        name: "departmentid",
        choices: departments.map(dept => ({value: dept.deptid, name: dept.deptname})),

      },

    ];
    return rolequestions;
  });
}
// console.log(getRoleQuestions());
// getRoleQuestions().then(data => console.log(data));
module.exports = getRoleQuestions;
