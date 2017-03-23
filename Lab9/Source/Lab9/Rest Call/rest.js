var request = require('request');
request('https://api.flickr.com/services/feeds/photos_public.gne?api_key=da4f3d3ccf2f0b9a043094d727af5467&tags=smiley&format=json', function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
	console.log(body);
    //All is good. Print the body
    body = JSON.parse(body);
	var ven = body.response.venues;
	var i;
	for(i=0;i<ven.length;i++)
	{
		console.log(ven[i].name);
	}

});