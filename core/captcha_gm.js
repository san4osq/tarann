var gm=require("gm"),captcha={generate:function(r){var a={},t=gm(100,50,"#fefefe").setFormat("png");t.font("../fonts/serrific_grunge.ttf");for(var o=10,n=0;10>n;n++){var e="#"+Math.floor(6777215*Math.random()+1e6).toString(16);t.stroke(e),t.drawLine(80*Math.random()+10,40*Math.random()+5,80*Math.random()+10,40*Math.random()+5)}r=r.toString().split("");for(var f=0;4>f;f++){var m="#"+Math.floor(3777215*Math.random()).toString(16);t.stroke(m);var d=r[f];t.fontSize(15+parseInt(10*Math.random())),t.drawText(o,25,d),o+=16+parseInt(10*Math.random());var h=1;Math.random()<.5&&(h=-1),t.rotate("#f5f5f5",parseInt(6*Math.random()*h))}return t.crop(100,50,0,0),a.b64=void 0,a.png=t,a}};module.exports=captcha;