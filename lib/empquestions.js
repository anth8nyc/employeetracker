const empquestions = [
    {
        type: 'input',
        message: 'What is their first name?',
        name: 'firstname',
    },
    {
        type: 'input',
        message: 'What is their last name?',
        name: 'lastname',
    },
    {
        type: 'list',
        message: 'What is their role?',
        name: 'roleid',
        choices: ['1', '2', '3']
    },
    {
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'managerid',
        choices:['1', '2', '3']
    },
];

module.exports = empquestions