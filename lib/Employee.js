class Employee {

    constructor(firstName, lastName, roleid, managerid){
       
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleid = roleid;
        this.managerid = managerid;
        this.empName = (firstName + ` ` + lastName)
    }

    getName(){
        return this.empName
    }

    getRole(){
        return this.roleid
    }

    getManager(){
        return this.managerid
    }

    getEmail(){
        return this.email
    }

}

module.exports = Employee;