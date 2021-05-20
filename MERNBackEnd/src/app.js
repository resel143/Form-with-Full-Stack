const express = require("express");
const path = require("path");
require("./db/conn");
const hbs = require("hbs");
const Register = require("./models/registers");
// const mongoose = require("mongoose");
//  providing port number
const port = process.env.PORT || 3000;

const app = express();

const static_path = path.join(__dirname, "/public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.get("/", (req, res)=>{
    res.render("index");
})
app.get("/register", (req, res)=>{
    res.render("registration");
});
// create a new user in database 
app.post("/register", async (req, res)=>{
    try{

        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if(password === cpassword){
                const registerStud = new Register({
                    firstName : req.body.firstName,
                    lastName: req.body.lastname,
                    email: req.body.email,
                    gender: req.body.sex,
                    phone: req.body.mobile,
                    age: req.body.age,
                    password: req.body.password,
                    confirmpassword: cpassword
                })

                const registerd =await registerStud.save();
                res.status(201).render(index);
        }else{
            res.send("password are not matching!");
        }

    }catch(err){
        res.status(400).send(err);
    }
});
app.listen(port , ()=>{
    console.log("Server is running at 3000"); 
})
