var express = require('express'),
  _       = require('lodash'),
  config  = require('../config'),
  jwt     = require('jsonwebtoken')
db      = require('../db'),
  user   = require('../modules/user')

const util = require('util')

var app = module.exports = express.Router();

function addUser(user) {
  return util.promisify(user.addUser)
}

app.post('/register', (req, res) => {
  user.verifyEmail(req.body.email).then(exist => {
      if(!exist.length)
      {
        return user.addUser(req.body).then(results => {
          console.log(results);
          if(results.message=="Succes")
          {
            return user.getUser(req.body.email).then(results => {
              var newUser = results[0].id;
              newUser = _.omit(results[0], 'password');
              res.send({Message: "Account created", Token: createToken(newUser), Value: true});
            })
          }
          else
            res.send({Message: "something went wrong!", Value: false});
        });}
        else
        {
          res.send({Message: "email is already taken!", Value: false});
        }
    })
})

app.post('/login', (req, res)=>{
  user.verifyEmailAndPassword(req.body.email, req.body.password).then(results => {
    if(!results.length){
      res.send({Message: "Email and password doesn't match!", Value: false})
    }
    else
    {
      return user.getUser(req.body.email).then(results => {
        var newUser = results[0].id;
        newUser = _.omit(results[0], 'password');
        res.send({Message: "Account is ok!", Token: createToken(newUser), Value: true});
      }).catch(results => {
        res.send(results);
      })
    }
  }).catch(error => {
    res.send(error)})
})

function createToken(user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 60*60*5 });
}
