var db = new require('../db'); //reference of dbconnection.js
var _       = require('lodash');
var Task = {

    getTasks(id){
        return db.getData("SELECT * FROM tasks WHERE userId = ?", id);
    },

    addTask(parameter){
        return db.getData("INSERT INTO tasks Set ?", parameter);
    },

    updateTask(parameter, id){
        return db.saveData("UPDATE tasks SET ? WHERE id = ?;", [parameter, id]);
    },

    removeTask(id){
        return db.saveData("DELETE FROM tasks WHERE id= ?", id);
    },
};

module.exports = Task;
