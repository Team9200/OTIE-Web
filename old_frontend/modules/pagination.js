
function pagination(dataMax, pagePerMax, nowPage, type, query, mal){

    var pageMax = Math.ceil(dataMax / pagePerMax);      // 페이지 갯수
    var nowbigPage = Math.ceil(nowPage / pagePerMax);   // 현재 달락
    var result = new Array();

    var url="/board/";
    var mid="";

    if(mal == 1){				// malware 정보 pagination

    	mid = '?type='+type+'&query='+query;
    	url = '/search/detail/';
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////// <<
    if(nowbigPage == 1)
    
        result.push({ page : '<a href="'+url+''+mid+'" class="item" >'+'<<'+'</a>'});

    else
        result.push({ page : '<a href="'+url+''+(nowbigPage-1)*10+''+mid+'" class="item" >'+'<<'+'</a>'});

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////// number
    if(pageMax - (10 * nowbigPage) > 0){
     
        for(var i = 0; i < (dataMax-((nowPage-1))*10) -( dataMax-(nowPage*10) ); i++){

            result.push({ page : '<a href="'+url+''+(((nowbigPage-1)*10)+(i+1))+''+mid+'" class="item" >'+(((nowbigPage-1)*10)+(i+1))+'</a>'});

     
        }
    }
    else{

        var last =(pageMax-((nowbigPage-1)*10));

        for(var i = 0; i < last; i++){

            result.push({ page : '<a href="'+url+''+(((nowbigPage-1)*10)+(i+1))+''+mid+'" class="item" >'+(((nowbigPage-1)*10)+(i+1))+'</a>'});

        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////// >>
    if(nowbigPage == Math.ceil(pageMax / 10))

        result.push({ page : '<a href="'+url+''+(((nowbigPage-1)*10)+last)+''+mid+'" class="item" >'+'>>'+'</a>'});

    else

        result.push({ page : '<a href="'+url+''+(((nowbigPage)*10)+1)+''+mid+'" class="item" >'+'>>'+'</a>'});

    return result;


}
module.exports = {

	create : pagination


};