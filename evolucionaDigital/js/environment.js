"use strict";

window.Environment = function(){

    var token_url = "https://docs.google.com/a/bbva.com/spreadsheets/d/1ateEE7Olm8If5mbi9O2AlZKGJh3GEh_APGPFTp_dmao/gviz/tq?";
    var params = "select * ";

    function sendQuery(url, params, callback){
        console.log('Getting token');
        var opts = {dataType:'jsonp'};
        var query = new google.visualization.Query(url, opts);
        query.setQuery(params);
        query.send(callback);
    }

    // It Receive an url to be autorized and a callback to inject it at the end;
    var sendAuthorizedQuery = function(url, request) {
        console.log("Autorizing: ", url);

        var callback = function (response) {
            if (response && !response.error){
                var data = response.getDataTable();
                var token = data.getValue(0,0);
                console.log('Token fetched: ', token);
                var authorized_url = url + "?access_token=" + encodeURIComponent(token);
                console.log('authorized_url: ', authorized_url);
                request(authorized_url);
            } else {
                console.error("Error fetching the token: " + response.error);
            }
        }

        sendQuery(token_url, params, callback);
    }

    return {
        sendAuthorizedQuery: sendAuthorizedQuery,
    }
}();
