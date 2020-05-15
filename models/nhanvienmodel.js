var mongoose = require('mongoose');

var nhanvienSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	diemdanh: Array
});

var Nhanvien = mongoose.model('Nhanvien',nhanvienSchema,'nhanviens');

module.exports = Nhanvien;