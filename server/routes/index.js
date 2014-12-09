var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var httpSend = require('./connectToJPA');
var httpPost = require('./connectToJPA');
var bcrypt= require('../../node_modules/bcryptjs');
var Teacher = require('../model/teachersFacade');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("app/index.html")
});

function isDbRunning() {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return false;
    }
    return true;
}
/*router.post('/authenticate', function (req, res) {
  //TODO: Go and get UserName Password from "somewhere"
  //if is invalid, return 401
    var user=req.body.username;
    var pwd=req.body.password;
    console.log(user+ " " + pwd );
    httpSend(user, pwd, function (err, data){
        console.log("Error: " + err);
        console.log("Data: " + JSON.stringify(data));
        if (req.body.username === data.username  && req.body.password === data.password ) {
            var profile = {
                username: data.username,
                role: data.roleName
            };

            var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
            res.json({token: token});
        }
        else
        {
            res.status(401).send('Wrong user or password');
        }
    });
});*/

router.post('/authenticate/', function (req, res) {
    //TODO: Go and get UserName Password from "somewhere"
    //if is invalid, return 401
    var hash1;
    var user = req.body.username;
    var pwd = req.body.password;
    console.log(user + " " + pwd);
    httpSend.httpSend1(user, function ( err,data) {
        console.log("Error: " + err);
        console.log("Data: " + (data));
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        hash1 = JSON.parse(data);
        // Load password hash from DB
        //if (!data===null  ) {

            //console.log(data);

            //console.log(hash1.password);

            bcrypt.compare(pwd, hash1.password,function (err, respond) {

                if (err) {
                    console.log("Err:" + err)
                    return res.status(500).send(err);
                }
                //res === true
                //        if (respond === true) { //&& req.body.username === hash1.username) {
                else {
                    var profile = {
                        username: hash1.username,
                        role: hash1.roleName
                    };
                    var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
                    // }
                    res.json({token: token});
                }
                ;
            })
        //}
     /*   else{
            res.status(404).send(err);
        }*/
        //};
    });



});

router.post('/oneTeacher', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    var newTeacher = req.body;
    var pwd = req.body.password;
    console.log(pwd);
    var user = req.body.username;
    var role = req.body.roleName;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pwd, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) {

            }
            httpPost.httpPost(user, hash, role, function (err, data) {
                console.log("error: " + err);
                console.log('pwd:' + hash);
                console.log("data: " + JSON.stringify(data));
                var toPost = {
                    "username": user,
                    "password": hash,
                    "roleName": role
                };
                var post_data = JSON.stringify(toPost);
                console.log(post_data);
                if (err) {
                    res.status(err.status || 400);
                    res.end(JSON.stringify({error: err.toString()}));
                    return;
                }
                Teacher.addNewTeacher(newTeacher, function (err, teacherNew) {
                    if (err) {
                        res.status(err.status || 400);
                        res.end(JSON.stringify({error: err.toString()}));
                        return;
                    }
                    res.header("Content-type", "application/json");
                    res.end(JSON.stringify(teacherNew));


                    //res.header("Content-type", "application/json");
                    res.end(JSON.stringify(post_data));
                }); });
        });
    });



});


//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
  var name = req.params.partialName;
  res.render('partials/' + name);
});

module.exports = router;
