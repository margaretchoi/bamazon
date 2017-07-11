// Include NPM packages
let mysql = require('mysql');
let inquirer = require('inquirer');
let Table = require('easy-table');

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
			console.log(answer);
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
	  'SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales FROM products INNER JOIN departments ON products.department_name=departments.department_name GROUP BY item_id, department_id', 
	  function (error, results) {
	    if (error) throw error;
	    console.log('Viewing departments...');

	    let totalSales = parseFloat(results[0].product_sales - results[0].overhead_costs);

	    // for (let i = 0; i <= results.length; i++) {
	    // 	let totalSales = parseFloat(results[i].product_sales - results[i].overhead_costs);
	    // }

	    console.log(results);

		let data = results;		
		let t = new Table;
		 
		data.forEach(function(product) {
		  t.cell('Department ID', product.department_id)
		  t.cell('Department Name', product.department_name)
		  t.cell('Overhead Costs', product.overhead_costs.toFixed(2))
		  t.cell('Product Sales', product.product_sales)
		  t.cell('Total Profit', totalSales)
		  t.newRow()
		})
		 
		console.log(t.toString())

	  }
	);
}

function createDepartment() {

}
