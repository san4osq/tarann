var config=require("../config"),nodemailer=require("nodemailer"),sendmailTransport=require("nodemailer-sendmail-transport");module.exports=function(e){var r,t=require("../core/renderer")(e),i=require("html-entities").AllHtmlEntities,n=new i;"smtp"==config.mailer.transport&&(r=nodemailer.createTransport(config.mailer.smtp)),"sendmail"==config.mailer.transport&&(r=nodemailer.createTransport(sendmailTransport(config.mailer.sendmail)));var o={send:function(i,o,s,a,l,m,d,c){var g="";e.get("settings")&&e.get("settings").site_title&&(g=e.get("settings").site_title);var f=t.render_file(s,a,m),p=t.render_file(s,l,m),u=t.render_file("../views","mail",{title:o,message:f,site_title:g,site_url:config.protocol+"://"+d.get("host")});p&&(p=p.replace(/<br>/gim,"\n"));var v={from:config.mailer.sender,to:i,subject:o,text:p,html:n.encodeNonASCII(u)};r?r.sendMail(v,function(e,r){c&&(e?c(e):c())}):c&&c("No transporter defined")}};return o};