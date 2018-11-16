import Block from '../database/models/block';

function get(req, res) {

    var page = req.query.page;
	Block.find({}).skip(10*(page-1)).limit(10).then((data) => {
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

    var query = req.body.query; // get query
    var page = req.query.page;

   	Block.find(({"index":query}.skip(10*(page-1)).limit(10)), function(err, data){

        if(err){
        
            res.json({
                success: false,
                message: 'Query error'
            });
        }else{

            res.json({
                success: true,
                message: data
            });

        }

    });

}


export default {
    get, search
};
