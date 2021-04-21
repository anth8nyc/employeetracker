const deptData = require("../data/deptData");

function getRoleUpdateQuestions() {
  
    return deptData().then((departments) => {
        
        const updateroleQ = [
            {
                type: "input",
                message: "What is the updated title of the role?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the updated salary for this position?",
                name: "salary",
            },
            {
                type: "list",
                message: "What is the updated department for this role?",
                name: "departmentid",
                choices: departments.map(dept => ({value: dept.deptid, name: dept.deptname})),
            },
        ];
        return updateroleQ;
    })    
}

// console.log(getUpdateQuestions());
// getUpdateQuestions().then(data => console.log(data));
module.exports = getRoleUpdateQuestions;
