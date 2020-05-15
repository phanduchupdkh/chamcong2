var mongoose = require('mongoose');

var companysSchema = new mongoose.Schema({
	tencongty: String,
	email: String,
	password: String,
	phone: String,
	danhsachsp: Array,
	donhang: Array,
	address: String,
	addresscty: String,
	idcomp: String
});

var Company = mongoose.model('Company',companysSchema,'companys');

module.exports = Company;