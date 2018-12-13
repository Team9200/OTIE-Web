import Vote from '../database/models/vote';

function userVote(req, res) {

    var publickey = req.query.publickey; // get query

    Vote.count({
            "publickey": publickey
        })
        .then((data) => {
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
    userVote,
};