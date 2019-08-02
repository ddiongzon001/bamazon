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

    initialDisplay();
})

//initial display
function initialDisplay() {
    console.log(`\n ~~~~~~~~~~~~~~~~~~~~~~ POKEMART COST ANALYSIS ~~~~~~~~~~~~~~~~~~~~~~\n`)

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