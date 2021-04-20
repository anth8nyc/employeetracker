const connection = require('./connection')

function roleData(){
    return connection.query(
        `SELECT id, title, salary, departmentid, deptname 
        FROM roles 
        JOIN department ON roles.departmentid = department.deptid`
    )        
}

module.exports = roleData