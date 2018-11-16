import mongoose from 'mongoose';

class Block extends mongoose.Schema {
    constructor() {
        const block = super({

            index: {
                type: Number
            },
            timestamp: {
                type: Number
            },
            transactionList: {
                type: JSON
            },
            malwaresList: {
                type: JSON
            },
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
    create(index, timestamp, transactionList, malwaresList, nonce, hash, previousBlockHash) {
        const block = new this({
            index,
            timestamp,
            transactionList,
            malwaresList,
            nonce,
            hash,
            previousBlockHash
        });

        return block.save();
    }
}

export default mongoose.model('Block', new Block);