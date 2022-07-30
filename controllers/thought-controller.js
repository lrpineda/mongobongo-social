const { Thought, User } = require('../models');

const thoughtController = {
    
    getAllThoughts(req, res){
        Thought.find({})
            .populate({
                path: 'username',
                select: 'username',
                options: { lean: true }
            })
            .select('-__v')
            .then(thoughts => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getThoughtById(req, res){
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: 'username',
                select: 'username',
                options: { lean: true }
            })
            .populate({
                path: 'reactions',
                options: { lean: true }
            })
            .select('-__v')
            .then(thought => {
                if(!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                return res.json(thought)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createThought({ body }, res){
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.username },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true }
            )
            .then(async dbThoughtData => {
                await User.findOneAndUpdate(
                    { _id: body.username },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true, runValidators: true }
                );

                return res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if(!deletedThought) {
                    res.status(404).json({ message: 'Thought not found' });
                }
                return User.findOneAndUpdate(
                    { _id: deletedThought.username },
                    { $pull: { thoughts: deletedThought._id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
            
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;