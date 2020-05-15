let Users = require('../models/usersmodel.js');
let Productserver = require('../models/productservermodel.js');
let Productwait = require('../models/productwaitmodel.js');

module.exports.gioithieu =  function(req, res){

res.render('users/about/gioithieu');
};

module.exports.chinhsachbaomat =  function(req, res){

res.render('users/about/chinhsachbaomat');
};

module.exports.dieukhoansudung = function(req, res){

res.render('users/about/dieukhoansudung');
};
module.exports.huongdanmuahang = function(req, res){

res.render('users/about/huongdanmuahang');
};
module.exports.chinhsachdoitra = function(req, res){

res.render('users/about/huongdanmuahang');
};
module.exports.cauhoithuonggap = function(req, res){

res.render('users/about/taisaonenchon');
};

