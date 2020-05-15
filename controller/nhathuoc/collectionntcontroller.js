let Users = require('../../models/usersmodel.js');
let Productserver = require('../../models/productservermodel.js');
let Diachi = require('../../ntcmodules/tradiachimodule.js');
let tolink = require('../../validate/xoadauchuyenlink.js');

module.exports.collection = async function(req, res){
let nhathuocid = req.params.id;
let collection = req.params.cle;
let users = await Users.find();
let nhathuoc = users.find(function(item1){
	return nhathuocid === item1.idnt;
})
let danhsach = nhathuoc.danhsachsp.filter(function(item){
return	tolink.chuyenthanhlink(item.loaisanpham) === collection;
})

res.render('users/forclient/collectionnt',{
	danhsach : danhsach,
	nhathuoc: nhathuoc,
	nhathuocid : nhathuocid,
	collection: collection
});
};

module.exports.danhmuctpcn = async function(req, res){
let nhathuocid = req.params.id;
let users = await Users.find();
let nhathuoc = users.find(function(item1){
	return nhathuocid === item1.idnt;
})


res.render('users/forclient/danhmuctpcn',{
	nhathuoc: nhathuoc,
	nhathuocid : nhathuocid,
});
};

module.exports.danhmucmypham = async function(req, res){
let nhathuocid = req.params.id;
let users = await Users.find();
let nhathuoc = users.find(function(item1){
	return nhathuocid === item1.idnt;
})


res.render('users/forclient/danhmucmypham',{
	nhathuoc: nhathuoc,
	nhathuocid : nhathuocid,
});
};



