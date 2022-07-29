const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res){
        User.find({})
            .then(users => res.json(users))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getUserById(req, res){
        User.findOne({ _id: req.params.id })
            .then(user => {
                if(!user) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
            .then(({ _id }) => {
                return Thought.deleteMany({ username: _id });
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res){
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.friendId }, 
                    { $push: { friends: _id } }, 
                    { new: true, runValidators: true });
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    removeFriend({ params }, res){
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));

    }
        
};

module.exports = userController;