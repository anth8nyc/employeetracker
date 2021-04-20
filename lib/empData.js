const connection = require('./connection')

function empData(){

    return connection.query(`SELECT employeeid, firstname, lastname, title, deptname, salary, managerid, concat(firstname,' ',lastname) as combinedname FROM employee JOIN roles ON employee.roleid = roles.id JOIN department ON roles.departmentid = department.deptid`)
            
}

module.exports = empData