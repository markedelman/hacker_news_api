const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const DATABASE_URL = process.env.DATABASE_URL ||
                     global.DATABASE_URL ||
                     'mongodb://localhost/hn-api';
const PORT = process.env.PORT || 8080;
const {hackerNews} = require('./models');

const app = express();
app.use(bodyParser.json());

// API endpoints go here
// POST endpoint

// Create a POST endpoint, /stories, which adds new stories to your database.
// It should expect a JSON request body containing a title property and a url property
// It should respond with a 201 Created status, and the apiRepr version of the created story
// Sending a votes property should not allow users to cheat the system by setting an arbitrary number of upvotes
// Test your endpoint by:
// Using Postman to add some stories
// Using the Mongo shell to make sure they were added to the database
app.post('/stories',(req,res) => {
  const requiredFields = ['title', 'url', 'votes'];
  requiredFields.forEach(field => {
    if (! (field in req.body && req.body[field])) {
      return res.status(400).json({message: `Must specify value for ${field}`});
    }
  });
hackerNews.create({
  title: req.body.title,
  url: req.body.url,
  votes: req.body.votes
})
.then(
  hackerStories => res.status(201).json(hackerStories.apiRepr()))
.catch(err => {
  console.err(err);
res.status(500).json({message: 'Internal Server Error'});
});

});


let server;
function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
