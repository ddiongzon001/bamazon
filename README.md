# Pokémart App
## Overview
Please look at a short video that demos the application [here](https://drive.google.com/open?id=1Ff2gVfg_u7yKS-ztlwz6Cfkd2t3KKby3)!

This is an app allows the user to pick whether they are the following:

* customer
* manager
* supervisor

Once the user pick what kind of user they are, the code allows them to interact with the Pokémart in different ways:

### Customer
* Prompts the customer to buy an item listed in the store front
* Asks the customer how much of the selected item they want to buy
* The information is sent to the database and asks the user if this is the correct product and quantity they want to purchase
* After the customer confirms, the app displays the total cost to the user and updates the database with the updated information
* Finally, the customer choose whether or not to buy another item
* When the customer is done shopping, they are disconnected from the program

### Manager
* Prompts the manager to choose between four different choices:
  * View Products for Sale
  * View Low Inventory
  * Add to Inventory
  * Add New Product

#### View Products for Sale
* Sends a specfic query that only select items that have a stock greater than 0 to the database
* The database brings back the following table to the code
* Displays that information to the manager

#### View Low Inventory
* Sends a specfic query that only select items that have a stock less than 5 to the database
* The database brings back the following table to the code
* Displays that information to the manager

#### Add to Inventory
* Prompts the manager to select an item in order to update the stock quantity
* Asks the manager how much quantity they want to add to the stock
* This information is sent to the database and the database is updated
* Displays the update confirmation to the manager

#### Add New Product
* Asks the manager what is the name of the item, what department the items falls under, the price of the item and the total quantity of stock they have.
* This information is sent to the database and the database is updated for this new product information
* Displays the update confirmation to the manager

### Supervisor
* Prompts the supervisor to choose between two different choices:
  * View Product Sales by Department
  * Create New Department

#### View Product Sales by Department
* Sends a specfic query that selects a table that shows each department, the initial over head costs, product sales, and calculates the total profit
* The database sends the information to the code
* Displays that information to the supervisor

#### Create New Department
* Prompts the supervisor to input the name of the new department, specify any initial over head costs
* This information is sent to the database and the database is updated
* Displays the update confirmation to the supervisor

------

## Technologies used and why

**Built with:**
* [Node](https://nodejs.org/en/): An environment that allows developers to use Javascript to interact with the user without front-end coding.
* [MySQL](https://www.mysql.com/): Open source database that allows developers to create databases.
* [MySQL node](https://www.npmjs.com/package/mysql): Allows developers to interact with databases created in mySQL.
* [Inquirer](https://www.npmjs.com/package/inquirer): Allows developers to use interactive command lines to interact with the user.
* [Console.Table](https://www.npmjs.com/package/console.table): Contains a method that allows developers to display data in nicely formatted tables
* [Format-Currency](https://www.npmjs.com/package/format-currency): Contains a methods that format numbers in currency format

------ 
## Code Examples

After the user types `node main.js`, it shows the user different users they can pick from. The switch statement show below displays how the program imports and loads the corresponding javascript file.

```javascript
// checks the user and then loads the js file with the correct user type
function check(user) {
    let page;
    switch (user) {
        case "customer":
            page = require("./bamazonCustomer.js");
            break;
        case "manager":
            page = require("./bamazonManager.js");
            break;
        default:
            page = require("./bamazonSupervisor.js");
            break;
    }
    page.display;
}
```
In all three files, queries are sent to the database in MySQL, the following are a few queries that are in the `customer` javascript file:

* This query is sent to the database to display the items:
```javascript
connection.query("SELECT product_name, price, stock_quantity FROM products WHERE ?", [{
    item_id: id
    }], function (err, res) {...
```
* This query is sent to the database to update the stock count:
```javascript
connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: updatedStock,
        product_sales: total
    }, {
        item_id: id
    }], function (err, res) {...
```
