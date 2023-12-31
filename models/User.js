const { Schema, model } = require('mongoose');

// Define the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+.\S+$/, // Regular expression to validate email format
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought' // Referencing the Thought model
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User' // Self-referencing the User model for friends
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual 'friendCount' that retrieves the length of the 'friends' array field on query
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create the User model using the schema
const User = model('User', userSchema);

module.exports = User;
