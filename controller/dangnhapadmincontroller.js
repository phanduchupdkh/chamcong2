const Nhanviens = require('../models/nhanvienmodel')

module.exports.login = function (req, res) {
	res.render('auth/loginadmin');
};
module.exports.postLogin = async function (req, res) {
	let username2 = req.body.username;
	let password = req.body.password;
	let nhanviens = await Nhanviens.find();
	let nhanvien = nhanviens.find(item2=>username2 === item2.username)
	if (!nhanvien) {
		res.render('auth/loginadmin', {
			errors: ['Tên đăng nhập sai'], values: req.body
		});
		return;
	};
	if (nhanvien.password !== password) {
		res.render('auth/loginadmin', {
			errors: ['Sai mat khau.'], values: req.body
		});
		return;
	}
	res.cookie('adminId', nhanvien.id, { signed: true });
	res.redirect('/');
};
