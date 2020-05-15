var mongoose = require('mongoose');

var productserverSchema = new mongoose.Schema({
	url: String,
	loaisanpham: String,
	tensanpham: String,
	socongbo: String,
	giaban: String,
	linkhinh: String
});

var Productserver = mongoose.model('Productserver',productserverSchema,'productserver');

module.exports = Productserver;