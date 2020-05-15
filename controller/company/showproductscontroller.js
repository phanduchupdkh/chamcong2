let Companys = require('../../models/companysmodel.js');
let Productserver = require('../../models/productservermodel.js');
let Productwait = require('../../models/productwaitmodel.js');
let md5 = require('md5');
let Diachi = require('../../ntcmodules/tradiachimodule.js');
let tolink = require('../../validate/xoadauchuyenlink.js');


module.exports.showproductscongty = async function(req, res){
let compId=req.params.id;
let companys = await Companys.find();
	congty =  companys.find(function(comp){
	return comp.idcomp == compId;
	});
let productserver = await Productserver.find();
res.render('users/clitocom/showproducts',{
	congty: congty,
	productserver: productserver
});
};

module.exports.showproductcongty = async function(req, res){
let sanphamId = req.params.sp;
let compId=req.params.id;
let companys = await Companys.find();
let congty =  companys.find(function(user){
	return user.idcomp == compId;
	});
let sanpham = congty.danhsachsp.find(function(item){
	return item.url == sanphamId;
});
let productserver = await Productserver.find();

let kt = productserver.find(function(item2){
return item2.socongbo === sanpham.socongbo;
        });
let cotrensv;
let urlsv;
let linkhinh="https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png";
 if (kt) {linkhinh=kt.linkhinh; cotrensv = "true"; urlsv = kt.url}        
 if (sanpham.linkhinh !== "https://file.hstatic.net/1000287322/file/updating_4b3e39ad13974b06bd99d80bb44a2218.png")
     {linkhinh = sanpham.linkhinh};

res.render('users/clitocom/showproduct',{
	congty:congty,
	linkhinh: linkhinh,
	cotrensv: cotrensv,
	 urlsv: urlsv,
	sanpham: sanpham,
	productserver: productserver
});
};
