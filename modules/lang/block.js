var gaikan=require("gaikan");module.exports=function(i){var a=(i.get("config").locales.avail,require("path")),e=new(require("i18n-2"))({locales:i.get("config").locales.avail,directory:a.join(__dirname,"lang"),extension:".js",devMode:i.get("config").locales.dev_mode}),l=require("fs"),n=gaikan.compileFromFile(l.existsSync(a.join(__dirname,"views")+"/custom_flags.html")?a.join(__dirname,"views")+"/custom_flags.html":a.join(__dirname,"views")+"/flags.html"),o=gaikan.compileFromFile(l.existsSync(a.join(__dirname,"views")+"/custom_flags_submenu.html")?a.join(__dirname,"views")+"/custom_flags_submenu.html":a.join(__dirname,"views")+"/flags_submenu.html"),s=gaikan.compileFromFile(l.existsSync(a.join(__dirname,"views")+"/custom_part_mail_fields.html")?a.join(__dirname,"views")+"/custom_flags_li.html":a.join(__dirname,"views")+"/flags_li.html"),_=gaikan.compileFromFile(l.existsSync(a.join(__dirname,"views")+"/custom_parts_lang.html")?a.join(__dirname,"views")+"/custom_parts_lang.html":a.join(__dirname,"views")+"/parts_lang.html"),t={data:function(a,l,t){for(var g=a.session.current_locale,r=i.get("config").locales.avail[0],m={lang:e,current_lang_full:e.__("lang_"+g),current_lang:g,lang_list_html:""},c=a.get("host").replace(new RegExp("^"+r+"."),"").replace(new RegExp("^"+g+"."),""),u=0;u<i.get("config").locales.avail.length;u++){var v=c;i.get("config").locales.avail[u]!=r&&(v=i.get("config").locales.avail[u]+"."+c),m.lang_list_html+=_(gaikan,{lang:e,url:"//"+v+a.originalUrl,lng:i.get("config").locales.avail[u],lng_full:e.__("lang_"+i.get("config").locales.avail[u])})}var d=n(gaikan,m,void 0),f=o(gaikan,m,void 0),h=s(gaikan,m,void 0),p={top:d,li:h,submenu:f};t(p)}};return t};