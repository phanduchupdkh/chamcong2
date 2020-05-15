let Users = require('../models/usersmodel.js');
let Productserver = require('../models/productservermodel.js');
let Diachi = require('../ntcmodules/tradiachimodule.js');
let tolink = require('../validate/xoadauchuyenlink.js');
const Nhanviens = require('../models/nhanvienmodel')

module.exports.index = async function (req, res) {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : null);
	console.log(ip)
	res.render('users/forclient/index', {
	});
};

module.exports.postindex = async function (req, res) {

	let nhanviens = await Nhanviens.find();
	if (!req.signedCookies.adminId) {
		res.redirect('/adminauth/login');
		return;
	};

	const isTrueUser = nhanviens.find(item => item._id.toString() === req.signedCookies.adminId)

	if (!isTrueUser) {
		res.redirect('/adminauth/login');
		return;
	};
	const ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : null);
	let itNow = new Date()
	console.log(itNow)
	const timeCheckOut = itNow.getTime()
	const diemdanh = isTrueUser.diemdanh ? isTrueUser.diemdanh : []
	console.log()
	const dateCheck = itNow.getDate() > 9 ? `${itNow.getDate()}` : `0${itNow.getDate()}`
	const monthCheck = itNow.getMonth() + 1 > 9 ? `${itNow.getMonth() + 1}` : `0${itNow.getMonth() + 1}`
	const dateNeedSave = `${dateCheck}${monthCheck}${itNow.getFullYear()}`
	console.log(dateNeedSave)
	let objTimeCheck = {}
	objTimeCheck[dateNeedSave] = {
		checkIn: timeCheckOut,
		ip
	}
	diemdanh.push( objTimeCheck)

	Nhanviens.update({ "_id": isTrueUser._id }, { diemdanh })
		.exec((err, result) => {
			console.log(result);
		});

	res.json({ diemdanh });
};

module.exports.search = async function (req, res) {
	let q = tolink.chuyenthanhlink(req.query.q);

	let productserver = await Productserver.find();

	let sanpham = productserver.filter(function (item) {
		let tg = tolink.chuyenthanhlink(item.tensanpham)
		return tg.indexOf(q) !== -1;
	})

	res.render('users/forclient/search', {
		sanpham: sanpham
	});
};

module.exports.googlesearchconsole = function (req, res) {
	res.send('google-site-verification: google17f04c91bb3db137.html')
};

