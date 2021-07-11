const router = require('express').Router();
const { 
    allThoughts,
    createThought,
    oneThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/')
    .get(allThoughts)
    .post(createThought)

router.route('/:thoughtId')
    .get(oneThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reaction')
    .post(createReaction)
    
router.route('/:thoughtId/reaction/:reactionId')    
    .delete(deleteReaction)

module.exports = router;