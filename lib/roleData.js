const connection = require('./connection')

function roleData(){

    return connection.query(`SELECT title, salary, departmentid, deptname FROM roles JOIN department ON roles.departmentid = department.deptid`)
            
}

module.exports = roleData