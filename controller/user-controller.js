const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
          .select('-__v')
          .then((userDataDB) => {
            if (!userDataDB) {
              res.status(404).json({ message: 'No user found with this ID' });
              return;
            }
            res.json(userDataDB);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    // create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .select('-__v')
            .then((userDataDB) => {
              if (!userDataDB) {
                res.status(404).json({ message: 'Cannot find user with this id' });
                return;
              }
              res.json(userDataDB);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
    // delete the user and their thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
      .then((userDataDB) => {
        if (!userDataDB) {
          res.status(404).json({ message: 'this user does not exist' });
          return;
        }
        res.json(userDataDB);
      })
      .catch((err) => res.status(500).json(err));
    },
    // add a friend to the user friends list
    // add a friend to the user friends list
    addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body } },
          {runValidators: true, new: true }
      )
          .then((user) => 
              !user
                  ? res.status(404).json({ message: 'No user found with that ID!' })
                  : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
  },
  // delete a friend
  deleteFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } },
          {runValidators: true, new: true }
      )
          .then((user) => 
              !user
                  ? res.status(404).json({ message: 'No user found with that ID!' })
                  : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
  },
};