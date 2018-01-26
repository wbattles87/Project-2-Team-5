const db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res){
        //res.sendFile(__dirname + "../public/home-test.html"); 
        //res.render("index");
        res.send("HELLO");
        //console.log("Random text");
        //something like this. Need to convert home-test to use handlebars
    });
    //login page

    //sign up page

    
    

};