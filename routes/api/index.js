const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtsRoutes');
const friendRoutes = require('.friendsRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/friend', friendRoutes);

module.exports = router;