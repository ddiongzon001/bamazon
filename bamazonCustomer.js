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
    console.log(`WELCOME TO THE POKEMART!\n`)
    connection.query("SELECT item_id, product_name, department_name, RPAD(price,5,00) AS price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        //promps user to buy something
        asktoBuy();
    });
};

//promps user to buy something
function asktoBuy() {

    inquirer.prompt([{
        type: "input",
        message: "Please input the item id of the product you want to buy: ",
        name: "product_id",
    },
    {
        type: "input",
        message: "Please input the amount of product you want to purchase: ",
        name: "quantity",
    }]).then(function(answer){

        // save the user responses in variables
        let userProductID = answer.product_id;
        let userProductAmount = answer.quantity;

        // get the user's product information from the database
        connection.query("SELECT product_name, price, stock_quantity FROM products WHERE ?", [{item_id: userProductID}], function(err, res){
            if (err) throw err;

            // save the product information in different variables
            let userProductName = res[0].product_name;
            let userProductPrice = res[0].price;
            let userProductStock = res[0].stock_quantity;
            // console.log(res[0].product_name);
            
            // Check to see if the amount the user bought does not exceed the stock_quantity
            if (userProductAmount > userProductStock){
                console.log(`\n**ATTENTION CUSTOMER**\nWe currently do not have enough product to fulfill your wants! Please purchase a lower amount. Sorry for any inconvience.\n`);
                asktoBuy();
            } else{
                console.log(`\nYou want to buy ${userProductAmount} ${userProductName} for ${userProductPrice} each.`);
            }
            
        });

        // see if the user's quantity is greater than the stock quantity

        

    });
    
    // connection.end();
}