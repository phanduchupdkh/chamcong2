let Companys = require('../models/companysmodel.js');

module.exports.congty= async function(req, res){
let nt = req.params.id;
nt = nt.slice(0,-4);
let users = await Companys.find();
let nhathuoc =  users.find(function(user){
	return user.idcomp === nt;
	});

res.render('admin/sitemapnt',{
	nt : nt,
	danhsach: nhathuoc.danhsachsp
});
};