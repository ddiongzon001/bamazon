DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    stock_quantity INT NOT NULL,
	product_sales INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES("pokeball", "pokeball", 2.50, 1000, 0),
	("great ball", "pokeball", 5.50, 500, 0),
	("ultra ball", "pokeball", 7.50, 100, 0),
	("master ball", "pokeball", 10.00, 1, 0),
	("premier ball", "pokeball", 25.00, 100, 0),
    ("potion", "healing items", 1.50, 100, 0),
	("super potion", "healing items", 5.00, 100, 0),
	("hyper potion", "healing items", 6.50, 100, 0),
	("max potion", "healing items", 9.00, 100, 0),
	("revive", "healing items", 11.50, 3, 0);
    

ALTER TABLE products
MODIFY price DECIMAL(4,2) zerofill;

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs INT,
	PRIMARY KEY (department_id)
)