let md5 = require('md5');
let Users = require('../models/usersmodel.js');
let Companys = require('../models/companysmodel.js');


module.exports.login= function(req, res){
res.render('auth/login',{errors:"",values:""});

};
module.exports.postLogin = async function(req, res){
	let email = req.body.email;
	let password = req.body.password;
	let users = await Users.find();
 
	let user =  users.find(function(user) {
	return email == user.email ;
	});
	if (!user){
		res.render('auth/login',{
			errors:['Email khong ton tai'],values: req.body
		});
		return;
	};
	
	let hashedPassword = md5(password);

	if (user.password !== hashedPassword){
		res.render('auth/login',{
			errors: ['Sai mat khau.'],values: req.body
		});
		return;
	}
res.cookie('userId', user.id,{signed: true});

res.redirect('/kenhnhathuoc');
};



module.exports.logincompany= function(req, res){
res.render('auth/logincompany',{errors:"",values:""});

};
module.exports.postLogincompany = async function(req, res){
	let email = req.body.email;
	let password = req.body.password;
	let companys = await Companys.find();
 
	let company =  companys.find(function(comp) {
	return email == comp.email ;
	});
	if (!company){
		res.render('auth/logincompany',{
			errors:['Email khong ton tai'],values: req.body
		});
		return;
	};
	
	let hashedPassword = md5(password);

	if (company.password !== hashedPassword){
		res.render('auth/logincompany',{
			errors: ['Sai mat khau.'],values: req.body
		});
		return;
	}
res.cookie('companyId', company.id,{signed: true});

res.redirect('/kenhcompany');
};