// sets a hash key with the key-value key-value pair from POST & GET
var exports = function(req, res) {
	var client = req.app.get('client');
	
	// assigned key-value from GET & POST
	var key			= req.query.key || req.body.key || "";
	var valuesArray = extractValues(query, body);

	if (key === "") {
		res.json({err:"Please select a key to set"});
		return;
	}
	if (valuesArray == 0) {
		res.json({err:"Please select a field to set"});
		return;
	}
	
	if (valuesArray.length == 2) {
		client.set(key, valuesArray, function(err, data) {
			if (err) {
				res.json({err:err});
				return;
			}
	
			res.json({data:data});
		});
	} else {
		client.hmset(key, valuesArray, function(err, data) {
			if (err) {
				res.json({err:err});
				return;
			}
	
			res.json({data:data});
		});
	}
};

function extractValues(query, body) {
	var values = {};
	for (var field in body)		values[field] = body[field];
	for (var field in query)	values[field] = query[field];
	
	delete(values.key)
	
	var valuesArray = [];
	for (var field in values) {
		valuesArray.push(field);
		valuesArray.push(values[field]);
	}
	
	return valuesArray;
}

module.exports = exports;
