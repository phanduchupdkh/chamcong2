let Users = require('../../models/usersmodel.js');
let Productserver = require('../../models/productservermodel.js');
let Productwait = require('../../models/productwaitmodel.js');
let md5 = require('md5');
let tolink = require('../../validate/xoadauchuyenlink.js');
let shortid = require('shortid');

module.exports.index = async function(req, res){
let productserver = await Productserver.find();
	
res.render('users/forpharmacy/kenhnhathuoc',{productserver: productserver});
};

module.exports.sanpham = function(req, res){
res.render('users/forpharmacy/addonesanpham',{errors:"",values: ""});
};
module.exports.addmypham = function(req, res){

res.render('users/forpharmacy/addmypham',{errors:"",values: ""});
};

module.exports.postaddmypham = async function(req,res){
	let userId= req.signedCookies.userId;

	let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});
//kiểm tra trường số công bố
	let lastscb=req.body.socongbo.slice(-3);
	let lastone=req.body.socongbo.slice(-1);
	if ((lastscb<"/14" || lastscb >"/23" )||(lastone< "0"|| lastone > "9")) {
		res.render('users/forpharmacy/addmypham',{
			errors: "Số công bố không đúng",
			values: req.body
		});
		return;
	};
	
	const url = tolink.chuyenthanhlink(req.body.tensanpham);
	
	let newProduct={
		url: url,
		tensanpham:req.body.tensanpham,
		socongbo: req.body.socongbo.concat(req.body.kieuscb), 
		loaisanpham: req.body.loaisanpham,
		giaban: req.body.giaban,
		linkhinh: req.body.linkhinh
	};
	if (!req.body.linkhinh) 
	{newProduct.linkhinh = "https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png" };
	
	let newdanhsachsp=user.danhsachsp;
	//kiểm tra xem đã có trong danh sách sp (có thì thay, không có thì push)
	let kiemtrasp = "";
	newdanhsachsp.forEach(function(sp){
		if (sp.socongbo === newProduct.socongbo){
			sp.url = newProduct.url;
			sp.tensanpham = newProduct.tensanpham;
			sp.loaisanpham = newProduct.loaisanpham;
			sp.giaban = newProduct.giaban;
			sp.linkhinh = newProduct.linkhinh;
			kiemtrasp = "comat";
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

	Users.update({"_id": userId},{"danhsachsp": newdanhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhnhathuoc');
};

module.exports.postSanpham = async function(req,res){
	let userId= req.signedCookies.userId;

	let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});
//kiểm tra trường số công bố
	let lastscb=req.body.socongbo.slice(-5);
	let lastone=req.body.socongbo.slice(-1);
	if ((lastscb<"/2014" || lastscb >"/2023" )||(lastone< "0"|| lastone > "9")) {
		res.render('users/forpharmacy/addonesanpham',{
			errors: "Số công bố không đúng",
			values: req.body
		});
		return;
	}
	if (req.body.kieuscb === "chonkieu"){
		res.render('users/forpharmacy/addonesanpham',{
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
		linkhinh: req.body.linkhinh
	};
	if (!req.body.linkhinh) 
	{newProduct.linkhinh = "https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png" };
	
	let newdanhsachsp=user.danhsachsp;
	//kiểm tra xem đã có trong danh sách sp (có thì thay, không có thì push)
	let kiemtrasp = "";
	newdanhsachsp.forEach(function(sp){
		if (sp.socongbo === newProduct.socongbo){
			sp.url = newProduct.url;
			sp.tensanpham = newProduct.tensanpham;
			sp.loaisanpham = newProduct.loaisanpham;
			sp.giaban = newProduct.giaban;
			sp.linkhinh = newProduct.linkhinh;
			kiemtrasp = "comat";
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

	Users.update({"_id": userId},{"danhsachsp": newdanhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhnhathuoc');
};



module.exports.addlistindex = async function(req, res){

res.render('users/forpharmacy/addlistindex');
};


module.exports.addlist = async function(req, res){
let idlist = req.params.id;
let userId= req.signedCookies.userId;
let productserver = await Productserver.find();

let danhsach = productserver.filter(function(item){
return	tolink.chuyenthanhlink(item.loaisanpham) === idlist;
})
res.render('users/forpharmacy/addlistsanpham',{
	idlist: idlist,
	productserver: danhsach
});
};

module.exports.postListSanpham = async function(req,res){
	let userId= req.signedCookies.userId;

	let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});

	let productserver = await Productserver.find();

	let arr=[];
	req.body.forEach(function(itemreq){

		ktdssp = user.danhsachsp.find(function(spham){return spham.socongbo===itemreq.socongbo});
		if (!ktdssp){
			newReqBody = productserver.find(function(item){

			return item.socongbo === itemreq.socongbo;
			});
			if (itemreq.giaban !== 0) {newReqBody.giaban= itemreq.giaban};
			arr.push(newReqBody);
		}
	});
		
	let newdanhsachsp = user.danhsachsp;

	newdanhsachsp = newdanhsachsp.concat(arr);
	Users.update({"_id": userId},{"danhsachsp": newdanhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});	
};



module.exports.xoasp = async function(req, res){
let userId= req.signedCookies.userId;
let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});
user.danhsachsp = user.danhsachsp.filter(function(item){
	m=item.socongbo.toLowerCase().split('/').join('').split('đ').join('d');
	return m !== req.params.id;
})
Users.update({"_id": userId},{"danhsachsp": user.danhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});
res.redirect('/kenhnhathuoc');
};


module.exports.suasp = async function(req, res){
	let userId= req.signedCookies.userId;
let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});
let aaa = user.danhsachsp.find(function(item){
	m=item.socongbo.toLowerCase().split('/').join('').split('đ').join('d');
	return m === req.params.id;
})
res.render('users/forpharmacy/suasanpham',{errors:"", values: aaa});
};

module.exports.postsuasp = async function(req,res){
	let userId= req.signedCookies.userId;
	let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});

	let newdanhsachsp=user.danhsachsp;
	//kiểm tra xem đã có trong danh sách sp (có thì thay, không có thì push)
	newdanhsachsp.forEach(function(sp){
		if (sp.socongbo === req.body.socongbo){
			sp.tensanpham = req.body.tensanpham;
			sp.loaisanpham = req.body.loaisanpham;
			sp.giaban = req.body.giaban;
			sp.linkhinh = req.body.linkhinh;
		};
	});
	Users.update({"_id": userId},{"danhsachsp": newdanhsachsp})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhnhathuoc');
};

module.exports.thongtin = async function(req,res){
	let userId= req.signedCookies.userId;
	let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});

	res.render('users/forpharmacy/thongtin');
};

module.exports.donhang = async function(req,res){
	let userId = req.signedCookies.userId;
	let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});

	res.render('users/forpharmacy/donhang');
};

module.exports.xoadon = async function(req, res){
let userId= req.signedCookies.userId;
let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});
user.donhang = user.donhang.filter(function(item){
	return item.id !== req.params.id;
})
Users.update({"_id": userId},{"donhang": user.donhang})
	.exec((err,result)=>{
		console.log(result);
	});
res.redirect('/kenhnhathuoc/donhang');
};

module.exports.doimatkhau = async function(req, res){
res.render('users/forpharmacy/doimatkhau',{errors:""});
};

module.exports.postdoimatkhau = async function(req,res){
	let userId = req.signedCookies.userId;
	let oldpassword = req.body.oldpassword;
	let password = req.body.password;
	let repassword = req.body.repassword;
	let users = await Users.find();
 
	let user =  users.find(function(user) {
	return userId == user.id;
	});
    //kiểm tra xem mật khẩu có trùng với mật khẩu cũ
	if (md5(oldpassword)!==user.password){
		res.render('users/forpharmacy/doimatkhau',{
			errors: 'Mật khẩu không đúng'
		});
		return;
	};

		//kiểm tra xem mật khẩu có đủ dài
	if (password.length <6){
		res.render('users/forpharmacy/doimatkhau',{
			errors: "Mật khẩu phải có ít nhất 6 ký tự",
		});
		return;
	}
	//Kiểm tra xem nhắc lại mật khẩu đã đúng chưa
	if (password !== repassword){
		res.render('users/forpharmacy/doimatkhau',{
			errors: "Mật khẩu không khớp"
		});
		return;
	}
	
	let hashedPassword = md5(password);

	Users.update({"_id": userId},{"password": hashedPassword})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/auth/login');
};


module.exports.suathongtin = async function(req, res){
	let userId = req.signedCookies.userId;
	let users = await Users.find();
	user =  users.find(function(user){
	return user.id == userId;
	});
	values = {
		name: user.name,
		phone: user.phone,
		address: user.address,
		xaphuong: user.xaphuong,
		quanhuyen: user.quanhuyen,
		tinhthanh: user.tinhthanh

	}
res.render('users/forpharmacy/suathongtin',{errors:"", values: values});
};

module.exports.postsuathongtin = async function(req,res){
	let userId = req.signedCookies.userId;
	if (req.body.name.length <3){
		res.render('users/forpharmacy/suathongtin',{
			errors: "Họ Và Tên phải có ít nhất 3 ký tự",
			values: req.body
		});
		return;
	}
	//Kiểm tra xem số điện thoại có đúng
	if (req.body.phone.length <8 || req.body.phone.length >11 ){
		res.render('users/forpharmacy/suathongtin',{
			errors: "Số điện thoại từ 8-11 số",
			values: req.body
		});
		return;
	}
	

	Users.update({"_id": userId},{
			"name": req.body.name ,
			"phone": req.body.phone, 
			"address": req.body.address
		})
	.exec((err,result)=>{
		console.log(result);
	});

	res.redirect('/kenhnhathuoc/thongtin');
};

