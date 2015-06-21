function generateId(o){o||(o=16);for(var n="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;o>i;i++)n+=r.charAt(Math.floor(Math.random()*r.length));return n}function ensure_indexes(o,n,r,i,e){var t={unique:!1,background:!0,dropDups:!1,w:1};r&&(t=r);for(var s=[],c=0;c<n.length;c++){var g={};if(g[n[c]]=1,s.push({col:o,ix:g}),!i){var p={};p[n[c]]=-1,s.push({col:o,ix:p})}}async.every(s,function(o,n){db.collection(o.col).ensureIndex(o.ix,function(){n(!0)})},function(o){e()})}var program=require("commander"),async=require("async"),crypto=require("crypto"),config=require("../config"),mongoclient=require("mongodb").MongoClient,fs=require("fs"),db;program.version(config.taracotjs).option("-m, --mongo [url]","Specify MongoDB connect URL").option("-r, --redishost [host]","Specify Redis host").option("-j, --redisport [port]","Specify Redis port").option("-p, --port [port]","Specify TaracotJS server port").option("-i, --uid [uid]","Set user ID").option("-g, --gid [gid]","Set group ID").option("-s, --silent","Don't ask anything (perform silently)").parse(process.argv);var mongo_url=program.mongo||config.mongo.url,redis_host=program.redishost||config.redis.host,redis_port=program.redisport||config.redis.port,port=program.port||config.port,uid=program.uid||config.uid,gid=program.gid||config.gid;async.series([function(o){return console.log("This script will guide you with TaracotJS basic installation steps.\n"),console.log("A working MongoDB connection is required."),console.log("Current MongoDB URL: "+mongo_url+"\n"),program.silent||program.mongo?o():void program.confirm("Do you wish to specify MongoDB connection parameters? ",function(n){if(n){var r="localhost",i="",e="",t="taracotjs";program.prompt("\nHost [localhost]: ",function(n){n&&(r=n),program.prompt("\nUsername [none]: ",function(n){n&&(i=n),program.prompt("\nPassword [none]: ",function(n){n&&(e=n),program.prompt("\nDatabase [taracotjs]: ",function(n){return n&&(t=n),mongo_url="mongodb://",i&&(mongo_url+=i),i&&e&&(mongo_url+=":"+e),i&&(mongo_url+="@"),r&&(mongo_url+=r),t&&(mongo_url+="/"+t),console.log("\nMongoDB URL is now: "+mongo_url+"\n"),o()})})})})}else o()})},function(o){mongoclient.connect(mongo_url,config.mongo_options,function(n,r){n&&(console.log("\nCould not connect to the MongoDB. Please check config.js"),console.log(n),process.exit(1)),console.log("\nSuccessfully connected to MongoDB!\n"),db=r,o()})},function(o){return program.silent||program.redishost||program.redisport?o():void program.confirm("Do you wish to specify Redis host and port? ",function(n){if(n){var r="localhost",i="6379";program.prompt("\nHost [localhost]: ",function(n){n&&(r=n),program.prompt("\nPort [6379]: ",function(n){return n&&(i=n),redis_host=r,redis_port=i,console.log("\nRedis host is now: "+redis_host+", Redis port is now: "+redis_port+"\n"),o()})})}else o()})},function(o){return program.silent||program.port?o():void program.confirm("Do you wish to specify TaracotJS internal server port? ",function(n){if(n){var r="3000";program.prompt("\nPort [3000]: ",function(n){return n&&(r=n),port=r,console.log("\nTaracotJS internal server port is now: "+port+"\n"),o()})}else o()})},function(o){return program.silent||program.uid||program.gid?o():void program.confirm("Do you wish to specify UID and GID? ",function(n){if(n){var r="",i="";program.prompt("\nUID [none]: ",function(n){n&&(r=n),program.prompt("\nGID [none]: ",function(n){return n&&(i=n),uid=r,gid=i,console.log("\nUID/GID are now set: "+uid+"/"+gid+"\n"),o()})})}else o()})},function(o){mongo_url!=config.mongo.url||redis_host!=config.redis.host||redis_port!=config.redis.port||port!=config.port||gid!=config.gid||uid!=config.uid?(config.mongo.url=mongo_url,config.redis.host=redis_host,config.redis.port=redis_port,config.port=port,config.uid=uid,config.gid=gid,console.log("Saving changes to config.js file\n"),fs.writeFile("../config.js","var config = "+JSON.stringify(config,null,"	")+";\n\nmodule.exports = config;",function(n){n&&(console.log("\nCould not save config.js file. Check your permissions"),console.log(n),process.exit(1)),console.log("... success\n"),o()})):o()},function(o){return program.silent?o():void program.confirm("Installation script can generate random secrets and salt. Continue? ",function(n){n?(config.cookie.secret=generateId(32),config.session.secret=generateId(32),config.salt=generateId(64),fs.writeFile("../config.js","var config = "+JSON.stringify(config,null,"	")+";\n\nmodule.exports = config;",function(n){n&&(console.log("\nCould not save config.js file. Check your permissions"),console.log(n),process.exit(1)),console.log("... success"),o()})):(console.log("\nNote: it's important to set your own secrets for security purposes!"),o())})}],function(o){o&&(console.log("\nInstallation failed"),console.log(o),process.exit(1)),console.log("\nFinished"),process.exit(code=0)});var dummy=function(){};