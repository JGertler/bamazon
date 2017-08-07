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
        name: "managerMenu",
        type: "rawlist",
        message: "Product Menu",
        choices: ["Products for Sale", "Low Inventory", "Add To Inventory", "Add New Product"]
      }
    ])
    .then(function(answer) {
      console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")
     
          if ("Low Inventory" === answer.managerMenu) {
              // connection.query("SELECT product_name FROM products WHERE stock_quantity<5");
            for (var i = 0; i < results.length; i++) {
              if(results[i].stock_quantity<=5) {
                console.log(results[i].product_name + " - only " + results[i].stock_quantity + " in stock." );
              };
            }; //end for-loop
            console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")            
            start();
          };   
          if ("Products for Sale" === answer.managerMenu) {
            for (var i = 0; i < results.length; i++) {
              if(results[i].sale_status==="yes") {
                console.log(results[i].product_name + " is on sale.");
              };
              if(results.sale_status==="no") {
                console.log("No products are currently on sale.")
              };
            }; //end for-loop
            console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")  
            start();
          }; //end products for sale
          if ("Add New Product" === answer.managerMenu){
            postItem();
          };
          if ("Add To Inventory" === answer.managerMenu){

            addInventory();
          };

    });
  }); //end query
}; //end start function
function postItem() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the name of the product you would like to submit?"
      },
      {
        name: "department",
        type: "input",
        message: "In which department should this product be categorized?"
      },
      {
        name: "price",
        type: "input",
        message: "How much will this product cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "What is the stock quantity of this product?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
            return false;
          }
      },
      {
        name: "saleStatus",
        type: "input",
        message: "Is this item on sale? (type yes or no)",
        validate: function(value) {
          if (value.toLowerCase() === "yes" || value.toLowerCase() === "no" ) {
            return true;
          }
            return false;
          }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity,
          sale_status: answer.saleStatus
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}; //end postItem

function addInventory() {

  console.log("sorry, can't figure out this function, oh well");


// for (var i = 0; i < results.length; i++) {
// console.log(results[i].product_name + " - Current Quantity: " + results[i].stock_quantity);
// }; //end for loop

  // inquirer
  //       .prompt([
  //       {
  //         name: "addInventory",
  //         type: "rawlist",
  //         message: "Which product are you stocking more of?",
  //         choices: results[i].product_name
  //       },
  //       {
  //         name: "quantityAdded",
  //         type: "rawlist",
  //         message: "How much of this product are you adding?"
  //         // validate: function(value) {
  //         // if (isNaN(value) === false) {
  //         //   return true;
  //         // }
  //         // return false;
  //         // }
  //       }
  //     ])
  //     .then(function(answer) {
  //       console.log("☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠")
  //       console.log(results[i].stock_quantity)
  //       console.log(parseInt(answer.quantityAdded));
  //      // var updatedStock = results[i].stock_quantity+=parseInt(answer.quantityAdded);
  //      // console.log(updatedStock);
  //     });
  // start();

}; //end addInventory





