var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');
var Teacher = require('../model/teachersFacade');
var Period = require('../model/periodsFacade');
var Class = require('../model/classesFacade');
var Student = require('../model/studentsFacade');
var Semester = require('../model/semestersFacade');
var Task = require('../model/tasksFacade');
var CompletedTasks = require('../model/completedTasksFacade');
var httpPost = require('./connectToJPA');
var bcrypt = require('../../node_modules/bcryptjs');

function isDbRunning() {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return false;
    }
    return true;
}
/*
 router.post('/oneTeacher', function (req, res) {
 if (!isDbRunning()) {
 return;
 }
 var newTeacher = req.body;

 Teacher.addNewTeacher(newTeacher, function (err, teacherNew) {
 if (err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(teacherNew));
 });

 });*/

router.post('/oneStudent', function (req, res) {  //needs a class in the database
    if (!isDbRunning()) {
        return;
    }
    var newStudent = req.body;
    Student.addNewStudent(newStudent, function (err, studentNew) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(studentNew));
    });
});

router.post('/oneClass', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    var newClass = req.body;
    Class.addNewClass(newClass, function (err, classNew) {
        //res.set("Context-Type", "application/json");
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(classNew));
    });

});

router.post('/period', function (req, res) {  //needs a semester in the database
    if (!isDbRunning()) {
        return;
    }
    var newPeriod = req.body;
    Period.addNewPeriod(newPeriod, function (err, periodNew) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(periodNew));
    });
});

router.post('/semester', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    var newSemester = req.body;
    Semester.addNewSemester(newSemester, function (err, semesterNew) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(semesterNew));
    });
});

router.post('/task', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    var newTask = req.body;
    Task.addNewTask(newTask, function (err, taskNew) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(taskNew));
    });
});

router.post('/completedTask', function (req, res) { //not done
    if (!isDbRunning()) {
        return;
    }
    var completedTask = req.body;
    CompletedTasks.addNewCompletedTask(completedTask, function (err, completedTask) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        //res.header("Content-type", "application/json");
        res.end(JSON.stringify(completedTask));
    });
    res.send(completedTask);
});

router.get('/tasksByPeriod/:periodId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Task.getAllTasksByPeriodId(req.params.periodId, function (err, foundTasks) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(foundTasks));
    });
});

router.get('/periodsBySemester/:semesterId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Period.getAllPeriodsBySemesterId(req.params.semesterId, function (err, foundPeriods) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(foundPeriods));
    });
});

router.get('/allCompletedTasksForASpecificTask/:taskId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    CompletedTasks.getAllCompletedTasksByTaskId(req.params.taskId, function (err, foundTasks) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(foundTasks));
    });
});

router.get('/allCompletedTasksForASpecificStudent/:studentId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    CompletedTasks.getAllCompletedTasksByStudentId(req.params.studentId, function (err, completedTasks) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(completedTasks));
    });
});

router.get('/periodById/:periodId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Period.getPeriodById(req.params.periodId, function (err, periodById) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(periodById));
    });
});

/*router.post('/receivedScore', function (req, res) {                           we have it already
 if (!isDbRunning()) {
 return;
 }
 var completedTask = req.body;
 CompletedTasks.addNewCompletedTask(newCompletedTask, function (err, completedTask) {
 if (err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(completedTask));
 });
 }); */

/*router.put('/editReceivedScore/:completedTaskId', function (req, res) {               we need the method in the facade
 if (!isDbRunning()) {
 return;
 }
 var newCompletedTaskForEdit = req.body;
 CompletedTasks.findByIdAndUpdate(req.params.completedTaskId, newCompletedTaskForEdit, function (err, CompletedTask) {
 if (err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(CompletedTask));
 });
 }); */          //need the method in the facade

router.get('/semester/:semesterId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Semester.getSemesterById(req.params.semesterId, function (err, semesterById) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(semesterById));
    });
});

router.get('/allClasses', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Class.getAllClasses(function (err, allClasses) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(allClasses));
    })
});

router.get('/allTeachers', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Teacher.getAllTeachers(function (err, allTeachers) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(allTeachers));
    })
});

router.get('/Class/:classId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Class.getClassById(req.params.classId, function (err, classById) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(classById));
    });
});

router.get('/task/:taskId', function(req, res) {
    if (!isDbRunning()) {
        return;
    }
    Task.getTaskById(req.params.taskId, function (err, TaskById) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(TaskById));
    });
});

/* router.get('completedTask/:completedTaskId', function(req, res){
    if(!isDbRunning()) {
 return;
 }
 CompletedTasks.getCompletedTaskById(req.params.completedTaskId, function (err, completedTaskById) {
 if(err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(completedTaskById));
 });
 }); */
/*router.get('/semester/:semesterId', function(req, res){
 if(!isDbRunning()) {
 return;
 }
 Semester.getSemesterById(req.params.semesterId, function (err, semesterById) {
 if(err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(semesterById));
 });
 });
 router.get('periodById/:periodId', function(req, res){
 if(!isDbRunning()) {
 return;
 }
 Period.getPeriodById(req.params.periodId, function (err, periodById) {
 if(err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(periodById));
 });
 }); */
 /*router.get('/allTeachersByClass/:classId', function(req, res) {
 if(!isDbRunning()) {
 return;
 }
 Teacher(req.params.class.classId, function (err, teachersByClassId) {
 if(err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(teachersByClassId));
 });
 });
 router.get('/allStudentsByClass/:classId', function(req, res) {
 if(!isDbRunning()) {
 return;
 }
 Student.getAllStudentsByClassId(req.params.class.classId, function (err, allStudentsByClass) {
 if(err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(allStudentsByClass));
 });
 }); */
router.get('/allSemestersByClass/:classId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Semester.getAllSemestersByClassId(req.params.classId, function (err, semestersByClassId) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(semestersByClassId));

    });
});

/*router.get('/ClassByPeriod/:periodId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Student.getClassByPeriodId(req.params.periodId, function (err, semestersByClassId) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(semestersByClassId));

    });
}); */

/*router.get('/teacher/:userName', function (req, res) {
 if(!isDbRunning()) {
 return;
 }
 Teacher.getTeacherByUserName(req.params.userName, function( err, TeacherWithUsername) {
 if (err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(TeacherWithUsername));
 });
 });
 router.get('/student/:userName', function (req, res) {
 if(!isDbRunning()) {
 return;
 }
 Student.getStudentByUserName(req.params.userName, function( err, StudentWithUsername) {
 if (err) {
 res.status(err.status || 400);
 res.end(JSON.stringify({error: err.toString()}));
 return;
 }
 res.header("Content-type", "application/json");
 res.end(JSON.stringify(StudentWithUsername));
 });
 });
 */

//router.post('/oneTeacher/', function (req, res) {
//    if (!isDbRunning()) {
//        return;
//    }
//    var newTeacher = req.body;
//    var pwd = req.body.password;
//    console.log(pwd);
//    var user = req.body.username;
//    var role = req.body.roleName;
//
//    bcrypt.genSalt(10, function (err, salt) {
//        bcrypt.hash(pwd, salt, function (err, hash) {
//            // Store hash in your password DB.
//            if (err) {
//
//            }
//            httpPost.httpPost(user, hash, role, function (err, data) {
//                console.log("error: " + err);
//                console.log('pwd:' + hash);
//                console.log("data: " + JSON.stringify(data));
//                var toPost = {
//                    "username": user,
//                    "password": hash,
//                    "roleName": role
//                };
//                var post_data = JSON.stringify(toPost);
//                console.log(post_data);
//                if (err) {
//                    res.status(err.status || 400);
//                    res.end(JSON.stringify({error: err.toString()}));
//                    return;
//                }
//                Teacher.addTeacher(newTeacher, function (err, teacherNew) {
//                    if (err) {
//                        res.status(err.status || 400);
//                        res.end(JSON.stringify({error: err.toString()}));
//                        return;
//                    }
//                    res.header("Content-type", "application/json");
//                    res.end(JSON.stringify(teacherNew));
//
//
//                    //res.header("Content-type", "application/json");
//                    res.end(JSON.stringify(post_data));
//                }); });
//        });
//    });
//
//
//
//});


module.exports = router;
