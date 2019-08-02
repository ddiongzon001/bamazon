// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// creates a connection to the mysql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

// initial connection
connection.connect(function (err) {
    if (err) throw err;
    console.log(`\nHello Supervisor! You are now connected as id: ${connection.threadId}`);
    console.log(`\n ~~~~~~~~~~~~~~~~~~~~~~ POKEMART COST ANALYSIS ~~~~~~~~~~~~~~~~~~~~~~\n`)

    initialDisplay();
})

//initial display
function initialDisplay() {

    //ask the supervisor which option they would want to use
    inquirer.prompt({
        type: "list",
        message: "Please choose from the following options:",
        choices: ["View Product Sales by Department", "Create New Department"],
        name: "selectedOption"
    }).then(function (answer) {

        // store the option in a variable
        let option = answer.selectedOption;

        // use the switch function to select which function to go into
        switch (option) {
            case "View Product Sales by Department":
                viewProducts(option);
                break;
            default:
                addNew(option);;
                break;
        }
    })
}

function viewProducts(option) {
    console.log(`You selected: ${option}\n`);

    let query = `SELECT departments.department_id, departments.department_name, IFNULL(SUM(products.product_sales),0) AS product_sales, (IFNULL(SUM(products.product_sales),0)-departments.over_head_costs) AS total_profit
    FROM products
    RIGHT JOIN departments ON products.department_name = departments.department_name
    GROUP BY department_name;`
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        selectAgain();
    })

}

function addNew(option) {
    console.log(`You selected: ${option}\n`);

    inquirer.prompt([{
        type: "input",
        message: "Please input the name of the new department you would like to add:",
        name: "name"
    },
    {
        type: "number",
        message: "Please include what the initial over head cost of the department is:",
        name: "cost"
    }
]).then(function (answers) {
    let query = `INSERT INTO departments (department_name, over_head_costs) 
        VALUE ("${answers.name}", ${answers.cost})`;
    
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("\nYou have added a new department to the Pokemart!\n");
        selectAgain();
    })

})

}

// function to ask they user if they would like to select again
function selectAgain() {
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to select another option?",
        name: "again"
    }).then(function (answer) {
        if (answer.again) {
            initialDisplay();
        } else {
            console.log("Have a good day!");
            connection.end();
        }
    })
}