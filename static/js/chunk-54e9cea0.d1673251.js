(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54e9cea0"],{8593:function(t,e,s){"use strict";s.d(e,"b",(function(){return r})),s.d(e,"a",(function(){return i}));var a=s("b775"),r=function(){return Object(a["a"])({url:"/sys/s",method:"get"})},i=function(){return Object(a["a"])({url:"/sys/i",method:"get"})}},8629:function(t,e,s){"use strict";s("cb06")},9406:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"big"},[s("el-row",[s("div",{staticClass:"card"},[s("el-col",{attrs:{xs:24,lg:16,md:16}},[s("div",{staticClass:"car-left"},[s("el-row",[s("div",[s("el-col",{attrs:{xs:20,lg:12,md:12}},[s("div",{staticClass:"text"},[s("h4",[t._v("欢迎，管理员， 请开始您一天的工作吧！")])])])],1)])],1)])],1)]),s("el-row",[s("el-card",{attrs:{shadow:"hover"}},[s("h2",[t._v(" 管理员使用手册："),s("a",{staticStyle:{color:"#409eff"},attrs:{target:"view_window",href:"https://www.yuque.com/sd6csu/ngd5zk/bcugiw"}},[t._v("https://www.yuque.com/sd6csu/ngd5zk/bcugiw")])]),s("br"),s("div")])],1),s("div",{staticClass:"bottom"},[s("el-row",[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"text item"},[s("span",[t._v("课程数量:"+t._s(t.state.Course))]),s("a",{staticStyle:{color:"#409eff"},attrs:{target:"view_window",href:t.baseUrl+"/courses/course"}},[t._v("了解详情")])]),s("br"),s("hr"),s("div",{staticClass:"text item"},[s("span",[t._v("作业数量:"+t._s(t.state.Exp))]),s("a",{staticStyle:{color:"#409eff"},attrs:{target:"view_window",href:t.baseUrl+"/courses/course"}},[t._v("了解详情")])]),s("br"),s("hr"),s("div",{staticClass:"text item"},[s("span",[t._v("用户数量:"+t._s(t.state.User))])]),s("br"),s("hr"),s("div",{staticClass:"textitem"},[s("span",[t._v("用户提交的作品数量:"+t._s(t.state.Submit))])]),s("br"),s("hr"),s("div",{staticClass:"textitem"},[s("span",[t._v("教师推荐的作品数量:"+t._s(t.state.Rec))])]),s("br")])],1)],1)],1)},r=[],i=s("1da1"),c=(s("96cf"),s("8593")),n={name:"dashboard",data:function(){return{state:{},baseUrl:""}},created:function(){this.reload(),this.baseUrl=window.location.origin},beforeDestroy:function(){clearInterval(this.timer),this.timer=null},methods:{reload:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["a"])();case 2:s=e.sent,a=s.data,t.state=a;case 5:case"end":return e.stop()}}),e)})))()}}},o=n,u=(s("8629"),s("2877")),l=Object(u["a"])(o,a,r,!1,null,"728d4ea4",null);e["default"]=l.exports},cb06:function(t,e,s){}}]);