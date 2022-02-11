const express = require('express');

const User = require('./users-model');
const Post = require('../posts/posts-model');

const {
    validateUserId,
    validateUser,
    validatePost
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) =>
{
    User.get()
        .then(users =>
        {
            res.json(users);
        })
        .catch(next);
});

router.get('/:id', validateUserId, (req, res) =>
{
    res.json(req.user);
});

router.post('/', validateUser, (req, res, next) =>
{
    User.insert({ name: req.name })
        .then(newUser =>
        {
            res.status(201).json(newUser);
        })
        .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) =>
{
    User.update(req.params.id, { name: req.name })
        .then(updatedUser =>
        {
            res.status(201).json(updatedUser);
        })
        .catch(next);
});

router.delete('/:id', validateUserId, async (req, res, next) =>
{
    try
    {
        const deletedUser = await User.remove(req.params.id);
        res.status(201).json(deletedUser);
    } catch (err)
    {
        next(err);
    }
});

router.get('/:id/posts', validateUserId, (req, res) =>
{
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    console.log(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) =>
{
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    console.log(req.name);
    console.log(req.text);
});

router.use((err, req, res, next) =>
{
    res.status(err.status || 500).json({
        customMessage: 'Posts problem occurs!',
        message: err.message,
        stack: err.stack

    });
});
// do not forget to export the router

module.exports = router;
