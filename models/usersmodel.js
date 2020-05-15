var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	phone: String,
	avatar: String,
	maxaphuong:String,
	matinhthanh:String,
	maquanhuyen: String,
	danhsachsp: Array,
	tennhathuoc: String,
	tinhthanh: String,
	quanhuyen: String,
	xaphuong: String,
	address: String,
	donhang: Array,
	idnt: String

});

var User = mongoose.model('User',userSchema,'users');

module.exports = User;