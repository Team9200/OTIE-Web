import Post from '../database/models/post';
import Vote from '../database/models/vote';
import Reply from '../database/models/reply';

function view(req, res) {

	let permlink = req.query.permlink;
	let result = {};
	Post.find({'permlink': permlink }).then((data) => {

		if(data != '') {

			result.post = data;
			Vote.find({'refpermlink': permlink}).then((voteData) =>{

				result.vote = voteData;
				Reply.find({'refpermlink': permlink}).then((replyData) =>{
					
					result.reply = replyData;

					res.json({
						success: true,
						message: result
					});	
				});
			});
		}
		else{

			res.json({
				success: false,
				message: 'Not found'
			});
		}

	}).catch((err) => {

		res.json({
			success: false,
			message: err
		});
	});
}

function get(req, res) {

	var page = req.query.page;
	Post.find({}).skip(10 * (page - 1)).limit(10).then((data) => {
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

function getAll(req, res) {
	Post.find({}).then((data) => {
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
	var type = req.query.type; // get type
	var page = req.query.page;
	console.log(query);

	if (type === "tag") { // tag \
		Post.find({

				'body.tag_name_etc.tag' : new RegExp(query, 'i')

			}).skip(10 * (page - 1)).limit(10).then((data) => {
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

	} else if (type === "hash") { // hash

		if (query.length === 32) { //md5

			Post.find({
					'body.md5': new RegExp(query, 'i')
				}).skip(10 * (page - 1)).limit(10).then((data) => {
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

		} else if (query.length === 40) { //sha1

			Post.find({
					'body.sha1': new RegExp(query, 'i')
				}).skip(10 * (page - 1)).limit(10).then((data) => {
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


		} else if (query.length === 64) { //sha256

			Post.find({
					'body.sha256': new RegExp(query, 'i')
				}).skip(10 * (page - 1)).limit(10).then((data) => {
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

	} else if (type === "node") {

		Post.find({
			$or : [{ 'body.collector': new RegExp(query, 'i')}, {'body.analyzer' : new RegExp(query, 'i') }]
		}).skip(10 * (page - 1)).limit(10).then((data) => {
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
	} else if (type === "filetype") {

		Post.find({
			'body.filetype': new RegExp(query, 'i')
			},{'body':true}).then((data) => {
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

	} else if (type === "title") {
		Post.find({
			'title': new RegExp(query, 'i')
			}).skip(10 * (page - 1)).limit(10).then((data) => {
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
	} else {
		return res.json({
			success: false,
			message: 'Query error'
		});
	}

}

function searchNoPaging(req, res) {				// 페이징 없이

	var query = req.query.query; // get query
	var type = req.query.type; // get type

	if (type === "collector") {

		Post.find({
				'body.collector': query
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

	} else if (type === "analyzer") {
		Post.find({
				'body.analyzer': query
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

	} else {

		res.json({
			success: false,
			message: 'Query is NULL'
		});

	}
}

function getBody(req, res) {

	var query = req.query.query; // get query
	var type = req.query.type; // get type
	var page = req.query.page;

	if (type === "tag") { // tag \
		Post.find({

				'body.tag_name_etc.tag' : new RegExp(query, 'i')

			}).skip(5 * (page - 1)).limit(5).then((data) => {
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

	} else if (type === "hash") { // hash

		if (query.length === 32) { //md5

			Post.find({
					'body.md5': new RegExp(query, 'i')
				}).skip(5 * (page - 1)).limit(5).then((data) => {
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

		} else if (query.length === 40) { //sha1

			Post.find({
					'body.sha1': new RegExp(query, 'i')
				}).skip(5* (page - 1)).limit(5).then((data) => {
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


		} else if (query.length === 64) { //sha256

			Post.find({
					'body.sha256': new RegExp(query, 'i')
				}).skip(5 * (page - 1)).limit(5).then((data) => {
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
		else{

				res.json({
					success: false,
					message: "query error"
				});
		}

	} else if (type === "node") {

		Post.find({
			$or : [{ 'body.collector': new RegExp(query, 'i')}, {'body.analyzer' : new RegExp(query, 'i') }]
		}).skip(5 * (page - 1)).limit(5).then((data) => {
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
	} else if (type === "filetype") {

		Post.find({
			'body.filetype': new RegExp(query, 'i')
			},{'body':true}).skip(5 * (page - 1)).limit(5).then((data) => {
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
						
	} else if (type === "title") {
		Post.find({
			'title': new RegExp(query, 'i')
			}).skip(5 * (page - 1)).limit(5).then((data) => {
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
	} else {
		return res.json({
			success: false,
			message: 'Query error'
		});
	}
}

function count(req, res) {
    Post.count({}, function (err, count) {
        return res.json({count: Math.ceil((count / 10))})
    })
}


export default {
	view,
	get,
	getAll,
	search,
	searchNoPaging,
	getBody,
	count
};
