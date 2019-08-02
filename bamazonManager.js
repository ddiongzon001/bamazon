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
    console.log(`\nHello Manager! You are now connected as id: ${connection.threadId}`);
    console.log(`\n ~~~~~~~~~~~~~~~~~~~~~~ POKEMART STORAGE ~~~~~~~~~~~~~~~~~~~~~~\n`)

    initialDisplay();
})

//initial display
function initialDisplay() {

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
function viewProducts(option) {
    console.log(`\nYou selected: ${option}`);
    console.log(`\nThe following items are for sale:\n`)

    let query = "SELECT item_id, product_name, RPAD(price,5,00) AS price, ISNULL(stock_quantity, '0') AS stock_quantity FROM products WHERE stock_quantity > 0";
    viewMysql(query);
}

// View Low Inventory
function viewLow(option) {
    console.log(`You selected: ${option}`);
    console.log(`\nThe following items have a stock quantity lower than 5:\n`)

    let query = "SELECT item_id, product_name, RPAD(price,5,00) AS price, stock_quantity FROM products WHERE stock_quantity <= 5";
    viewMysql(query);
}

// Add to Inventory
function addInventory(option) {
    console.log(`You selected: ${option}\n`);

    inquirer.prompt([{
            type: "input",
            message: "Please choose the input the item id of the product you want to add inventory to: ",
            name: "id"
        },
        {
            type: "number",
            message: "Please specify how much inventory you want to add to the stock: ",
            name: "inventoryAdd"
        }
    ]).then(function (answers) {
        let selectquery = `SELECT product_name, stock_quantity FROM products WHERE item_id = ${answers.id}`
        let updatequery = "UPDATE products SET ? WHERE ?";
        viewMysql(selectquery, updatequery, answers.id, answers.inventoryAdd);
    })

}

// Add New Product
function addNew(option) {
    console.log(`You selected: ${option}\n`);

    inquirer.prompt([{
            type: "input",
            message: "Please input the name of the new product you would like to add: ",
            name: "name"
        },
        {
            type: "input",
            message: "Please specify what department your item is: ",
            name: "department"
        }, {
            type: "number",
            message: "Please input the price of how much the product is: ",
            name: "price"
        },
        {
            type: "number",
            message: "Please include how much you have of the item: ",
            name: "quantity"
        }
    ]).then(function (answers) {
        let query = `INSERT INTO products (product_name, department_name, price, stock_quantity) 
            VALUE ("${answers.name}","${answers.department}", ${answers.price}, ${answers.quantity})`;
        updateMysql(query);

    })
}

// function for the viewing tables with connection.query
function viewMysql(selectquery, updatequery, id, addAmount) {

    connection.query(selectquery, function (err, res) {
        if (err) throw err;

        if (!updatequery) {
            console.table(res);
            selectAgain();
        } else {
            let stock = res[0].stock_quantity;
            let name = res[0].product_name;
            updateMysql(updatequery, name, stock, id, addAmount)
        }

    })
}

//function for adding things with connection.query
function updateMysql(query, name, stock, id, addAmount) {

    let newStock = parseFloat(stock) + parseFloat(addAmount);

    connection.query(query, [{
        stock_quantity: newStock
    }, {
        item_id: id
    }], function (err, res) {
        if (err) throw err;

        if(!name){
            console.log("\nYou have added your new item into the storage room!\n")
        }else{
        console.log(`\nYou have added ${addAmount} ${name}s.`);
        console.log(`You now have ${newStock} ${name}s in the storage room.\n`);
        }
        selectAgain();
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