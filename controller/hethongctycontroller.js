let Companys = require('../models/companysmodel.js');

module.exports.hethongcty = async function(req, res){
let companys = await Companys.find();
	
res.render('users/clitocom/hethongcty',{
	companys: companys
});
};