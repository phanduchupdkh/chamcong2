let Users = require('../models/usersmodel.js')
const Nhanvien = require('../models/nhanvienmodel')
let Companys = require('../models/companysmodel.js')

module.exports.requireAuth = async function (req, res, next) {
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	};

	let users = await Users.find();

	let user = users.find(function (user) {
		return user.id == req.signedCookies.userId;
	});


	if (!user) {
		res.redirect('/auth/login')
		return;
	}
	res.locals.user = user;
	next();
};

module.exports.requireadminAuth = async function (req, res, next) {
	let nhanviens = await Nhanvien.find();
	if (!req.signedCookies.adminId) {
		res.redirect('/adminauth/login');
		return;
	};
	const isTrueUser = nhanviens.find(item => item._id.toString() === req.signedCookies.adminId)
	if (!isTrueUser) {
		res.redirect('/adminauth/login');
		return;
	};
	res.locals.userBS = isTrueUser
	next();
};

module.exports.requireAuthCompany = async function (req, res, next) {
	if (!req.signedCookies.companyId) {
		res.redirect('/auth/logincompany');
		return; 
	};
	let companys = await Companys.find();
	let company = companys.find(function (comp) {
		return comp.id == req.signedCookies.companyId;
	});
	if (!company) {
		res.redirect('/auth/logincompany')
		return;
	}
	next();
};