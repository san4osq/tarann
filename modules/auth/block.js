var auth_cache={},unauth_cache={};module.exports=function(e){var a=require("path"),n=new(require("i18n-2"))({locales:e.get("config").locales.avail,directory:a.join(__dirname,"lang"),extension:".js",devMode:e.get("config").locales.dev_mode}),r={data:function(r,i,t){var u=r.session.current_locale;n.setLocale(u);var c="",s="",_={};if(r.session.auth){if(r.session.auth.username&&auth_cache[u]&&auth_cache[u][r.session.auth.username])return t(auth_cache[u][r.session.auth.username]);c=e.get("renderer").render_file(a.join(__dirname,"views"),"block_auth",{lang:n},r),s=e.get("renderer").render_file(a.join(__dirname,"views"),"block_auth_li",{lang:n},r),auth_cache[u]||(auth_cache[u]={}),_.top=c,_.li=s,auth_cache[u][r.session.auth.username]=_}else{if(unauth_cache[u])return t(unauth_cache[u]);c=e.get("renderer").render_file(a.join(__dirname,"views"),"block_unauth",{lang:n},r),s=e.get("renderer").render_file(a.join(__dirname,"views"),"block_unauth_li",{lang:n},r),_.top=c,_.li=s,unauth_cache[u]=_}t(_)}};return r};