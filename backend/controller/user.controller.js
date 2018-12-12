import jwt from 'jsonwebtoken';
import User from '../database/models/user';
import { randomBytes } from 'crypto';
import secp256k1 from 'secp256k1';
import bs58check from 'bs58check';

function test(req, res) {

    res.json({
        req: getToken(req.headers)
    });
};

function getUser(req, res) {

    User.find({},{'publickey':true,'nodetype':true, 'username':true}).then((data) => {

        res.json({
            success: true,
            message: data
        }); 

    }).catch((err) => {

        res.json({
            success: false,
            message: err
        });
    });
};

function searchUser(req, res) {

    const publickey = req.query.publickey;

    User.find({'publickey':publickey},{'publickey':true,'nodetype':true, 'username':true}).then((data) => {

        res.json({
            success: true,
            message: data
        }); 

    }).catch((err) => {

        res.json({
            success: false,
            message: err
        });
    });
};

function checkKey(pub, priv){


    try{
        
        const key = bs58check.decode(priv);
        const pubKey = secp256k1.publicKeyCreate(key);
        pub = bs58check.decode(pub);

        if( pub.compare(pubKey) === 0){

            return true;

        }
        else{

            return false;
        
        }
    }
        catch(err){

        return false;

    }
}

function signup(req, res) {

    const username = req.body.username;
    const privatekey = req.body.privatekey;
    const email = req.body.email;
    const publickey = req.body.publickey;
    const nodetype = req.body.nodetype;
    const country = req.body.country;


    if (!username || !privatekey || !publickey || !email || !nodetype || !country) {
        res.json({
            success: false,
            message: 'invalid input'
        });
    }
    else if(!checkKey(publickey, privatekey)){
            
        return res.json({
            success: false,
            message: 'key is not verified'
        });
    }
    else {

        User.create(username, User.createHash(privatekey), publickey, email, nodetype, country)
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
            res.send({
                success: false,
                message: 'user not found'
            });
        } else {
            user.verify(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var accessToken = jwt.sign(JSON.stringify({
                        authed: user.authed,
                        role: user.role,
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }), process.env.JWT_SECRET);
                    res.json({
                        success: true,
                        accessToken: accessToken
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'wrong password'
                    });
                }
            });
        }
    });
};

function profile(req, res) {
    User.findOne({username: req.decoded.username}, function (err, user) {
        return res.json({
            profile: {
                authed: user.authed,
                role: user.role,
                _id: user._id,
                username: user.username,
                email: user.email,
                publickey: user.publickey,
                nodetype: user.nodetype,
                country: user.country
            }
        })
    }).catch(err => {
        if (err) throw err
    })
};

function getToken(headers) {
    if (headers && headers.authorization) {
        return headers.authorization;
    } else {
        return null;
    }
};

export default {
    test,
    signup,
    signin,
    profile,
    getUser,
    searchUser
};