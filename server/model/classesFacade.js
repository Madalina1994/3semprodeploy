var mongoose = require('mongoose');
var db = require("./db");
var Class = mongoose.model('Class');

function getAllClasses(callback) {
    Class.find({}, function (err, allClasses) {
        if (err) {
            return callback(err);
        }
        callback(null, allClasses);
    });
}

function getClassById(classId, callback) {
    Class.findById(classId, function (err, classById) {
        if (err) {
            return callback(err);
        }
        callback(null, classById);
    });
}

//A collection of students and teachers are linked to a class. A class is typical 25 students and will have around 5 semesters.
function addNewClass(newClass, callback) {
    Class.create(newClass, function (err, createdClass) {
        if (err) {
            return callback(err);
        }
        callback(null, createdClass);
    });
}

module.exports = {
    getAllClasses: getAllClasses,
    getClassById: getClassById,
    addNewClass: addNewClass
}
