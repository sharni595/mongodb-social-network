const { Thought, User } = require('../models');
const { populate } = require('../models/User');
//require date formatting function

const ThoughtController = {
    allThoughts: async (req, res) => {
        try {
            const allThoughts = await Thought.find({})
            res.status(200).json(allThoughts);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    createThought: async ({ body }, res) => {
        try {
            console.log(body);
            const newThought = await Thought.create(body);

            console.log(body.userId);

            await User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: newThought._id} },
                { new: true }
            )
            res.status(200).json(newThought)
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    oneThought: async ({ params }, res) => {
        try {
            const oneThought = await Thought.findOne({ _id: params.thoughtId})
            //.populate()
            console.log(params.thoughtId);

            if (!oneThought) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.status(200).json(oneThought);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }, 
    
    updateThought: async ({ params, body }, res) => {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                body,
                { new: true, runValidators: true}
            )

            if (!updatedThought) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(updatedThought);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteThought: async ({ params }, res) => {
        try {
            await Thought.findOneAndDelete({ _id: params.thoughtId})
            res.status(200).json({ message: `Thought has been deleted!`})
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    createReaction: async ({ params, body }, res) => {
        try {
            const addReaction = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                { $addToSet: { reactions: body } },
                { new: true, runValidators: true }
            )

            if (!addReaction) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(addReaction);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteReaction: async ({ params }, res) => {
        try {
            const removeReaction = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true, runValidators: true }
            )

            if (!removeReaction) {
                res.status(404).json({ message: 'No reaction found with this id' });
                return;
            }
            res.json({ message: 'reaction has been deleted!'});
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports = ThoughtController;