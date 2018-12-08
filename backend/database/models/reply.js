import mongoose from 'mongoose';

class Reply extends mongoose.Schema {
    constructor() {
        const reply = super({
            permlink: {
                type: String,
                required: true
            },
            refpermlink: {
                type: String,
                required: true
            },
            timestamp: {
                type: Number,
                required: true
            },
            publickey: {
                type: String,
                required: true
            },
            sign: {
                type: Buffer
            },
            text: {
                type: String,
                required: true
            }
        });
    
        reply.statics.create = this.create;
        return reply;
    }

    create(permlink, refpermlink, timestamp, publickey, sign, text) {
        const reply = new this({
            permlink,
            refpermlink,
            timestamp,
            publickey,
            sign,
            text
        });

        return reply.save();
    }
}

export default mongoose.model('Reply', new Reply);