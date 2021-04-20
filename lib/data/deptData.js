const connection = require('../config/connection')

function deptData(){

    return connection.query(`SELECT * FROM department;`)
            
}

module.exports = deptData