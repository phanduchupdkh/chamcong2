var mongoose = require('mongoose');

var sessionsSchema = new mongoose.Schema({
	sessionId: String,
	cart: []
});

var Sessions = mongoose.model('Sessions',sessionsSchema,'sessions');

module.exports = Sessions;