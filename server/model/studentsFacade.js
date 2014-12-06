var mongoose = require('mongoose');
var db = require("./db");
var Student = mongoose.model('Student');


function getStudentByUserName(studentUserName, callback) {
    Student.find({username: studentUserName}, function (err, studentByUserName) {
        if (err) {
            return callback(err);
        }
        callback(null, studentByUserName);
    });
}

function getAllStudentsByClassId(classId, callback) {
    Student.find({classId: classId}, function (err, studentsByClassId) {
        if (err) {
            return callback (err);
        }
        callback (null, studentsByClassId);
    });
}

function addNewStudent(student, callback) {
    Student.create(student, function (err, studentNew) {
        if (err) {
            return callback(err);
        }
        callback(null, studentNew);
    });
}

function addMoreStudents(studentsArray, callback) {
    for (var student in studentsArray) {
        Student.save(function (err, studentNew) {
            if (err) {
                return callback(err);
            }
            callback(null, studentNew);
        });
    }
}


module.exports = {
    getAllStudentsByClassId: getAllStudentsByClassId,
    getStudentByUserName: getStudentByUserName,
    addNewStudent: addNewStudent

}
