var mysql = require('mysql');
var conn  = null;



exports.connect = function() {

conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'party'
});

exports.conn = function(){
  return conn;
};

conn.connect(function(err) {
  if (err) 
      console.log(err);
  else
      console.log('You are now connected to MySql database');
});}

exports.getData = function(query, param){
  return new Promise((resolve, reject) => {
    conn.query(query, param, (error, result) => {
      if(error)
        reject(error);
      else
      {
        resolve(result);
      }})
  });
}

exports.saveData = function(query, param){
  return new Promise((resolve, reject) => {
  conn.query(query, param, function(error){
    if(error)
      return reject({message: "Reject", error: error});
    else
      return resolve({message: "Succes"});
    });
  });
}

exports.deleteData = function(){
  
}

