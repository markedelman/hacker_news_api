// Create the model
//
// Create a file called models.js
// Inside models.js, create a Mongoose schema and model for a story
// The schema should contain the following properties:
// title - The title of the story
// url - The URL of the story
// votes - The number of upvotes which the story has been given
// This should default to zero
// Add an apiRepr method to the schema which returns
// a JavaScript object containing the three properties,
// along with the ID of the story.
// Write the endpoints

const mongoose=require('mongoose');

const hackerNewsSchema=mongoose.Schema({
title:{type: String, required: true},
url:{type: String, required: true},
votes: {type: Number, required: true, default: 0}

});
hackerNewsSchema.methods.apiRepr = function(){
  return {
    id: this._id,
    title: this.title,
    vote: this.vote
  };
};

const hackerNews = mongoose.model('hackerNews', hackerNewsSchema);

module.exports = {hackerNews};

// POST endpoint

// Create a POST endpoint, /stories, which adds new stories to your database.
// It should expect a JSON request body containing a title property and a url property
// It should respond with a 201 Created status, and the apiRepr version of the created story
// Sending a votes property should not allow users to cheat the system by setting an arbitrary number of upvotes
// Test your endpoint by:
// Using Postman to add some stories
// Using the Mongo shell to make sure they were added to the database



// GET endpoints
//
// Create a GET endpoint, /stories, which returns a list of the 20 stories with the most upvotes
// It should respond with a 200 OK status, and an array containing the apiRepr versions of the stories
// Test your endpoint by using Postman to make sure the returned stories match what is in your database
// PUT endpoint
//
// Create a PUT endpoint, /stories/:id, which allows you to vote on a story
// Any PUT requests to the endpoint should increase the number of upvotes stored in the database by 1
// It should respond with a 204 No Content status, and no response body
// You should not be able to edit the title or URL, or set an arbitrary number of upvotes using this endpoint
// Test your endpoint by:
// Using Postman to vote on a story
// Using the Mongo shell to make sure the number of votes was incremented
// Write tests
//
// Update the seedData function to seed some stories using data generated by faker
// Write integration tests for your three endpoints
// Try to write three tests which cover the core functionality of the three endpoints first
// If you have time, then write additional tests for edge cases
