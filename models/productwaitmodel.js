var mongoose = require('mongoose');

var productwaitSchema = new mongoose.Schema({
	url: String,
	loaisanpham: String,
	tensanpham: String,
	socongbo: String,
	giaban: String,
	linkhinh: String
});

var Productwait = mongoose.model('Productwait',productwaitSchema,'productwait');

module.exports = Productwait;