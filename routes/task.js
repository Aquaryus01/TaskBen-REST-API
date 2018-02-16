var express = require('express'),
  _       = require('lodash'),
  config  = require('../config'),
  jwt     = require('jsonwebtoken')
db      = require('../db'),
  task   = require('../modules/task')

const util = require('util')

var app = module.exports = express.Router();

app.get('/getTasks', (req, res) => {
  jwt.verify(req.headers.key, config.secretKey, function(err, decoded) {
    if(!err)
    {
      task.getTasks(decoded.id).then(results => {
        res.send(results);
      });
    }
})});

app.post('/addTask', (req, res) => {
  jwt.verify(req.headers.key, config.secretKey, function(err, decoded) {
    if(!err)
    {
      var parameter = req.body;
      parameter['userId'] = decoded.id;
      task.addTask(parameter).then(result => {
        res.send(String(result.insertId));
      }).catch(error =>{
        console.log(error);
      });
    }
})});

app.post('/updateTask', (req, res) => {
  jwt.verify(req.headers.key, config.secretKey, function(err, decoded) {
    if(!err)
    {
      var parameter = req.body;

      var id = parameter.id;
      var _task = _.omit(parameter, 'id');
      
      console.log(_task);

      task.updateTask(parameter, id).then(result => {
        res.send(result);
      }).catch(error =>{
        console.log(error);
      });
    }
})});

app.post('/removeTask', (req, res) => {
  jwt.verify(req.headers.key, config.secretKey, function(err, decoded) {
    if(!err)
    {
      var parameter = req.body.id;
      console.log(parameter);
      task.removeTask(parameter).then(result => {
        res.send(result);
      }).catch(error =>{
        console.log(error);
      });
    }
})});