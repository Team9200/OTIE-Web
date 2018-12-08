import mongoose from 'mongoose';

class Vote extends mongoose.Schema {
    constructor() {
        const vote = super({
            voteid: {
                type: String,
                required: true
            },
            refpermlink: {
                type: String,
                required: true
            },
            timestamp: {
                type: Number
            },
            publickey: {
                type: String,
                required: true
            },
            sign: {
                type: Buffer
            },
            weight: {
                type: Number,
                required: true
            }
        });
    
        vote.statics.create = this.create;
        return vote;
    }

    create(voteid, refpermlink, timestamp, publickey, sign, weight) {
        const vote = new this({
            voteid,
            refpermlink,
            timestamp,
            publickey,
            sign,
            weight
        });

        return vote.save();
    }
}

export default mongoose.model('Vote', new Vote);