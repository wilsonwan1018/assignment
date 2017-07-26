var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("events").EventEmitter.prototype._maxListeners = 100;

var mongodbServer = new mongodb.Server("localhost", 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db("dataB", mongodbServer);
var usersssssss="";
var isTriedLogin = false, isLoginSuccessful = false; var canRegis = true;

var server = http.createServer(function(request, response){
	if (request.method == "POST"){
		console.log("post call");
		var formData = "", msg = "", obj ="";
		return request.on("data", function(data){
			formData += data;
		}).on('end', function(chunk){
			var user;
			user = qs.parse(formData);
			msg = JSON.stringify(user);
			console.log("305cde= "+msg);
			obj = JSON.parse(msg);
			console.log("action = " +obj['act']);
			if(request.url == "index.html"){
				console.log("login page comes");
				/*if(obj['act'] == "addsong"){
					console.log("add song h");
					if(request.url == "/addsong"){
						console.log("add song here");
					}	*/
				}
				if(obj['act'] == "signup"){
					console.log("SIGN_UP");
					db.open(function(){
						db.collection("user", function(err, collection){
							collection.insert({
								username: obj.ac,
								password: obj.pw,
								fav: ""
							}, function(err, data){
								if(data){
									console.log("Successfully Insert");
									response.end('{"success" : "Updated Successfully", "status" : 200}');
								} else{
									console.log("Failed to Insert");
								}
							});
						});	
					});
				} //end of Sing up
				else if(obj['act']=="login"){	
					console.log("LOGIN");
					console.log("Successfullyfound");
					var username = obj.ac;
					var password = obj.pw;
					console.log("input login = "+obj.ac);
					console.log("input pass = "+obj.pw);
					MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db){
						db.collection("user", function(err, collection){
							collection.find().toArray(function(err, items){
								if(err) throw err;
								console.log(items.length);
								if(items != ""){
									for (var i=0; i<items.length;i++){
										console.log("user Record "+ i +" = "+items[i].username);
										console.log("pass Record "+ i +" = "+items[i].password);
										console.log("Fav "+ i +" = " + items[i].fav);
										console.log("user1= "+obj.ac);
										console.log("pass1= "+obj.pw);
										if (items[i].username ==obj.ac && items[i].password == obj.pw) {
											usersssssss= items[i].username;
										
											console.log("current user= "+items[i].username);
											console.log("pass= "+items[i].password);
											console.log("USER FOUND CONFIGURATION");
											isLoginSuccessful = true;
											break;
										}else{
												isLoginSuccessful = false;
										}
									}
									if(isLoginSuccessful == false){
										  console.log("Fail to login");
											response.end('LOGIN FAIL');
									}else{
										 console.log("LOGIN OK  by wilson");
											response.end('LOGIN OK');
									}
								}
							});
						});
					});
					
				} // end of Login
				else if(obj['act'] == "addFav"){
						console.log("Add Fav List");
						var username = obj.ac;
						var poster = obj.poster;
						console.log("Current user = "+ username);
						console.log("Add poster = "+ poster);
						if(username!=""){
						MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db){
							db.collection("user", function(error,collection){
								collection.update({username: username},{$set:{fav:poster}}
									,function(err, data){
								if(data){
									console.log("Successfully Updated");
									//response.end('{"success" : "Updated Successfully", "status" : 200}');
									response.end('Successfully Updated');
								} else{
									console.log("Failed to Updated");
									response.end('Failed to Updated');
								}
								});
							});
						});
					}else{
						response.end('no_user');
					}
					}//end of Add Favorite
					else if(obj['act'] == "delFav"){
						console.log("Delete Fav List");
						var username = obj.ac;
						var poster = obj.poster;
						console.log("Current user = "+ username);
						console.log("Add poster = "+ poster);
						if(username!=""){
						MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db){
							db.collection("user", function(error,collection){
								collection.update({username: username},{$set:{fav:""}}
									,function(err, data){
								if(data){
									console.log("Successfully Delete");
									//response.end('{"success" : "Updated Successfully", "status" : 200}');
									response.end('Successfully Delete');
								} else{
									console.log("Failed to Delete");
									response.end('Failed to Delete');
								}
								});
							});
						});
					}else{
						response.end('no_user');
					}
					}
					else if (obj['act'] == "showFav"){
						var username = obj.ac;

						var current_fav;
						if(username !=""){
							MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db){
							db.collection("user", function(error,collection){
								collection.find().toArray(function(err, items){
									console.log(items.length);
									if(items != ""){
										for (var i=0; i<items.length;i++){
											console.log("user Record "+ i +" = "+items[i].username);
											console.log("Fav "+ i +" = " + items[i].fav);
											console.log("user1= "+ username);
										//console.log("pass1= "+obj.pw);
											if (items[i].username ==obj.ac) {
												current_fav = items[i].fav;
												var current_fav_s = current_fav.toString();
												console.log("current user= "+items[i].username);
												console.log("current Fav= "+ current_fav_s);
												console.log("Fav FOUND CONFIGURATION");
												break;
												}
											}response.end(current_fav_s);
										}
									else{
										console.log("Failed to found");
										response.end('Failed to found');
										}
									});
								});	
							});
						}else {response.end('no_user');}								
					} //end of show Favortie
				});	
			}
			/*else if(request.method=="GET"){
				console.log("Get call");
				var formData = "", msg = "", obj ="";
				return request.on("data", function(data){
					formData += data;
				}).on('end', function(chunk){
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
					console.log("305cde= "+msg);
					obj = JSON.parse(msg);
					username = obj.ac;
					console.log("action = " +obj['act']);
					if (obj['act'] == "showFav"){
						var username = obj.ac;
						console.log("Current user = "+ username);
						db.collection("user", function(error,collection){
							collection.find({username: username},function(err,data){
								if(data){
									var current_fav = data.fav;
									console.log("Successfully Found Favorite");
									response.end(current_fav);
								}
								else{
									console.log("Fail to found Favorite");
									response.end("Fail");
								}
							})
						})


					}

				});
			}*/
			/*else if(request.method=="GET"){
					console.log("Get call");
					var formData = "", msg = "", obj ="";
					return request.on("data", function(data){
						formData += data;
						}).on('end', function(chunk){
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						console.log("305cde= "+msg);
						obj = JSON.parse(msg);
						username = obj.ac;
						console.log("action = " +obj['act']);
						if (obj['act'] == "showFav"){
							var username = obj.ac;
							var current_fav;
							MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db){
							db.collection("user", function(error,collection){
								collection.find().toArray(function(err, items){
									console.log(items.length);
									if(items != ""){
										for (var i=0; i<items.length;i++){
											console.log("user Record "+ i +" = "+items[i].username);
											console.log("Fav "+ i +" = " + items[i].fav);
											console.log("user1= "+ username);
											//console.log("pass1= "+obj.pw);
											if (items[i].username ==obj.ac) {
												current_fav = items[i].fav;
												var current_fav_s = current_fav.toString();
												console.log("current user= "+items[i].username);
												console.log("current Fav= "+ current_fav_s);
												console.log("Fav FOUND CONFIGURATION");
											
											isLoginSuccessful = true;
											break;
										}
									}response.end("Favorite FOUND Successfully");
								}
								else{
									console.log("Failed to found");
									response.end("Failed to found");
								}
							});
						});
					});
					}
					else{
							fs.readFile("./" + request.url, function(err, data){

							var dotoffset = request.url.lastIndexOf(".");
							var mimetype = dotoffset == -1
							? "text/plain"
							: {
							".html": "text/html",
							".ico" : "photo/x-icon",
							".jpg" : "photo/jpeg",
							".png" : "photo/png",
							".gif" : "photo/gif",
							".css" : "text/css",
							".js"  : "text/javascript"
							}[request.url.substr(dotoffset)];
							if (!err) {
								response.setHeader("Content-Type", mimetype);
								response.end(data);
								console.log(request.url, mimetype);
							} else {
								response.writeHead(302, {"Location": "./index.html"});
								response.end();
							}
							});
						}

			});
}*/
				else{
					fs.readFile("./" + request.url, function(err, data){

						var dotoffset = request.url.lastIndexOf(".");
						var mimetype = dotoffset == -1
						? "text/plain"
						: {
							".html": "text/html",
						".ico" : "photo/x-icon",
						".jpg" : "photo/jpeg",
						".png" : "photo/png",
						".gif" : "photo/gif",
						".css" : "text/css",
						".js"  : "text/javascript",
						".pdf" : "application/pdf"
						}[request.url.substr(dotoffset)];
						if (!err) {
							response.setHeader("Content-Type", mimetype);
							response.end(data);
							console.log(request.url, mimetype);
						} else {
							response.writeHead(302, {"Location": "./index.html"});
							response.end();
						}
					});
				}
				
			
		
	
});

server.listen(5000);

console.log("Server running at http://127.0.0.1:5000/");
