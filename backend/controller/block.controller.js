import Block from '../database/models/block';

// function get(req, res) {
//     Block.find({}).then((data) => {
//             res.json({
//                 success: true,
//                 message: data
//             });
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err
//             });
//         });
// }

function get(req, res) {

    var index = req.query.index; // get query

    Block.findOne({
            "index": index
        })
        .populate("postList")
        .populate("replyList")
        .populate("voteList")
        .populate("transactionList").then((data) => {
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

function count(req, res) {
    Block.count({}, function (err, count) {
        return res.json({count: count})
    })
}



export default {
    get,
    getPage,
    count
};