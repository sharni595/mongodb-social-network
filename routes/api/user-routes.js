const router = require('express').Router();
const { 
    getAll, 
    createUser, 
    getOneUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend 
} = require('../../controllers/user-controller');

router.route('/')
    .get(getAll)
    .post(createUser)

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;