var db = new require('../db'); //reference of dbconnection.js  
var User = {  

    addUser(User, callback) {  
        return db.saveData("INSERT INTO USERS Set ?",User, callback);
    },

    getUser(email){
        console.log("email:" + email);
        return db.getData("SELECT * FROM users WHERE email = ?", email);
    },

    verifyEmail(email){
        return db.getData("SELECT * FROM Users WHERE email = ?", email);
    },

    verifyEmailAndPassword(email, password){
        return db.getData("SELECT * FROM Users WHERE email = ? and password = ?", [email, password])
    }
};  



module.exports = User;  