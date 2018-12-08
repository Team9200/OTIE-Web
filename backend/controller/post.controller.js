import Post from '../database/models/post';

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
				tag_name_etc: {
					$elemMatch: {
						"tag": query
					}
				}
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
					"md5": query
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
					"sha1": query
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
					"sha256": query
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

	} else if (type === "collector") {

		Post.find({
				"collector": query
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

	} else if (type === "analyzer") {
		Post.find({
				"analyzer": query
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

	} else if (type === "azid") {
		Post.findOne({
			azid: query
		}, function (err, data) {
			if (err) return res.json({
				success: false,
				message: 'Query error'
			});
			return res.json({
				success: true,
				message: data
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
				"collector": query
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
				"analyzer": query
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
}

export default {
	get,
	getAll,
	search,
	searchNoPaging
};
