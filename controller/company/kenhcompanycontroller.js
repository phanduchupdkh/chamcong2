let Companys = require('../../models/companysmodel.js');
let Productserver = require('../../models/productservermodel.js');
let Productwait = require('../../models/productwaitmodel.js');
let md5 = require('md5');
let tolink = require('../../validate/xoadauchuyenlink.js');
let shortid = require('shortid');

module.exports.index = async function(req, res){
let productserver = await Productserver.find();
let companyId= req.signedCookies.companyId;
let companys = await Companys.find();
	company =  companys.find(function(company){
	return company.id == companyId;
	});
	
res.render('users/forcompany/kenhcompany',{company: company,productserver: productserver});
};

module.exports.sanpham = function(req, res){
res.render('users/forcompany/addtpcn',{errors:"",values: ""});
};

module.exports.postSanpham = async function(req,res){
	let companyId= req.signedCookies.companyId;

	let companys = await Companys.find();
	company =  companys.find(function(company){
	return company.id == companyId;
	});
//kiểm tra trường số công bố
	let lastscb=req.body.socongbo.slice(-5);
	let lastone=req.body.socongbo.slice(-1);
	if ((lastscb<"/2014" || lastscb >"/2023" )||(lastone< "0"|| lastone > "9")) {
		res.render('users/forcompany/addtpcn',{
			errors: "Số công bố không đúng",
			values: req.body
		});
		return;
	}
	if (req.body.kieuscb === "chonkieu"){
		res.render('users/forcompany/addtpcn',{
			errors: "Vui lòng chọn kiểu số công bố",
			values: req.body
		});
		return;
	}
	const url = tolink.chuyenthanhlink(req.body.tensanpham);
	
	thanhphan = req.body.thanhphan.replace(/\r\n/g, '<br>');
	congdung = req.body.congdung.replace(/\r\n/g, '<br>');
	doituongsudung = req.body.doituongsudung.replace(/\r\n/g, '<br>');
	cachsudung = req.body.cachsudung.replace(/\r\n/g, '<br>');
	let newProduct={
		url: url,
		tensanpham:req.body.tensanpham,
		socongbo: req.body.socongbo.concat(req.body.kieuscb), 
		loaisanpham: req.body.loaisanpham,
		giaban: req.body.giaban,
		linkhinh: req.body.linkhinh,
		thanhphan: thanhphan,
		congdung: congdung,
		doituongsudung: doituongsudung,
		cachsudung: cachsudung,
		quycach: req.body.quycach,
		giagoc: req.body.giagoc, 
		slmuc1: req.body.slmuc1,
		slmuc2: req.body.slmuc2,
		slmuc3: req.body.slmuc3,
		slmuc4: req.body.slmuc4,
		giamuc1: req.body.giamuc1,
		giamuc2: req.body.giamuc2,
		giamuc3: req.body.giamuc3,
		giamuc4: req.body.giamuc4
		
	};
	if (!req.body.linkhinh) 
	{newProduct.linkhinh = "https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png" };
	
	let newdanhsachsp=company.danhsachsp;
	//kiểm tra xem đã có trong danh sách sp (có thì thay, không có thì push)
	let kiemtrasp = "";
	newdanhsachsp.forEach(function(sp){
		if (sp.socongbo === newProduct.socongbo){
			sp.url = newProduct.url;
			sp.tensanpham = newProduct.tensanpham;
			sp.loaisanpham = newProduct.loaisanpham;
			sp.giaban = newProduct.giaban;
			sp.linkhinh = newProduct.linkhinh;
			sp.thanhphan = newProduct.thanhphan;
			sp.congdung = newProduct.congdung;
			sp.doituongsudung = newProduct.doituongsudung;
			sp.cachsudung = newProduct.cachsudung;
			sp.quycach = newProduct.quycach;
			sp.giagoc = newProduct.giagoc; 
			sp.slmuc1 = newProduct.slmuc1;
			sp.slmuc2 = newProduct.slmuc2;
			sp.slmuc3 = newProduct.slmuc3;
			sp.slmuc4 = newProduct.slmuc4;
			sp.giamuc1 = newProduct.giamuc1;
			sp.giamuc2 = newProduct.giamuc2;
			sp.giamuc3 = newProduct.giamuc3;
			sp.giamuc4 = newProduct.giamuc4;
			sp.kiemtrasp = "comat";
		};
	});
	if (kiemtrasp==""){	
		newdanhsachsp.push(newProduct);
	}
	//kiểm tra xem đã có trong dataproductserver (chưa có thêm vào)
	let productserver = await Productserver.find();
	let kt = productserver.find(function(item){
		return item.socongbo === newProduct.socongbo;
	});
	if (!kt){
		Productwait.create({
        url: url,
        loaisanpham: newProduct.loaisanpham, 
        tensanpham: newProduct.tensanpham,
        socongbo: newProduct.socongbo,
        giaban: newProduct.giaban,
        linkhinh: newProduct.linkhinh
      	});
	}

	Companys.update({"_id": companyId},{"danhsachsp": newdanhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhcompany');
};

module.exports.addmypham = function(req, res){

res.render('users/forcompany/addmypham',{errors:"",values: ""});
};

module.exports.postaddmypham = async function(req,res){
	let companyId= req.signedCookies.companyId;

	let companys = await Companys.find();
	company =  companys.find(function(company){
	return company.id == companyId;
	});
//kiểm tra trường số công bố
	let lastscb=req.body.socongbo.slice(-5);
	let lastone=req.body.socongbo.slice(-1);
	if ((lastscb<"/14" || lastscb >"/23" )||(lastone< "0"|| lastone > "9")) {
		res.render('users/forcompany/addmypham',{
			errors: "Số công bố không đúng",
			values: req.body
		});
		return;
	}
	if (req.body.kieuscb === "chonkieu"){
		res.render('users/forcompany/addtpcn',{
			errors: "Vui lòng chọn kiểu số công bố",
			values: req.body
		});
		return;
	}
	const url = tolink.chuyenthanhlink(req.body.tensanpham);
	
	let newProduct={
		url: url,
		tensanpham:req.body.tensanpham,
		socongbo: req.body.socongbo.concat(req.body.kieuscb), 
		loaisanpham: req.body.loaisanpham,
		giaban: req.body.giaban,
		linkhinh: req.body.linkhinh,
		thanhphan: req.body.thanhphan,
		congdung: req.body.congdung,
		doituongsudung: req.body.doituongsudung,
		cachsudung: req.body.cachsudung,
		quycach: req.body.quycach,
		giagoc: req.body.giagoc, 
		slmuc1: req.body.slmuc1,
		slmuc2: req.body.slmuc2,
		slmuc3: req.body.slmuc3,
		slmuc4: req.body.slmuc4,
		giamuc1: req.body.giamuc1,
		giamuc2: req.body.giamuc2,
		giamuc3: req.body.giamuc3,
		giamuc4: req.body.giamuc4
		
	};
	if (!req.body.linkhinh) 
	{newProduct.linkhinh = "https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png" };
	
	let newdanhsachsp=company.danhsachsp;
	//kiểm tra xem đã có trong danh sách sp (có thì thay, không có thì push)
	let kiemtrasp = "";
	newdanhsachsp.forEach(function(sp){
		if (sp.socongbo === newProduct.socongbo){
			sp.url = newProduct.url;
			sp.tensanpham = newProduct.tensanpham;
			sp.loaisanpham = newProduct.loaisanpham;
			sp.giaban = newProduct.giaban;
			sp.linkhinh = newProduct.linkhinh;
			sp.thanhphan = newProduct.thanhphan;
			sp.congdung = newProduct.congdung;
			sp.doituongsudung = newProduct.doituongsudung;
			sp.cachsudung = newProduct.cachsudung;
			sp.quycach = newProduct.quycach;
			sp.giagoc = newProduct.giagoc; 
			sp.slmuc1 = newProduct.slmuc1;
			sp.slmuc2 = newProduct.slmuc2;
			sp.slmuc3 = newProduct.slmuc3;
			sp.slmuc4 = newProduct.slmuc4;
			sp.giamuc1 = newProduct.giamuc1;
			sp.giamuc2 = newProduct.giamuc2;
			sp.giamuc3 = newProduct.giamuc3;
			sp.giamuc4 = newProduct.giamuc4;
			sp.kiemtrasp = "comat";
		};
	});
	if (kiemtrasp==""){	
		newdanhsachsp.push(newProduct);
	}
	//kiểm tra xem đã có trong dataproductserver (chưa có thêm vào)
	let productserver = await Productserver.find();
	let kt = productserver.find(function(item){
		return item.socongbo === newProduct.socongbo;
	});
	if (!kt){
		Productwait.create({
        url: url,
        loaisanpham: newProduct.loaisanpham, 
        tensanpham: newProduct.tensanpham,
        socongbo: newProduct.socongbo,
        giaban: newProduct.giaban,
        linkhinh: newProduct.linkhinh
      	});
	}

	Companys.update({"_id": companyId},{"danhsachsp": newdanhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhcompany');
};

module.exports.xoasp = async function(req, res){
let companyId= req.signedCookies.companyId;
let companys = await Companys.find();
	company =  companys.find(function(comp){
	return comp.id == companyId;
	});
company.danhsachsp = company.danhsachsp.filter(function(item){
	m=item.socongbo.toLowerCase().split('/').join('').split('đ').join('d');
	return m !== req.params.id;
})
Companys.update({"_id": companyId},{"danhsachsp": company.danhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});
res.redirect('/kenhcompany');
};

module.exports.thongtin = async function(req,res){
	let companyId= req.signedCookies.companyId;
	let companys = await Companys.find();
	company =  companys.find(function(comp){
	return comp.id == companyId;
	});

	res.render('users/forcompany/thongtin',{company:company});
};

module.exports.suathongtin = async function(req, res){
	let companyId= req.signedCookies.companyId;
	let companys = await Companys.find();
	company =  companys.find(function(comp){
	return comp.id == companyId;
	});
	values = {
		tencongty: company.tencongty,
		phone: company.phone,
		addresscty: company.addresscty,
		address: company.address,
	}
res.render('users/forcompany/suathongtin',{errors:"", values: values});
};

module.exports.postsuathongtin = async function(req,res){
	let companyId = req.signedCookies.companyId;
	if (req.body.tencongty.length <3){
		res.render('users/forcompany/suathongtin',{
			errors: "phải có ít nhất 3 ký tự",
			values: req.body
		});
		return;
	}
	//Kiểm tra xem số điện thoại có đúng
	if (req.body.phone.length <8 || req.body.phone.length >11 ){
		res.render('users/forcompany/suathongtin',{
			errors: "Số điện thoại từ 8-11 số",
			values: req.body
		});
		return;
	}
	

	Companys.update({"_id": companyId},{
			"tencongty": req.body.tencongty ,
			"phone": req.body.phone, 
			"address": req.body.address,
			"addresscty": req.body.addresscty
		})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhcompany/thongtin');
};

module.exports.doimatkhau = async function(req, res){
res.render('users/forcompany/doimatkhau',{errors:""});
};

module.exports.postdoimatkhau = async function(req,res){
	let companyId = req.signedCookies.companyId;
	let oldpassword = req.body.oldpassword;
	let password = req.body.password;
	let repassword = req.body.repassword;
	let companys = await Companys.find();
 
	let company =  companys.find(function(comp) {
	return companyId == comp.id;
	});
    //kiểm tra xem mật khẩu có trùng với mật khẩu cũ
	if (md5(oldpassword)!==company.password){
		res.render('users/forcompany/doimatkhau',{
			errors: 'Mật khẩu không đúng'
		});
		return;
	};

		//kiểm tra xem mật khẩu có đủ dài
	if (password.length <6){
		res.render('users/forcompany/doimatkhau',{
			errors: "Mật khẩu phải có ít nhất 6 ký tự",
		});
		return;
	}
	//Kiểm tra xem nhắc lại mật khẩu đã đúng chưa
	if (password !== repassword){
		res.render('users/forcompany/doimatkhau',{
			errors: "Mật khẩu không khớp"
		});
		return;
	}
	
	let hashedPassword = md5(password);

	Companys.update({"_id": companyId},{"password": hashedPassword})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/auth/logincompany');
};

module.exports.donhang = async function(req,res){
	let companyId = req.signedCookies.companyId;
	let companys = await Companys.find();
	company =  companys.find(function(comp){
	return comp.id == companyId;
	});
	res.render('users/forcompany/donhang',{company:company});
};
module.exports.xoadon = async function(req, res){
let companyId = req.signedCookies.companyId;
let companys = await Companys.find();
	company =  companys.find(function(comp){
	return comp.id == companyId;
	});
company.donhang = company.donhang.filter(function(item){
	return item.id !== req.params.id;
})
Companys.update({"_id": companyId},{"donhang": company.donhang})
	.exec((err,result)=>{
		console.log(result);
	});
res.redirect('/kenhcompany/donhang');
};


module.exports.suasp = async function(req, res){
let companyId = req.signedCookies.companyId;
let companys = await Companys.find();
	company =  companys.find(function(comp){
	return comp.id == companyId;
	});
let aaa = company.danhsachsp.find(function(item){
	m=item.socongbo.toLowerCase().split('/').join('').split('đ').join('d');
	return m === req.params.id;
})
res.render('users/forcompany/suasanpham',{errors:"", values: aaa});
};

module.exports.postsuasp = async function(req,res){
let companyId = req.signedCookies.companyId;
let companys = await Companys.find();
	company =  companys.find(function(comp){
	return comp.id == companyId;
	});

	let newdanhsachsp=company.danhsachsp;
	//kiểm tra xem đã có trong danh sách sp (có thì thay, không có thì push)
	newdanhsachsp.forEach(function(sp){
		if (sp.socongbo === req.body.socongbo){
			sp.giaban = req.body.giaban;
		};
	});
	Companys.update({"_id": companyId},{"danhsachsp": newdanhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhcompany');
};