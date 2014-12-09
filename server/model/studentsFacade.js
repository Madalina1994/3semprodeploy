var mongoose = require('mongoose');
var db = require("./db");
var Student = mongoose.model('Student');
var Period = mongoose.model('Period');

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

/*function getClassByPeriodId(id, callback) {
    Period.find({classId: id})
        .populate('semester')
        .populate('class')
        .exec(function (err, details) {

            model.PeriodModel.populate(details, function (err, details) {

                if (err) {
                    callback(err);
                }
                console.log(details);
                callback(null, details);
            });
        });
} */

module.exports = {
    getAllStudentsByClassId: getAllStudentsByClassId,
    getStudentByUserName: getStudentByUserName,
    addNewStudent: addNewStudent

}
