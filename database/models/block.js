import mongoose from 'mongoose';
import Malware from './malware';

class Block extends mongoose.Schema {
    constructor() {
        const block = super({
            index: {
                type: Number
            },
            timestamp: {
                type: Number
            },
            transactionList: [{
                amout: {
                    type: Number
                },
                sender: {
                    type: String
                },
                recipient: {
                    type: String
                }
            }],
            malwaresList: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Malware'
            }]
        });

        return block;
    }
}

export default mongoose.model('Block', new Block);