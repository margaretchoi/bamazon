// Include NPM packages
let mysql = require('mysql');
let inquirer = require('inquirer');
let Table = require('easy-table');


exports.supervisorView = function() {
	// Connect to mySQL database
	let connection = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "&&iH6I>(ashT",
	  database: "bamazon_db"
	});

	connection.connect(function(err) {
	  if (err) throw err;
	  start();
	});


	function start() {
		console.log('Starting ...');

		inquirer
		    .prompt([
			    {
					name: "choice",
					type: "rawlist",
					choices: ["View Product Sales by Department", "Create New Department"],
					message: "Select an option:",
			    },
		    ])
		    .then(function(answer) {
				if (answer.choice === "View Product Sales by Department") {
					viewDepartment();
				} else if (answer.choice === "Create New Department"){
					createDepartment();
				} else {
					console.log("Sorry, that's not an option");
				}

		    });
	}

	function viewDepartment() {
		connection.query(
		  'SELECT departments.department_id AS ID, departments.department_name AS Department, departments.overhead_costs AS OverheadCosts, SUM(products.product_sales) AS ProductSales FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_id',
		  function (error, results) {
		    if (error) throw error;
		    console.log('Viewing departments...');

			let data = results;		
			let t = new Table;
			 
			data.forEach(function(product) {
			  let totalSales = (product.ProductSales - product.OverheadCosts)
			  t.cell('Department ID', product.ID)
			  t.cell('Department Name', product.Department)
			  t.cell('Overhead Costs', product.OverheadCosts.toFixed(2))
			  t.cell('Product Sales', product.ProductSales)
			  t.cell('Total Profit', totalSales.toFixed(2))
			  t.newRow()
			})
			 
			console.log(t.toString())

		  }
		);
	}

	function createDepartment() {
		inquirer
			.prompt([
			    {
					name: "name",
					type: "input",
					message: "Enter a department name.",
			    },
			    {
					name: "overhead",
					type: "input",
					message: "Enter the overhead costs for this department.",
					validate: function validateAge(cost)
					{
					   var reg = /^\d+$/;
					   return reg.test(cost) || "Overhead costs should be a number!";
					}
			    },
			])
			.then(function(answer) {

				connection.query(				
				'INSERT INTO departments SET ?',
		        {
		          department_name: answer.name,
		          overhead_costs: parseInt(answer.overhead)
		        },
				function (error, results) {
					if (error) throw error;
					console.log('Department added!');
					}
				);

				

		});

	}
}