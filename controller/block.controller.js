import Block from '../database/models/block';

function get(req, res) {
    Block.find({}, function (err, data) {
        if (err) {
            return res.json({
                success: false,
                message: 'Query error'
            });
        } else {
            return res.json({
                success: true,
                message: data
            });
        }
    });
}

function search(req, res) {
    var query = req.query.query; // get query

    Block.find({
        "index": query
    }, function (err, data) {
        if (err) {
            return res.json({
                success: false,
                message: 'Query error'
            });
        } else {
            return res.json({
                success: true,
                message: data
            });
        }
    });
}

export default {
    get,
    search
};