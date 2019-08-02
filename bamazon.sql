DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    stock_quantity INT NOT NULL,
	product_sales DECIMAL (10,2),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES("pokeball", "pokeball", 2.50, 1000, 0),
	("great ball", "pokeball", 5.50, 500, 0),
	("ultra ball", "pokeball", 7.50, 100, 0),
	("master ball", "pokeball", 10.00, 1, 0),
	("premier ball", "pokeball", 25.00, 100, 0),
    ("potion", "healing item", 1.50, 100, 0),
	("super potion", "healing item", 5.00, 100, 0),
	("hyper potion", "healing item", 6.50, 100, 0),
	("max potion", "healing item", 9.00, 100, 0),
	("revive", "healing item", 11.50, 3, 0);
    

ALTER TABLE products
MODIFY price DECIMAL(4,2) zerofill;

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs DECIMAL (4,2),
	PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES("pokeball", 50),
	("healing item", 75),
    ("berry", 15);
    
ALTER TABLE departments
MODIFY over_head_costs DECIMAL(4,2) zerofill;

-- select department_name, stock_quantity, product_sales from products GROUP BY department_name;
-- select * from departments;

-- SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales)-departments.over_head_costs) AS total_profit
-- FROM products, departments
-- WHERE products.department_name = departments.department_name
-- GROUP BY products.department_name;

-- SELECT departments.department_id, departments.department_name, departments.over_head_costs, IFNULL(SUM(products.product_sales),0) AS product_sales, (IFNULL(SUM(products.product_sales),0)-departments.over_head_costs) AS total_profit
-- FROM products
-- RIGHT JOIN departments ON products.department_name = departments.department_name
-- GROUP BY department_name;