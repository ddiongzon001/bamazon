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

    initialDisplay();
})

//initial display
function initialDisplay(){
    console.log(`\n~~~~~~~~~~~~~~~~~~~~~~ POKEMART STORAGE ~~~~~~~~~~~~~~~~~~~~~~`)

    //ask the manager which option they would want to use
    inquirer.prompt({
        type: "list",
        message: "Please choose from the following options:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "selectedOption"
    }).then(function (answer) {

        // store the option in a variable
        let option = answer.selectedOption;

        // use the switch function to select which function to go into
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
}

// View Products for Sale
function viewProducts(option){
    console.log(`\nYou selected: ${option}`);
    console.log(`\nThe following items are for sale:\n`)

    let query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0";
    viewMysql(query);
}

// View Low Inventory
function viewLow(option){
    console.log(`You selected: ${option}`);
    console.log(`\nThe following items have a stock quantity of 5 or lower:\n`)

    let query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <= 5";
    viewMysql(query);
}

// Add to Inventory
function addInventory(option){
    console.log(`You selected: ${option}`);
}

// Add New Product
function addNew(option){
    console.log(`You selected: ${option}`);
}

// function for the connection.query
function viewMysql(query) {
    connection.query(query,function(err,res){
        if (err) throw err;
        console.table(res);
        selectAgain();
    })
}

// function to ask they user if they would like to select again
function selectAgain(){
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to select another option?",
        name: "again"
    }).then(function(answer){
        if(answer.again){
            initialDisplay();
        }
        else{
            connection.end();
        }
    })
}