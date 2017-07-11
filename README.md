# Bamazon

Bamazon is a Amazon-like storefront. The app will take in orders from customers and deplete stock from the store's inventory. It also tracks product sales across each department and then provides a summary of the highest-grossing departments in the store.

Run NPM install to download the necessary packages.

## Customer View

*I've created a MySQL Database called `bamazon` with a  table called `products`.

*The products table has each of the following columns:

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

*Run node `bamazonCustomer.js` 

*Running this application will first display all of the items available for sale. Then it will prompt customers to buy a product. 

*Customers receive two messages:

   * The first message asks the ID of the product they'd like to buy
   * The second message asks how many units of the product they'd like to buy

*After customers submit an order, the application will check if the store has enough of the product to meet the order. 

   * If not, the app will log 'Sorry, this item is not available', and then prevent the order from going through.

*If the store _does_ have enough of the product, we'll fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, the customer will see the total cost of their purchase. 


- - -

### Manager View

* Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, the app will list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, the app will allow the manager to add a completely new product to the store.

- - -
