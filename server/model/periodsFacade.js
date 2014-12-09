var mongoose = require('mongoose');
var db = require("./db");
var Period = mongoose.model('Period');

function getAllPeriodsBySemesterId(semesterId, callback) {
    Period.find({semesterId: semesterId}, function (err, periods) {
        if (err) {
            return callback(err);
        }
        callback(null, periods);
    });
}

function getPeriodById(periodId, callback) {
    Period.findById(periodId, function (err, newPeriod) {
        if (err) {
            return callback (err);
        }
        callback(null, newPeriod);
    });
}

function addNewPeriod(newPeriod, callback) {
    Period.create(newPeriod, function (err, newPeriod) {
        if (err) {
            return callback(err);
        }
        callback(null, newPeriod);
    });
}

module.exports = {
    getPeriodById: getPeriodById,
    addNewPeriod: addNewPeriod,
    getAllPeriodsBySemesterId: getAllPeriodsBySemesterId
}
