/////////admin user model connect/////////////
const Admin = require("../models/adminpanel");
var jwt = require('jsonwebtoken');
// const jwtKey="iwjndghj34bjniauxnkma34n0n";
require('dotenv').config();

module.exports = {
    register: async function (req, res, next) {
      try {
        console.log("Register API hit")
        let { name, email, password } = req.body;
        let duplicateEmail = await Admin.findOne({ email });
        if(!duplicateEmail){
          let admin = await new Admin(
            {
              name: name,
              email: email,
              password:password
            }
          );
          let result = await admin.save();
          res.send({ success:"true", message: "Register Successfully!!!", insertedadmin: result });
        } else {
          res.send({ success:"false", message: "User Already Exits with this Email Id" });
        }
  
      } catch (error) {
        res.status(500).send({ success:"false", message: "Failed to register.", error: error.message });
      }
    },
    login: async (req, res, next) => {
        try {
            console.log("Login Api Hit")
          const { email, password } = req.body
          if (email && password) {
            const user = await Admin.findOne({ email })
            if (user != null) {
              if (user.email === email && user.password== password) {
                // Generate JWT Token
                let token=await jwt.sign({user:user},process.env.SECREAT_KEY,{expiresIn:"24h"})
                res.status(200).json({
                  success:true,
                  message:"login successfull",
                  result:{
                    user:user,
                    jwt:token
                  }
                })
              } else {
                res.send({ success:"false",  "message": "Email or Password is not Valid" })
              }
            } else {
              res.send({  success:"false","message": "You are not a Registered User" })
            }
          } else {
            res.send({  success:"false", "message": "All Fields are Required" })
          }
        } 
        catch (error) {
          console.log(error)
          res.send({ success:"false", "message": "Unable to Login" })
        }
      },


    //   fetchAll: async function (req, res, next) {
    //     try {
    //       let list = await Admin.find({ isDeleted: false });
    //       res.status(200).send({success:"true", message:"Data Fecth Sucessful", list});
    //       console.log("fetchAll API hit")
    //     } catch (error) {
    //       res.status(500).send({success:"false", message: "Failed to fetch data.", error: error.message });
    //     }
    //   },
}