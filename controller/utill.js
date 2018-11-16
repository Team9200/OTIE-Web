import Malware from '../database/models/malware';

function parseMallist(filename){

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

			Malware.create(azid, analyzer, collector, md5, sha1, sha256, filetype, tag_name_etc, filesize, behavior, date, first_seen, taglist, description)
			.then((malware) => {
	                console.log({
	                    success: true,
	                    message: 'success'
	                });
	            })

		}

	}

}
