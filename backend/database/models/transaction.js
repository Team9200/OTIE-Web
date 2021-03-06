import mongoose from 'mongoose';

class Transaction extends mongoose.Schema {
    constructor() {
        const transaction = super({
            txid: {
                type: String,
                required: true
            },
            version: {
                type: Number
            },
            inputCnt: {
                type: Number
            },
            vin: {
                type: Array
            },
            outputCnt: {
                type: Number
            },
            vout: {
                type: JSON
            }
        });
    
        transaction.statics.create = this.create;
        return transaction;
    }

    create(txid, version, inputCnt, vin, outputCnt, vout) {
        const transaction = new this({
            txid,
            version,
            inputCnt,
            vin,
            outputCnt,
            vout
        });

        return transaction.save();
    }
}

export default mongoose.model('Transaction', new Transaction);