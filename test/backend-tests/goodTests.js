/**
 * Created by mady on 10.12.2014.
 */
global.TEST_DATABASE = "mongodb://localhost/testdb";
global.SKIP_AUTHENTICATION = true;  //Skip security

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9995;
var testServer;
var mongoose = require("mongoose");
var Class = mongoose.model("Class");
var Semester = mongoose.model("Semester");
var Period = mongoose.model("Period");
var Task = mongoose.model("Task");
var CompletedTask = mongoose.model("CompletedTask");
var request = require('request');
var User = mongoose.model("Teacher");

describe('REST API for class', function () {
    var apiUrl = "http://localhost:" + testPort + "/adminApi";
    //Start the Server before the TESTS
    var class1 = {"name":"ClassA","description":"Datamatiker","startTime":"August 2014","endTime":"December 2014","__v":0}; //, {name : "class2", description :"service management", startTime: "2013", endTime: "2015"}];
    var classes= [class1];
    var id;

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function(done){
        Class.remove({}, function ()
        {
            Class.create(class1)
                .then(function(loc1){
                    id = loc1._id;
                    done();

                })
        });
    });

    after(function(){  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    it("Should get 1 class", function (done) {
        request.get("http://localhost:" + testPort + "/adminApi/allClasses",function(error, response, body){
            response.statusCode.should.equal(200);
            var locations = JSON.parse(body); //When using the shortcut methods in the request module we need to parse result into a javascript object
            locations.length.should.equal(1);
             locations[0].name.should.equal("ClassA");
            //locations[1].description.should.equal("bb2");
            done();
        });
    });

    it("Should add a new class", function (done) {
        var options = {
            method: 'POST',
            url: "http://localhost:" + testPort + "/adminApi/"+"oneClass",
            headers: {'Content-Type': 'application/json'},
            json:  {"name":"ClassB","description":"Datamatiker","startTime":"August 2014","endTime":"December 2014","__v":0}
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) { //First we test if the new location is returned in the post's response.
                body.name.should.equal("ClassB");
                body._id.should.be.length(24);
                var idForNewClass = body._id;

                //Then we check whether it actually was added to the DataBase
                request("http://localhost:" + testPort + "/adminApi/Class/" +body._id, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var user = JSON.parse(body); // We are using the shortcut method so result must be parsed into a JavaScript object
                        user._id.should.equal(""+idForNewClass);
                        done();
                    }
                })
            }
        })
    });

});

describe('REST API for semester', function () {
    var apiUrl = "http://localhost:" + testPort + "/adminApi";
    //Start the Server before the TESTS
    var semester1= {"name": "sem1", "requiredPoints": 30, "startTime": "september", "endTime": "december"};
    var semesters= [semester1];
    var id;

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function(done){
        Semester.remove({}, function ()
        {
            Semester.create(semester1)
                .then(function(sem1){
                    id = sem1._id;
                    done();

                })
        });
    });

    after(function(){  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    it("Should add a new semester", function (done) {
        var options = {
            method: 'POST',
            url: "http://localhost:" + testPort + "/adminApi/"+"semester",
            headers: {'Content-Type': 'application/json'},
            json:  {"name":"sem2","requiredPoints": 20,"startTime":"August 2014","endTime":"December 2014", "__v":0}
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) { //First we test if the new location is returned in the post's response.
                body.name.should.equal("sem2");
                body._id.should.be.length(24);
                var idForNewSemester = body._id;

                //Then we check whether it actually was added to the DataBase
                request("http://localhost:" + testPort + "/adminApi/semester/" +idForNewSemester, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var semester = JSON.parse(body); // We are using the shortcut method so result must be parsed into a JavaScript object
                        semester._id.should.equal(""+idForNewSemester);
                       done();
                    }
                })
            }
        })
    });

});

describe('REST API for period', function () {
    var apiUrl = "http://localhost:" + testPort + "/adminApi";
    //Start the Server before the TESTS
    var period1 = {"name":"period1","description":"networks","startTime":"August 2014","endTime":"December 2014","__v":0};
    var classes= [period1];
    var id;

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function(done){
        Period.remove({}, function ()
        {
            Period.create(period1)
                .then(function(loc1){
                    id = loc1._id;
                    done();

                })
        });
    });

    after(function(){  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    it("Should add a new period", function (done) {
        var options = {
            method: 'POST',
            url: "http://localhost:" + testPort + "/adminApi/"+"period",
            headers: {'Content-Type': 'application/json'},
            json:  {"name":"period2","description":"Datamatiker","startTime":"August 2014","endTime":"December 2014","__v":0}
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) { //First we test if the new location is returned in the post's response.
                body.name.should.equal("period2");
                body._id.should.be.length(24);
                var idForNewClass = body._id;

                //Then we check whether it actually was added to the DataBase
                request("http://localhost:" + testPort + "/adminApi/periodById/" +body._id, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var user = JSON.parse(body); // We are using the shortcut method so result must be parsed into a JavaScript object
                        user._id.should.equal(""+idForNewClass);
                        done();
                    }
                })
            }
        })
    });

});

describe('REST API for task', function () {
    var apiUrl = "http://localhost:" + testPort + "/adminApi";
    //Start the Server before the TESTS
    var task1 = {"name":"task1","description":"networks","startTime":"August 2014","endTime":"December 2014","__v":0};
    var tasks= [task1];
    var id;

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function(done){
        Task.remove({}, function ()
        {
            Task.create(task1)
                .then(function(task){
                    id = task._id;
                    done();

                })
        });
    });

    after(function(){  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    it("Should add a new task", function (done) {
        var options = {
            method: 'POST',
            url: "http://localhost:" + testPort + "/adminApi/"+"task",
            headers: {'Content-Type': 'application/json'},
            json:  {"name":"task2","description":"Datamatiker","startTime":"August 2014","endTime":"December 2014","__v":0}
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) { //First we test if the new location is returned in the post's response.
                body.name.should.equal("task2");
                body._id.should.be.length(24);
                var idForNewClass = body._id;

                //Then we check whether it actually was added to the DataBase
                request("http://localhost:" + testPort + "/adminApi/task/" +body._id, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var task = JSON.parse(body); // We are using the shortcut method so result must be parsed into a JavaScript object
                        task._id.should.equal(""+idForNewClass);
                        done();
                    }
                })
            }
        })
    });

});

describe('REST API for completed task', function () {
    var apiUrl = "http://localhost:" + testPort + "/adminApi";
    //Start the Server before the TESTS
    var completedTask1 = {"receivedPoints":20,"comment":"good"};
    var completedTasks= [completedTask1];
    var id;

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function(done){
        CompletedTask.remove({}, function ()
        {
            CompletedTask.create(completedTask1)
                .then(function(completedTask){
                    id = completedTask._id;
                    done();

                })
        });
    });

    after(function(){  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    it("Should add a new completed task", function (done) {
        var options = {
            method: 'POST',
            url: "http://localhost:" + testPort + "/adminApi/"+"completedTask",
            headers: {'Content-Type': 'application/json'},
            json:  {"receivedPoints":24,"comment":"good"}
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) { //First we test if the new location is returned in the post's response.
                body.receivedPoints.should.equal(24);
                console.log(body);
                body._id.should.be.length(24);
                //var idForNewClass = body._id;
                done();
                //Then we check whether it actually was added to the DataBase
               /* request("http://localhost:" + testPort + "/adminApi/completedTask/" +body._id, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var task = JSON.parse(body); // We are using the shortcut method so result must be parsed into a JavaScript object
                        task._id.should.equal(""+idForNewClass);
                        done();
                    }
                }) */
            }
        })
    });

});

xdescribe('REST API for /oneTeacher', function () {
    var apiUrl = "http://localhost:" + testPort + "/oneTeacher";
    var array = [{
        "username": "Sara",
        "password": "1234",
        "roleName": "teacher",
        "fullName": "Sara Miller",
        "degree": "BA"
    }];
    //Start the Server before the TESTS
    before(function (done) {

        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {
        User.remove({}, function () {

            //{"username":"Johnny","password":"1234","roleName":"teacher", "fullName":"John Miller", "degree":"BA"}];
            User.create(array, function (err) {
                done();
            });
        });
    })

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    })

    it("Should get 1 user; Vina", function (done) {
        console.log("in here");
        var options = {
            method: 'POST',
            url: apiUrl,
            headers: {'Content-Type': 'application/json'},
            json: {
                "username": "Yina",
                "password": "5678",
                "roleName": "teacher",
                "fullName": "Dina Muller",
                "degree": "BSc"
            }
        }

        request(options, function (error, response, body) {

            if (!error && response.statusCode == 200) { //First we test if the new location is returned in the post's response.

                var result=JSON.stringify(body);
                body.mongo.username.should.equal("Yina");
                body.mongo._id.should.be.length(24);
                //body.jpa.roleName.should.equal("teacher");
                body.mongo.fullName.should.equal("Dina Muller");
                done();
            }
        })
        //}
    })
    //});

});
