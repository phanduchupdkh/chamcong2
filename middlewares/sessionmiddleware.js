let shortid = require('shortid');

let Sessions = require('../models/sessionsmodel.js');

module.exports = function(req, res, next) {
	if (!req.signedCookies.sessionId){
	let sessionId = shortid.generate();
	res.cookie('sessionId',sessionId,
	 {signed: true});

	Sessions.create({ sessionId: sessionId });
	};

	next();
}