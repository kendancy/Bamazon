//bamazonCustomer.js
var mysql = require("mysql");
var pad = require("pad");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "123awk",
  database: "bamazon_db"
});

//show the inventory
function show_table(res) {
    console.log(pad('-',10+1+20+1+20+1+10+1+15+1,"-"));
        console.log(pad("id",10) + 
        " | " + pad("product",20) + 
        " | " + pad("department",20) + 
        " | " + pad("Price",10) + 
        " | " + pad("Qty Avail",15));
    console.log(pad('-',10+1+20+1+20+1+10+1+15+1,"-"));
    for (var i = 0; i < res.length; i++) {
        console.log(pad(res[i].item_id.toString(),10) + 
        " | " + pad(res[i].product_name,20) + 
        " | " + pad(res[i].department_name,20) + 
        " | " + pad(res[i].price.toString(),10) + 
        " | " + pad(res[i].stock_qty.toString(),15));
    }
    console.log(pad('-',10+1+20+1+20+1+10+1+15+1,"-"));
}

function ask_item(res) {

    var questions = [
        {
        name:"item",
        type:"input",
        message:"Enter item id to buy? ",
        validate: function(value) {
            if ((isNaN(value) == false) && (value >= 1) && (value <= res.length)) {
                return true;
            } else {
                return false;
            }
        }
    },
        {
        name:"qty",
        type:"input",
        message:"Enter quantity to buy? ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }
    ];

    inquirer.prompt(questions).then(function (answers) {
        if (answers.qty <= res[answers.item-1].stock_qty) {
            console.log("\n\nYou bought " + answers.qty + " qty of " + 
              res[answers.item-1].product_name + " for total cost of " + 
              answers.qty*res[answers.item-1].price);
            connection.query("UPDATE products SET stock_qty = stock_qty - " + 
              answers.qty + " WHERE item_id = " + res[answers.item-1].item_id, 
            function(err, res) {
                if (err) throw err;
                //show the updated inventory
                connection.query("SELECT item_id, product_name, department_name, price, stock_qty FROM products", 
                function(err, res) {
                    if (err) throw err;
                    show_table(res);
                    ask_item(res);
                });
            });
        } else {
            console.log("\n\nInsufficient Qauntity!");
        }
        return answers;
    });

};

connection.connect(function(err) {
    if (err) throw err;
});

connection.query("SELECT item_id, product_name, department_name, price, stock_qty FROM products", 
 function(err, res) {
    if (err) throw err;
    show_table(res);
    ask_item(res);
});
