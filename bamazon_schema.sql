DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id integer(10) auto_increment not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price float(10, 2) not null,
    stock_quantity integer(10) not null,
    PRIMARY KEY (item_id)
);

USE bamazon_db;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('squeaky toy', 'dogs', 7.99, 4), 
('bowl', 'dogs', 12.99, 50),
('leash', 'dogs', 7, 20),
('collar', 'dogs', 10, 50),
('bed', 'dogs', 45.99, 30),
('wand toy', 'cats', 4.99, 2),
('bell', 'cats', 2, 66),
('catnip', 'cats', 1.99, 70),
('litter box', 'cats', 25, 50),
('collar', 'cats', 4.99, 4);

SELECT * FROM products;