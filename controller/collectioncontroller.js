let Users = require('../models/usersmodel.js');
let Productserver = require('../models/productservermodel.js');
let Diachi = require('../ntcmodules/tradiachimodule.js');
let tolink = require('../validate/xoadauchuyenlink.js');

module.exports.collection = async function(req, res){
let collection = req.params.cle;
let productserver = await Productserver.find();

let danhsach = productserver.filter(function(item){
return	tolink.chuyenthanhlink(item.loaisanpham) === collection;
})
res.render('users/forclient/collection',{
	danhsach : danhsach,
	collection: collection
});
};
