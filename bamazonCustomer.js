var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw (err);
  // run the start function after the connection is made to prompt the user
  start();
});


// function which asks user which product they want to buy
function start() {

connection.query("SELECT * FROM products", function(err, results) {

  inquirer
      .prompt([
      {
        name: "inventory",
        type: "rawlist",
        message: "Merher! Welcome to BAMazon, whatchu lookin to buy!? Keep this on the DL",
        choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              };
              return choiceArray;
              }
      },
      {
        name: "orderQuantity",
        type: "input",
        message: "how many you want?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
          }
      }
    ])
    .then(function(answer) {
      console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")
      for (var i = 0; i < results.length; i++) {
                 
          // based on their answer, check the inventory in database
          if (results[i].product_name === answer.inventory) {
            if (results[i].stock_quantity < parseInt(answer.orderQuantity)) {
              console.log("sorry, we don't have enough of the " + results[i].product_name + " to fulfill your order");
              console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")
            } else {
            console.log("cool you owe me " + results[i].price*(parseInt(answer.orderQuantity)) + "...PAY UP!");
            console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")
            // var newAmount = results[i].stock_quantity-=(parseInt(answer.orderQuantity));
            // connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newAmount}]);
            console.log("there are " + results[i].stock_quantity + " left of " + results[i].product_name);
            console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")
            }
          }
      };
      start();
    });

  }); // end query

}// end start function




