const express = require('express');
const session = require("express-session");

// creating app
const app = express();
//handling static HTML and EJS templates

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index'); //no need for ejs extension
   });
  
  //route for contacts
app.get("/contacts", (req, res) => {
    res.render("contacts");
});
  
// using JSON and URL Encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
app.use(session({
    secret: 'keyboard goldfish',
    resave: true,
    saveUninitialized: true
}));
  
app.get("/login", (req, res) => {
    res.render("login");
});
  
app.get("/register", (req, res) => {
    res.render("register");
});
  
//pass requests to the router middleware
const router = require("./routes/apis");
app.use(router);

const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Cart app listening at http://localhost:${port}`);
});