-- Bamazon MySQL database
CREATE DATABASE if not exists bamazon_db;

USE bamazon_db;

create table products (
	item_id integer(11) auto_increment not null,
    product_name varchar(50),
    department_name varchar(50),
    price decimal(10,2),
    stock_qty integer(11),
    primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("gum", "candy", "0.95", 13);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("chocolate", "candy", "1.95", 6);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("steak", "meat", "7.00", 2);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("hamburger", "meat", "5.00", 3);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("potatoes", "vegetable", "2.00", 15);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("beans", "vegetable", "4.20", 24);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("chips", "snack", "1.00", 6);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("juice", "drinks", "2.00", 78);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("soda", "drinks", "1.35", 78);

INSERT INTO products (product_name, department_name, price, stock_qty) 
VALUES("orange juice", "drinks", ".45", 1);

select * from products;