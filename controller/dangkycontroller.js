var md5 = require('md5');
var Users = require('../models/usersmodel.js');
let Diachi = require('../ntcmodules/tradiachimodule.js');
let tolink = require('../validate/xoadauchuyenlink.js');
let shortid = require('shortid');

module.exports.dangky= function(req, res){
	res.render('auth/dangky',{
	values:"",
	errors:""
	});
};
module.exports.postDangky = async function(req,res){
	if (req.body.name.length <3){
		res.render('auth/dangky',{
			errors: "Tên đăng nhập phải có ít nhất 3 ký tự",
			values: req.body
		});
		return;
	}
	//Kiểm tra xem số điện thoại có đúng
	if (req.body.phone.length <8 || req.body.phone.length >11 ){
		res.render('auth/dangky',{
			errors: "Số điện thoại từ 8-11 số",
			values: req.body
		});
		return;
	}
		//kiểm tra xem mật khẩu có đủ dài
	if (req.body.password.length <6){
		res.render('auth/dangky',{
			errors: "Mật khẩu phải có ít nhất 6 ký tự",
			values: req.body
		});
		return;
	}
	//Kiểm tra xem nhắc lại mật khẩu đã đúng chưa
	if (req.body.password !== req.body.nhaclaipass){
		res.render('auth/dangky',{
			errors: "Mật khẩu không khớp",
			values: req.body
		});
		return;
	}
	//kiểm tra xem đã chọn xã phường chưa
	if (!req.body.customer_shipping_ward){
		res.render('auth/dangky',{
			errors: "Vui Lòng chọn địa chỉ nơi ở",
			values: req.body
		});
		return;
	}
	//kiểm tra xem email đã tồn tại hay chưa
	var users = await Users.find();
	var user =  users.find(function(user) {
	return req.body.email == user.email ;
	});
	if (user){
		res.render('auth/dangky',{errors: "Email Đã tồn tại",values: req.body});
		return;
	};
//Kiểm tra xem idnt đã tồn tại chưa nếu rồi cộng id
function createidnt(id,bieni){
	if (bieni===0) {
		let  timid =  users.find(function(user) {
		return id === user.idnt;
		});
		if (!timid){lincan = id} else {createidnt(id,1)}
	} else {
	
		let  timid =  users.find(function(user) {
		return id.concat("-",bieni.toString()) === user.idnt;
		});
		if (timid === undefined){lincan = id.concat("-",bieni.toString()) } 
		else {createidnt(id,bieni+1)}
		}
	return lincan;
};

let idnt = tolink.chuyenthanhlink(req.body.tennhathuoc);
idnt = createidnt(idnt,0);


let  xaphuong = Diachi.MaXaToXa(req.body.customer_shipping_ward);
let  quanhuyen = Diachi.MaHuyenToHuyen(req.body.customer_shipping_district);
let  tinhthanh = Diachi.MaTinhToTinh(req.body.customer_shipping_province);
	var password = md5(req.body.password);
req.body.name = req.body.name.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
		Users.create({
			tennhathuoc: req.body.tennhathuoc,
			idnt: idnt,
			name: req.body.name ,
			phone: req.body.phone, 
			password: password,
			email: req.body.email,
			address: req.body.address,
			maxaphuong: req.body.customer_shipping_ward,
			maquanhuyen: req.body.customer_shipping_district,
			matinhthanh: req.body.customer_shipping_province,
			tinhthanh: tinhthanh,
			quanhuyen: quanhuyen,
			xaphuong: xaphuong,
			danhsachsp:[]
		});
	res.render('auth/login',{errors:"dktc",values: req.body});
};


