let Companys = require('../../models/companysmodel.js');
let Productserver = require('../../models/productservermodel.js');
let Diachi = require('../../ntcmodules/tradiachimodule.js');
let tolink = require('../../validate/xoadauchuyenlink.js');
let shortid = require('shortid');
let Donhang = require('../../models/donhangmodel.js');


module.exports.getcart = async function(req, res){

	res.redirect("/")
};



module.exports.cart = async function(req, res){
let users = await Companys.find();
let nhathuoc = users.find(function(item){
return item.idcomp === req.body.idcomp
});
let sanpham = nhathuoc.danhsachsp.find(function(item1){
return item1.url === req.body.urlsp
});

res.render('users/clitocom/cart',{
	nhathuoc: nhathuoc,
	soluong: req.body.tentacles,
	sanpham: sanpham
});
};


module.exports.cartaddto = async function(req,res){
	let userId= req.body.idnhathuoc;
	let users = await Companys.find();
	user =  users.find(function(user){
	return user.idcomp === userId;
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
		userId:userId.concat("-cty"),
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

	Companys.update({"idcomp": userId},{"donhang": user.donhang})
	.exec((err,result)=>{
		console.log(result);
	});

	res.render('users/forclient/dathangthanhcong');
};