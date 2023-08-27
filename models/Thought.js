const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Import the Reaction schema

// Define the Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlenght: 1,
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual 'reactionCount' that retrieves the length of the 'reactions' array field on query
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create the Thought model using the schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
