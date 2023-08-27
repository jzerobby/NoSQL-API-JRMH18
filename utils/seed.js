const connection = require('../config/connection');
const { User, Thought} = require('../models')

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Thought.deleteMany({});

  await User.deleteMany({});

  const users = [
    {
      username: "Robby",
      email: "robby@email.com"
    },
    {
      username: "Jzero",
      email: "jzero@email.com"
    }
  ];

  await User.collection.insertMany(users);

  console.table(users);
  console.info('Seeding completed!');
  process.exit(0);
})