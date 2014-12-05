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

module.exports = httpSend;