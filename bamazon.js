// Include NPM packages
let mysql = require('mysql');
let inquirer = require('inquirer');
let Table = require('easy-table');

const customer = require('./bamazonCustomer.js');
const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');

inquirer
    .prompt([
	    {
			name: "choice",
			type: "rawlist",
			choices: ["Customer", "Manager", "Supervisor"],
			message: "Select your view:",
	    },
    ])
    .then(function(answer) {
		console.log(answer);

		if (answer.choice === "Customer") {
			customer.customerView();
		} else if (answer.choice === "Manager"){
			manager.managerView();
		} else if (answer.choice === "Supervisor"){
			supervisor.supervisorView();
		} else {
			console.log("Sorry, that's not an option");
		}

    });