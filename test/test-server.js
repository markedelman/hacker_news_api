const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();

const {app, runServer, closeServer} = require('../server');


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
});
