const connection = require('./connection')

function deptData(){

    return connection.query(`SELECT * FROM department;`)
            
}

module.exports = deptData