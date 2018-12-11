import mongoose from 'mongoose';
import Transaction from './transaction'
import Post from './post'
import Reply from './reply'
import Vote from './vote'

class Block extends mongoose.Schema {
    constructor() {
        const block = super({
            index: {
                type: Number
            },
            timestamp: {
                type: String
            },
            postList: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }],
            replyList: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reply'
            }],
            voteList: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vote'
            }],
            transactionList: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Transaction'
            }],
            nonce: {
                type: Number
            },
            hash: {
                type: String
            },
            previousBlockHash: {
                type: String
            }
        });
        block.statics.create = this.create;

        return block;
    }
    create(index, timestamp, postList, replyList, voteList, transactionList, nonce, hash, previousBlockHash) {
        const block = new this({
            index,
            timestamp,
            postList,
            replyList,
            voteList,
            transactionList,
            nonce,
            hash,
            previousBlockHash
        });

        return block.save();
    }
    
}

export default mongoose.model('Block', new Block);