# Bamazon

Bamazon is a Amazon-like storefront. The app will take in orders from customers and deplete stock from the store's inventory. It also tracks product sales across each department and then provides a summary of the highest-grossing departments in the store.

* Run NPM install to download the necessary packages.
* Run bamazon.js for a list of options: Customer View, Manager View, or Supervisor View


## Customer View 

*The products table has each of the following columns:

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

![Products table](/images/cust_1.png)

*The customer view will first display all of the items available for sale. Then it will prompt customers to buy a product. 

*Customers receive two messages:

   * The first message asks the ID of the product they'd like to buy
   * The second message asks how many units of the product they'd like to buy

![Customer prompts](/images/cust_2.png)

*After customers submit an order, the application will check if the store has enough of the product to meet the order. 

   * If not, the app will log 'Sorry, this item is not available', and then prevent the order from going through.

![Customer stock](/images/cust_4.png)

*If the store _does_ have enough of the product, we'll fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, the customer will see the total cost of their purchase. 

![Customer cost](/images/cust_3.png)


- - -

## Manager View

* The manager view will first list a set of menu options:

    * View Products for Sale
    * View Low Inventory   
    * Add to Inventory
    * Add New Product

![Manager menu](/images/manager_1.png)

  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

![Manager view products](/images/manager_2.png)

  * If a manager selects `View Low Inventory`, the app will list all items with an inventory count lower than five.

![Manager view inventory](/images/manager_3.png)

  * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.

![Manager add inventory](/images/manager_4.png)

  * If a manager selects `Add New Product`, the app will allow the manager to add a completely new product to the store.

![Manager add product](/images/manager_5.png)

- - -


## Supervisor View

*The products table has each of the following columns:

   * department_id
   * department_name
   * overhead_costs 

* The products table includes a product_sales column that is updated with each individual products total revenue from each sale.

* When a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

* The 'Supervisor View' will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

* When a supervisor selects `View Product Sales by Department`, the app displays a summarized table in their terminal/bash window.

* When a supervisor selects 'Create New Department' they receive two messages:

   * The first message asks the name of the department to add
   * The second message asks the overhead costs of this department

* If the new department is successfully added, the app will log 'Department added!'
