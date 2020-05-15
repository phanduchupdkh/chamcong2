let Users = require('../models/usersmodel.js');
let Productserver = require('../models/productservermodel.js');
let Productwait = require('../models/productwaitmodel.js');
let md5 = require('md5');
let Diachi = require('../ntcmodules/tradiachimodule.js');


module.exports.hethongnt = async function(req, res){
let users = await Users.find();
	
res.render('users/forclient/hethongnt',{
	users: users
});
};

