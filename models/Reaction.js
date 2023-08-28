const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/date.js')

// Define the Reaction schema (Subdocument schema for Thought model)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => dateFormat(date)
    }
  },
  {
    toJSON: {

      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
