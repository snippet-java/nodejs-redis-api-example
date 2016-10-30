var set		= require('./set.js');
var hset	= require('./hset.js');
var get		= require('./get.js');
var hget	= require('./hget.js');
var keys	= require('./keys.js');
var del		= require('./del.js');
var flushdb	= require('./flushdb.js');

var path = "/redis/";
var paths = {
	set			: [path+"set",path+"mset"],
	hset		: [path+"hset",path+"hmset"],
	get			: [path+"get"],
	hget		: [path+"hget",path+"hgetall"],
	keys		: [path+"keys"],
	del			: [path+"del",path+"hdel"],
	flushdb		: [path+"flushdb"]
};

var exports = {
	paths	: paths,
	set		: set,
	hset	: hset,
	get		: get,
	hget	: hget,
	keys	: keys,
	del		: del,
	flushdb	: flushdb
}

module.exports = exports;
