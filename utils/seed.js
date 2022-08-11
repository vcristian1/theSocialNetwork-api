const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random user objects using a helper function that we imported from ./data
    const user = getRandomUser();

    users.push({
        username: `${user.uName}`,
        email: `${user.email}`,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // // Create empty array to hold the users
  // const thoughts = [];

  // // Loop 20 times -- add users to the users array
  // for (let i = 0; i < 20; i++) {
  //   // Get some random user objects using a helper function that we imported from ./data
  //   const thought = getRandomThoughts();

  //   thoughts.push({
  //       thoughtText: `${thought.name}${thought.end}`,
  //       username: `${thought.username}`
  //   });
  // }
  
  // // Add users to the collection and await the results
  // await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  // console.table(thoughts);
  console.info('Seeding stage 1 complete! 🌱');
  process.exit(0);
});
