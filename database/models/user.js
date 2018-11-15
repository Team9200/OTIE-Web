import mongoose from 'mongoose';

class Malware extends mongoose.Schema {
    constructor() {
        const malware = super({
            azid: {
                type: String
            },
            analyzer: {
                type: String
            },
            collector: {
                type: String
            },
            md5: {
                type: String
            },
            sha1: {
                type: String
            },
            sha256: {
                type: String
            },
            filetype: {
                type: String
            },
            tag_name_etc: {
                type: JSON

            },
            filesize: {
                type: Number
            },
            behavior: {
                type: JSON
            },
            date: {
                type: Date
            },
            first_seen: {
                type: Date
            },
            taglist: {
                type: Array
            },
            description: {
                type: String
            }
        });
        malware.statics.create = this.create;

        return malware;
    }
    create(azid, analyzer, collector, md5, sha1, sha256, filetype, tag_name_etc, filesize, behavior, date, first_seen, taglist, description) {
        const malware = new this({
             azid
             ,analyzer
             , collector
             , md5
             , sha1
             , sha256
             , filetype
             , tag_name_etc
             , filesize
             , behavior
             , date
             , first_seen
             , taglist
             , description
        });

        return malware.save();
    }
}

export default mongoose.model('Malware', new Malware);
