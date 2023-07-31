const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./reactionSchema'); // Import the Reaction schema

// Define the Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString() // Format the timestamp on query
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema] // Using the Reaction schema as a subdocument array
});

// Create a virtual 'reactionCount' that retrieves the length of the 'reactions' array field on query
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create the Thought model using the schema
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
