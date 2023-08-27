const router = require('express').Router();

// Import and use the route files
const usersRoute = require('./usersRoute');
const thoughtsRoute = require('./thoughtsRoute');

router.use('/users', usersRoute);
router.use('/thoughts', thoughtsRoute);

module.exports = router;
