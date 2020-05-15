let Users = require('../models/usersmodel.js');
let Productserver = require('../models/productservermodel.js');
let Diachi = require('../ntcmodules/tradiachimodule.js');
let tolink = require('../validate/xoadauchuyenlink.js');


module.exports.index= async function(req, res){
let q = tolink.chuyenthanhlink(req.query.q);

let productserver = await Productserver.find();

let sanpham = productserver.filter(function(item){
let tg = tolink.chuyenthanhlink(item.tensanpham)
return tg.indexOf(q)!== -1;
})

res.render('users/forclient/search',{
	sanpham: sanpham
});
};

module.exports.timtrongnt= async function(req, res){
let q = tolink.chuyenthanhlink(req.query.q);
let userId = req.params.id;
let users = await Users.find();
let user = users.find(function(itemi){
return itemi.idnt === userId;
})

let sanpham = user.danhsachsp.filter(function(item){
let tg = tolink.chuyenthanhlink(item.tensanpham)
return tg.indexOf(q)!== -1;
})

res.render('users/forclient/searchnt',{
	nhathuoc: user,
	sanpham: sanpham
});
};