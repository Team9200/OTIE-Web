import Post from '../database/models/post';
import Vote from '../database/models/vote';
import Reply from '../database/models/reply';
import User from '../database/models/user';
import { forEach as ForEach} from 'p-iteration';

function view(req, res) {

	let permlink = req.query.permlink;
	let result = {};
	Post.find({
		'permlink': permlink
	}).then((data) => {

		if (data != '') {

			result.post = data;
			Vote.find({
				'refpermlink': permlink
			}).then((voteData) => {

				result.vote = voteData;
				Reply.find({
					'refpermlink': permlink
				}).then((replyData) => {

					result.reply = replyData;

					res.json({
						success: true,
						message: result
					});
				});
			});
		} else {

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

	if (type === "tag") { // tag \
		Post.find({

				'body.tag_name_etc.tag': new RegExp(query, 'i')

			}).limit(10).then((data) => {
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

		} else if (query.length === 40) { //sha1

			Post.find({
					'body.sha1': new RegExp(query, 'i')
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


		} else if (query.length === 64) { //sha256

			Post.find({
					'body.sha256': new RegExp(query, 'i')
				}).limit(10).then((data) => {
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
				$or: [{
					'body.collector': new RegExp(query, 'i')
				}, {
					'body.analyzer': new RegExp(query, 'i')
				}]
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
	} else if (type === "filetype") {

		Post.find({
				'body.filetype': new RegExp(query, 'i')
			}, {
				'body': true
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

	} else if (type === "title") {
		Post.find({
				'title': new RegExp(query, 'i')
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
		return res.json({
			success: false,
			message: 'Query error'
		});
	}

}

async function searchTest(req, res) {

	let query = req.query.query; // get query
	var page = req.query.page;


	if(typeof(query) == 'undefined'){
				
		return res.json({
			success: false,
			message: "Query is null",
		});

	}
	else{
		const tmp = query.replace(" ","");
		const and = tmp.split("&&");
		const or = tmp.split("||");

		if(and.length == 2 && or.length == 1){		// and 

			let type = [];
			let json = {"$and": []};

			await ForEach(and,async (init) =>{

				if(init.slice(0,1) == '!') {

					const q = init.replace("!","");

					if(q.length === 32){

						type.push({'body.md5': new RegExp(init.replace("!",""), 'i')});

					}
					else if(q.length === 40){

						type.push({'body.sha1': new RegExp(init.replace("!",""), 'i')});

					}
					else if(q.length === 64){

						type.push({'body.sha256': new RegExp(init.replace("!",""), 'i')});

					}

				}
				else if(init.slice(0,1) == '@') {

					await User.find({username: init.replace("@","")})
						.then(async (data) => {

							await type.push({"$or": [{"body.analyzer": data[0].publickey},{"body.collector": data[0].publickey}]});

						});
					
				}	
				else if(init.slice(0,1) == '#') 

					type.push({'body.tag_name_etc.tag': new RegExp(init.replace("#",""), 'i')});

				else 

					type.push({ "$or": [{ 'title': '/'+init+'/'}, {'body.description': new RegExp(init, 'i')}] });

			});
			json["$and"].push(type[0],type[1]);

			Post.find(json)
				.skip(10 * (page - 1))
				.limit(10)
				.exec(function(err, posts) {
					Post.count(json).exec(function(err, count) {
						
						res.json({
							success: true,
							message: posts,
							count: count
						});							

					})
				})

		}
		else if(or.length == 2 && and.length == 1){		// or

			let type = [];
			let json = {"$or": []};

			await ForEach(or,async (init) =>{

				if(init.slice(0,1) == '!') {

					const q = init.replace("!","");

					if(q.length === 32){

						type.push({'body.md5': new RegExp(init.replace("!",""), 'i')});

					}
					else if(q.length === 40){

						type.push({'body.sha1': new RegExp(init.replace("!",""), 'i')});

					}
					else if(q.length === 64){

						type.push({'body.sha256': new RegExp(init.replace("!",""), 'i')});

					}

				}
				else if(init.slice(0,1) == '@') {

					await User.find({username: init.replace("@","")})
						.then(async (data) => {

							await type.push({"$or": [{"body.analyzer": data[0].publickey},{"body.collector": data[0].publickey}]});

						});
					
				}	
				else if(init.slice(0,1) == '#') 

					type.push({'body.tag_name_etc.tag': new RegExp(init.replace("#",""), 'i')});

				else 

					type.push({ "$or": [{ 'title': '/'+init+'/'}, {'body.description': new RegExp(init, 'i')}] });

			});
			json["$or"].push(type[0],type[1]);

			Post.find(json)
				.skip(10 * (page - 1))
				.limit(10)
				.exec(function(err, posts) {
					Post.count(json).exec(function(err, count) {
						
						res.json({
							success: true,
							message: posts,
							count: count
						});							

					})
				})


		}
		else if(or.length == 1 && and.length == 1){

			const init = query.slice(0, 1);

			if (init === '#' || init === '@' || init === '!') {

				query = query.replace("#","");

				if (init === "#") { // tag \

					Post.find({

							'body.tag_name_etc.tag': new RegExp(query, 'i')

						}).skip(10 * (page - 1))
						.limit(10)
						.exec(function(err, posts) {
							Post.count({'body.tag_name_etc.tag': new RegExp(query, 'i')}).exec(function(err, count) {
								
								res.json({
									success: true,
									message: posts,
									count: count
								});							

							})
						})
				} else if (init === "!") { // hash

					query = query.replace("!","");

					if (query.length === 32) { //md5

						Post.find({
								'body.md5': new RegExp(query, 'i')
							}).skip(10 * (page - 1))
							.limit(10)
							.exec(function(err, posts) {
							Post.count({ 'body.md5': new RegExp(query, 'i') }).exec(function(err, count) {
								
								if(err){
									return res.json({
										success: false,
										message: err,
										count: 0
									})
								}
								res.json({
									success: true,
									message: posts,
									count: count
								});							

							})
						})

					} else if (query.length === 40) { //sha1

						Post.find({
								'body.sha1': new RegExp(query, 'i')
							})
							.skip(10 * (page - 1))
							.limit(10)
							.exec(function(err, posts) {
								Post.count({ 'body.sha1': new RegExp(query, 'i') }).exec(function(err, count) {
								
									if(err){
										return res.json({
											success: false,
											message: err,
											count: 0
										})
									}
									res.json({
										success: true,
										message: posts,
										count: count
								});							

							})
						})

					} else if (query.length === 64) { //sha256

						Post.find({
								'body.sha256': new RegExp(query, 'i')
							})
							.skip(10 * (page - 1))
							.limit(10)
							.exec(function(err, posts) {
								Post.count({ 'body.sha256': new RegExp(query, 'i') }).exec(function(err, count) {
								
									if(err){
										return res.json({
											success: false,
											message: err,
											count: 0
										})
									}
									res.json({
										success: true,
										message: posts,
										count: count
								});							

							})
						})
					}

				} else if (init === "@") {

					query = query.replace("@","");
					User.find({
							username: new RegExp(query, 'i')
						}).then((data) => {

							data.forEach(function (result) {

								const pub = result.publickey

								Post.find({
										$or: [{
											'body.collector': new RegExp(pub, 'i')
										}, {
											'body.analyzer': new RegExp(pub, 'i')
										}]
									})
									.skip(10 * (page - 1))
									.limit(10)
									.exec(function(err, posts) {
										Post.count({ 
											$or: [{
												'body.collector': new RegExp(pub, 'i')
											}, {
												'body.analyzer': new RegExp(pub, 'i')
											}] }).exec(function(err, count) {
										
											if(err){
												return res.json({
													success: false,
													message: err,
													count: 0
												})
											}
											res.json({
												success: true,
												message: posts,
												count: count
										});							

									})
								})

							});

						})
						.catch((err) => {
							res.json({
								success: false,
								message: err
							});
						});
				} 
			}
			else {

				console.log(query);
				Post.find({ $or: [{ 'title': new RegExp(query, 'i')}, {'body.description': new RegExp(query, 'i')}] })
				.skip(10 * (page - 1))
							.limit(10)
							.exec(function(err, posts) {
								Post.count({ 'body.sha256': new RegExp(query, 'i') }).exec(function(err, count) {
								
									if(err){
										return res.json({
											success: false,
											message: err,
											count: 0
										})
									}
									res.json({
										success: true,
										message: posts,
										count: count
								});							

							})
						})
				
			}
		}
	}
}


function searchNoPaging(req, res) { // 페이징 없이
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

				'body.tag_name_etc.tag': new RegExp(query, 'i')

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

		} else {

			res.json({
				success: false,
				message: "query error"
			});
		}

	} else if (type === "node") {

		Post.find({
				$or: [{
					'body.collector': new RegExp(query, 'i')
				}, {
					'body.analyzer': new RegExp(query, 'i')
				}]
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
			}, {
				'body': true
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
		return res.json({
			count: Math.ceil((count / 10))
		})
	})
}


function getMalware(req, res) {
	var query = req.query.query

	Post.findOne({
		'body.sha256': new RegExp(query, 'i')
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
	view,
	get,
	getAll,
	search,
	searchNoPaging,
	getBody,
	count,
	searchTest,
	getMalware
};