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


// Displays the available items from the products table
function start() {
	console.log('Starting ...');

	connection.query('SELECT * FROM products', 
	  function (error, results) {
	    if (error) throw error;
	    console.log('Selecting...');

		let data = results;
		 
		let t = new Table
		 
		data.forEach(function(product) {
		  t.cell('ID', product.item_id)
		  t.cell('Product Name', product.product_name)
		  t.cell('Department', product.department_name)
		  t.cell('Price', product.price, Table.number(2))
		  t.cell('Stock', product.stock_quantity)
		  t.newRow()
		})
		 
		console.log(t.toString())

		buyProduct(data);

	  }
	);
}

// Prompts the user to select an item and quantity to buy
function buyProduct(results) {
	console.log('Buying ...');

	inquirer
	    .prompt([
		    {
				name: "productID",
				type: "input",
				message: "Enter the ID of the product you'd like to buy.",
		    },
		    {
				name: "productQuantity",
				type: "input",
				message: "Enter the quantity of the product you'd like to buy.",
		    }
	    ])
	    .then(function(answer) {
			checkStock(answer); 
	    });
}


// Check the stock of the product
function checkStock(answer) {

	console.log('Checking ...');

	connection.query('SELECT * FROM products WHERE item_id = ?', 
		[answer.productID],
		function (error, results) {
			if (error) throw error;

			if (results[0].stock_quantity >= answer.productQuantity) {
				console.log('Available');
				reduceStock(answer);
			} else {
				console.log('Sorry, this item is not available');
			}

		}
	);
}


// Reduce the stock of the product if it's available
function reduceStock(answer) {
	connection.query('SELECT * FROM products WHERE item_id = ?', 
		[answer.productID],
		function (error, results) {
			if (error) throw error;

			let newQuantity = results[0].stock_quantity - answer.productQuantity;
			let name = results[0].product_name;
			let price = results[0].price * answer.productQuantity;

			connection.query('UPDATE products SET stock_quantity =' + newQuantity + ' WHERE item_id = ?',
				[answer.productID],
				function(error, results) {
					if (error) throw error;

					console.log( name.toUpperCase() + ' has been successfully added to your cart!');
					console.log('Total: $' + price);
				}
			)

		}
	);

}



