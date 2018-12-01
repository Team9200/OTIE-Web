import mongoose from 'mongoose';

class Tag extends mongoose.Schema {
    constructor() {
        const tag = super({
            index: {
                type: Number
            },
        });
        tag.statics.create = this.create;

        return block;
    }
    create(index) {
        const tag = new this({
            index
        });

        return tag.save();
    }
}

export default mongoose.model('Tag', new Tag);