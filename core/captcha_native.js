var captchapng=require("captchapng"),captcha={generate:function(a){var r={},e=function(){var r=new captchapng(80,30,a);return r.color(250,250,250,255),r.color(parseInt(100*Math.random()),parseInt(100*Math.random()),parseInt(100*Math.random()),255),new Buffer(r.getBase64(),"base64")};return r.b64=new Buffer(e()).toString("base64"),r.png=void 0,r}};module.exports=captcha;