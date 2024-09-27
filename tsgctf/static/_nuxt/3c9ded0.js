(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{599:function(t,e,r){"use strict";r(326);var o={name:"CheckCircleIcon",emits:["click"],props:{title:{type:String},fillColor:{type:String,default:"currentColor"},size:{type:Number,default:24}}},c=r(59),component=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("span",t._b({staticClass:"material-design-icon check-circle-icon",attrs:{"aria-hidden":!t.title||null,"aria-label":t.title,role:"img"},on:{click:function(e){return t.$emit("click",e)}}},"span",t.$attrs,!1),[e("svg",{staticClass:"material-design-icon__svg",attrs:{fill:t.fillColor,width:t.size,height:t.size,viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"}},[t.title?e("title",[t._v(t._s(t.title))]):t._e()])])])}),[],!1,null,null,null);e.a=component.exports},609:function(t,e,r){var content=r(641);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(152).default)("78cb3dfa",content,!0,{sourceMap:!1})},640:function(t,e,r){"use strict";r(609)},641:function(t,e,r){var o=r(151)((function(i){return i[1]}));o.push([t.i,".Scoreboard table .place{padding-right:1rem;text-align:right;width:6rem}.Scoreboard .team{max-width:18rem;overflow:hidden;text-overflow:ellipsis}.Scoreboard .team-flag{background-position:50%;background-repeat:no-repeat;background-size:contain;display:inline-block;height:18px;width:27px}.Scoreboard .team-name>*{vertical-align:middle}.Scoreboard tr.active{background:rgba(255,0,0,.3)}",""]),o.locals={},t.exports=o},667:function(t,e,r){"use strict";r.r(e);r(48),r(23),r(28),r(38),r(39),r(35),r(15),r(26);var o=r(14),c=r(4),n=(r(101),r(29),r(53)),l=r(599);function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var v={components:{IsoLink:r(201).a,CheckCircle:l.a},asyncData:function(t){return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.store.dispatch("scoreboard/update",t);case 2:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"Scoreboard - TSG CTF"}},computed:f(f({},Object(n.b)({scoreboard:"scoreboard/getScoreboard"})),Object(n.c)({isStatic:"isStatic",myTeam:"team"})),mounted:function(){var t=this;this.isStatic||(this.$store.dispatch("scoreboard/update",{$axios:this.$axios}),this.interval=setInterval((function(){t.$store.dispatch("scoreboard/updateScoreboard",{$axios:t.$axios})}),6e4))},destroyed:function(){clearInterval(this.interval)},methods:{getFlagStyle:function(t){return null===t||""===t?{backgroundColor:"transparent"}:{backgroundImage:"url(https://cdn.jsdelivr.net/gh/behdad/region-flags@gh-pages/svg/".concat(t.toUpperCase(),".svg)")}}}},h=(r(640),r(59)),component=Object(h.a)(v,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"Scoreboard"},[t._m(0),t._v(" "),e("div",{staticClass:"table-wrap"},[e("table",{staticClass:"scoreboard"},[t._m(1),t._v(" "),e("tbody",t._l(t.scoreboard,(function(r){return e("tr",{key:r.id,class:{active:r.account_id===t.myTeam.id}},[e("th",{staticClass:"place",attrs:{scope:"row"}},[t._v(t._s(r.pos))]),t._v(" "),e("td",{staticClass:"team"},[e("div",{staticClass:"team-flag",style:t.getFlagStyle(r.country)}),t._v(" "),e("iso-link",{staticClass:"team-name",attrs:{to:"/teams/".concat(r.account_id)}},[e("span",[t._v(t._s(r.name))])])],1),t._v(" "),e("td",[t._v(t._s(r.score))])])})),0)])])])}),[function(){var t=this,e=t._self._c;return e("h2",{staticClass:"title"},[e("span",[t._v("Score"),e("wbr"),t._v("board")])])},function(){var t=this,e=t._self._c;return e("thead",[e("tr",[e("td",{staticClass:"place",attrs:{scope:"col"}},[e("b",[t._v("Place")])]),t._v(" "),e("td",{attrs:{scope:"col"}},[e("b",[t._v("Team")])]),t._v(" "),e("td",{attrs:{scope:"col"}},[e("b",[t._v("Score")])])])])}],!1,null,null,null);e.default=component.exports}}]);