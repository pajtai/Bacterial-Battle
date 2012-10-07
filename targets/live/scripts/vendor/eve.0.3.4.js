// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.3.4 - JavaScript Events Library                                                │ \\
// ├──────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)          │ \\
// │ Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license. │ \\
// └──────────────────────────────────────────────────────────────────────────────────────┘ \\

define([],function(){var e="0.3.4",t="hasOwnProperty",n=/[\.\/]/,r="*",i=function(){},s=function(e,t){return e-t},o,u,a={n:{}},f=function(e,t){var n=a,r=u,i=Array.prototype.slice.call(arguments,2),l=f.listeners(e),c=0,h=!1,p,d=[],v={},m=[],g=o,y=[];o=e,u=0;for(var b=0,w=l.length;b<w;b++)"zIndex"in l[b]&&(d.push(l[b].zIndex),l[b].zIndex<0&&(v[l[b].zIndex]=l[b]));d.sort(s);while(d[c]<0){p=v[d[c++]],m.push(p.apply(t,i));if(u)return u=r,m}for(b=0;b<w;b++){p=l[b];if("zIndex"in p)if(p.zIndex==d[c]){m.push(p.apply(t,i));if(u)break;do{c++,p=v[d[c]],p&&m.push(p.apply(t,i));if(u)break}while(p)}else v[p.zIndex]=p;else{m.push(p.apply(t,i));if(u)break}}return u=r,o=g,m.length?m:null};return f.listeners=function(e){var t=e.split(n),i=a,s,o,u,f,l,c,h,p,d=[i],v=[];for(f=0,l=t.length;f<l;f++){p=[];for(c=0,h=d.length;c<h;c++){i=d[c].n,o=[i[t[f]],i[r]],u=2;while(u--)s=o[u],s&&(p.push(s),v=v.concat(s.f||[]))}d=p}return v},f.on=function(e,t){var r=e.split(n),s=a;for(var o=0,u=r.length;o<u;o++)s=s.n,!s[r[o]]&&(s[r[o]]={n:{}}),s=s[r[o]];s.f=s.f||[];for(o=0,u=s.f.length;o<u;o++)if(s.f[o]==t)return i;return s.f.push(t),function(e){+e==+e&&(t.zIndex=+e)}},f.stop=function(){u=1},f.nt=function(e){return e?(new RegExp("(?:\\.|\\/|^)"+e+"(?:\\.|\\/|$)")).test(o):o},f.unbind=function(e,i){var s=e.split(n),o,u,f,l,c,h,p,d=[a];for(l=0,c=s.length;l<c;l++)for(h=0;h<d.length;h+=f.length-2){f=[h,1],o=d[h].n;if(s[l]!=r)o[s[l]]&&f.push(o[s[l]]);else for(u in o)o[t](u)&&f.push(o[u]);d.splice.apply(d,f)}for(l=0,c=d.length;l<c;l++){o=d[l];while(o.n){if(i){if(o.f){for(h=0,p=o.f.length;h<p;h++)if(o.f[h]==i){o.f.splice(h,1);break}!o.f.length&&delete o.f}for(u in o.n)if(o.n[t](u)&&o.n[u].f){var v=o.n[u].f;for(h=0,p=v.length;h<p;h++)if(v[h]==i){v.splice(h,1);break}!v.length&&delete o.n[u].f}}else{delete o.f;for(u in o.n)o.n[t](u)&&o.n[u].f&&delete o.n[u].f}o=o.n}}},f.once=function(e,t){var n=function(){var r=t.apply(this,arguments);return f.unbind(e,n),r};return f.on(e,n)},f.version=e,f.toString=function(){return"You are running Eve "+e},f})