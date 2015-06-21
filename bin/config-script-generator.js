var program=require("commander"),async=require("async"),config=require("../config"),path=require("path"),gaikan=require("gaikan"),fs=require("fs"),data={taracot_port:config.port,taracot_ip:"127.0.0.1",dir:path.join(__dirname,"..").replace(/\\/g,"/"),listen_ip:"127.0.0.1",listen_port:"80",servername:"",first_name:"",pname:"",user:config.uid||"root"};program.version(config.taracotjs).parse(process.argv),async.series([function(e){console.log("This script will generate NGINX server config and init.d/monit scripts for you.\n"),program.confirm("Continue? ",function(n){n?e():(console.log("\n\nAborted"),process.exit(code=0))})},function(e){program.prompt("\nAn IP address NGINX will listen to: ",function(n){return n?(data.listen_ip=n,console.log("* NGINX will listen to IP address: "+data.listen_ip),void e()):e("You have to set the listen IP.")})},function(e){program.prompt("\nA port NGINX will listen to [80]: ",function(n){n&&(data.listen_port=n),console.log("* NGINX will listen to port: "+data.listen_port),e()})},function(e){program.prompt("\nServer name(s), separated by space: ",function(n){if(!n)return e("You have to set the server name(s).");data.servername=n,console.log("* Server name(s) set to: "+data.servername);var o=data.servername.split(" ");data.pname=o[0].replace(/\./g,"_").replace(/\-/g,"_"),data.first_name=o[0],e()})},function(e){console.log("\nGenerating NGINX configuration file...");var n=gaikan.compileFromFile("nginx.template"),o=n(gaikan,data,void 0);fs.writeFile("./nginx/"+data.pname+".conf",o,function(n){return n?e(n):(console.log("\nThe file "+data.pname+".conf was saved!"),void e())})},function(e){console.log("\nGenerating init.d script...");var n=gaikan.compileFromFile("initd.template"),o=n(gaikan,data,void 0),a=data.pname.replace(/\./g,"_").replace(/\-/g,"_");fs.writeFile("./init.d/taracot-"+a,o,function(n){return n?e(n):(console.log("\nThe file "+a+" was saved!"),void e())})},function(e){console.log("\nGenerating monit script...");var n=gaikan.compileFromFile("monit.template"),o=n(gaikan,data,void 0),a=data.pname.replace(/\./g,"_").replace(/\-/g,"_");fs.writeFile("./monit/"+a+".monit",o,function(n){return n?e(n):(console.log("\nThe file "+a+".monit was saved!"),void e())})}],function(e){e&&(console.log("\nScript failed"),console.log(e),process.exit(1)),console.log("\nFinished"),process.exit(code=0)});