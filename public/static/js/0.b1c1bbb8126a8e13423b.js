webpackJsonp([0],{41:function(t,e,a){var n=a(14)(a(44),a(46),null,null);t.exports=n.exports},44:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{userName:"",age:""}},created:function(){var t=this;this.axios.get("http://localhost:3002/api/home/list",{params:{ID:12345}}).then(function(e){console.log(e.data.data),t.userName=e.data.data.username,t.age=e.data.data.age}).catch(function(t){console.log(t)})},mounted:function(){},methods:{}}},45:function(t,e,a){t.exports=a.p+"static/img/logo.82b9c7a.png"},46:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("img",{attrs:{src:a(45),width:"52"}}),t._v(" "),n("div",{staticClass:"box"},[n("h3",[t._v("detail")]),t._v(" "),n("div",[t._v(t._s(t.userName))]),t._v(" "),n("div",[t._v(t._s(t.age))]),t._v(" "),n("router-link",{attrs:{to:{name:"detail"}}},[t._v("detail")])],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=0.b1c1bbb8126a8e13423b.js.map