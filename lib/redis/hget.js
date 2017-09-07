// gets a hash key with the key-value pair from POST & GET
// if no field is selected, will get all instead
var exports = function(req, res) {
	var client = req.app.get('client');
	
	// assigned key-value from GET & POST
	var key		= req.query.key || req.body.key || "";
	var field	= req.query.field || req.body.field || "";

	if (key === "") {
		res.json({err:"Please select a key to get"});
		return;
	}
	
	if (field === "") {
		client.hgetall(key, function(err, data) {
			if (err) {
				res.json({err:err});
				return;
			}
	
			res.json({data:data});
		});
	} else {
		client.hget(key, field, function(err, data) {
			if (err) {
				res.json({err:err});
				return;
			}

			res.json({data:data});
		});	
	}	
};

module.exports = exports;