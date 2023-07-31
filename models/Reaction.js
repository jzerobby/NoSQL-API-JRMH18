const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Reaction schema (Subdocument schema for Thought model)
const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString() // Format the timestamp on query
  }
});

module.exports = reactionSchema;
