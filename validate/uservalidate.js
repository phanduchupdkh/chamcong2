module.exports.postcreate = function(req, res, next){
	var errors=[];
	if (!req.body.name){
		errors.push('Chua Dien Ten dang nhap');
	};
	if (!req.body.phone){
		errors.push('Chua Dien So dien thoai');
	};
	if (errors.length){
		res.render('users/create',{
			errors: errors,
			values: req.body
		});
		return;
	};

	next();
};