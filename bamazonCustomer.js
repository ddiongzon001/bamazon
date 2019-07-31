// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

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
    connection.query("SELECT * FROM products", function (err, res) {
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
    
        console.log(`You chose this item: ${answer.product_id} \nYou want to this many: ${answer.quantity}`);

        // save the user responses in variables
        let productID = answer.product_id;
        let quantity = answer.quantity;

        // save the stock quantity as a variable
        connection.query("SELECT product_name FROM products WHERE ?", [{item_id: answer.product_id}], function(err, res){
            if (err) throw err;
            console.log(res);
        });

        // see if the user's quantity is greater than the stock quantity

        

    });
    
    // connection.end();
}