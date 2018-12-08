import Post from '../database/models/post';
import Vote from '../database/models/vote';
import Reply from '../database/models/reply';
import Transaction from '../database/models/transaction';
import Block from '../database/models/block';
import User from '../database/models/user';
import fs from 'fs';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/otie", {
	useNewUrlParser: true,
	useCreateIndex: true
});

function postList(filename) {

	const fileData = fs.readFileSync(filename, 'UTF-8');
	const chainData = JSON.parse(fileData).chain;

	let title, timestamp, body, hashtag, publickey, sign, permlink;

	chainData.forEach(function (object) {

		const postList = object.postList;
		
		postList.forEach(async function (list) {

			title = list.title;
			timestamp = list.timestamp;
			body = list.body;
			hashtag = list.hashtag;
			publickey = list.publickey;
			sign = list.sign;
			permlink = list.permlink;

			await Post.create(permlink, title, body, hashtag, publickey, sign, timestamp)
				.then((post) => {
					console.log({
						success: true,
						message: 'Post success'
					});
				}).catch((error) => {console.log(error)})


		});
	});
}

function voteList(filename) {

	const fileData = fs.readFileSync(filename, 'UTF-8');
	const chainData = JSON.parse(fileData).chain;

	let voteid, refpermlink, timestamp, publickey, sign, weight;

	chainData.forEach(function (object) {

		const voteList = object.voteList;
		
		voteList.forEach(async function (list) {

			voteid = list.voteid;
			refpermlink = list.refpermlink;
			timestamp = list.timestamp;
			publickey = list.publickey;
			sign = list.sign;
			weight = list.weight;

			await Vote.create(voteid, refpermlink, timestamp, publickey, sign, weight)
				.then((vote) => {
					console.log({
						success: true,
						message: 'vote success'
					});
				}).catch((error) => {console.log(error)})

		});
	});
}

function replyList(filename) {

	const fileData = fs.readFileSync(filename, 'UTF-8');
	const chainData = JSON.parse(fileData).chain;

	let permlink, refpermlink, timestamp, publickey, sign, text;

	chainData.forEach(function (object) {

		const replyList = object.replyList;
		
		replyList.forEach(async function (list) {

			permlink = list.permlink;
			refpermlink = list.refpermlink;
			timestamp = list.timestamp;
			publickey = list.publickey;
			sign = list.sign;
			text = list.text;

			await Reply.create(permlink, refpermlink, timestamp, publickey, sign, text)
				.then((reply) => {
					console.log({
						success: true,
						message: 'reply success'
					});
				}).catch((error) => {console.log(error)})


		});
	});
}

function transactionList(filename) {

	const fileData = fs.readFileSync(filename, 'UTF-8');
	const chainData = JSON.parse(fileData).chain;

	let txid, version, inputCnt, vin, outputCnt, vout;

	chainData.forEach(function (object) {

		const transactionList = object.transactionList;
		
		transactionList.forEach(async function (list) {
			txid = list.txid;
			version = list.version;
			inputCnt = list.inputCnt;
			vin = list.vin;
			outputCnt = list.outputCnt;
			vout = list.vout;
			await Transaction.create(txid, version, inputCnt, vin, outputCnt, vout)
				.then((Transaction) => {
					console.log({
						success: true,
						message: 'Transaction success'
					});
				}).catch((error) => {console.log(error)})

		});
	});
}

postList('./smallchain.json');
voteList('./smallchain.json');
replyList('./smallchain.json');
transactionList('./smallchain.json');