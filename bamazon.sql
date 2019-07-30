DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("pokeball", "pokeball", "2.50", "1000"),
	("great ball", "pokeball", "5.50", "500"),
	("ultra ball", "pokeball", "7.50", "100"),
	("master ball", "pokeball", "10.00", "10"),
	("premier ball", "pokeball", "25.00", "100"),
    ("potion", "healing items", "1.50", "100"),
	("super potion", "healing items", "5.00", "100"),
	("hyper potion", "healing items", "6.50", "100"),
	("max potion", "healing items", "9.00", "100"),
	("revive", "healing items", "11.50", "100");