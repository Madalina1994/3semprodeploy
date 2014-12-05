var mongoose = require('mongoose');
var express = require('express');

var Student = require('../server/model/studentsFacade');
var Class = require('../server/model/classesFacade');
var Teacher = require('../server/model/teachersFacade');
var Semester = require('../server/model/semestersFacade');
var Period = require('../server/model/periodsFacade');
var Task = require('../server/model/tasksFacade');
var CompletedTask = require('../server/model/completedTasksFacade');

var class1, class2, class3;
var semester1, semester2, semester3;
var period1, period2, period3, period4, period5, period6, period7, period8, period9, period10, period11, period12, period13, period14, period15;
var task1, task2, task3, task4, task5, task6, task7, task8;
var completedTask1, completedTask2, completedTask3, completedTask4, completedTask5;
var student1, student2, student3, student4, student5, student6;
var teacher1, teacher2;

function addClasses() {
    Class.addNewClass({
        'name': 'ClassA',
        'description': 'Datamatiker',
        'startTime': 'August 2014',
        'endTime': 'December 2014',
        'teachersId': []
    }, function (err, data) {
        class1 = data;
    });

    Class.addNewClass({
        name: 'ClassB',
        description: 'Datamatiker',
        startTime: 'August 2014',
        endTime: 'December 2014',
        teachersId: []
    }, function (err, data) {
        class2 = data;
    });

    Class.addNewClass({
        name: 'ClassC',
        description: 'Computer Science',
        startTime: 'August 2014',
        endTime: 'December 2014',
        teachersId: []
    }, function (err, data) {
        class3 = data;
    });
}
setTimeout(addClasses, 0);

function addStudents() {
    Student.addNewStudent({username: 'Sven', fullName: 'Sven Holmager', classId: class1._id}, function (err, data) {
        student1 = data;
    });
    Student.addNewStudent({username: 'Madelina', fullName: 'Madelina Dragan', classId: class1._id}, function (err, data) {
        student2 = data;
    });
    Student.addNewStudent({username: 'Pranit', fullName: 'Anand', classId: class1._id}, function (err, data) {
        student3 = data;
    });
    Student.addNewStudent({username: 'Artur', fullName: 'Artur Goodguy', classId: class1._id}, function (err, data) {
        student4 = data;
    });
    Student.addNewStudent({username: 'Nikos', fullName: 'Nikos Greekguy', classId: class1._id}, function (err, data) {
        student5 = data;
    });
    Student.addNewStudent({username: 'Boyko', fullName: 'Boyko Bongo', classId: class1._id}, function (err, data) {
        student6 = data;
    });
}
setTimeout(addStudents, 3000);

function addTeacher() {
    Teacher.addNewTeacher({
        username: 'LarsM',
        fullName: 'Lars Morte',
        degree: 'PHD. Doc. Prof.',
        classId: [class1._id, class2._id]
    }, function (err, data) {
        teacher1 = data;
    });
    Teacher.addNewTeacher({
        username: 'SvenH',
        fullName: 'Sven Hipo',
        degree: 'stud. bac. scient.',
        classId: [class1._id, class2._id]
    }, function (err, data) {
        teacher2 = data;
    });
}
setTimeout(addTeacher, 3000);

function addSemesters() {
    Semester.addNewSemester({
        name: 'first',
        requiredPoints: 100,
        startTime: 'August 2013',
        endTime: 'December 2013',
        classId: class1._id
    }, function (err, data) {
        semester1 = data;
    });
    Semester.addNewSemester({
        name: 'second',
        requiredPoints: 150,
        startTime: 'December 2013',
        endTime: 'August 2014',
        classId: class1._id
    }, function (err, data) {
        semester2 = data;
    });
    Semester.addNewSemester({
        name: 'third',
        requiredPoints: 200,
        startTime: 'August 2014',
        endTime: 'December 2014',
        classId: class1._id
    }, function (err, data) {
        semester3 = data;
    });
}
setTimeout(addSemesters, 6000);

function addPeriods() {
    Period.addNewPeriod({
        name: 'period1',
        description: 'Json and mongoDB',
        maximumPoints: 10,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester1._id
    }, function (err, data) {
        period1 = data;
    });
    Period.addNewPeriod({
        name: 'period2',
        description: 'Json and mongoDB',
        maximumPoints: 20,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester1._id
    }, function (err, data) {
        period2 = data;
    });
    Period.addNewPeriod({
        name: 'period3',
        description: 'Json and mongoDB',
        maximumPoints: 30,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester1._id
    }, function (err, data) {
        period3 = data;
    });
    Period.addNewPeriod({
        name: 'period4',
        description: 'Json and mongoDB',
        maximumPoints: 40,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester1._id
    }, function (err, data) {
        period4 = data;
    });
    Period.addNewPeriod({
        name: 'period5',
        description: 'Json and mongoDB',
        maximumPoints: 50,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester1._id
    }, function (err, data) {
        period5 = data;
    });
    Period.addNewPeriod({
        name: 'period1',
        description: 'Json and mongoDB',
        maximumPoints: 10,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester2._id
    }, function (err, data) {
        period6 = data;
    });
    Period.addNewPeriod({
        name: 'period2',
        description: 'Json and mongoDB',
        maximumPoints: 20,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester2._id
    }, function (err, data) {
        period7 = data;
    });
    Period.addNewPeriod({
        name: 'period3',
        description: 'Json and mongoDB',
        maximumPoints: 30,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester2._id
    }, function (err, data) {
        period8 = data;
    });
    Period.addNewPeriod({
        name: 'period4',
        description: 'Json and mongoDB',
        maximumPoints: 40,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester2._id
    }, function (err, data) {
        period9 = data;
    });
    Period.addNewPeriod({
        name: 'period5',
        description: 'Json and mongoDB',
        maximumPoints: 50,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester2._id
    }, function (err, data) {
        period10 = data;
    });
    Period.addNewPeriod({
        name: 'period1',
        description: 'Json and mongoDB',
        maximumPoints: 30,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester3._id
    }, function (err, data) {
        period11 = data;
    });
    Period.addNewPeriod({
        name: 'period2',
        description: 'Json and mongoDB',
        maximumPoints: 30,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester3._id
    }, function (err, data) {
        period12 = data;
    });
    Period.addNewPeriod({
        name: 'period3',
        description: 'Json and mongoDB',
        maximumPoints: 30,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester3._id
    }, function (err, data) {
        period13 = data;
    });
    Period.addNewPeriod({
        name: 'period4',
        description: 'Json and mongoDB',
        maximumPoints: 30,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester3._id
    }, function (err, data) {
        period14 = data;
    });
    Period.addNewPeriod({
        name: 'period5',
        description: 'Json and mongoDB',
        maximumPoints: 30,
        startTime: 'August',
        endTime: 'September',
        semesterId: semester3._id
    }, function (err, data) {
        period15 = data;
    });
}
setTimeout(addPeriods, 9000);

function addTasks() {
    Task.addNewTask({
        name: 'day1',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '1',
        endTime: '2',
        periodId: period1._id
    }, function (err, data) {
        task1 = data;
    });
    Task.addNewTask({
        name: 'day2',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '2',
        endTime: '3',
        periodId: period1._id
    }, function (err, data) {
        task2 = data;
    });
    Task.addNewTask({
        name: 'day3',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '3',
        endTime: '4',
        periodId: period1._id
    }, function (err, data) {
        task3 = data;
    });
    Task.addNewTask({
        name: 'day4',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '4',
        endTime: '5',
        periodId: period1._id
    }, function (err, data) {
        task4 = data;
    });
    Task.addNewTask({
        name: 'day5',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '5',
        endTime: '6',
        periodId: period1._id
    }, function (err, data) {
        task5 = data;
    });
    Task.addNewTask({
        name: 'day6',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '6',
        endTime: '7',
        periodId: period1._id
    }, function (err, data) {
        task6 = data;
    });
    Task.addNewTask({
        name: 'day7',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '7',
        endTime: '8',
        periodId: period1._id
    }, function (err, data) {
        task7 = data;
    });
    Task.addNewTask({
        name: 'day8',
        description: 'more fun',
        maximumPoints: 1,
        startTime: '8',
        endTime: '9',
        periodId: period1._id
    }, function (err, data) {
        task8 = data;
    });
}
setTimeout(addTasks, 12000);

function addCompletedTask() {
    CompletedTask.addNewCompletedTask({
        receivedPoints: 1,
        comment: '',
        taskId: task1._id,
        studentId: student1._id
    }, function (err, data) {
        completedTask1 = data;
    });
    CompletedTask.addNewCompletedTask({
        receivedPoints: 1,
        comment: '',
        taskId: task1._id,
        studentId: student2._id
    }, function (err, data) {
        completedTask2 = data;
    });
    CompletedTask.addNewCompletedTask({
        receivedPoints: 1,
        comment: '',
        taskId: task1._id,
        studentId: student3._id
    }, function (err, data) {
        completedTask3 = data;
    });
    CompletedTask.addNewCompletedTask({
        receivedPoints: 1,
        comment: '',
        taskId: task2._id,
        studentId: student1._id
    }, function (err, data) {
        completedTask4 = data;
    });
    CompletedTask.addNewCompletedTask({
        receivedPoints: 1,
        comment: '',
        taskId: task2._id,
        studentId: student2._id
    }, function (err, data) {
        completedTask5 = data;
    });
}
setTimeout(addCompletedTask, 15000);
