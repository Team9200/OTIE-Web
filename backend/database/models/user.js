import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

class User extends mongoose.Schema {
    constructor() {
        const user = super({
            username: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
                unique: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            publickey: {
                type: String,
                unique: true,
            },
            nodetype: {
                type: String
            },
            country: {
                type: String
            },
            clientId: {
                type: String
            },
            authed: {
                type: Boolean,
                default: false
            },
            role: {
                type: String,
                enum: ["general", "admin"],
                default: "general"
            }
        });
    
        user.statics.create = this.create;
        user.statics.createHash = this.createHash;
        user.methods.verify = this.verify;

        return user;
    }

    create(username,password, publickey ,email, nodetype, country) {
        const user = new this({
            username,
            password,
            email,
            publickey,
            nodetype,
            country
        });

        return user.save({unique:true});
    }

    createHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

    verify(password, callback) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) {
                return callback(err);
            }
            callback(null, isMatch);
        });
    }
}

export default mongoose.model('User', new User);