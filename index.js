const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
const morgan = require("morgan");
require('dotenv').config();
var jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = 5001;
const middleware=require("./middleware/middleware")

//////connect db file
require("./db/config")



///// Importing Routes
var indexRouter = require("./routes/index")
/////using routes in the server
app.use(
  indexRouter 
);

// Welcome message route
app.get('/', (req, res) => {
  res.send('Hello!!!'); 
});

app.get('/verify', middleware.validateToken, (req,res,next) =>{
  res.status(200).json({
    "success": true,
    "message":"welcome",
    "result":""

  })
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
    console.log(`http://localhost:${port}`)
  })