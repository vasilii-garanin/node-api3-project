const User = require('../users/users-model');

function logger(req, res, next)
{
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}]`
    );
    next();
}

async function validateUserId(req, res, next)
{
    try
    {
        const user = await User.getById(req.params.id);
        if (!user)
        {
            res.status(404).json({
                message: 'user not found'
            });
        } else
        {
            req.user = user;
        }
    } catch (err)
    {
        res.status(500).json({
            message: 'user not found'
        });
    }
    next();
}

function validateUser(req, res, next)
{
    const { name } = req.body;
    if (!name || !name.trim())
    {
        res.status(400).json({
            message: 'missing required name field'
        });
    } else
    {
        req.name = name.trim();
        next();
    }
}

function validatePost(req, res, next)
{
    const { text } = req.body;
    if (!text || !text.trim())
    {
        res.status(400).json({
            message: 'missing required text field'
        });
    } else
    {
        req.text = text.trim();
        next();
    }
}

// do not forget to expose these functions to other modules
module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost
};