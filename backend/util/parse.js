const fs= require('fs');
const { forEach } = require('p-iteration');

async function blockTime(){

	return new Promise(async function(resolve, reject) { 

		const data = await fs.readFileSync('./sample.json');

		const chain = JSON.parse(data.toString()).chain;
		let array = [];


	    await forEach(chain, async (chainData,i)=>{

	    	let tmp = {};
	    	tmp.index = chainData.index;
	    	tmp.timestamp = new Date(new Date(2018, 8, 1).getTime()+(60*60*23*1000*i)).getTime();
	    	tmp.replyList = chainData.replyList;
	    	tmp.voteList = chainData.voteList;
	    	tmp.transactionList = chainData.transactionList;
	    	tmp.postList = chainData.postList;
	    	tmp.nonce = chainData.nonce;
	    	tmp.hash = chainData.hash;
	    	tmp.previousBlockHash = chainData.previousBlockHash;
	    	array.push(tmp);

	    });

	    resolve(array);
	})
}
async function firstSeen(data){

	return new Promise(async function(resolve, reject) { 

		const chain = data
		let array = [];

	    await forEach(chain, async (chainData,i)=>{

	    	let tmp = {};
	    	let post_first = [];
	    	let posts = [];
	    	tmp.index = chainData.index;
	    	tmp.timestamp = chainData.timestamp;
	    	tmp.replyList = chainData.replyList;
	    	tmp.voteList = chainData.voteList;
	    	tmp.transactionList = chainData.transactionList;
	    	tmp.nonce = chainData.nonce;
	    	tmp.hash = chainData.hash;
	    	tmp.previousBlockHash = chainData.previousBlockHash;

	    	await forEach(chainData.postList, async (post,idx) =>{

	    		post_first.push(randomRange(tmp.timestamp-(60*60*20*1000), tmp.timestamp));
	    		

	    	});
	    	post_first = post_first.sort()

	    	await forEach(chainData.postList, async (post,idx) =>{

	    		let tmp2 = {};
	    		tmp2 = post;
	    		tmp2.body.first_seen = post_first[idx];
	    		posts.push(tmp2);

	    	});
	    	tmp.postList = posts;
	    	array.push(tmp);

	    });
	    resolve(array);
	})
}
async function postDate(data){

	return new Promise(async function(resolve, reject) { 

		const chain = data
		let array = [];

	    await forEach(chain, async (chainData,i)=>{

	    	let tmp = {};
	    	let postdd = [];
	    	let posts = [];
	    	tmp.index = chainData.index;
	    	tmp.timestamp = chainData.timestamp;
	    	tmp.replyList = chainData.replyList;
	    	tmp.voteList = chainData.voteList;
	    	tmp.transactionList = chainData.transactionList;
	    	tmp.nonce = chainData.nonce;
	    	tmp.hash = chainData.hash;
	    	tmp.previousBlockHash = chainData.previousBlockHash;

	    	await forEach(chainData.postList, async (post,idx) =>{

	    		postdd.push(randomRange(post.body.first_seen, tmp.timestamp));

	    	});
	    	postdd = postdd.sort()

	    	await forEach(chainData.postList, async (post,idx) =>{

	    		let tmp2 = {};
	    		tmp2 = post;
	    		tmp2.body.date = postdd[idx];
	    		tmp2.timestamp = postdd[idx];
	    		posts.push(tmp2);

	    	});
	    	tmp.postList = posts;
	    	array.push(tmp);

	    });
	    resolve(array);
	})
}

function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

async function test(){

	const block = await blockTime();
	const first = await firstSeen(block);
	const postDates = await postDate(first);

	var f= await fs.openSync('result.json',"w+");
	console.log(postDates);
	fs.writeSync(f, JSON.stringify({"chain": postDates}));

}

test();
