var mongoose = require('mongoose');
var db = require('./db');
var Semester = mongoose.model('Semester');

function addNewSemester(semesterNew, callback) {
    Semester.create(semesterNew, function (err, newSemester) {
        if (err) {
            return callback(err);
        }
        callback(null, newSemester);
    });
}

function getAllSemestersByClassId(classId, callback) {
    Semester.find({classId: classId}, function (err, semesterList) {
        if(err) {
            return callback(err);
        }
        callback(null, semesterList);
    });
}

function getSemesterById(semesterId, callback) {
    Semester.findById(semesterId, function (err, semesterId) {
        if(err) {
            return callback(err);
        }
        callback(null, semesterId);
    });
}

module.exports = {
    getSemesterById: getSemesterById,
    getAllSemestersByClassId: getAllSemestersByClassId,
    addNewSemester: addNewSemester
}