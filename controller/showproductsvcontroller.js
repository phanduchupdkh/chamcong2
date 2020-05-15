let Users = require('../models/usersmodel.js');
let Productserver = require('../models/productservermodel.js');
let Productwait = require('../models/productwaitmodel.js');
let md5 = require('md5');
let Diachi = require('../ntcmodules/tradiachimodule.js');


module.exports.showproductsv = async function(req, res){
let sanphamId = req.params.sp;
let users = await Users.find();
let productserver = await Productserver.find();

let sanpham = productserver.find(function(item){
return item.url === sanphamId;
})

let dansachnt = users.filter(function(nt){
	let timnt = nt.danhsachsp.find(function(item){
		return item.socongbo === sanpham.socongbo;
	});
	return timnt !== undefined;
});

danhsachshow = dansachnt.map(function(item){
	let timsp = item.danhsachsp.find(function(item){
		return item.socongbo === sanpham.socongbo;
	});

	thongtin ={
		tennhathuoc: item.tennhathuoc,
		phone: item.phone,
		address: item.address,
		xaphuong: item.xaphuong,
		quanhuyen: item.quanhuyen,
		tinhthanh: item.tinhthanh,
		matinhthanh: item.matinhthanh,
		maquanhuyen: item.maquanhuyen,
		url: timsp.url,
		idnt: item.idnt,
		giaban: timsp.giaban
	}
	return thongtin;
})

res.render('users/forclient/showproductsv',{
	sanpham: sanpham,
	dansachnt: danhsachshow
});
};


