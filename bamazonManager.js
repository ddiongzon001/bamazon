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
    console.log(`connected as id ${connection.threadID}`);

    console.log(`\n~~~~~~~~~~~~~~~~~~~~~~ POKEMART STORAGE ~~~~~~~~~~~~~~~~~~~~~~`)

    //ask the manager which option they would want to use
    inquirer.prompt({
        type: "list",
        message: "Please choose from the following options:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "selectedOption"
    }).then(function (answer) {

        let option = answer.selectedOption;

        switch (option) {
            case "View Products for Sale":
                viewProducts(option);
                break;
            case "View Low Inventory":
                viewLow(option);
                break;
            case "Add to Inventory":
                addInventory(option);
                break;
            default:
                addNew(option);;
                break;
        }
    })
})

// View Products for Sale
function viewProducts(option){
    console.log(`You selected: ${option}`);
}

// View Low Inventory
function viewLow(option){
    console.log(`You selected: ${option}`);
}

// Add to Inventory
function addInventory(option){
    console.log(`You selected: ${option}`);
}

// Add New Product
function addNew(option){
    console.log(`You selected: ${option}`);
}