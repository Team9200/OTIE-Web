import Malware from '../database/models/malware';
import Block from '../database/models/block';
import fs from 'fs';

async function parseMallist(filename){

	var Data = fs.readFileSync(filename,'UTF-8');
	var jsonData = JSON.parse(Data);

	////////////////////////////////////
	/////////Malwarelist///////////////
	var azid,analyzer,collector;
	var md5,sha1,sha256;
	var filetype, tag_name_etc, filesize;
	var behavior, date, first_seen;
	var taglist, description;
	///////////////////////////////////

	for (var i=1; i<Object.keys(jsonData.chain).length; i++) {

		var malwaresList = jsonData.chain[i].malwaresList;

		for (var j=0; j<Object.keys(malwaresList).length; j++) {

			azid= malwaresList[j].azid;
			analyzer = malwaresList[j].analyzer;
			collector = malwaresList[j].collector;
			md5 = malwaresList[j].md5;
			sha1 = malwaresList[j].sha1;
			sha256 = malwaresList[j].sha256;
			filetype = malwaresList[j].filetype;
			tag_name_etc = malwaresList[j].tag_name_etc;
			filesize = malwaresList[j].filesize;
			behavior = malwaresList[j].behavior;
			date = malwaresList[j].date;
			first_seen = malwaresList[j].first_seen;
			taglist = malwaresList[j].taglist;
			description = malwaresList[j].description;

			await Malware.create(azid, analyzer, collector, md5, sha1, sha256, filetype, tag_name_etc, filesize, behavior, date, first_seen, taglist, description)
			.then((malware) => {
	                console.log({
	                    success: true,
	                    message: 'success'
	                });
	            })

		}

	}

}


async function parseBocklist(filename){


	var Data = fs.readFileSync(filename,'UTF-8');
	var jsonData = JSON.parse(Data);
	var index, timestamp;
	var transactionList, malwaresList;
	var nonce, hash, previousBlockHash


	for (var i=0; i<jsonData.chain.length; i++) {

		index = jsonData.chain[i].index;
		timestamp = jsonData.chain[i].timestamp;
		transactionList = jsonData.chain[i].transactionList;
		malwaresList = jsonData.chain[i].malwaresList;
		nonce = jsonData.chain[i].nonce;
		hash = jsonData.chain[i].hash;
		previousBlockHash = jsonData.chain[i].previousBlockHash;

		await Block.create(index, timestamp,transactionList, malwaresList,nonce, hash, previousBlockHash)
			.then((malware) => {
            console.log({
                success: true,
                message: 'success'
            });
        })
	}
}
