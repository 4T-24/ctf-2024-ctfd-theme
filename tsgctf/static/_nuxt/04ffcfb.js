(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{595:function(t,e,r){"use strict";var o=0;function n(t){if(!o){var s=document.createElement("script");s.setAttribute("src",t),document.body.appendChild(s),o=new Promise((function(t){s.onload=function(){t(window.twttr)}}))}return o}var l={id:{type:String,required:!0},sourceType:{type:String},slug:{type:String},options:Object};t.exports={addPlatformScript:n,twitterEmbedComponent:function(t){return{data:function(){return{isLoaded:!1,isAvailable:!1}},props:Object.assign({},l,t.props),mounted:function(){var e,r=this;e="profile"===this.sourceType?{sourceType:this.sourceType,screenName:this.id}:"list"===this.sourceType?{sourceType:this.sourceType,ownerScreenName:this.id,slug:this.slug}:this.id,Promise.resolve(window.twttr?window.twttr:n("//platform.twitter.com/widgets.js")).then((function(o){return t.embedComponent(o,e,r.$el,r.options)})).then((function(data){r.isAvailable=void 0!==data,r.isLoaded=!0}))},render:function(t){if(this.isLoaded&&this.isAvailable)return t("div",{class:this.$props.widgetClass});if(this.isLoaded&&!this.isAvailable&&this.$props.errorMessage){var e=t("div",{class:this.$props.errorMessageClass,domProps:{innerHTML:this.$props.errorMessage}});return t("div",[e])}return t("div",{class:this.$props.widgetClass},this.$slots.default)}}}}},600:function(t,e,r){var content=r(621);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(152).default)("5ca2c016",content,!0,{sourceMap:!1})},616:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"Tweet",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(e,"Moment",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(e,"Timeline",{enumerable:!0,get:function(){return l.default}});var o=c(r(617)),n=c(r(618)),l=c(r(619));function c(t){return t&&t.__esModule?t:{default:t}}},617:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=(0,r(595).twitterEmbedComponent)({embedComponent:function(t){for(var e,r=arguments.length,o=new Array(r>1?r-1:0),n=1;n<r;n++)o[n-1]=arguments[n];return(e=t.widgets).createTweetEmbed.apply(e,o)},props:{errorMessage:{type:String,default:"Whoops! We couldn't access this Tweet."},errorMessageClass:{type:String,required:!1},widgetClass:{type:String,required:!1}}}),n=o;e.default=n},618:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=(0,r(595).twitterEmbedComponent)({embedComponent:function(t){for(var e,r=arguments.length,o=new Array(r>1?r-1:0),n=1;n<r;n++)o[n-1]=arguments[n];return(e=t.widgets).createMoment.apply(e,o)},props:{errorMessage:{type:String,default:"Whoops! We couldn't access this Moment."},errorMessageClass:{type:String,required:!1},widgetClass:{type:String,required:!1}}}),n=o;e.default=n},619:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=(0,r(595).twitterEmbedComponent)({embedComponent:function(t){for(var e,r=arguments.length,o=new Array(r>1?r-1:0),n=1;n<r;n++)o[n-1]=arguments[n];return(e=t.widgets).createTimeline.apply(e,o)},props:{errorMessage:{type:String,default:"Whoops! We couldn't access this Timeline."},errorMessageClass:{type:String,required:!1},widgetClass:{type:String,required:!1}}}),n=o;e.default=n},620:function(t,e,r){"use strict";r(600)},621:function(t,e,r){var o=r(151),n=r(331),l=r(332),c=o((function(i){return i[1]})),m=n(l);c.push([t.i,'.About h3{font-family:"Fredoka One",cursive;font-size:2rem;font-weight:300;letter-spacing:1px;margin-bottom:1rem;margin-top:3rem;text-align:center;text-transform:uppercase;word-break:break-word}.About .period{font-size:3rem;line-height:3rem;text-align:center}.About ol,.About p,.About ul{font-family:"Roboto";font-size:1.4rem;line-height:2rem;margin:0 auto;max-width:50rem;width:100%}.About ul.socials{display:flex;flex-wrap:wrap;justify-content:center;padding:0}.About ul.socials li{align-items:center;display:flex;flex:0 0 20rem;flex-direction:column;font-size:1rem;height:30rem;margin:0 1rem .6rem;overflow-y:auto}.About img{display:block;margin:0 auto 1rem;max-width:30rem;width:80vw}.About a{color:#90cbff}.About [\\:has\\(\\.twitter-timeline\\)]{width:100%}.About :has(.twitter-timeline){width:100%}.About .ojigineko{background:url('+m+");background-size:cover;display:inline-block;margin-bottom:0;margin-left:.2rem;opacity:0;transition:opacity .2s;width:1rem}.About .member:hover .ojigineko{opacity:.3}",""]),c.locals={},t.exports=c},661:function(t,e,r){"use strict";r.r(e);r(48);var o=[function(){var t=this._self._c;return t("h2",{staticClass:"title"},[t("span",[this._v("About")])])},function(){var t=this,e=t._self._c;return e("p",{staticClass:"period"},[e("a",{attrs:{href:"https://www.timeanddate.com/worldclock/fixedtime.html?iso=20231104T16&p1=248",target:"_blank",rel:"noopener noreferrer"}},[t._v("11/04 07:00")]),t._v("\n\t\t-\n\t\t"),e("a",{attrs:{href:"https://www.timeanddate.com/worldclock/fixedtime.html?iso=20231105T16&p1=248",target:"_blank",rel:"noopener noreferrer"}},[t._v("11/05 07:00")])])},function(){var t=this._self._c;return t("li",[t("iframe",{attrs:{src:"https://discord.com/widget?id=546339917459095552&theme=dark",allowtransparency:"true",frameborder:"0",width:"100%",height:"100%"}},[t("a",{attrs:{href:"https://discord.gg/xcZ3t9bC2A",target:"_blank",rel:"noopener noreferrer"}},[this._v("Discord")])])])},function(){var t=this,e=t._self._c;return e("p",[t._v("We are hiring engineers. Please see our employment page "),e("a",{attrs:{href:"https://recruit.flatt.tech/"}},[t._v("https://recruit.flatt.tech/")]),t._v(" and contact to "),e("a",{attrs:{href:"https://flatt.tech/contact/"}},[t._v("https://flatt.tech/contact/")])])},function(){var t=this,e=t._self._c;return e("ul",[e("li",[t._v("1st: 1,000USD")]),t._v(" "),e("li",[t._v("2nd: 500 USD")]),t._v(" "),e("li",[t._v("3rd: 200 USD")])])},function(){var t=this._self._c;return t("a",{attrs:{href:"https://tsg.ne.jp/",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://old.tsg.ne.jp/images/tsg-logo.png"}})])},function(){var t=this,e=t._self._c;return e("p",[t._v("\n\t\tTSG CTF is organized by "),e("a",{attrs:{href:"https://tsg.ne.jp/",target:"_blank",rel:"noopener noreferrer"}},[t._v("TSG")]),t._v(", the official computer society of The\n\t\tUniversity of Tokyo.\n\t")])},function(){var t=this._self._c;return t("a",{attrs:{href:"https://en.wiktionary.org/wiki/%E3%81%8A%E8%BE%9E%E5%84%80",target:"_blank",rel:"noopener noreferrer"}},[t("img",{staticClass:"ojigineko",attrs:{src:r(332),alt:"ojigineko"}})])}],n={components:{Timeline:r(616).Timeline},head:function(){return{title:"About - TSG CTF"}},data:function(){return{members:[{url:"https://twitter.com/hakatashi",name:"@hakatashi"},{url:"https://twitter.com/caphosra",name:"@caphosra"},{url:"https://twitter.com/__dAi00",name:"dai"},{url:"https://twitter.com/iwashiira",name:"@iwashiira"},{url:"https://twitter.com/jiei_univ",name:"@jiei_univ"},{url:"https://twitter.com/JP3BGY",name:"@JP3BGY"},{url:"https://twitter.com/khei4444",name:"@khei4444"},{url:"https://twitter.com/m1kit",name:"@m1kit"},{url:"https://twitter.com/moratorium08",name:"@moratorium08"},{url:"https://twitter.com/naan112358",name:"@naan112358"},{url:"https://twitter.com/n4o847",name:"@n4o847"},{url:"https://twitter.com/platypus999",name:"@platypus999"},{url:"https://twitter.com/sasakiy84",name:"@sasakiy84"},{url:"https://twitter.com/satos___jp",name:"@satos"},{url:"https://twitter.com/sitositositoo",name:"settyan117"},{url:"https://twitter.com/shell_mug",name:"@shell_mug"},{url:"https://twitter.com/syobon_hinata",name:"@syobon_hinata (fabon)"},{url:"https://twitter.com/shion_urei",name:"@shion_urei"}]}}},l=(r(620),r(59)),component=Object(l.a)(n,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"About"},[t._m(0),t._v(" "),e("h3",[t._v("Period")]),t._v(" "),t._m(1),t._v(" "),e("p",{style:{textAlign:"center"}},[t._v("(UTC)")]),t._v(" "),e("h3",[t._v("Socials")]),t._v(" "),e("ul",{staticClass:"socials"},[t._m(2),t._v(" "),e("li",[e("timeline",{attrs:{id:"tsgctf","source-type":"profile",options:{tweetLimit:"3",theme:"dark",height:"500"}}},[e("a",{attrs:{href:"https://twitter.com/tsgctf",target:"_blank",rel:"noopener noreferrer"}},[t._v("Tweets from @tsgctf")])])],1)]),t._v(" "),e("h3",[t._v("Sponsor")]),t._v(" "),e("a",{attrs:{href:"https://flatt.tech/",target:"_blank",rel:"noopener noreferrer"}},[e("img",{style:{maxWidth:"60rem"},attrs:{src:"https://ctf.tsg.ne.jp/images/flatt_image.png"}})]),t._v(" "),e("p",[t._v("Flatt Security Inc. is a cyber security startup based in Tokyo, Japan.")]),t._v(" "),e("p",[t._v("We provide a variety of cyber security services, including security assessment.  We also develop and provide security software “Shisho Cloud” for client companies.")]),t._v(" "),t._m(3),t._v(" "),e("h3",[t._v("Prizes")]),t._v(" "),t._m(4),t._v(" "),e("h3",[t._v("Staffs")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),e("p",[t._v("Below is the full list of TSG members who contributed to this TSG CTF 2023 in success. So many thanks!!")]),t._v(" "),e("ul",{staticClass:"members"},t._l(t.members,(function(r){return e("li",{key:r,staticClass:"member"},[e("a",{attrs:{href:r.url,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(r.name))]),t._v(" "),t._m(7,!0)])})),0)])}),o,!1,null,null,null);e.default=component.exports}}]);