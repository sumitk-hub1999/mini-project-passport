const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passport = require("passport");
const config=require(./config);
const app = express();

const users = [];
app.set("view-engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("home.ejs", { name: "css6996" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    const pwd = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: pwd,
    });
    console.log(users);
    res.redirect("/login");
  } catch {
    res.redirect("/register");
    console.log(users);
  }
});
app.post("/login", (req, res) => {});
app.listen(3000);
