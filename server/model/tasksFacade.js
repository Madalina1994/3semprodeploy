var mongoose = require('mongoose');
var db = require('./db');
var Task = mongoose.model('Task');

function addNewTask(newTask, callback) {
    Task.create(newTask, function (err, taskNew) {
        if (err) {
            return callback(err);
        }
        callback(null, taskNew);
    });
}

function getTaskById (taskId, callback) {
    Task.findById(taskId, function (err, taskById) {
        if (err) {
            return callback (err);
        }
        callback(null, taskById);
    })
}

function getAllTasksByPeriodId (periodId, callback) {
    Task.find({periodId: periodId}, function(err, taskList) {
        if (err) {
            return callback (err);
        }
        callback (null, taskList);
    });
}

module.exports = {
    addNewTask: addNewTask,
    getTaskById: getTaskById,
    getAllTasksByPeriodId: getAllTasksByPeriodId
}