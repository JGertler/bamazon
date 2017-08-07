CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT UNIQUE,
product_name varchar(50) NOT NULL,
department_name varchar (50) NOT NULL,
price DECIMAL (11,2) NOT NULL,
stock_quantity int NOT NULL,
PRIMARY KEY (item_id)
);

UPDATE products SET stock_quantity = 46 WHERE item_id=12;

DELETE FROM products
WHERE item_id=14;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "canvas", "art-supplies", 50.99, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "microwave", "kitchen", 5.99, 50);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "jeggings", "clothing", 49.50, 200);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "undies", "clothing", 3.50, 1000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "calculator", "school", 150.00, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "rug", "home-decor", 300.00, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "charger", "electronics", 15.00, 18);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "For Dummies Books", "books", 12.00, 60);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Salt Lamp", "Zen", 20.00, 73);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Plunger", "Bathroom", 7.00, 400);

select * from products;

ALTER TABLE products
ADD sale_status varchar(3);