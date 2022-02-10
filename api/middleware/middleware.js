const User = require('../users/users-model');

function logger(req, res, next)
{
    console.log(
        `[${new Date().toLocaleString()}] 
        ${req.method} to 
        ${req.originalUrl} from 
        ${req.get('Origin')}`
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
})
    }

}

function validateUser(req, res, next)
{
    console.log('validateUser Idmiddlewear');
    next();
    // DO YOUR MAGIC
}

function validatePost(req, res, next)
{
    console.log('validatePost middlewear');
    next();
    // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost
};