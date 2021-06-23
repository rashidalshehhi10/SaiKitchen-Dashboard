!function(){"use strict";var e,t,r,n=tinymce.util.Tools.resolve("tinymce.PluginManager"),o=function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},i=function(){},a=function(e){return function(){return e}},c=a(!1),u=a(!0),s=function(){return l},l=(e=function(e){return e.isNone()},{fold:function(e,t){return e()},is:c,isSome:c,isNone:u,getOr:r=function(e){return e},getOrThunk:t=function(e){return e()},getOrDie:function(e){throw new Error(e||"error: getOrDie called on none.")},getOrNull:a(null),getOrUndefined:a(void 0),or:r,orThunk:t,map:s,each:i,bind:s,exists:c,forall:u,filter:s,equals:e,equals_:e,toArray:function(){return[]},toString:a("none()")}),m=function(e){var t=a(e),r=function(){return o},n=function(t){return t(e)},o={fold:function(t,r){return r(e)},is:function(t){return e===t},isSome:u,isNone:c,getOr:t,getOrThunk:t,getOrDie:t,getOrNull:t,getOrUndefined:t,or:r,orThunk:r,map:function(t){return m(t(e))},each:function(t){t(e)},bind:n,exists:n,forall:n,filter:function(t){return t(e)?o:l},toArray:function(){return[e]},toString:function(){return"some("+e+")"},equals:function(t){return t.is(e)},equals_:function(t,r){return t.fold(c,(function(t){return r(e,t)}))}};return o},d={some:m,none:s,from:function(e){return null==e?l:m(e)}},f=function(e){return function(t){return n=typeof(r=t),(null===r?"null":"object"===n&&(Array.prototype.isPrototypeOf(r)||r.constructor&&"Array"===r.constructor.name)?"array":"object"===n&&(String.prototype.isPrototypeOf(r)||r.constructor&&"String"===r.constructor.name)?"string":n)===e;var r,n}},h=f("string"),p=f("object"),g=f("array"),v=function(e){return!function(e){return null==e}(e)},w=Array.prototype.push,b=function(e,t){for(var r=0,n=e.length;r<n;r++){t(e[r],r)}},y=function(e){for(var t=[],r=0,n=e.length;r<n;++r){if(!g(e[r]))throw new Error("Arr.flatten item "+r+" was not an array, input: "+e);w.apply(t,e[r])}return t},x=function(e){var t=e;return{get:function(){return t},set:function(e){t=e}}},j=Object.keys,O=Object.hasOwnProperty,S=function(e,t){return _(e,t)?d.from(e[t]):d.none()},_=function(e,t){return O.call(e,t)},k=function(e){return e.getParam("media_scripts")},A=function(e){return e.getParam("media_live_embeds",!0)},T=tinymce.util.Tools.resolve("tinymce.util.Tools"),C=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),P=tinymce.util.Tools.resolve("tinymce.html.SaxParser"),D=function(e,t){if(e)for(var r=0;r<e.length;r++)if(-1!==t.indexOf(e[r].filter))return e[r]},$=C.DOM,M=function(e){return e.replace(/px$/,"")},F=function(e,t){var r=x(!1),n={};return P({validate:!1,allow_conditional_comments:!0,start:function(t,o){if(r.get());else if(_(o.map,"data-ephox-embed-iri"))r.set(!0),n=function(e){var t=e.map.style,r=t?$.parseStyle(t):{};return{type:"ephox-embed-iri",source:e.map["data-ephox-embed-iri"],altsource:"",poster:"",width:S(r,"max-width").map(M).getOr(""),height:S(r,"max-height").map(M).getOr("")}}(o);else{if(n.source||"param"!==t||(n.source=o.map.movie),"iframe"!==t&&"object"!==t&&"embed"!==t&&"video"!==t&&"audio"!==t||(n.type||(n.type=t),n=T.extend(o.map,n)),"script"===t){var i=D(e,o.map.src);if(!i)return;n={type:"script",source:o.map.src,width:String(i.width),height:String(i.height)}}"source"===t&&(n.source?n.altsource||(n.altsource=o.map.src):n.source=o.map.src),"img"!==t||n.poster||(n.poster=o.map.src)}}}).parse(t),n.source=n.source||n.src||n.data,n.altsource=n.altsource||"",n.poster=n.poster||"",n},z=function(e){var t={mp3:"audio/mpeg",m4a:"audio/x-m4a",wav:"audio/wav",mp4:"video/mp4",webm:"video/webm",ogg:"video/ogg",swf:"application/x-shockwave-flash"}[e.toLowerCase().split(".").pop()];return t||""},N=tinymce.util.Tools.resolve("tinymce.html.Schema"),U=tinymce.util.Tools.resolve("tinymce.html.Writer"),E=C.DOM,R=function(e){return/^[0-9.]+$/.test(e)?e+"px":e},L=function(e,t){!function(e,t){for(var r=j(e),n=0,o=r.length;n<o;n++){var i=r[n];t(e[i],i)}}(t,(function(t,r){var n=""+t;if(e.map[r])for(var o=e.length;o--;){var i=e[o];i.name===r&&(n?(e.map[r]=n,i.value=n):(delete e.map[r],e.splice(o,1)))}else n&&(e.push({name:r,value:n}),e.map[r]=n)}))},I=["source","altsource"],q=function(e,t,r){var n,o=U(),i=x(!1),a=0;return P({validate:!1,allow_conditional_comments:!0,comment:function(e){o.comment(e)},cdata:function(e){o.cdata(e)},text:function(e,t){o.text(e,t)},start:function(e,c,u){if(i.get());else if(_(c.map,"data-ephox-embed-iri"))i.set(!0),function(e,t){var r=t.map.style,n=r?E.parseStyle(r):{};n["max-width"]=R(e.width),n["max-height"]=R(e.height),L(t,{style:E.serializeStyle(n)})}(t,c);else{switch(e){case"video":case"object":case"embed":case"img":case"iframe":void 0!==t.height&&void 0!==t.width&&L(c,{width:t.width,height:t.height})}if(r)switch(e){case"video":L(c,{poster:t.poster,src:""}),t.altsource&&L(c,{src:""});break;case"iframe":L(c,{src:t.source});break;case"source":if(a<2&&(L(c,{src:t[I[a]],type:t[I[a]+"mime"]}),!t[I[a]]))return;a++;break;case"img":if(!t.poster)return;n=!0}}o.start(e,c,u)},end:function(e){if(!i.get()){if("video"===e&&r)for(var c=0;c<2;c++)if(t[I[c]]){var u=[];u.map={},a<=c&&(L(u,{src:t[I[c]],type:t[I[c]+"mime"]}),o.start("source",u,!0))}if(t.poster&&"object"===e&&r&&!n){var s=[];s.map={},L(s,{src:t.poster,width:t.width,height:t.height}),o.start("img",s,!0)}}o.end(e)}},N({})).parse(e),o.getContent()},B=[{regex:/youtu\.be\/([\w\-_\?&=.]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$2?$4",allowFullscreen:!0},{regex:/youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/vimeo\.com\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc",allowFullscreen:!0},{regex:/vimeo\.com\/(.*)\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$2?title=0&amp;byline=0",allowFullscreen:!0},{regex:/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,type:"iframe",w:425,h:350,url:'maps.google.com/maps/ms?msid=$2&output=embed"',allowFullscreen:!1},{regex:/dailymotion\.com\/video\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0},{regex:/dai\.ly\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0}],W=function(e,t){for(var r=function(e){var t=e.match(/^(https?:\/\/|www\.)(.+)$/i);return t&&t.length>1?"www."===t[1]?"https://":t[1]:"https://"}(t),n=e.regex.exec(t),o=r+e.url,i=function(e){o=o.replace("$"+e,(function(){return n[e]?n[e]:""}))},a=0;a<n.length;a++)i(a);return o.replace(/\?$/,"")},G=function(e,t){var r=T.extend({},t);if(!r.source&&(T.extend(r,F(k(e),r.embed)),!r.source))return"";r.altsource||(r.altsource=""),r.poster||(r.poster=""),r.source=e.convertURL(r.source,"source"),r.altsource=e.convertURL(r.altsource,"source"),r.sourcemime=z(r.source),r.altsourcemime=z(r.altsource),r.poster=e.convertURL(r.poster,"poster");var n,o,i=(n=r.source,(o=B.filter((function(e){return e.regex.test(n)}))).length>0?T.extend({},o[0],{url:W(o[0],n)}):null);if(i&&(r.source=i.url,r.type=i.type,r.allowfullscreen=i.allowFullscreen,r.width=r.width||String(i.w),r.height=r.height||String(i.h)),r.embed)return q(r.embed,r,!0);var a=D(k(e),r.source);a&&(r.type="script",r.width=String(a.width),r.height=String(a.height));var c=function(e){return e.getParam("audio_template_callback")}(e),u=function(e){return e.getParam("video_template_callback")}(e);return r.width=r.width||"300",r.height=r.height||"150",T.each(r,(function(t,n){r[n]=e.dom.encode(""+t)})),"iframe"===r.type?function(e){var t=e.allowfullscreen?' allowFullscreen="1"':"";return'<iframe src="'+e.source+'" width="'+e.width+'" height="'+e.height+'"'+t+"></iframe>"}(r):"application/x-shockwave-flash"===r.sourcemime?function(e){var t='<object data="'+e.source+'" width="'+e.width+'" height="'+e.height+'" type="application/x-shockwave-flash">';return e.poster&&(t+='<img src="'+e.poster+'" width="'+e.width+'" height="'+e.height+'" />'),t+"</object>"}(r):-1!==r.sourcemime.indexOf("audio")?function(e,t){return t?t(e):'<audio controls="controls" src="'+e.source+'">'+(e.altsource?'\n<source src="'+e.altsource+'"'+(e.altsourcemime?' type="'+e.altsourcemime+'"':"")+" />\n":"")+"</audio>"}(r,c):"script"===r.type?function(e){return'<script src="'+e.source+'"><\/script>'}(r):function(e,t){return t?t(e):'<video width="'+e.width+'" height="'+e.height+'"'+(e.poster?' poster="'+e.poster+'"':"")+' controls="controls">\n<source src="'+e.source+'"'+(e.sourcemime?' type="'+e.sourcemime+'"':"")+" />\n"+(e.altsource?'<source src="'+e.altsource+'"'+(e.altsourcemime?' type="'+e.altsourcemime+'"':"")+" />\n":"")+"</video>"}(r,u)},H=tinymce.util.Tools.resolve("tinymce.util.Promise"),J={},K=function(e){return function(t){return G(e,t)}},Q=function(e,t){var r=function(e){return e.getParam("media_url_resolver")}(e);return r?function(e,t,r){return new H((function(n,o){var i=function(r){return r.html&&(J[e.source]=r),n({url:e.source,html:r.html?r.html:t(e)})};J[e.source]?i(J[e.source]):r({url:e.source},i,o)}))}(t,K(e),r):function(e,t){return new H((function(r){r({html:t(e),url:e.source})}))}(t,K(e))},V=function(e,t){return S(t,e).bind((function(e){return S(e,"meta")}))},X=function(e,t,r){return function(n){var o,i=function(){return S(e,n)},a=function(){return S(t,n)},c=function(e){return S(e,"value").bind((function(e){return e.length>0?d.some(e):d.none()}))};return(o={})[n]=(n===r?i().bind((function(e){return p(e)?c(e).orThunk(a):a().orThunk((function(){return d.from(e)}))})):a().orThunk((function(){return i().bind((function(e){return p(e)?c(e):d.from(e)}))}))).getOr(""),o}},Y=function(e,t){var r={};return S(e,"dimensions").each((function(e){b(["width","height"],(function(n){S(t,n).orThunk((function(){return S(e,n)})).each((function(e){return r[n]=e}))}))})),r},Z=function(e,t){var r=t?V(t,e).getOr({}):{},n=X(e,r,t);return o(o(o(o(o({},n("source")),n("altsource")),n("poster")),n("embed")),Y(e,r))},ee=function(e){var t=o(o({},e),{source:{value:S(e,"source").getOr("")},altsource:{value:S(e,"altsource").getOr("")},poster:{value:S(e,"poster").getOr("")}});return b(["width","height"],(function(r){S(e,r).each((function(e){var n=t.dimensions||{};n[r]=e,t.dimensions=n}))})),t},te=function(e){return function(t){var r=t&&t.msg?"Media embed handler error: "+t.msg:"Media embed handler threw unknown error.";e.notificationManager.open({type:"error",text:r})}},re=function(e,t){return F(k(e),t)},ne=function(e,t){return function(r){if(h(r.url)&&r.url.trim().length>0){var n=r.html,i=re(t,n),a=o(o({},i),{source:r.url,embed:n});e.setData(ee(a))}}},oe=function(e,t){var r=e.dom.select("*[data-mce-object]");e.insertContent(t),function(e,t){for(var r=e.dom.select("*[data-mce-object]"),n=0;n<t.length;n++)for(var o=r.length-1;o>=0;o--)t[n]===r[o]&&r.splice(o,1);e.selection.select(r[0])}(e,r),e.nodeChanged()},ie=function(e,t,r){var n;t.embed=q(t.embed,t),t.embed&&(e.source===t.source||(n=t.source,J.hasOwnProperty(n)))?oe(r,t.embed):Q(r,t).then((function(e){oe(r,e.html)})).catch(te(r))},ae=function(e){var t=function(e){var t=e.selection.getNode(),r=function(e){return e.getAttribute("data-mce-object")||e.getAttribute("data-ephox-embed-iri")}(t)?e.serializer.serialize(t,{selection:!0}):"";return o({embed:r},F(k(e),r))}(e),r=x(t),n=ee(t),i=function(e){return e.getParam("media_dimensions",!0)}(e)?[{type:"sizeinput",name:"dimensions",label:"Constrain proportions",constrain:!0}]:[],a={title:"General",name:"general",items:y([[{name:"source",type:"urlinput",filetype:"media",label:"Source"}],i])},c={title:"Embed",items:[{type:"textarea",name:"embed",label:"Paste your embed code below:"}]},u=[];(function(e){return e.getParam("media_alt_source",!0)})(e)&&u.push({name:"altsource",type:"urlinput",filetype:"media",label:"Alternative source URL"}),function(e){return e.getParam("media_poster",!0)}(e)&&u.push({name:"poster",type:"urlinput",filetype:"image",label:"Media poster (Image URL)"});var s={title:"Advanced",name:"advanced",items:u},l=[a,c];u.length>0&&l.push(s);var m={type:"tabpanel",tabs:l},d=e.windowManager.open({title:"Insert/Edit Media",size:"normal",body:m,buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:function(t){var n=Z(t.getData());ie(r.get(),n,e),t.close()},onChange:function(t,n){switch(n.name){case"source":!function(t,r){var n=Z(r.getData(),"source");t.source!==n.source&&(ne(d,e)({url:n.source,html:""}),Q(e,n).then(ne(d,e)).catch(te(e)))}(r.get(),t);break;case"embed":!function(t){var r=Z(t.getData()),n=re(e,r.embed);t.setData(ee(n))}(t);break;case"dimensions":case"altsource":case"poster":!function(t,r){var n=Z(t.getData(),r),i=G(e,n);t.setData(ee(o(o({},n),{embed:i})))}(t,n.name)}r.set(Z(t.getData()))},initialData:n})},ce=tinymce.util.Tools.resolve("tinymce.html.Node"),ue=tinymce.util.Tools.resolve("tinymce.Env"),se=tinymce.util.Tools.resolve("tinymce.html.DomParser"),le=function(e,t){if(!1===function(e){return e.getParam("media_filter_html",!0)}(e))return t;var r,n=U();return P({validate:!1,allow_conditional_comments:!1,comment:function(e){r||n.comment(e)},cdata:function(e){r||n.cdata(e)},text:function(e,t){r||n.text(e,t)},start:function(t,o,i){if(r=!0,"script"!==t&&"noscript"!==t&&"svg"!==t){for(var a=o.length-1;a>=0;a--){var c=o[a].name;0===c.indexOf("on")&&(delete o.map[c],o.splice(a,1)),"style"===c&&(o[a].value=e.dom.serializeStyle(e.dom.parseStyle(o[a].value),t))}n.start(t,o,i),r=!1}},end:function(e){r||n.end(e)}},N({})).parse(t),n.getContent()},me=function(e){var t=e.name;return"iframe"===t||"video"===t||"audio"===t},de=function(e,t,r,n){void 0===n&&(n=null);var o=e.attr(r);return v(o)?o:_(t,r)?null:n},fe=function(e,t,r){var n="img"===t.name||"video"===e.name,o=n?"300":null,i="audio"===e.name?"30":"150",a=n?i:null;t.attr({width:de(e,r,"width",o),height:de(e,r,"height",a)})},he=function(e,t){var r=t.name,n=new ce("img",1);return n.shortEnded=!0,ge(e,t,n),fe(t,n,{}),n.attr({style:t.attr("style"),src:ue.transparentSrc,"data-mce-object":r,class:"mce-object mce-object-"+r}),n},pe=function(e,t){var r=t.name,n=new ce("span",1);n.attr({contentEditable:"false",style:t.attr("style"),"data-mce-object":r,class:"mce-preview-object mce-object-"+r}),ge(e,t,n);var o=e.dom.parseStyle(t.attr("style")),i=new ce(r,1);if(fe(t,i,o),i.attr({src:t.attr("src"),style:t.attr("style"),class:t.attr("class")}),"iframe"===r)i.attr({allowfullscreen:t.attr("allowfullscreen"),frameborder:"0"});else{b(["controls","crossorigin","currentTime","loop","muted","poster","preload"],(function(e){i.attr(e,t.attr(e))}));var a=n.attr("data-mce-html");v(a)&&function(e,t,r,n){for(var o=se({forced_root_block:!1,validate:!1},e.schema).parse(n,{context:t});o.firstChild;)r.append(o.firstChild)}(e,r,i,a)}var c=new ce("span",1);return c.attr("class","mce-shim"),n.append(i),n.append(c),n},ge=function(e,t,r){for(var n=t.attributes,o=n.length;o--;){var i=n[o].name,a=n[o].value;"width"!==i&&"height"!==i&&"style"!==i&&("data"!==i&&"src"!==i||(a=e.convertURL(a,i)),r.attr("data-mce-p-"+i,a))}var c=t.firstChild&&t.firstChild.value;c&&(r.attr("data-mce-html",escape(le(e,c))),r.firstChild=null)},ve=function(e){var t=e.attr("class");return t&&/\btiny-pageembed\b/.test(t)},we=function(e){for(;e=e.parent;)if(e.attr("data-ephox-embed-iri")||ve(e))return!0;return!1},be=function(e){e.on("preInit",(function(){var t=e.schema.getSpecialElements();T.each("video audio iframe object".split(" "),(function(e){t[e]=new RegExp("</"+e+"[^>]*>","gi")}));var r=e.schema.getBoolAttrs();T.each("webkitallowfullscreen mozallowfullscreen allowfullscreen".split(" "),(function(e){r[e]={}})),e.parser.addNodeFilter("iframe,video,audio,object,embed,script",function(e){return function(t){for(var r,n,o=t.length;o--;)(r=t[o]).parent&&(r.parent.attr("data-mce-object")||("script"!==r.name||(n=D(k(e),r.attr("src"))))&&(n&&(n.width&&r.attr("width",n.width.toString()),n.height&&r.attr("height",n.height.toString())),me(r)&&A(e)&&ue.ceFalse?we(r)||r.replace(pe(e,r)):we(r)||r.replace(he(e,r))))}}(e)),e.serializer.addAttributeFilter("data-mce-object",(function(t,r){for(var n,o,i,a,c,u,s,l,m=t.length;m--;)if((n=t[m]).parent){for(s=n.attr(r),o=new ce(s,1),"audio"!==s&&"script"!==s&&((l=n.attr("class"))&&-1!==l.indexOf("mce-preview-object")?o.attr({width:n.firstChild.attr("width"),height:n.firstChild.attr("height")}):o.attr({width:n.attr("width"),height:n.attr("height")})),o.attr({style:n.attr("style")}),i=(a=n.attributes).length;i--;){var d=a[i].name;0===d.indexOf("data-mce-p-")&&o.attr(d.substr(11),a[i].value)}"script"===s&&o.attr("type","text/javascript"),(c=n.attr("data-mce-html"))&&((u=new ce("#text",3)).raw=!0,u.value=le(e,unescape(c)),o.append(u)),n.replace(o)}}))})),e.on("SetContent",(function(){e.$("span.mce-preview-object").each((function(t,r){var n=e.$(r);0===n.find("span.mce-shim").length&&n.append('<span class="mce-shim"></span>')}))}))},ye=function(e,t){return function(r){return e.selection.selectorChangedWithUnbind(t.join(","),r.setActive).unbind}};n.add("media",(function(e){return function(e){e.addCommand("mceMedia",(function(){ae(e)}))}(e),function(e){e.ui.registry.addToggleButton("media",{tooltip:"Insert/edit media",icon:"embed",onAction:function(){e.execCommand("mceMedia")},onSetup:ye(e,["img[data-mce-object]","span[data-mce-object]","div[data-ephox-embed-iri]"])}),e.ui.registry.addMenuItem("media",{icon:"embed",text:"Media...",onAction:function(){e.execCommand("mceMedia")}})}(e),function(e){e.on("ResolveName",(function(e){var t;1===e.target.nodeType&&(t=e.target.getAttribute("data-mce-object"))&&(e.name=t)}))}(e),be(e),function(e){e.on("click keyup touchend",(function(){var t=e.selection.getNode();t&&e.dom.hasClass(t,"mce-preview-object")&&e.dom.getAttrib(t,"data-mce-selected")&&t.setAttribute("data-mce-selected","2")})),e.on("ObjectSelected",(function(e){"script"===e.target.getAttribute("data-mce-object")&&e.preventDefault()})),e.on("ObjectResized",(function(e){var t,r=e.target;r.getAttribute("data-mce-object")&&(t=r.getAttribute("data-mce-html"))&&(t=unescape(t),r.setAttribute("data-mce-html",escape(q(t,{width:String(e.width),height:String(e.height)}))))}))}(e),function(e){return{showDialog:function(){ae(e)}}}(e)}))}();