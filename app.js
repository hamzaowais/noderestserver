var express = require('express');
var app = express();




/*
	This is a demo project which will do the the following:
		1.Demonstation of Basic REST json API. 
		2.Demonstration of asyntounous process and Callback.
*/




app.get('/', function (req, res) {
  res.send('Hello World!');
});



//1.Demonstation of Basic REST json API. 

app.get('/cederPointJSON', function (req, res) {
	var cederPointJSON={
		"name": "Ceder Point Theme Park",
		"address":"1 Cedar Point Dr, Sandusky, OH 44870",
	    "rides": [
	    	{
	    		name:"Roller coaster",
	    		img_src:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Luna_Park_Melbourne_scenic_railway.jpg/350px-Luna_Park_Melbourne_scenic_railway.jpg",
	    		height_limit:"4ft",
	    		price:"$3"

	    	},
	    	{
	    		name:"Roll-O-Plane",
	    		img_src:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Luna_Park_Melbourne_scenic_railway.jpg/350px-Luna_Park_Melbourne_scenic_railway.jpg",
	    		height_limit:"4ft",
	    		price:"$3"

	    	},
	    	{
	    		name:"Round Up",
	    		img_src:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Roundupride.jpg/350px-Roundupride.jpg",
	    		height_limit:"4ft",
	    		price:"$3"
	    	}
	    ]
	};
  
    	return res.json(cederPointJSON)
});


/*
	Demonstation Asyncrounous Call without callbacks . 
		We have 2 process Process 1 and Process 2. 
		We want Process 1 to happen and then process 2, But since this is asyncrounous, process 2 will happen before process 1.
*/

function process1(){
	 setTimeout(function(){ console.log("Procass 1 is complete"); }, 2000);
}

function process2(){
	 setTimeout(function(){ console.log("Procass 2 is complete"); }, 1000);
}


app.get('/getWithoutCallback', function (req, res) {
		var output={};
		//Process 1: This is IO Operation which will take 2 secs. 
		process1();
		// Process 2: This is IO Operation which will take 1 secs. 
		process2();
		output={"Status":"Complete"};
    	return res.json(output);
});



/*
	Demonstation Asyncrounous Call with callbacks .	
*/

function process1Callback(output, callback){
	 setTimeout(function(){ 
	 	output["process1"]="Complete";
	 	console.log("Procass 1 is complete"); 
	 	return process2Callback(output, callback);
	}, 2000);
}

function process2Callback(output, callback){
	 setTimeout(function(){ 
	 	output["process2"]="Complete";
	 	console.log("Procass 2 is complete"); 
	 	return callback(output);
	}, 2000);
}


app.get('/getWithCallback', function (req, res) {
		var output={};
		process1Callback(output, function(ouput){
			res.json(output);
		});
		
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});