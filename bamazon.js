// Include NPM packages
let mysql = require('mysql');
let inquirer = require('inquirer');
let Table = require('easy-table');

	inquirer
	    .prompt([
		    {
				name: "choice",
				type: "rawlist",
				choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
				message: "Select an option:",
		    },
	    ])
	    .then(function(answer) {
			console.log(answer);

			if (answer.choice === "View Products for Sale") {
				viewProduct();
			} else if (answer.choice === "View Low Inventory"){
				viewInventory();
			} else if (answer.choice === "Add to Inventory"){
				addInventory();
			} else if (answer.choice === "Add New Product"){
				addProduct();
			} else {
				console.log("Sorry, that's not an option");
			}

	    });