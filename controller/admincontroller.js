let Users = require('../models/usersmodel.js');
let Donhang = require('../models/donhangmodel.js');
let Productserver = require('../models/productservermodel.js');
let Productwait = require('../models/productwaitmodel.js');
const axios = require('axios');

module.exports.index = async function(req, res){

res.render('admin/index');
};

module.exports.themproductserver = function(req, res){
res.render('admin/themproductserver');
};

module.exports.postthemproductserver = async function(req,res){

	axios.get(req.body.linkproduct)
    .then(function (res) {
    // handle success
      let products = res.data;
      products.forEach(function(product){
      Productserver.create({
        url: product.url ,
        loaisanpham: product.loaisanpham, 
        tensanpham: product.tensanpham,
        socongbo: product.socongbo,
        giaban: product.giaban,
        linkhinh: product.linkhinh
      });
    })
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

	res.redirect('/adminn');
};


module.exports.themproductnt = async function(req, res){
  let users = await Users.find();
res.render('admin/themproductnt',{
  users: users
});
};

module.exports.donhang = async function(req, res){
let donhangs = await Donhang.find();

res.render('admin/donhang',{
  donhangs: donhangs
});
};

module.exports.themproductntcuthe = async function(req, res){
  let users = await Users.find();

res.render('admin/themproductntcuthe',{
  users: users
});
};

module.exports.postthemproductntcuthe = async function(req,res){
let userId=req.params.id;
let  productserver = await Productserver.find();
  axios.get(req.body.linkproduct)
    .then(function (res) {
      let produ = res.data;
      
      produ = produ.map(function(itemp){
        
        btg =  productserver.find(function(item2){
          return item2.socongbo === itemp.socongbo;
        });
        if (btg==undefined){return btg}
        btg.giaban = itemp.giaban;
        return btg;
      });

      produ = produ.filter(function(item){
        return item !== undefined;
      })

      Users.update({"_id": userId},{"danhsachsp": produ})
      .exec((err,result)=>{
        console.log(result);
        });
      })
    .catch(function (error) {
    // handle error
    console.log(error);
  })

  res.redirect('/adminn');
};

module.exports.xoant = function(req,res){
let userId=req.params.id;

Users.remove({"_id": userId})
      .exec((err,result)=>{
        console.log(result);
        });
      
  
  res.redirect('/adminn/themproductnt');
};

module.exports.productwait = async function(req,res){
productwait = await Productwait.find();

  res.render('admin/productwait');
};

module.exports.postproductwait = async function(req,res){

productserver = await Productserver.find();
let url = req.body.url
kt = productserver.find(function(item){
  return req.body.url=== item.url;
});
let today = new Date();
let hauto = today.getTime().toString(16);
if (kt!=undefined) {url=req.body.url.concat("-",hauto)}

Productwait.remove({socongbo: req.body.socongbo})
.exec((err,result)=>{
        console.log(result);
        });

Productserver.create({
        url: url ,
        loaisanpham: req.body.loaisanpham, 
        tensanpham: req.body.tensanpham,
        socongbo: req.body.socongbo,
        giaban: req.body.giaban,
        linkhinh: req.body.linkhinh
      });

  res.redirect('/adminn/productwait');
};


