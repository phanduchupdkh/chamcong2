var md5 = require('md5');
var Companys = require('../../models/companysmodel.js');
let Diachi = require('../../ntcmodules/tradiachimodule.js');
let tolink = require('../../validate/xoadauchuyenlink.js');
let shortid = require('shortid');

module.exports.dangky= function(req, res){
	res.render('auth/dangkycompany',{
	values:"",
	errors:""
	});
};
module.exports.postDangky = async function(req,res){
	
	//Kiểm tra xem số điện thoại có đúng
	console.log(req.data);
	if (req.body.phone.length <8 || req.body.phone.length >11 ){
		res.render('auth/dangkycompany',{
			errors: "Số điện thoại từ 8-11 số",
			values: req.body
		});
		return;
	}
		//kiểm tra xem mật khẩu có đủ dài
	if (req.body.password.length <6){
		res.render('auth/dangkycompany',{
			errors: "Mật khẩu phải có ít nhất 6 ký tự",
			values: req.body
		});
		return;
	}
	//Kiểm tra xem nhắc lại mật khẩu đã đúng chưa
	if (req.body.password !== req.body.nhaclaipass){
		res.render('auth/dangkycompany',{
			errors: "Mật khẩu không khớp",
			values: req.body
		});
		return;
	}
	
	//kiểm tra xem email đã tồn tại hay chưa
	var companys = await Companys.find();
	var company =  companys.find(function(company) {
	return req.body.email == company.email ;
	});
	if (company){
		res.render('auth/dangkycompany',{errors: "Email Đã tồn tại",values: req.body});
		return;
	};
//Kiểm tra xem idnt đã tồn tại chưa nếu rồi cộng id
function createidnt(id,bieni){
	if (bieni===0) {
		let  timid =  companys.find(function(company) {
		return id === company.idnt;
		});
		if (!timid){lincan = id} else {createidnt(id,1)}
	} else {
	
		let  timid =  companys.find(function(company) {
		return id.concat("-",bieni.toString()) === company.idnt;
		});
		if (timid === undefined){lincan = id.concat("-",bieni.toString()) } 
		else {createidnt(id,bieni+1)}
		}
	return lincan;		
};

let idcomp = tolink.chuyenthanhlink(req.body.tencongty);
idcomp = createidnt(idcomp,0);


let password = md5(req.body.password);
req.body.tencongty = req.body.tencongty.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
		Companys.create({
			tencongty: req.body.tencongty,
			idcomp: idcomp,
			phone: req.body.phone, 
			password: password,
			email: req.body.email,
			addresscty: req.body.addresscty,
			address: req.body.address,
			danhsachsp:[]
		});
	res.render('auth/logincompany',{errors:"dktc",values: req.body});
};
