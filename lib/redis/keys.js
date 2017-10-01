// get all keys or selected by regex from POST & GET
var exports = function(req, res) {
	var client = req.app.get('client');
	
	var regex = req.query.regex || req.body.regex || "*";
	client.keys(regex, function(err, data) {
		if (err) {
			res.json({err:err});
			return;
		}

		res.json({data:data});
	});
};

module.exports = exports;