const fs= require('fs');
const { forEach } = require('p-iteration');

async function blockTime(){

	return new Promise(async function(resolve, reject) { 

		const data = await fs.readFileSync('./sample.json');

		const chain = JSON.parse(data.toString()).chain;
		let array = [];


	    await forEach(chain, async (chainData,i)=>{


	    	await forEach(chainData.postList, async (posts,i)=>{

	    		await forEach(posts.body.tag_name_etc, async (tags,i)=>{

	    			array.push(tags.tag);

		    	});

	    	});

	    });
	    resolve(array);
	})
}
function removeDuplicatesArray(arr) {
        var tempArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (tempArr.length == 0) {
                tempArr.push(arr[i]);
            } else {
                var duplicatesFlag = true;
                for (var j = 0; j < tempArr.length; j++) {
                    if (tempArr[j] == arr[i]) {
                        duplicatesFlag = false;
                        break;
                    }
                }
                if (duplicatesFlag) {
                    tempArr.push(arr[i]);
                }
            }
        }
        return tempArr;
    }
async function a(){

	let b = await blockTime();
	console.log(b);

	var f= await fs.openSync('a.json',"w+");
	fs.writeSync(f, JSON.stringify(removeDuplicatesArray(await blockTime()).sort()));

}
a();