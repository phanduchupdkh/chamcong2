let Users = require('../../models/usersmodel.js');
let Productserver = require('../../models/productservermodel.js');
let Productwait = require('../../models/productwaitmodel.js');
let md5 = require('md5');
let Diachi = require('../../ntcmodules/tradiachimodule.js');
let tolink = require('../../validate/xoadauchuyenlink.js');


module.exports.showproductsnhathuoc = async function(req, res){
let userId=req.params.id;
let users = await Users.find();
	nhathuoc =  users.find(function(user){
	return user.idnt == userId;
	});
let productserver = await Productserver.find();
let  xaphuong = Diachi.MaXaToXa(nhathuoc.maxaphuong);
let  quanhuyen = Diachi.MaHuyenToHuyen(nhathuoc.maquanhuyen);
let  tinhthanh = Diachi.MaTinhToTinh(nhathuoc.matinhthanh);
res.render('users/forclient/showproducts',{
	nhathuoc: nhathuoc,
	xaphuong: xaphuong,
	quanhuyen: quanhuyen,
	tinhthanh: tinhthanh,
	productserver: productserver
});
};

module.exports.showproductnhathuoc = async function(req, res){
let userId=req.params.id;
let sanphamId = req.params.sp;
let users = await Users.find();
let nhathuoc =  users.find(function(user){
	return user.idnt == userId;
	});
let sanpham = nhathuoc.danhsachsp.find(function(item){
	return item.url == sanphamId;
});
let productserver = await Productserver.find();

let kt = productserver.find(function(item2){
return item2.socongbo === sanpham.socongbo;
        });
let linkhinh="https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png";
let cotrensv;
let urlsv;
 if (kt) {linkhinh=kt.linkhinh; cotrensv = "true"; urlsv = kt.url }        
 if (sanpham.linkhinh !== "https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png")
     {linkhinh = sanpham.linkhinh};
            		
let  xaphuong = Diachi.MaXaToXa(nhathuoc.maxaphuong);
let  quanhuyen = Diachi.MaHuyenToHuyen(nhathuoc.maquanhuyen);
let  tinhthanh = Diachi.MaTinhToTinh(nhathuoc.matinhthanh);
res.render('users/forclient/showproduct',{
	nhathuoc:nhathuoc,
	linkhinh: linkhinh,
	urlsv: urlsv,
	sanpham: sanpham,
	cotrensv: cotrensv,
	xaphuong: xaphuong,
	quanhuyen: quanhuyen,
	tinhthanh: tinhthanh,
	productserver: productserver
});
};
