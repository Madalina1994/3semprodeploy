var mongoose = require('mongoose');
var db = require("./db");
var Teacher = mongoose.model('Teacher');

function addNewTeacher(teacher, callback) {
    Teacher = new db.TeacherModel(teacher);
    Teacher.save(function (err, teacherNew) {
        if (err) {
            return callback(err);
        }
        callback(null, teacherNew);
    });
}

function getTeacherByUsername(teacherUserName, callback) {
    Teacher.find({userName: teacherUserName}, function (err, teacherByUserName) {
        if (err) {
            return callback(err);
        }
        callback(null, teacherByUserName);
    });
}

function getAllTeachersByClassId(classId, callback) {
    Teacher.find({classId: classId}, function (err, teacherList) {
        if (err) {
            return callback(err);
        }
        callback(null, teacherList);
    })
}

function getAllTeachers(callback){
    Teacher.find({}, function (err, teacherList) {
        if(err) {
            return callback(err);
        }
        callback(null, teacherList);
    })
}

/*
 function addMoreTeachers(teachersArray, callback) {
 for (var teacher in teachersArray) {
 Teacher.save(function (err, teacherNew) {
 if (err) {
 return callback(err);
 }
 callback(null, teacherNew);
 });
 }
 }
 */

module.exports = {
    getTeacherByUserName: getTeacherByUsername,
    getAllTeachersByClassId: getAllTeachersByClassId,
    addNewTeacher: addNewTeacher,
    getAllTeachers: getAllTeachers
}


