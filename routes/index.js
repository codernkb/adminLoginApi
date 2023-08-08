var express = require('express');
var route = express.Router();

// Importing controllers
const adminControllers = require("../controllers/index")

// Routes

route.post('/register', adminControllers.register);
// route.post('/fetchAll', adminControllers.fetchAll);
route.post('/login', adminControllers.login);

module.exports = route;