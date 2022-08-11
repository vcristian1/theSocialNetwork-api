const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // get one user by ID
    getUserById(req,res) {
        User.findOne({ _id: req.params.userId })
        .populate('thought')
        .populate('friends')
        .select('-__v')
        .then(async (user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!' })
                : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
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
            { _id: req.params.userId },
            {$set: req.body },
            {runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with that ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete the user and their thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with that ID!' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and all of their thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
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