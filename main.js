//dependencies
const inquirer = require("inquirer");

// Welcomes user to the homewpage
console.log(`\n ~~~~~~~~~~ POKEMART HOME PAGE ~~~~~~~~~~\n`);

// asks the user what kind of user they are
inquirer.prompt({
    type: "list",
    message: "Please indicate the type of user you are:",
    choices: ["customer", "manager", "supervisor"],
    name: "userType"
}).then(function (answer) {
    // goes into the function where it checks the user type
    check(answer.userType);
})

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