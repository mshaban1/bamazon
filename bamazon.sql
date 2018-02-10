-- Create a database called 'Bamazon' and switch into it for this activity --
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
  itemID INT NOT NULL AUTO_INCREMENT,
  productName VARCHAR(100) NULL,
  DepartmentName VARCHAR(100) NULL,
  Price DECIMAL(10,2) NULL,
  StockQuantity INT NOT NULL,
  PRIMARY KEY (ItemID)
);

-- Insert data into the 'products' table --

INSERT INTO `Products` (`ItemID`, `ProductName`, `DepartmentName`, `StockQuantity`, `Price`)
VALUES
	(1,'Chocolate Chip Cookies','Food',1.99,200);
	(2,'Apple Pies','Food',110,3.99),
	(3,'Delicious Amber Ales','Drink',300,4.99),
	(4,'Frozen Mango Margaritas','Drink',150,5.99),
	(5,'Extra chocolatey Cafe Moccas','Drink',200,3.49),
	(8,'Cheesecakes','Food',69,3.49);
