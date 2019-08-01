// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const formatCurrency = require('format-currency')
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
    console.log(`connected as id ${connection.threadID} \n`);

    //display all the products
    displayProducts();
})

//display all the products
function displayProducts() {
    console.log(` ~~~~~~~~~~~~~~~~~ WELCOME TO THE POKEMART ~~~~~~~~~~~~~~~~~\n`)
    connection.query("SELECT item_id, product_name, department_name, RPAD(price,5,00) AS price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        // stores the number of products in a variable
        let numProducts = res.length;

        //promps user to buy something
        asktoBuy(numProducts);
    });
};

//promps user to buy something
function asktoBuy(numProducts) {

    inquirer.prompt([{
            type: "input",
            message: "Please input the item id of the product you want to buy: ",
            name: "product_id",
        }
        // },
        // {
        //     type: "input",
        //     message: "Please input the amount of product you want to purchase: ",
        //     name: "quantity",
        // }
    ]).then(function (answer) {

        // save the user responses in variables
        let userProductID = answer.product_id;

        checkProductID(numProducts, userProductID);

    });

}


// Checks if the item_id the user inputs is correct
function checkProductID(numProducts, id) {

    // Check if the user id number is within 0 and the length
    if (id > 0 && id <= numProducts) {

        inquirer.prompt({
            type: "input",
            message: "Please input the amount of product you want to purchase: ",
            name: "quantity",
        }).then(function (answer) {

            let userProductAmount = answer.quantity;
            // get the user's product information from the database
            connection.query("SELECT product_name, price, stock_quantity FROM products WHERE ?", [{
                item_id: id
            }], function (err, res) {
                if (err) throw err;

                // save the product information in different variables
                let userProductName = res[0].product_name;
                let userProductPrice = res[0].price;
                let userProductStock = res[0].stock_quantity;
                // console.log(res[0].product_name);

                // run the checkStock function
                checkStock(userProductAmount, userProductName, userProductPrice, userProductStock, id, numProducts);

            })

        });

    } else {
        console.log(`\n**ATTENTION CUSTOMER**\nItem number ${id} is not an option. Please choose again. Sorry for any inconvience.\n`);
        asktoBuy(numProducts);
    }
}

// checks to see if the amount user brought does not exceed the stock_quantity of the product
function checkStock(userProductAmount, userProductName, userProductPrice, userProductStock, id, numProducts) {

    // if the user amount is greater than stock, prompt user of error
    if (userProductAmount > userProductStock) {
        console.log(`\n**ATTENTION CUSTOMER**\nWe currently do not have enough product to fulfill your wants! Please purchase a lower amount. Sorry for any inconvience.\n`);
        asktoBuy();
    }
    // if the amount the user does buy is correct, confirm with user that is the product they want to buy
    else {
        console.log(`\nYou want to buy ${userProductAmount} ${userProductName} for $${userProductPrice} each.`);
        inquirer.prompt({
            type: "confirm",
            message: "Please confirm if the above information is true:",
            name: "orderConfirmed",
        }).then(function (answer) {

            // If the user's answer is confirmed, run through the updateStock function that passes through the user's product ID & the current stock
            if (answer.orderConfirmed) {
                updateStock(id, userProductStock, userProductAmount);
            }
            // If the user did not confirm the item was correct, tell user and tell them to ask to buy again.
            else {
                // console.log(`\n`);
                asktoBuy(numProducts);
            }
        })
    }

}

// Updates the stock in mysql
function updateStock(id, stock, purchased) {

    //subtracts the purchase amount
    let stock = stock - purchased;

    connection.query("UPDATE products SET")
}