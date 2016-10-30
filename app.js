var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var redis = require('redis');

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 

//==== CONFIGURE DATABASE ======================================//
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var redisCreds = {};
for (var serviceName in services) {
	if (serviceName.indexOf("rediscloud") > -1) {
		redisCreds = services[serviceName][0]['credentials'];
	}
}

var services = {redis:{}};
if (JSON.stringify(redisCreds) == "{}") {
	services = require("./services.json");
}

var dbConfig = {
		hostname    : redisCreds.hostname || services.redis.hostname || "",
		password	: redisCreds.password || services.redis.password || "",
		port	    : redisCreds.port || services.redis.port || ""
};

var client = redis.createClient(dbConfig.port, dbConfig.hostname, {no_ready_check: true});
client.auth(dbConfig.password, function (err) {
    if (err) then throw err;
});

client.on('connect', function() {
    console.log('Connected to Redis');
});

app.set('client', client);
var db = require('./lib/redis/db.js');
//==============================================================//

//==== SET KEY =================================================//
// curl <url>/redis/set?key=value                               //
//==== SET MULTPLE KEYS ========================================//
// curl <url>/redis/set?key1=value1&key2=value2                 //
//==============================================================//
app.all(db.paths.set, db.set);

//==== HASH SET KEY ============================================//
// curl <url>/redis/hset?key=abc&field=value                    //
//==== HASH MULTIPLE SET KEY ===================================//
//curl <url>/redis/hmset?key=abc&field1=value1&field2=value2   //
//==============================================================//
app.all(db.paths.hset, db.hset);

//==== LIST ALL KEYS ===========================================//
// NOTE: ONLY FOR TESTING / DEVELOPMENT PURPOSES                //
// curl <url>/redis/keys                                        //
//==============================================================//
app.all(db.paths.keys, db.keys);

//==== GET 1 KEY ===============================================//
//curl <url>/redis/get?key=abc                                  //
//==============================================================//
app.all(db.paths.get, db.get);

//==== GET 1 HASH KEY FIELD ====================================//
// curl <url>/redis/hget?key=abc&field=opq                      //
//==== GET ALL HASH KEY FIELD ==================================//
// curl <url>/redis/hget?key=abc                                //
//==============================================================//
app.all(db.paths.hget, db.hget);

//==== DELETE 1 KEY ============================================//
// curl <url>/redis/del?key=abc                                 //
//==== DELETE 1 HASH FIELD KEY =================================//
// curl <url>/redis/hdel?key=abc&field=opq                      //
//==============================================================//
app.all(db.paths.del, db.del);

//==== CLEAR ALL KEYS ==========================================//
//curl <url>/redis/flushdb                                      //
//==============================================================//
app.all(db.paths.flushdb, db.flushdb);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

require("cf-deployment-tracker-client").track();