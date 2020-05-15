let Users = require('../models/usersmodel.js');
let Productserver = require('../models/productservermodel.js');



module.exports.index= async function(req, res){
productserver =  await Productserver.find();

res.render('admin/sitemap',{
	productserver: productserver
});
};

module.exports.nhathuoc= async function(req, res){
let nt = req.params.id;
nt = nt.slice(0,-4);
let users = await Users.find();
let nhathuoc =  users.find(function(user){
	return user.idnt === nt;
	});

res.render('admin/sitemapnt',{
	nt : nt,
	danhsach: nhathuoc.danhsachsp
});
};