const express = require('express');
const router = express.Router();

// Import and use the route files
const usersRoutes = require('./users');
const thoughtsRoutes = require('./thoughts');
const reactionsRoutes = require('./reactions');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/thoughts/:thoughtId/reactions', reactionsRoutes);

module.exports = router;
