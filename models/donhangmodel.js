var mongoose = require('mongoose');

var donhangSchema = new mongoose.Schema({
	iddon: String,
	url: String,
	datetime: String,
	tensanpham : String,
	name: String,
	phone: String,
	address: String,
	email: String,
	soluong: String,
	tongtien: String,
	userId: String,
});

var Donhang = mongoose.model('Donhang',donhangSchema,'donhang');

module.exports = Donhang;