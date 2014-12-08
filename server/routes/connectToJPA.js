/**
 * Created by Pranit Anand on 27-11-2014.
 */
var http=require('http');

var httpSend = function(username, password, callback)
{

    var options={
        hostname:'localhost',
        port:'9999',
        method:'GET',
        path: '/login/' + encodeURIComponent(username) + ',' + encodeURIComponent(password)
    };

    var request=http.request(options, function(res)
    {
        var result="";
        res.on('data', function(chunk)
        {
            result+=chunk;
        });
        res.on('end',function() {
            callback(null, JSON.parse(result));
        });
    });

    request.on('error', function(e)
    {
        callback(e);
    });
    //the following is mandatory
    request.end();
};

//httpSend(http, options,function(err, data){
//    if(err) console.log("Error");
//    else console.log("Result: " + data);


var httpSend1 = function(username, callback)
{
    var options={
        hostname:'localhost',
        port:'9999',
        method:'GET',
        path: '/find/' + encodeURIComponent(username)
    };

    var request02=http.request(options, function(res)
    {
        var result="";
        res.on('data', function(chunk)
        {
            result+=chunk;
            console.log("xxx"+result.toString());
        });
        res.on('end',function() {
            callback(null, result.toString());

        });
    });

    request02.on('error', function(e)
    {
        callback(e);
    });

    //the following is mandatory
    request02.end();

};


var httpPost=function (username, password, rolename, callback){

    var obj = {
        "username": username,
        "password": password,
        "roleName": rolename
    }
    var post_data = JSON.stringify(obj);
    var options={
        hostname:'localhost',
        port:'9999',
        method: 'POST',
        path:'/create/',
        headers: {
            'Content-Type' : 'application/json',
            'Content-Length': post_data.length
        }
    };
    var request01=http.request(options, function(res){
        var result="";
        res.on('data', function(chunk){
            result+=chunk;
        });
        res.on('end', function(){
            callback(null, JSON.stringify(result));
        });
    });
    request01.on('error', function(e){
        callback(e);
    });
    //callback("error");
    request01.write(post_data);
    request01.end();
};

module.exports = {httpSend:httpSend,
    httpPost:httpPost,
    httpSend1:httpSend1
};
