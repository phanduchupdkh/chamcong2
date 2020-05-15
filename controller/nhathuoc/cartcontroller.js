let Users = require('../../models/usersmodel.js');
let Productserver = require('../../models/productservermodel.js');
let Diachi = require('../../ntcmodules/tradiachimodule.js');
let tolink = require('../../validate/xoadauchuyenlink.js');
let shortid = require('shortid');
let Donhang = require('../../models/donhangmodel.js');

let nodemailer = require('nodemailer');
const mailgun = require("mailgun-js");
// Hiện hay google mặc định đã tắt truy cập kém an toàn nên bạn thường gặp lỗi trong bước connect vì thế bạn phải bật chế độ truy vập kém an toàn ở đây =))
// https://myaccount.google.com/lesssecureapps?pli=1

function sendGmails(nguoinhan,text){
  
}
module.exports.getcart = async function(req, res){

	res.redirect("/")
};



module.exports.cart = async function(req, res){
let users = await Users.find();
let nhathuoc = users.find(function(item){
return item.idnt === req.body.idnhathuoc
});
let sanpham = nhathuoc.danhsachsp.find(function(item1){
return item1.url === req.body.urlsp
});

res.render('users/forclient/cart',{
	nhathuoc: nhathuoc,
	soluong: req.body.tentacles,
	sanpham: sanpham
});
};


module.exports.cartaddto = async function(req,res){
	let userId= req.body.idnhathuoc;
	let users = await Users.find();
	user =  users.find(function(user){
	return user.idnt === userId;
	});
	sanpham = user.danhsachsp.find(function(item1){
return item1.url === req.body.maurl
});
let  xaphuong = Diachi.MaXaToXa(req.body.customer_shipping_ward);
let  quanhuyen = Diachi.MaHuyenToHuyen(req.body.customer_shipping_district);
let  tinhthanh = Diachi.MaTinhToTinh(req.body.customer_shipping_province);
let address = req.body.address + "-"+xaphuong + "-"+quanhuyen +"-"+tinhthanh;
let iddon = shortid.generate();
let datetime = new Date();
let	donhangmoi={
		id: iddon,
		url: sanpham.url,
		tensanpham : sanpham.tensanpham,
		name: req.body.name,
		phone: req.body.phone,
		address: address,
		email: req.body.email,
		soluong: req.body.soluong,
		tongtien: sanpham.giaban*parseInt(req.body.soluong)+25000
		
	}
	Donhang.create({
		userId:userId,
		datetime: datetime,
		iddon: iddon,
		url: sanpham.url,
		tensanpham : sanpham.tensanpham,
		name: req.body.name,
		phone: req.body.phone,
		address: address,
		email: req.body.email,
		soluong: req.body.soluong,
		tongtien: sanpham.giaban*parseInt(req.body.soluong)+25000
	});
	
user.donhang.push(donhangmoi);

	Users.update({"idnt": userId},{"donhang": user.donhang})
	.exec((err,result)=>{
		console.log(result);
	});

//Gửi email thông báo đơn hàng
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({
	apiKey: process.env.MAILGUN_API_KEY, 
	domain: DOMAIN});
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'phanduchupdkh@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});

	res.render('users/forclient/dathangthanhcong');
};