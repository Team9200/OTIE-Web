import Block from '../database/models/block';

function get(req, res) {
    Block.find({}).then((data) => {
            res.json({
                success: true,
                message: data
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err
            });
        });
}

function getPage(req, res) {

    var page = req.query.page;
    Block.find({}).skip(10 * (page - 1)).limit(10).then((data) => {
            res.json({
                success: true,
                message: data
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err
            });
        });

}

function search(req, res) {

    var query = req.query.query; // get query

    Block.findOne({
            "index": query
        }).then((data) => {
            res.json({
                success: true,
                message: data
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err
            });
        });

}


export default {
    get,
    getPage,
    search
};