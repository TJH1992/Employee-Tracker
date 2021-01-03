var mysql = require("mysql");
var inquirer = require("inquirer");
const util = require("util");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employeeTrackerDB"
});

connection.query = util.promisify(connection.query);

connection.connect(function(err) {
  if (err) throw err;
  runTracker();
});

function runTracker() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add a Department",
          "Add Role",
          "Add Employee",
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "View Employees By Department",
          "View Employees By Manager",
          "Update Employee Role"
          // "Update Employee Manager",
          // "Remove a Department",
          // "Remove Employee",
          // "Remove Role"
          
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add a Department":
          addDepartment();
          break;
  
        case "Add Role":
          addRole();
          break;
  
        case "Add Employee":
          addEmployee();
          break;
  
        case "View All Departments":
          viewDepartments();
          break;
  
        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;
          
        case "Exit":
          console.log("Good Bye!");  

        // case "View Employees By Department":
        //   viewEmployeeByDepartment();
        //   break;  

        // case "View Employees By Manager":
        //   viewEmployeeByManager();
        //   break;

        // case "Remove a Department":
        //   removeDepartment();
        //   break;
          
        // case "Remove Employee":
        //   removeEmployee();
        //   break; 
  
        // case "Remove Role":
        //   removeRole();
        //   break;
        }
      });
  }

function addDepartment() {
    inquirer
      .prompt({
        name: "name",
        type: "input",
        message: "What is the department name?"
      })
      .then(function(answer){
        var query = "INSERT INTO department SET ?";
        connection.query(query,
            {
                name: answer.name
            },
            function(err) {
                if (err) throw err;
                console.log("The " + answer.name + " was created.")
                runTracker();
            }
        );
      });
};

function addRole() {
    inquirer
      .prompt({
        type: "input",
        name: "newRole",
        message: "What new role would you like to adde?"
      },
      {
        type: "number",
        name: "salary",
        message: "Please enter a salary for this role."
      },
      {
        type: "number",
        name: "department",
        message: "Please enter the department ID for this role."
      })
      .then(function(answer){
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.newRole,
            salary: answer.salary,
            department_id: answer.department_id
          },
          function(err, res) {
            if (err) throw err;
            console.log("The new role has been added");
            runTracker();
          }
        )
      })
};

function addEmployee() {

  inquirer.prompt([
    {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
    },
    {
        type: "number",
        name: "role_id",
        message: "What is the employee's role id?"
    },
    {
        type: "number",
        name: "manager_id",
        message: "What is the employee's managers's id?"
    }
]).then(function (res) {
        connection.query("INSERT INTO employee SET ?")
        console.log("employee has been added");
        runTracker();

})

}


function viewDepartments() {
  connection.query("SELECT name FROM department AS Departments", (err, res)=>{
    if (err) throw err;
    console.table(res);
    runTracker();
  });
};

function viewRoles() {
  connection.query("SELECT title AS Roles FROM role", (err, res)=>{
    if (err) throw err;
    console.table(res);
    runTracker();
  })
};

function viewEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id", (err, res)=>{
    if (err) throw err;
    console.table(res);
    runTracker();
  })
};

function updateEmployee() {
    inquirer.prompt([
      {
          message: "Enter the last name of the employee",
          type: "input",
          name: "last_name"
      }, {
          message: "Enter the employees new role ID",
          type: "number",
          name: "role_id"
      }
  ]).then(function (res) {
      connection.query("UPDATE employee SET role_id = ? WHERE last_name = ?", [res.role_id, res.last_name],
          function (err) {
              if (err) throw err;
              console.log("Role was updated for this employee")
              runTracker();
    })
  })
}

// function viewEmployeeByDepartment() {
//     inquirer
//       .prompt({

//       })
//       .then(function(answer){

//       })
//       //possible function call here
// };

// function viewEmployeeByManager() {
//     inquirer
//       .prompt({

//       })
//       .then(function(answer){

//       })
//       //possible function call here
// };

// function removeDepartment() {
//     inquirer
//       .prompt({

//       })
//       .then(function(answer){

//       })
//       //possible function call here
// };

// function removeEmployee() {
//     inquirer
//       .prompt({

//       })
//       .then(function(answer){

//       })
//       //possible function call here
// };

// function removeRole() {
//     inquirer
//       .prompt({

//       })
//       .then(function(answer){

//       })
//       //possible function call here
// };