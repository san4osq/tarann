var ObjectId=require("mongodb").ObjectID;module.exports=function(e){var r={check:function(r,t){return r.session&&r.session.auth&&r.session.auth._id?void e.get("mongodb").collection("users").find({_id:new ObjectId(r.session.auth._id)},{limit:1}).toArray(function(e,r){if(!e&&r&&r.length){if(delete r[0].password,r[0]._id=r[0]._id.toHexString(),r[0].avatar="",r[0].groups){var o=r[0].groups.split(",");r[0].groups_hash={};for(var s=0;s<o.length;s++)r[0].groups_hash[o[s]]=!0}return t(r[0])}return t(!1)}):t(!1)}};return r};