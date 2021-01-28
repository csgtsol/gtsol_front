// Load dotenv
require('dotenv').config();

// Restify
let restify = require('restify');
let Validator = require('validatorjs');
const { v4: uuidv4 } = require('uuid');

let server = restify.createServer({
	name: process.env.NAME,
	version: process.env.VERSION
});

let PORT = process.env.PORT;

// Middleware
server.pre(restify.plugins.pre.dedupeSlashes());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Data
var Users = [];
var Times = [];

// Validation Rules
let UserRules = {
	email: 'required|email',
	first_name: 'required',
	last_name: 'required'
};

let TimeRules = {
	user_id: 'required',
	start: 'required|date',
	end: 'required|date'
};

server.get("/users", function(req, res) {
	res.send(200, {
		data: Users,
		errors: null
	});
});

server.post("/users", function(req, res) {
	var user = req.body;
	var valid = new Validator(user, UserRules);
	if(valid.passes() && !Users.find(user => user.email == req.body.email)) {
		user["id"] = uuidv4();
		Users.push(user);
		res.send(200, {
			data: user,
			errors: null
		});
	} else {
		res.send(400, {
			data: null,
			errors: valid.errors.all
		});
	}
});

server.get("/users/:uid/times", function(req, res) {
	var times = Times.filter(time => time.user_id == req.params.uid);
	res.send(200, {
		data: times,
		errors: null
	});
});

server.post("/users/:uid/times", function(req, res) {
	var time = req.body;
	var valid = new Validator(time, TimeRules);
	if(valid.passes() && Users.find(user => user.id == req.params.uid)) {
		time["id"] = uuidv4();
		Times.push(time);
		res.send(200, {
			data: time,
			errors: null
		});
	} else {
		res.send(400, {
			data: null,
			errors: [
				{
					message: "No such user"
				}
			]
		});
	}
});

server.listen(PORT, function() {
	console.log("Server listening on :%s", PORT);
});
