function logger(req, res, next)
{
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            'Origin'
        )}`
    );
    next();
}

function validateUserId(req, res, next)
{
    console.log('validateUserId middlewear');
    next();
    // DO YOUR MAGIC
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