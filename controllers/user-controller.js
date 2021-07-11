const { User } = require('../models')

const UserController = {
    getAll: async (req, res) => {
        try {
            const allUsers = await User.find({})
            .populate('thoughts')
            res.status(200).json(allUsers);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    createUser: async (req, res) => {
        try {
            console.log(req.body);
            console.log(User);
            const newUser = await User.create(req.body);
            res.status(200).json(newUser)
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getOneUser: async ({ params }, res) => {
        try {
            console.log(params.userId);
            const findOne = await User.findOne({ _id: params.userId})
            .populate('thoughts')
            if (!findOne) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(findOne);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    updateUser: async ({ params, body }, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: params.userId},
                body,
                { new: true, runValidators: true }
            )
            .populate('thoughts')
            if (!updatedUser) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(updatedUser);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteUser: async ({ params }, res) => {
        try {
            await User.findOneAndDelete({ _id: params.userId})
            res.status(200).json({ message: `user has been deleted!`})
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    addFriend: async ({ params }, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: params.userId },
                //inner object: name of array i want to push to, and what i want to push 
                { $addToSet: { friends: params.friendId} },
                { new: true }
            )
            if (!updatedUser) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(updatedUser);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    removeFriend: async ({ params }, res) => {
        try {
            const removeFriend = await User.findOneAndUpdate(
                { _id: params.userId },
                //inner object: name of array i want to push to, and what i want to push 
                { $pull: { friends: params.friendId} },
                { new: true }
            )
            res.status(200).json(removeFriend);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports = UserController;