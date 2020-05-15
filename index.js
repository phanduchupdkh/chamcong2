require('dotenv').config();
var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var controller = require('./controller/trangchucontroller.js')
var kenhnhathuocRouter = require('./router/kenhnhathuocrouter.js');
var kenhcompanyRouter = require('./router/kenhcompanyrouter.js');

var productsRouter = require('./router/productsrouter.js');
var hethongntRouter = require('./router/hethongntrouter.js');
var hethongctyRouter = require('./router/hethongctyrouter.js');

var authRouter = require('./router/dangnhaprouter.js');
var adminAuthRouter = require('./router/adminauthrouter.js')
var adminRouter = require('./router/adminrouter.js');
var productsvRouter = require('./router/productsvrouter.js');
var collectionRouter = require('./router/collectionrouter.js');
var collectionntRouter = require('./router/collectionntrouter.js');
var aboutRouter = require('./router/aboutrouter.js');
var searchRouter = require('./router/searchrouter.js');
var cartRouter = require('./router/cartrouter.js');
var sitemapRouter = require('./router/sitemaprouter.js');
var sitemapctyRouter = require('./router/sitemapctyrouter.js');
var dangkycompanyRouter = require('./router/dangkycompanyrouter.js');
var apiRouter = require('./api/router/productrouter.js');
var congtyRouter = require('./router/congtyrouter.js');



var dangkyRouter = require('./router/dangkyrouter.js');

var authMiddleware = require('./middlewares/authmiddleware.js');

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/',authMiddleware.requireadminAuth,controller.index);
app.post('/',authMiddleware.requireadminAuth,controller.postindex);

app.get('/dangxuat', function(req, res){
res.clearCookie("adminId");
res.clearCookie("companyId");
res.clearCookie("userId").redirect("/");
});

app.use('/adminn',authMiddleware.requireadminAuth,adminRouter);
app.use('/adminauth',adminAuthRouter); 
app.use('/about',aboutRouter); 
app.use('/search',searchRouter);
app.use('/sitemap',sitemapRouter);
app.use('/sitemapcty',sitemapctyRouter);

app.use('/dangky',dangkyRouter);
app.use('/auth',authRouter);
app.use('/cart',cartRouter);

app.use('/dangkycongty',dangkycompanyRouter);
app.use('/kenhcompany',authMiddleware.requireAuthCompany,kenhcompanyRouter);

app.use('/collection',collectionRouter);
app.use('/collectionnt',collectionntRouter);
app.use('/productsv',productsvRouter);
app.use('/nhathuoc',productsRouter);
app.use('/congty',congtyRouter);

app.use('/hethongnt',hethongntRouter);
app.use('/hethongcty',hethongctyRouter);

app.use('/kenhnhathuoc',authMiddleware.requireAuth,kenhnhathuocRouter);
app.listen(process.env.PORT || 3000, function() {
	console.log('Server listening on port ');
});