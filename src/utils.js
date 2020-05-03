const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if(Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}

function setToken(userId, APP_SECRET) {
    const sevenDays = 60 * 60 * 24 * 7 * 1000;
    const fifteenMins = 60 * 15 * 1000;

    const token = jwt.sign(
        {
            userId: userId
        },
        APP_SECRET,
        {
            expiresIn: 6
        }
    );

    return token;
}

module.exports = {
    APP_SECRET,
    getUserId,
    setToken
}