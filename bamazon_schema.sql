 DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id integer(10) auto_increment not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price float(10, 2) not null,
    stock_quantity integer(10) not null,
    product_sales float(10, 2) not null,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ('squeaky toy', 'dogs', 7.99, 4, 0, 0), 
('bowl', 'dogs', 12.99, 50, 0, 0),
('leash', 'dogs', 7, 20, 0, 0),
('collar', 'dogs', 10, 50, 0, 0),
('bed', 'dogs', 45.99, 30, 0, 0),
('wand toy', 'cats', 4.99, 2, 0, 0),
('bell', 'cats', 2, 66, 0, 0),
('catnip', 'cats', 1.99, 70, 0, 0),
('litter box', 'cats', 25, 50, 0, 0),
('collar', 'cats', 4.99, 4, 0, 0);

SELECT * FROM products;

CREATE TABLE departments (
    department_id integer(10) auto_increment not null,
    department_name varchar(30) not null,
    overhead_costs float(10, 2) not null,
    
    PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, overhead_costs)
VALUES ('dogs', 1000), 
('cats', 500);


SELECT * FROM departments;
