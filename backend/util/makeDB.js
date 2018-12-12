import Post from '../database/models/post';
import Vote from '../database/models/vote';
import Reply from '../database/models/reply';
import Transaction from '../database/models/transaction';
import Block from '../database/models/block';
import User from '../database/models/user';
import fs from 'fs';
import mongoose from 'mongoose';
import { forEach } from 'p-iteration';

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/otie", {
	useNewUrlParser: true,
	useCreateIndex: true
});

function getFileSize(filename) {					// get File Name / return File Size

	return new Promise(function(resolve, reject){

	    const stats = fs.statSync(filename);
	    const fileSizeInBytes = stats.size;
	    resolve(fileSizeInBytes);

    })

}

function postLists(object){

	return new Promise(async function(resolve, reject) {

		const postList = object.postList;
		let title, timestamp, body, hashtag, publickey, sign, permlink;
		let array = [];

		await forEach(postList, async (list) => {

			
			title = list.title;
			timestamp = list.timestamp;
			body = list.body;
			hashtag = list.hashtag;
			publickey = list.publickey;
			sign = list.sign;
			permlink = list.permlink;

			const oId = await Post.create(permlink, title, body, hashtag, publickey, sign, timestamp)
				.then((post) => {
					console.log({
						success: true,
						message: 'Post success'
					});
					return post._id;
				}).catch((error) => {console.log(error)})

			array.push(oId);

		});
		resolve(array);

	});

}

function voteLists(object) {

	return new Promise(async function(resolve, reject) {

		const voteList = object.voteList;
		let voteid, refpermlink, timestamp, publickey, sign, weight;
		let array = [];

		await forEach(voteList, async (list) => {

			voteid = list.voteid;
			refpermlink = list.refpermlink;
			timestamp = list.timestamp;
			publickey = list.publickey;
			sign = list.sign;
			weight = list.weight;

			const oId = await Vote.create(voteid, refpermlink, timestamp, publickey, sign, weight)
				.then((vote) => {
					console.log({
						success: true,
						message: 'vote success'
					});
					return vote._id;
				}).catch((error) => {console.log(error)})

			array.push(oId);

		});
		resolve(array);
	});

}

function replyLists(object) {

	return new Promise(async function(resolve, reject) {

		const replyList = object.replyList;
		let permlink, refpermlink, timestamp, publickey, sign, text;
		let array = [];		

		await forEach(replyList, async (list) => {

			permlink = list.permlink;
			refpermlink = list.refpermlink;
			timestamp = list.timestamp;
			publickey = list.publickey;
			sign = list.sign;
			text = list.text;

			const oId = await Reply.create(permlink, refpermlink, timestamp, publickey, sign, text)
				.then((reply) => {
					console.log({
						success: true,
						message: 'Reply success'
					});
					return reply._id;
				}).catch((error) => {console.log(error)})

			array.push(oId);

		});
		resolve(array);
	});
}

function transactionLists(object) {

	return new Promise(async function(resolve, reject) {

		const transactionList = object.transactionList;
		let txid, version, inputCnt, vin, outputCnt, vout;
		let array = [];
		
		await forEach(transactionList,async (list) => {

			txid = list.txid;
			version = list.version;
			inputCnt = list.inputCnt;
			vin = list.vin;
			outputCnt = list.outputCnt;
			vout = list.vout;

			const oId = await Transaction.create(txid, version, inputCnt, vin, outputCnt, vout)
				.then((Transaction) => {
					console.log({
						success: true,
						message: 'Transaction success'
					});
					return Transaction._id;
				}).catch((error) => {console.log(error)})

			array.push(oId);
		});
		resolve(array);
	});
}

async function blockLists(fileName) {

	const fullSize = await getFileSize(fileName);
	const lastSize = await fs.readFileSync('./lastSize','UTF-8');
	const updateSize = fullSize - lastSize;
	const chain = await fs.openSync(fileName,'r+');
	let count;
	let last;

	count = Math.floor(updateSize / (1024*1024*512));

	if( count === 0){

		last = updateSize;
	}
	else{

		last = updateSize - (1024*1024*512*count);

	}

	let buffer = new Buffer(last);
	await fs.readSync(chain, buffer, 0, buffer.length, parseInt(lastSize,10));
	
	let parseData;
	if(lastSize === '0'){

		parseData = buffer.toString();
	
	}else{

		parseData = '{"chain" : ['+buffer.toString();

	}

	let chainData = JSON.parse(parseData).chain;
	
	await forEach(chainData, async (object, idx) => {

		let index, timestamp, postList, replyList, voteList, transactionList, nonce, hash, previousBlockHash;

		index = object.index;
		timestamp = object.timestamp;
		postList = await postLists(object);
		voteList = await voteLists(object);
		replyList = await replyLists(object);
		transactionList = await transactionLists(object);
		nonce = object.nonce;
		hash = object.hash;
		previousBlockHash = object.previousBlockHash;


		await Block.create(index, timestamp, postList, replyList, voteList, transactionList, nonce, hash, previousBlockHash)
			.then((Transaction) => {
				console.log({
					success: true,
					message: 'Transaction success'
				});
			}).catch((error) => {console.log(error)})
	});

	await fs.closeSync(chain);
	fs.writeFile('./lastSize', fullSize-136, 'utf8');

}

blockLists('./sample.json')

