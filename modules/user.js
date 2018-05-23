var db = new require('../db'); //reference of dbconnection.js  
var User = {  

    addUser(User) {  
        return db.saveData("INSERT INTO users Set ?",User);
    },

    getUser(email){
        console.log("email:" + email);
        return db.getData("SELECT * FROM users WHERE email = ?", [email]);
    },

    verifyEmail(email){
        return db.getData("SELECT * FROM users WHERE email = ?", [email]);
    },

    verifyEmailAndPassword(email, password){
        return db.getData("SELECT * FROM users WHERE email = ? and password = ?", [email, password])
    }
};  



module.exports = User;  