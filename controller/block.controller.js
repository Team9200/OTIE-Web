import Block from '../database/models/block';

function get(req, res) {

	Block.find({}, function(err, data){

    	if(err){
    	
    		res.json({
            	success: false,
            	message: 'Query error'
        	});
    	}
    	
    	console.log(data);	// 결과

    });

}

function search(req, res) {

    var query = req.body.query; // get query

   
   	Block.find({"index":query}, function(err, data){

    	if(err){
    	
    		res.json({
            	success: false,
            	message: 'Query error'
        	});
    	}
    	
    	console.log(data);	// 결과

    });

}


export default {
    get, search
};
