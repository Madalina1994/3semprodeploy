var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var httpSend = require('./connectToJPA');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
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
});


//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
  var name = req.params.partialName;
  res.render('partials/' + name);
});

module.exports = router;
