// gets a key with the key set in POST & GET
var exports = function(req, res) {
	var client = req.app.get('client');
	
	var key = req.query.key || req.body.key || "";

	if (key === "") {
		res.json({err:"Please select a key to get"});
		return;
	}
	client.get(key, function(err, data) {
		if (err) {
			res.json({err:err});
			return;
		}

		res.json({data:data});
	});
};

module.exports = exports;