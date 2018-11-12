import mongoose from 'mongoose';

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
                required: true
            },
            email: {
                type: String,
                required: true
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

        return user;
    }

    create(username, password, email) {
        const user = new this({
            username,
            password,
            email
        });

        return user.save();
    }
}

export default mongoose.model('User', new User);