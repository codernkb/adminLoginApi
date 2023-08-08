const mongoose = require('mongoose');
///////define schema///////////////
const adminSchema = new mongoose.Schema({
  name: {type: String,required:true,unique:true }, 
  email: {type: String,required:true,unique:true }, 
  password: {type: String,required:true }
});

////////create model////////////
module.exports=mongoose.model("Admins",adminSchema)