// deletes a key with the key or a field when field is set from POST & GET
var exports = function(req, res) {
	var client = req.app.get('client');

	var key		= req.query.key || req.body.key || "";
	var field	= req.query.field || req.body.field || "";

	if (key === "") {
		res.json({err:"Please select a key to delete"});
		return;
	}
	
	if (field === "") {
		client.del(key, function(err, data) {
			if (err) {
				res.json({err:err});
				return;
			}
	
			res.json({data:data});
		});
	} else {
		client.hdel(key, field, function(err, data) {
			if (err) {
				res.json({err:err});
				return;
			}
	
			res.json({data:data});
		});
	}
};

module.exports = exports;
