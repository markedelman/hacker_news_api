const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {hackerNews} = require('../models');

chai.use(chaiHttp);

function seedData() {
    console.info('Seeding data');
    const seedNewsData = [];

    for (let i = 1; i <= 10; i++){
      seedNewsData.push(generateData());
    }
    //return seeding promise
    return hackerNews.insertMany(seedNewsData);
}

function generateData(){
  return {
    title: faker.company.catchPhrase(),
    url: faker.internet.url(),
    votes: faker.random.number()
  };
}

function tearDownDb() {
  console.info('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Hacker News API', function() {
  before(function() {
    return runServer();
  });

  beforeEach(function() {
    return seedData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

 describe('POST endpoint', function(){
   it('should add a new hacker post', function(){
     const newHackerPost = generateData();
     let mostRecentVote;

     return chai.request(app)
     .post('/stories')
     .send(newHackerPost)
     .then(function(res){
       console.log(res.body, 'Response');
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id', 'title', 'url', 'votes'
      );
      res.body.id.should.equal(newHackerPost.id);
      res.body.title.should.equal(newHackerPost.title);
      res.body.url.should.equal(newHackerPost.url);
      res.body.votes.should.equal(newHackerPost.votes);


     });
   });

 });







});
