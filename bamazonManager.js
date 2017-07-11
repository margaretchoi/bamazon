// Include NPM packages
let mysql = require('mysql');
let inquirer = require('inquirer');
let Table = require('easy-table');

exports.managerView = function() {

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
	}

	function viewProduct() {

		connection.query('SELECT * FROM products', 
		  function (error, results) {
		    if (error) throw error;
		    console.log('Showing products...');

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

		  }
		);

	}

	function viewInventory() {

		connection.query('SELECT * FROM products WHERE stock_quantity < 5', 
		  function (error, results) {
		    if (error) throw error;
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
		  }
		);
		
	}

	function addInventory() {
		viewProduct();

		inquirer
		    .prompt([
			    {
					name: "productID",
					type: "input",
					message: "Enter the ID of the product you'd like add.",
			    },
			    {
					name: "productQuantity",
					type: "input",
					message: "Enter the quantity you'd like add.",
			    }
		    ])
		    .then(function(answer) {
				// console.log(answer);

				connection.query('SELECT * FROM products WHERE item_id = ?', 
				[answer.productID],
				function (error, results) {
					if (error) throw error;
					
					let newQuantity = parseInt(results[0].stock_quantity) + parseInt(answer.productQuantity);
					let name = results[0].product_name;

					connection.query('UPDATE products SET stock_quantity =' + newQuantity + ' WHERE item_id = ?',
						[answer.productID],
						function(error, results) {
							if (error) throw error;

							console.log( answer.productQuantity + " " +  name.toUpperCase() + 
								' have been successfully added to your cart!');
							console.log( 'New stock: ' + newQuantity);
						}
					)

				}
			);
		    });



	}

	function addProduct() {
		console.log('Adding a new product ...')
		inquirer
		    .prompt([
			    {
					name: "product",
					type: "input",
					message: "What product are you adding?"
			    },
			    {
					name: "department",
					type: "input",
					message: "Which department is it sold in?"
			    },
			   	{
					name: "price",
					type: "input",
					message: "How much will it cost?"
			    },
			    {
					name: "quantity",
					type: "input",
					message: "How many do you want to add?"
			    }
		    ])
		    .then(function(answer) {
				console.log(answer);

				connection.query(
			        "INSERT INTO products SET ?",
			        {
			          product_name: answer.product,
			          department_name: answer.department,
			          price: answer.price,
			          stock_quantity: answer.quantity
			        },
					function (error, results) {
						if (error) throw error;
						console.log('Succesfully added new product!');
					}
				);

		    });

	}
}