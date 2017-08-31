// flush all keys in the current db
var exports = function(req, res) {
	var client = req.app.get('client');
	
	client.flushdb(key, function(err, data) {
		if (err) {
			res.json({err:err});
			return;
		}

		res.json({data:data});
	});
};

module.exports = exports;