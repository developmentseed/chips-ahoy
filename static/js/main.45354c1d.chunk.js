(window["webpackJsonpchips-ahoy"]=window["webpackJsonpchips-ahoy"]||[]).push([[0],{104:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),i=a.n(o),l=a(69),c=a.n(l),s=a(18),u=a(81),d=a(13),p=a(16),m=a(17),f=a(20),h=a(19),b=a(78),g=a.n(b),v=a(79),j=a.n(v),y=a(150),O=a(82),E=a(149),F=a(106),x=a(23),w=a(12),k=a(43),D=function(e){var t;return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),flexGrow:1,background:"rgb(250, 250, 250)"},appBarShift:{width:"calc(100% - ".concat(240,"px)"),marginLeft:240,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},toolbar:(t={minHeight:56},Object(k.a)(t,e.breakpoints.up("sm"),{minHeight:50}),Object(k.a)(t,"background","#ffc107"),t),menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:Object(w.a)(Object(w.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"space-between",backgroundColor:e.palette.primary.main,minHeight:"".concat(50,"px !important"),height:"".concat(50,"px !important")}),content:{flexGrow:1,height:"100vh",overflow:"auto"},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0},container:{marginTop:50,paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},button:{position:"absolute",right:"5px",color:"#fff !important",textTransform:"uppercase",textDecoration:"none",background:"#ed3330",display:"inline-block",border:"none",textAlign:"center",width:"180px"},nameFile:{marginLeft:"1.5rem",marginRight:"1.5rem"},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:"calc(100vh - ".concat(85,"px)")},progressbarContainer:{position:"relative",marginLeft:0,width:"calc(100vw - ".concat(720,"px)")}}},C=a(21),T=a(137),_=a(138),N=a(139),S=a(53),A=a(141),I=a(140),H=a(3),B=function(e){return{type:"DOWNLOAD_FILE",payload:{download:e}}},L=a(152),z=a(136),U=a(109),P=Object(U.a)({root:{height:"7px","& .MuiLinearProgress-dashedColorSecondary":{backgroundImage:"radial-gradient(#ed3330 0%, #ed3330 1%, transparent 2%)",animation:"none",backgroundColor:"#ed333052"}}});function R(e){var t=P();return r.a.createElement(L.a,{display:"flex",alignItems:"center"},r.a.createElement(L.a,{width:"100%",mr:1},r.a.createElement(z.a,Object.assign({variant:"buffer",color:"secondary",classes:{root:t.root}},e))),r.a.createElement(L.a,{minWidth:35},r.a.createElement(S.a,{variant:"subtitle2"},"".concat(Math.round(10*e.value)/10,"%"))))}var W=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).state={completed:0,buffer:0},n}return Object(m.a)(a,[{key:"calculateBuffer",value:function(){var e=this.props,t=e.totalFeatures,a=e.buffer,n=e.index;return t===n?{completed:0,buffer:0}:{completed:n/t*100,preload:a/t*100}}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.totalFeatures,n=this.calculateBuffer(),o=n.completed,i=n.preload;return 0===a?null:r.a.createElement("div",{className:t.progressbarContainer},r.a.createElement(R,{value:o,valueBuffer:i}))}}]),a}(n.Component),G=Object(x.a)(Object(s.b)((function(e){return{buffer:e.geojsonData.buffer,index:e.geojsonData.index,totalFeatures:e.geojsonData.totalFeatures}}),{}),Object(F.a)(D))(W),X=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(p.a)(this,a),(e=t.call(this)).downloadFile=e.downloadFile.bind(Object(C.a)(e)),e}return Object(m.a)(a,[{key:"downloadFile",value:function(){this.props.dispatch(B(!0))}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.fileName,n=e.totalFeatures;return r.a.createElement(T.a,{position:"fixed",className:t.appBar},r.a.createElement(_.a,{className:t.toolbar},r.a.createElement(N.a,{color:"inherit","aria-label":"open drawer",edge:"start",className:Object(H.a)(t.menuButton)},r.a.createElement(I.a,null)),r.a.createElement(S.a,{variant:"h6",noWrap:!0},"CHIP-AHOY"),r.a.createElement(S.a,{variant:"subtitle2",className:t.nameFile},a),r.a.createElement(G,null),0!==n?r.a.createElement(A.a,{className:t.button,color:"inherit",onClick:this.downloadFile},"Download"):null))}}]),a}(n.Component),J=Object(x.a)(Object(s.b)((function(e){return{fileName:e.geojsonData.fileName,totalFeatures:e.geojsonData.totalFeatures}})),Object(F.a)(D))(X),K=a(147),M=a(148),Y=a(108),V=a(75),q=a(83),Q=a(76);function Z(e){return function(t,a){var n=a().geojsonData.totalFeatures;if(e<0)return null;n>=e&&e>=0?t({type:"SET_INDEX",payload:{index:e}}):console.log("index out range")}}function $(e,t,a){return function(n){a>=e&&e>=0?n({type:"SET_FEATURE",payload:{feature:t.features[e]}}):console.log("index out range")}}function ee(e){return function(t,a){var n=a().geojsonData,r=n.index,o=n.data,i=n.totalFeatures;e.properties.__reviewed=!0,o.features[r]=e,t({type:"UPDATE_DATA",payload:{fData:o}}),t($(r,o,i)),t(Z(r+1)),t(function(e,t,a){return function(n){var r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:35;return e<=t?e>=t/2?{start:e-5,end:t+5}:{start:e,end:t+5}:{start:e-5,end:e+t-5}}(e),o=r.start,i=r.end;i>=a&&(i=a);var l,c=t.features.slice(o,i),s=[],u=Object(Q.a)(c.entries());try{for(u.s();!(l=u.n()).done;){var d=Object(q.a)(l.value,2),p=d[0],m=d[1];try{var f=new Image;f.src=m.properties.url,f.id="img_".concat(m.properties.url),s.push(f),n(te(o+p))}catch(h){console.log(h)}}}catch(b){u.e(b)}finally{u.f()}}}(r,o,i))}}var te=function(e){return{type:"UPDATE_BUFFER",payload:{buffer:e}}};var ae=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).state={width:0,height:0,minor:0},n.resizeHandler=n.resizeHandler.bind(Object(C.a)(n)),n.handleImageClick=n.handleImageClick.bind(Object(C.a)(n)),n.renderDot=n.renderDot.bind(Object(C.a)(n)),n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.resizeHandler(),window.addEventListener("resize",this.resizeHandler)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeHandler)}},{key:"resizeHandler",value:function(){var e=this.divElement.clientWidth,t=this.divElement.clientHeight,a=e;e>=t&&(a=t),this.setState({width:e,height:t,minor:a})}},{key:"handleImageClick",value:function(e){e.stopPropagation();var t=this.props,a=t.feature,n=t.updateFeature,r=this.image.getBoundingClientRect(),o=e.clientX-r.left,i=e.clientY-r.top,l=e.currentTarget.width/e.currentTarget.naturalWidth,c=Object(a);c.properties._has_school="yes",c.properties.pointScale=Object({x:o/l,y:i/l}),c.properties.sizeImage=Object({width:e.currentTarget.naturalWidth,height:e.currentTarget.naturalHeight}),n(c)}},{key:"renderDot",value:function(){var e=this.props,t=e.feature,a=e.classes,n=this.state.minor;if(!(t&&t.properties.pointScale&&t.properties.sizeImage))return null;var o=t.properties,i=o.pointScale,l=n/o.sizeImage.width;return r.a.createElement("p",{className:a.dot,style:{top:l*i.y,left:l*i.x-20}},"X")}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.feature,o=this.state.minor;return r.a.createElement("div",{className:a.content,ref:function(t){e.divElement=t}},n&&n.properties.url?r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{ref:function(t){e.image=t},src:n.properties.url,onClick:this.handleImageClick,width:o,alt:"img"}),this.renderDot()):null)}}]),a}(n.Component),ne={updateFeature:ee},re=Object(x.a)(Object(s.b)((function(e){return{feature:e.geojsonData.feature,index:e.geojsonData.index,totalFeatures:e.geojsonData.totalFeatures}}),ne),Object(F.a)((function(){return{content:{position:"relative",width:"auto",height:"calc(100vh - 85px - 32px)"},dot:{userSelect:"none",position:"absolute",margin:0,padding:0,fontSize:60,color:"#ffc107",height:0,width:0,lineHeight:0,letterSpacing:0,fontWeight:200}}})))(ae),oe=a(142),ie=a(143),le=a(144),ce=a(151),se=a(145),ue=a(146),de=a(4),pe=a(77),me=a.n(pe),fe=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).onFilesChange=n.onFilesChange.bind(Object(C.a)(n)),n}return Object(m.a)(a,[{key:"onFilesChange",value:function(e){this.props.dispatch(function(e){return function(t){t({type:"FETCH_DATA_BEGIN"});var a=new FileReader;a.onload=function(){var n=JSON.parse(a.result),r=(n.features||[]).length;t(function(e,t,a){return{type:"FETCH_DATA_SUCCESS",payload:{fData:e,fileName:t,totalFeatures:a}}}(n,function(e){var t=e.replace(/ /g,"").split(".").slice(0,-1).join("_"),a="."+e.split(".").slice(-1)[0];return t.includes("(")&&(t=t.split("(").slice(0,-1).join("_")),t+a}(e[0].name),r)),t(Z(0)),t($(0,n,r))},a.readAsText(e[0])}}(e))}},{key:"onFilesError",value:function(e){console.err("error code "+e.code+": "+e.message)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(S.a,{variant:"caption",display:"block",gutterBottom:!0},"Load geojson file"),r.a.createElement(Y.a,null,r.a.createElement(me.a,{className:"files-dropzone-list",onChange:this.onFilesChange,onError:this.onFilesError,accepts:[".geojson",".json"],maxFiles:1,maxFileSize:1e9,minFileSize:0,clickable:!0},r.a.createElement("input",{type:"submit",value:"Choose a file",style:{width:"96%",margin:"5px"}}))))}}]),a}(n.Component),he=Object(s.b)(null)(fe),be=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(p.a)(this,a),(e=t.call(this)).state={value:""},e.handleChange=e.handleChange.bind(Object(C.a)(e)),e}return Object(m.a)(a,[{key:"handleChange",value:function(e){var t=this.props.total,a=e.target.value;(""===a||/[0-9]+/g.test(a))&&t>=(a=parseInt(a))&&a>=0&&this.props.dispatch(Z(a))}},{key:"convertSecondaryText",value:function(e){return e?"object"==="".concat(typeof e)?JSON.stringify(e):"".concat(e):""}},{key:"renderProperties",value:function(){var e=this,t=this.props,a=t.classes,n=t.feature;if(!n||!n.properties)return null;var o=Object.keys(n.properties||{}).sort().filter((function(e){return!["__reviewed"].includes(e)})).map((function(e){return{key:"".concat(e),value:n.properties[e]}}));return r.a.createElement(r.a.Fragment,null,o.map((function(t,n){return r.a.createElement(oe.a,{key:"li-".concat(n),className:a.lItem},r.a.createElement(ie.a,{classes:"".concat(t.key).startsWith("_")?{secondary:a.secondaryText}:null,primary:"".concat(t.key),secondary:e.convertSecondaryText(t.value)}))})))}},{key:"renderFeature",value:function(){var e=this.props,t=e.classes,a=e.feature;return a&&a.properties?r.a.createElement(r.a.Fragment,null,r.a.createElement(oe.a,null,r.a.createElement(ie.a,{primary:"Properties",classes:{primary:t.primaryText}})),this.renderProperties()):null}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.total,n=e.index,o=e.feature;return r.a.createElement("div",null,o?null:r.a.createElement(he,null),o?r.a.createElement(le.a,{component:"nav"},r.a.createElement(oe.a,null,r.a.createElement(ce.a,{id:"index",label:"Index",onChange:this.handleChange,value:n,type:"number"})),r.a.createElement(se.a,null)):null,r.a.createElement(le.a,{component:"nav"},0!==a?r.a.createElement(oe.a,{className:t.lItem},r.a.createElement(ie.a,{primary:"Total"}),r.a.createElement(ue.a,null,r.a.createElement(S.a,{variant:"body1",component:"span",color:"textSecondary"},a))):null,this.renderFeature()),r.a.createElement(se.a,null))}}]),a}(n.Component),ge=Object(x.a)(Object(s.b)((function(e){return{total:e.geojsonData.totalFeatures,index:e.geojsonData.index,feature:e.geojsonData.feature}})),Object(de.a)((function(){return{lItem:{paddingBottom:0,paddingRight:0,paddingLeft:0},primaryText:{textAlign:"center",color:"#808080"},secondaryText:{color:"red"}}})))(be),ve=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).save=n.save.bind(Object(C.a)(n)),n.keyFunction=n.keyFunction.bind(Object(C.a)(n)),n.updateFeatureKey=n.updateFeatureKey.bind(Object(C.a)(n)),n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.keyFunction,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyFunction,!1)}},{key:"updateFeatureKey",value:function(e){var t=this.props,a=t.feature,n=t.updateFeature;if(a){var r=Object(a);r.properties._has_school="".concat(e),["pointScale","sizeImage"].forEach((function(e){r.properties[e]&&delete r.properties[e]})),n(r)}}},{key:"keyFunction",value:function(e){var t=this.props,a=t.updateIndex,n=t.index;switch(e.key){case"ArrowRight":case"d":a(n+1);break;case"ArrowLeft":case"a":a(n-1);break;case"1":this.updateFeatureKey("no");break;case"2":this.updateFeatureKey("unrecognized");break;default:console.log("another key",e.key)}}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.props,a=t.index,n=t.data,r=t.totalFeatures,o=t.downloadGeojsonFile,i=t.fetchFeature;e.index!==a&&i(e.index,n,r),e.downloadFile&&(this.save(),o(!1))}},{key:"save",value:function(){var e=this.props,t=e.data,a=e.fileName;if(t&&t.features){var n=new Blob([JSON.stringify(t)],{type:"application/json;charset=utf-8"});Object(V.saveAs)(n,a)}}},{key:"render",value:function(){var e=this.props.classes,t=Object(H.a)(e.paper,e.fixedHeight);return r.a.createElement("main",{className:e.content},r.a.createElement(K.a,{maxWidth:"xl",className:e.container},r.a.createElement(M.a,{container:!0,spacing:1},r.a.createElement(M.a,{item:!0,xs:12,sm:6,md:3,lg:3,xl:4},r.a.createElement(Y.a,{className:t,elevation:3},r.a.createElement(ge,null))),r.a.createElement(M.a,{item:!0,xs:12,sm:6,md:9,lg:9,xl:8},r.a.createElement(Y.a,{className:t,elevation:3},r.a.createElement(re,null))))))}}]),a}(n.Component),je={downloadGeojsonFile:B,fetchFeature:$,updateIndex:Z,updateFeature:ee},ye=Object(x.a)(Object(s.b)((function(e){return{data:e.geojsonData.data,feature:e.geojsonData.feature,index:e.geojsonData.index,totalFeatures:e.geojsonData.totalFeatures,fileName:e.geojsonData.fileName,downloadFile:e.control.downloadFile}}),je),Object(F.a)(D))(ve),Oe=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).state={},n}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(J,{handleDrawerOpen:this.handleDrawerOpen}),r.a.createElement(ye,null))}}]),a}(n.Component),Ee=Object(x.a)(Object(s.b)((function(){return{}})),Object(F.a)(D))(Oe),Fe=Object(O.a)({palette:{primary:g.a,secondary:j.a}}),xe=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement(E.a,{theme:Fe},r.a.createElement(y.a,null),r.a.createElement(Ee,null))}}]),a}(n.Component),we=a(32),ke=a(80),De={downloadFile:!1};var Ce={data:{features:[]},feature:null,loading:!0,error:null,fileName:"",index:0,totalFeatures:0,buffer:0};var Te=Object(we.c)({geojsonData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_DATA_BEGIN":return Object(w.a)(Object(w.a)({},e),{},{loading:!0,error:null});case"FETCH_DATA_SUCCESS":return Object(w.a)(Object(w.a)({},e),{},{loading:!1,data:t.payload.fData,fileName:t.payload.fileName,totalFeatures:t.payload.totalFeatures});case"FETCH_DATA_FAILURE":return Object(w.a)(Object(w.a)({},e),{},{loading:!1,error:t.payload.error,data:{}});case"SET_INDEX":return Object(w.a)(Object(w.a)({},e),{},{index:t.payload.index});case"SET_FEATURE":return Object(w.a)(Object(w.a)({},e),{},{feature:t.payload.feature});case"UPDATE_DATA":return Object(w.a)(Object(w.a)({},e),{},{data:t.payload.fData});case"UPDATE_FEATURE":return Object(w.a)(Object(w.a)({},e),{},{feature:t.payload.feature});case"UPDATE_BUFFER":return Object(w.a)(Object(w.a)({},e),{},{buffer:t.payload.buffer});default:return e}},control:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DOWNLOAD_FILE":return Object(w.a)(Object(w.a)({},e),{},{downloadFile:t.payload.download});default:return e}}}),_e=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||we.d,Ne=Object(we.e)(Te,_e(Object(we.a)(ke.a)));i.a.render(r.a.createElement(c.a,null,r.a.createElement(s.a,{store:Ne},r.a.createElement(u.a,{basename:"/chip-ahoy"},r.a.createElement(d.c,null,r.a.createElement(d.a,{exact:!0,component:xe,path:"/"}))))),document.getElementById("root"))},93:function(e,t,a){e.exports=a(104)}},[[93,1,2]]]);
//# sourceMappingURL=main.45354c1d.chunk.js.map