process.env.PORT = 1759;
const expect = require("chai").expect;
const chai = require("chai");
chai.use(require("chai-http"));
chai.use(require("chai-subset"));
const app = require("../server");
const request = chai.request.agent(app);
const faker = require("faker");

const userData = {
  username: faker.name.firstName(),
  password: "grantme",
  confirm_password: "grantme",
};
const acronymData = { title: faker.name.firstName(), meaning: "what are you up to" };
let tokenData;

describe("Auth API", function () {
  this.timeout(80000);
  it("should require a username for user registration", function (done) {
    request
      .post(`/auth/register`)
      .send({})
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Username is required.");
        done();
      });
  });
  it("should require a password for user registration", function (done) {
    request
      .post(`/auth/register`)
      .send({ username: "test" })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Password is required.");
        done();
      });
  });
  it("should require a confirm password for user registration", function (done) {
    request
      .post(`/auth/register`)
      .send({ username: "test", password: "test" })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Confirm Password is required.");
        done();
      });
  });
  it("should require a password and confirm password to be the same for user registration", function (done) {
    request
      .post(`/auth/register`)
      .send({ username: "test", password: "test", confirm_password: "who" })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Password does not match.");
        done();
      });
  });
  it("should create the user with a valid token", function (done) {
    request
      .post(`/auth/register`)
      .send(userData)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User Created Successfully");
        expect(res.body.data.token).to.be.a("string");
        tokenData = res.body.data.token;
        done();
      });
  });
  it("should require a title for acronym creation", function (done) {
    request
      .post(`/acronym`)
      .send({})
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Title is required.");
        done();
      });
  });
  it("should require a meaning for acronym creation", function (done) {
    request
      .post(`/acronym`)
      .send({ title: "WUU2" })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Meaning is required.");
        done();
      });
  });
  it("should create an acronym", function (done) {
    request
      .post(`/acronym`)
      .send(acronymData)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data.title).to.equal(acronymData.title);
        expect(res.body.data.meaning).to.equal(acronymData.meaning);
        expect(res.body.message).to.equal("Acronym Created Successfully");
        done();
      });
  });
//   it("should create more acronym", function (done) {
//     acronymData.title = 'WUU2'
//     request
//       .post(`/acronym`)
//       .send(acronymData)
//       .end(function (err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body.data.title).to.equal(acronymData.title);
//         expect(res.body.data.meaning).to.equal(acronymData.meaning);
//         expect(res.body.message).to.equal("Acronym Created Successfully");
//         done();
//       });
//   });
  it("should create more acronym", function (done) {
    acronymData.title = 'XWUU2'
    request
      .post(`/acronym`)
      .send(acronymData)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data.title).to.equal(acronymData.title);
        expect(res.body.data.meaning).to.equal(acronymData.meaning);
        expect(res.body.message).to.equal("Acronym Created Successfully");
        done();
      });
  });
  it("should get all acronym", function (done) {
    request
      .get(`/acronym`)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.message).to.equal("Acronym Fetched Successfully");
        done();
      });
  });
  it("should get acronym by query", function (done) {
    request
      .get(`/acronym?limit=1`)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.equal(1);
        expect(res.body.message).to.equal("Acronym Fetched Successfully");
        done();
      });
  });
  it("should reject update without token acronym", function (done) {
    const meaning = "updated meaning"
    request
      .put(`/acronym/XWUU2`)
      .send({meaning})
      .end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal("Unauthorized");
        done();
      });
  });
  it("should update acronym", function (done) {
    const meaning = "updated meaning"
    const authorization = `Bearer ${tokenData}`
    request
      .put(`/acronym/XWUU2`)
      .set('Authorization', authorization)
      .send({meaning})
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data.meaning).to.equal(meaning);
        expect(res.body.message).to.equal("Acronym Updated Successfully");
        done();
      });
  });
  it("should delete acronym", function (done) {
    const authorization = `Bearer ${tokenData}`
    request
      .delete(`/acronym/XWUU2`)
      .set('Authorization', authorization)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data.deleted).to.equal(true);
        expect(res.body.message).to.equal("Acronym Deleted Successfully");
        done();
      });
  });
});
