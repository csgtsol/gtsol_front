process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();
chai.use(chaiHttp);

describe("Users", function() {
	describe("POST /users", function() {
		it("it should respond with 400 with malformed data", function(done) {
			chai.request(server)
			.post("/users")
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			});
		});
		it("it should respond with 201 with correct data", function(done) {
			let user = {
				email: "test@test.com",
				first_name: "Test",
				last_name: "Tester"
			};
			chai.request(server)
			.post("/users")
			.send(user)
			.end(function(err, res) {
				res.should.have.status(201);
				res.body.data.should.be.a("string");
				done();
			});
		});
	});
	describe("GET /users", function() {
		it("it should respond with 200", function(done) {
			chai.request(server)
			.get("/users")
			.end(function(err, res) {
				res.should.have.status(200);
				done();
			});
		});
		it("it should have 1 user", function(done) {
			chai.request(server)
			.get("/users")
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.data.should.have.lengthOf(1);
				done();
			});
		});
	});
});

describe("Times", function() {
	describe("GET /users/:uid/times", function() {
		it("it should respond with 200 and length of 0", function(done) {
			chai.request(server)
			.get("/users")
			.end(function(err, res) {
				let user = res.body.data[0];
				chai.request(server)
				.get(`/users/${user.id}/times`)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.data.should.have.lengthOf(0);
					done();
				});
			});
		});
		it("it should respond with 404 for wrong user id", function(done) {
			chai.request(server)
			.get("/users/123/times")
			.end(function(err, res) {
				res.should.have.status(404);
				done();
			});
		});
	});
	describe("POST /users/:uid/times", function() {
		it("it should respond with 201 and create a time entry", function(done) {
			chai.request(server)
			.get("/users")
			.end(function(err, res) {
				let user = res.body.data[0];
				let time = {
					user_id: user.id,
					start: new Date(2021, 01, 01, 8, 0, 0, 0),
					end: new Date(2021, 01, 01, 14, 0, 0, 0)
				};
				chai.request(server)
				.post(`/users/${user.id}/times`)
				.send(time)
				.end(function(err, res) {
					res.should.have.status(201);
					res.body.data.should.be.a("string");
					chai.request(server)
					.get(`/users/${user.id}/times`)
					.end(function(err, res) {
						res.should.have.status(200);
						res.body.data.should.have.lengthOf(1);
						done();
					});
				});
			});
		});
	});
	describe("GET /users/:uid/times/:id", function() {
		it("it should respond with 200 and have a valid time entry", function(done) {
			chai.request(server)
			.get("/users")
			.end(function(err, res) {
				let user = res.body.data[0];
				chai.request(server)
				.get(`/users/${user.id}/times`)
				.end(function(err, res) {
					res.body.data.should.have.lengthOf(1);
					let time = res.body.data[0];
					chai.request(server)
					.get(`/users/${user.id}/times/${time.id}`)
					.end(function(err, res) {
						res.should.have.status(200);
						res.body.data.user_id.should.be.a("string");
						res.body.data.start.should.be.a("string");
						res.body.data.end.should.be.a("string");
						done();
					});
				});
			});
		});
	});
});
