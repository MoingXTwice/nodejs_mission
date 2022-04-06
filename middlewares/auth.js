const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

module.exports = async (req, res, next) => {
    console.log(req.cookies);
    try {
        if (!req.cookies.accessToken) {
            res.locals.auth = 'falseLogin';
        } else {
            try {
                const {userId} = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);
                const existUser = await User.findOne({userId});
                if (!existUser) res.locals.auth = 'errorLogin';
                else {
                    res.locals.user = existUser;
                    res.locals.auth = 'trueLogin';
                }
            } catch (e) {
                console.log(e);
            }
        }
        next();
    } catch (e) {
        console.log(e);
        return;
    }
};