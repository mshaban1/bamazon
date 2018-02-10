var inquirer  = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

  start ();
  
  function start (){
    connection.query('SELECT * FROM products', function (error, res) {
        if (error) throw error;


        res.forEach(row => {
            console.log(`Id: ${row.itemID} Name: ${row.productName} Price: ${row.Price}\n` )
        });

        askQuestions();

    })
}

function askQuestions() {
  inquirer.prompt([
      {
          type: "input",
          name: "prodId",
          message: "what's the product ID you would like to order ?"

      },
      {
          type: "input",
          name: "prodQty",
          message: "how many of this unit would you like to purchase ?"
      }

  ]).then(function (answer) {
      var prodId = answer.prodId;
      var prodQty = answer.prodQty;
      withdrawProd(prodId, prodQty)
  });
}


function withdrawProd(prodId, prodQty) {
  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    
    var prod;

    for(var i = 0; i < res.length; i++){
      if(res[i].itemID == prodId){
        prod = res[i]
      }
    }
  
    console.log("Product was found , Your order has been submitted successfully ");

      if(prod.StockQuantity >= prodQty){
        orderComplete(prod, prodId, prodQty)
        connection.end()
      }else{
        console.log("Sorry the order has been cancled, there was Insufficient quantity!")
        connection.end()
      }
  })
};

function orderComplete (prodObj, prodId, prodQty) {
  var newQuantity = prodObj.StockQuantity - prodQty;
  var productSales = prodObj.Price * prodQty;
  var queryOne = "UPDATE products SET StockQuantity = ? where ?";
  var queryTwo = "UPDATE products SET StockQuantity = ? where ?";
  connection.query(queryOne,[newQuantity, {itemID: prodId}], function (error, res) {
  })
  connection.query(queryTwo, [productSales, { itemID: prodId }], function (error, res) {
  })
}

