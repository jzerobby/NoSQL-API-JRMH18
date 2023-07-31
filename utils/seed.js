const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample data for users and thoughts
const usersData = [
  {
    username: 'user1',
    email: 'user1@example.com'
  },
  {
    username: 'user2',
    email: 'user2@example.com'
  }
];

const thoughtsData = [
  {
    thoughtText: 'This is thought 1 by user1',
    username: 'user1'
  },
  {
    thoughtText: 'This is thought 2 by user2',
    username: 'user2'
  }
];

// Function to seed the database with sample data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create new users
    const users = await User.create(usersData);

    // Create new thoughts and associate with users
    const thoughts = await Promise.all(thoughtsData.map(async (thoughtData) => {
      const user = users.find(user => user.username === thoughtData.username);
      thoughtData.userId = user._id;
      return await Thought.create(thoughtData);
    }));

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Call the seedDatabase function to seed the data
seedDatabase();
