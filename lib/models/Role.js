class Role {

    constructor(title, salary, departmentid){
       
        this.title = title;
        this.salary = salary;
        this.departmentid = departmentid;
    }

    getTitle(){
        return this.title
    }

    getSalary(){
        return this.salary
    }

    getDeptID(){
        return this.departmentid
    }


}

module.exports = Role;