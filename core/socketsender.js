var crypto=require("crypto");module.exports=function(e){var t=e.get("redis_client"),i={emit:function(i,r,s){if(i&&r&&s){var o=(e.get("socket.io"),i+crypto.createHash("md5").update(e.get("config").salt+"."+i).digest("hex"));t.get(e.get("config").redis.prefix+"socketio_sessions_"+o,function(i,o){var n=[];o&&(n=o.split(","));for(var c=0;c<n.length;c++){var g={session:n[c],msg:s,msgtype:r};t.publish(e.get("config").redis.prefix+"medved_ipc",JSON.stringify(g))}})}}};return i};