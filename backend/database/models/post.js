import mongoose from 'mongoose';

class Post extends mongoose.Schema {
    constructor() {
        const post = super({
            permlink: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            body: {
                type: JSON
            },
            hashtag: {
                type: Array
            },
            publickey: {
                type: String
            },
            sign: {
                type: Buffer
            },
            timestamp: {
                type: String,
                required: true
            },            
            likes: {
                type: Number,
                default: 0
            }
        });
    
        post.statics.create = this.create;
        return post;
    }

    create(permlink, title, body, hashtag, publickey, sign, timestamp) {
        const post = new this({
            permlink,
            title,
            body,
            hashtag,
            publickey,
            sign,
            timestamp
        });

        return post.save();
    }
}

export default mongoose.model('Post', new Post);