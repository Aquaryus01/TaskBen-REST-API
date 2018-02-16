///Dependencies
var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt  = require('jsonwebtoken')
///Routes
const User = require('./routes/user');
const Task = require('./routes/task');

///Main
var app = express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json'}))


///MySql-Connection
var connection = require('./db');
connection.connect();

//server open

app.use(User);
app.use(Task);

app.listen(5000, "localhost");
