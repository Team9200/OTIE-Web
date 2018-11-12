import jwt from 'jsonwebtoken';
import User from '../database/models/user';

function test(req, res) {
    res.json({
        req: getToken(req.headers)
    });
};

function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || !password || !email) {
        res.json({
            success: false,
            message: 'invalid input'
        });
    } else {
        User.create(username, User.createHash(password), email)
            .then((user) => {
                res.json({
                    success: true,
                    message: 'successful created new user'
                });
            })
            .catch((err) => {
                return res.json({
                    success: false,
                    message: 'username already exists'
                });
            });
    }
};

function signin(req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({
                success: false,
                message: 'user not found'
            });
        } else {
            user.verify(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
                    res.json({
                        success: true,
                        token: token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        message: 'wrong password'
                    });
                }
            });
        }
    });
};

function profile(req, res) {
    res.json({
        req: req.decoded
    });
};

function getToken(headers) {
    if (headers && headers.authorization) {
        return headers.authorization;
    } else {
        return null;
    }
};

export default {
    test, signup, signin, profile
};