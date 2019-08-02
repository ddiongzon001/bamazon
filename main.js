//dependencies
const inquirer = require("inquirer");

//
console.log(`\nWelcome to the Pokemart Home Page!\n`);

inquirer.prompt({
    type: "list",
    message: "Please indicate the type of user you are:",
    choices: ["customer", "manager", "supervisor"],
    name: "userType"
}).then(function (answer) {
    check(answer.userType);
})

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