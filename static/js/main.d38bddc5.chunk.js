(window["webpackJsonpchips-ahoy"]=window["webpackJsonpchips-ahoy"]||[]).push([[0],{109:function(e,t,a){e.exports=a(128)},128:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(10),i=a.n(o),s=a(83),c=a.n(s),l=a(19),u=a(96),d=a(14),p=a(17),_=a(18),f=a(21),h=a(20),m=a(92),g=a.n(m),b=a(93),v=a.n(b),j=a(178),E=a(97),w=a(177),y=a(131),O=a(23),k=a(8),C=a(25),x=function(e){var t;return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),flexGrow:1,background:"rgb(250, 250, 250)"},appBarShift:{width:"calc(100% - ".concat(240,"px)"),marginLeft:240,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},toolbar:(t={minHeight:56},Object(C.a)(t,e.breakpoints.up("sm"),{minHeight:55}),Object(C.a)(t,"background","#ffc107"),Object(C.a)(t,"display","flex"),Object(C.a)(t,"flexDirection","row"),Object(C.a)(t,"alignContent","center"),Object(C.a)(t,"justifyContent","space-between"),Object(C.a)(t,"alignItems","center"),t),menuButton:{marginRight:e.spacing(1)},hide:{display:"none"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:Object(k.a)(Object(k.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"space-between",backgroundColor:e.palette.primary.main,minHeight:"".concat(55,"px !important"),height:"".concat(55,"px !important")}),content:{flexGrow:1,height:"100vh",overflow:"auto"},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0},container:{marginTop:55,paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},button:{color:"#fff !important",textTransform:"uppercase",textDecoration:"none",background:"#ed3330",border:"none",textAlign:"center",width:"180px"},nameFile:{marginLeft:"1.5rem",marginRight:"1.5rem"},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:"calc(100vh - ".concat(93.5,"px)")},progressbarContainer:{position:"relative",marginLeft:0,width:"calc(100vw - ".concat(720,"px)")},justifyCo:{justifyContent:"flex-start"},overflowNone:{overflow:"unset",padding:0}}},F=a(15),N=a(162),D=a(163),T=a(164),S=a(54),A=a(166),I=a(165),B=a(3),L=function(e){return{type:"DOWNLOAD_FILE",payload:{download:e}}},H=a(180),z=a(161),M=a(134),U=Object(M.a)({root:{height:"7px","& .MuiLinearProgress-dashedColorSecondary":{backgroundImage:"radial-gradient(#ed3330 0%, #ed3330 1%, transparent 2%)",animation:"none",backgroundColor:"#ed333052"}}});function K(e){var t=U();return n.a.createElement(H.a,{display:"flex",alignItems:"center"},n.a.createElement(H.a,{width:"100%",mr:1},n.a.createElement(z.a,Object.assign({variant:"buffer",color:"secondary",classes:{root:t.root}},e))),n.a.createElement(H.a,{minWidth:40},n.a.createElement(S.a,{variant:"subtitle2"},"".concat(Math.round(10*e.value)/10,"%"))))}var P=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).state={completed:0,buffer:0},r}return Object(_.a)(a,[{key:"calculateBuffer",value:function(){var e=this.props,t=e.totalFeatures,a=e.buffer,r=e.index;return t===r?{completed:0,buffer:0}:{completed:r/t*100,preload:a/t*100}}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.totalFeatures,r=this.calculateBuffer(),o=r.completed,i=r.preload;return 0===a?null:n.a.createElement("div",{className:t.progressbarContainer},n.a.createElement(K,{value:o,valueBuffer:i}))}}]),a}(r.Component),R=Object(O.a)(Object(l.b)((function(e){return{buffer:e.geojsonData.buffer,index:e.geojsonData.index,totalFeatures:e.geojsonData.totalFeatures}}),{}),Object(y.a)(x))(P),W=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(p.a)(this,a),(e=t.call(this)).downloadFile=e.downloadFile.bind(Object(F.a)(e)),e}return Object(_.a)(a,[{key:"downloadFile",value:function(){this.props.dispatch(L(!0))}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.fileName,r=0!==e.totalFeatures;return n.a.createElement(N.a,{position:"fixed",className:t.appBar},n.a.createElement(D.a,{className:r?Object(B.a)(t.toolbar):Object(B.a)(t.toolbar,t.justifyCo)},n.a.createElement(T.a,{color:"inherit","aria-label":"open drawer",edge:"start",className:Object(B.a)(t.menuButton)},n.a.createElement(I.a,null)),n.a.createElement(S.a,{variant:"h6",noWrap:!0},"CHIPS-AHOY"),n.a.createElement(S.a,{variant:"subtitle2",className:t.nameFile},a),n.a.createElement(R,null),r?n.a.createElement(A.a,{className:t.button,color:"inherit",onClick:this.downloadFile},"DOWNLOAD"):null))}}]),a}(r.Component),G=Object(O.a)(Object(l.b)((function(e){return{fileName:e.geojsonData.fileName,totalFeatures:e.geojsonData.totalFeatures}})),Object(y.a)(x))(W),J=a(98),X=(a(118),a(175)),q=a(176),V=a(133),Y=a(89),Q=a(22),Z=a(181),$=a(69),ee=a(90);function te(e){return function(t,a){var r=a().geojsonData.totalFeatures;if(e<0)return null;r>=e&&e>=0?t({type:"SET_INDEX",payload:{index:e}}):console.log("index out range")}}function ae(e,t,a){return function(r){a>=e&&e>=0?r({type:"SET_FEATURE",payload:{feature:t.features[e]}}):console.log("index out range")}}var re=function(e){return{type:"UPDATE_DATA",payload:{fData:e}}};function ne(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(a,r){var n=r().geojsonData,o=n.index,i=n.data,s=n.totalFeatures;e.properties.__reviewed=!0,i.features[o]=e;var c=Object(k.a)({},i);a(re(c)),a(ae(o,c,s)),t&&(a(te(o+1)),a(oe(o,c,s)))}}function oe(e,t,a){return function(r){var n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:35;return e<=t?e>=t/2?{start:e-5,end:t+5}:{start:e,end:t+5}:{start:e-5,end:e+t-5}}(e),o=n.start,i=n.end;i>=a&&(i=a);var s,c=t.features.slice(o,i),l=[],u=Object(ee.a)(c.entries());try{for(u.s();!(s=u.n()).done;){var d=Object($.a)(s.value,2),p=d[0],_=d[1];try{var f=new Image;if(f.src=_.properties.url,f.id="img_".concat(_.properties.url),_.properties.tiles_neighbors)for(var h=0,m=Object.entries(_.properties.tiles_neighbors);h<m.length;h++){var g=Object($.a)(m[h],2),b=g[0],v=g[1],j=new Image;j.src=v,j.id="img_".concat(v),j.alt="img_".concat(_.properties.url,"__").concat(b),l.push(j)}l.push(f),r({type:"UPDATE_BUFFER",payload:{buffer:o+p}})}catch(E){console.log(E)}}}catch(w){u.e(w)}finally{u.f()}}}var ie=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).state={width:0,height:0,minor:0},r.resizeHandler=r.resizeHandler.bind(Object(F.a)(r)),r.handleImageClick=r.handleImageClick.bind(Object(F.a)(r)),r.renderDot=r.renderDot.bind(Object(F.a)(r)),r}return Object(_.a)(a,[{key:"componentDidMount",value:function(){this.resizeHandler(),window.addEventListener("resize",this.resizeHandler)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeHandler)}},{key:"resizeHandler",value:function(){var e=this.divElement.clientWidth,t=this.divElement.clientHeight,a=e;e>=t&&(a=t),this.setState({width:e,height:t,minor:a})}},{key:"handleImageClick",value:function(e){e.stopPropagation();var t=this.props,a=t.feature,r=t.updateFeature,n=Object(a);n.properties.timestamp=Date.now(),r(n,!0)}},{key:"renderDot",value:function(){var e=this.props,t=e.feature,a=e.classes,r=this.state.minor;if(!(t&&t.properties.pointScale&&t.properties.sizeImage))return null;var o=t.properties,i=o.pointScale,s=r/o.sizeImage.width;return n.a.createElement("p",{className:a.dot,style:{top:s*i.y,left:s*i.x-20}},"X")}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,r=t.feature,o=this.state.minor;return n.a.createElement("div",{className:a.content,ref:function(t){e.divElement=t}},r&&r.properties.url?n.a.createElement(n.a.Fragment,null,n.a.createElement("img",{ref:function(t){e.image=t},src:r.properties.url,onClick:this.handleImageClick,width:o,alt:"img"}),this.renderDot()):null)}}]),a}(r.Component),se={updateFeature:ne},ce=Object(O.a)(Object(l.b)((function(e){return{feature:e.geojsonData.feature,index:e.geojsonData.index,totalFeatures:e.geojsonData.totalFeatures}}),se),Object(y.a)((function(){return{content:{position:"relative",width:"auto",height:"calc(100vh - 85px - 32px)"},dot:{userSelect:"none",position:"absolute",margin:0,padding:0,fontSize:60,color:"#00FF00",height:0,width:0,lineHeight:0,letterSpacing:0,fontWeight:400}}})))(ie),le=a(182),ue=a(167),de=a(168),pe=a(169),_e=a(170),fe=a(171),he=a(172),me=a(173),ge=a(179),be=a(174),ve=a(4),je=a(91),Ee=a.n(je),we=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).onFilesChange=r.onFilesChange.bind(Object(F.a)(r)),r}return Object(_.a)(a,[{key:"onFilesChange",value:function(e){this.props.dispatch(function(e){return function(t){t({type:"FETCH_DATA_BEGIN"});var a=new FileReader;a.onload=function(){var r=JSON.parse(a.result),n=(r.features||[]).length;t(function(e,t,a){return{type:"FETCH_DATA_SUCCESS",payload:{fData:e,fileName:t,totalFeatures:a}}}(r,function(e){var t=e.replace(/ /g,"").split(".").slice(0,-1).join("_"),a="."+e.split(".").slice(-1)[0];return t.includes("(")&&(t=t.split("(").slice(0,-1).join("_")),t+a}(e[0].name),n)),t(te(0)),t(ae(0,r,n))},a.readAsText(e[0])}}(e))}},{key:"onFilesError",value:function(e){console.error("error code "+e.code+": "+e.message)}},{key:"render",value:function(){var e=this.props.classes;return n.a.createElement("div",{className:e.container},n.a.createElement(S.a,{variant:"caption",display:"block",gutterBottom:!0},"Load geojson file"),n.a.createElement(V.a,null,n.a.createElement(Ee.a,{className:"files-dropzone-list",onChange:this.onFilesChange,onError:this.onFilesError,accepts:[".geojson",".json"],maxFiles:1,maxFileSize:1e9,minFileSize:0,clickable:!0},n.a.createElement("input",{type:"submit",value:"Choose a file",style:{width:"96%",margin:"5px"}}))))}}]),a}(r.Component),ye=Object(O.a)(Object(l.b)(null),Object(ve.a)((function(e){return{container:{height:250,padding:e.spacing(2)}}})))(we),Oe=Object(ve.a)({root:{paddingBottom:4,paddingTop:4}})((function(e){return n.a.createElement(le.a,e)})),ke=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(p.a)(this,a),(e=t.call(this)).state={value:"",focus_tab:0,prop_feature__vacant_lots__paved:!1,prop_feature__vacant_lots__unpaved:!1,prop_feature__vacant_lots__overgrown:!1,prop_feature__vacant_lots__fenced:!1,prop_feature__vacant_lots__litter_dumping_tires:!1,prop_feature__structures__damaged_roof:!1,prop_feature__structures__broken_windows_doors:!1,prop_feature__structures__missing_windows_doors:!1,prop_feature__structures__boarded_up_windows_doors:!1,prop_feature__structures__overgrown_lawn:!1,prop_feature__structures__overgrown_shrubbery_trees:!1,prop_feature__structures__structural_issues:!1,prop_feature__structures__faded_paint:!1,prop_feature__structures__litter_in_around_structure:!1},e.handleChange=e.handleChange.bind(Object(F.a)(e)),e.handleChangeTab=e.handleChangeTab.bind(Object(F.a)(e)),e.handleChangeCheck=e.handleChangeCheck.bind(Object(F.a)(e)),e}return Object(_.a)(a,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=e.feature;if(t&&t.properties){var a=Object.keys(t.properties||{}).sort().filter((function(e){return e.includes("prop_feature")})).reduce((function(e,a){return Object(k.a)(Object(k.a)({},e),{},Object(C.a)({},a,t.properties[a]))}),{}),r=Object(k.a)({prop_feature__vacant_lots__paved:!1,prop_feature__vacant_lots__unpaved:!1,prop_feature__vacant_lots__overgrown:!1,prop_feature__vacant_lots__fenced:!1,prop_feature__vacant_lots__litter_dumping_tires:!1,prop_feature__structures__damaged_roof:!1,prop_feature__structures__broken_windows_doors:!1,prop_feature__structures__missing_windows_doors:!1,prop_feature__structures__boarded_up_windows_doors:!1,prop_feature__structures__overgrown_lawn:!1,prop_feature__structures__overgrown_shrubbery_trees:!1,prop_feature__structures__structural_issues:!1,prop_feature__structures__faded_paint:!1,prop_feature__structures__litter_in_around_structure:!1},a);this.setState(Object(k.a)({},r))}}},{key:"handleChangeTab",value:function(e,t){this.setState({focus_tab:t})}},{key:"handleChange",value:function(e){var t=this.props.total,a=e.target.value;(""===a||/[0-9]+/g.test(a))&&t>=(a=parseInt(a))&&a>=0&&this.props.dispatch(te(a))}},{key:"handleChangeCheck",value:function(e){var t=this.props,a=t.feature,r=t.updateFeature;this.setState(Object(C.a)({},e.target.name,e.target.checked));var n=Object(a),o=!!n.properties[e.target.name];n.properties[e.target.name]=!o,n.properties.uuid_difference=Object(Z.a)(),["sizeImage"].forEach((function(e){n.properties[e]&&delete n.properties[e]})),r(n)}},{key:"convertSecondaryText",value:function(e){return["",null,void 0].includes(e)?"":"object"==="".concat(typeof e)?JSON.stringify(e):"".concat(e)}},{key:"renderProperties",value:function(){var e=this,t=this.props,a=t.classes,r=t.feature;if(!r||!r.properties)return null;var o=r.properties.uuid_difference||Object(Z.a)(),i=Object.keys(r.properties||{}).sort().reverse().filter((function(e){return e.includes("prop_feature")})).map((function(e){return{key:"".concat(e),value:r.properties[e]}}));return n.a.createElement(n.a.Fragment,null,i.map((function(t,r){return n.a.createElement(ue.a,{key:"li-".concat(o,"-").concat(r),className:a.lItem},n.a.createElement(de.a,{className:a.lItemText,primary:"".concat(t.key).replace("prop_feature__","").replace("structures__","struc/ ").replace("vacant_lots__","VLots/ ")}),n.a.createElement(pe.a,null,n.a.createElement(S.a,{variant:"body1",component:"span",color:"textSecondary"},e.convertSecondaryText(t.value))))})))}},{key:"renderFeature",value:function(){var e=this.props,t=e.classes,a=e.feature;return a&&a.properties?n.a.createElement(n.a.Fragment,null,n.a.createElement(ue.a,null,n.a.createElement(de.a,{primary:"Properties",classes:{primary:t.primaryText}})),this.renderProperties()):null}},{key:"renderCheckboxs",value:function(){var e=this.props.classes,t=this.state,a=t.prop_feature__vacant_lots__paved,r=t.prop_feature__vacant_lots__unpaved,o=t.prop_feature__vacant_lots__overgrown,i=t.prop_feature__vacant_lots__fenced,s=t.prop_feature__vacant_lots__litter_dumping_tires,c=t.prop_feature__structures__damaged_roof,l=t.prop_feature__structures__broken_windows_doors,u=t.prop_feature__structures__missing_windows_doors,d=t.prop_feature__structures__boarded_up_windows_doors,p=t.prop_feature__structures__overgrown_lawn,_=t.prop_feature__structures__overgrown_shrubbery_trees,f=t.prop_feature__structures__structural_issues,h=t.prop_feature__structures__faded_paint,m=t.prop_feature__structures__litter_in_around_structure;return n.a.createElement("div",{className:e.canvasContainer},n.a.createElement(_e.a,{size:"small"},n.a.createElement("label",{className:e.label},"Vacant lots"),n.a.createElement(fe.a,null,n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:a,onChange:this.handleChangeCheck,name:"prop_feature__vacant_lots__paved"}),label:"Paved (q)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:r,onChange:this.handleChangeCheck,name:"prop_feature__vacant_lots__unpaved"}),label:"Unpaved (w)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:o,onChange:this.handleChangeCheck,name:"prop_feature__vacant_lots__overgrown"}),label:"Overgrown (e)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:i,onChange:this.handleChangeCheck,name:"prop_feature__vacant_lots__fenced"}),label:"Fenced (a)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:s,onChange:this.handleChangeCheck,name:"prop_feature__vacant_lots__litter_dumping_tires"}),label:"Litter/dumping/Tires (s)"})),n.a.createElement("label",{className:e.label},"Structures"),n.a.createElement(me.a,null),n.a.createElement(fe.a,null,n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:c,onChange:this.handleChangeCheck,name:"prop_feature__structures__damaged_roof"}),label:"Damaged roof (shift + q)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:l,onChange:this.handleChangeCheck,name:"prop_feature__structures__broken_windows_doors"}),label:"Broken windows/doors (shift + w)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:u,onChange:this.handleChangeCheck,name:"prop_feature__structures__missing_windows_doors"}),label:"Missing windows/doors (shift + e)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:d,onChange:this.handleChangeCheck,name:"prop_feature__structures__boarded_up_windows_doors"}),label:"Boarded up windows/doors (shift + a)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:p,onChange:this.handleChangeCheck,name:"prop_feature__structures__overgrown_lawn"}),label:"Overgrown lawn (shift + s)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:_,onChange:this.handleChangeCheck,name:"prop_feature__structures__overgrown_shrubbery_trees"}),label:"Overgrown shrubbery/trees (shift + d)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:f,onChange:this.handleChangeCheck,name:"prop_feature__structures__structural_issues"}),label:"Structural issues (shift + z)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:h,onChange:this.handleChangeCheck,name:"prop_feature__structures__faded_paint"}),label:"Faded paint (shift + x)"}),n.a.createElement(he.a,{control:n.a.createElement(Oe,{checked:m,onChange:this.handleChangeCheck,name:"prop_feature__structures__litter_in_around_structure"}),label:"Litter in/around structure (shift + c)"}))))}},{key:"renderTabs",value:function(){var e=this.props,t=e.classes,a=e.feature,r=e.total;return a&&0!==r?n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:t.tabContainer},this.renderCheckboxs()),n.a.createElement(me.a,null)):null}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.total,r=e.index,o=e.feature;return n.a.createElement("div",{className:t.container},o?null:n.a.createElement(ye,null),o?n.a.createElement("div",{className:t.paddinBox},n.a.createElement(ge.a,{id:"index",label:"Index",onChange:this.handleChange,value:r,type:"number"}),n.a.createElement(me.a,null)):null,this.renderTabs(),n.a.createElement(be.a,{component:"div",className:t.listfeatures},0!==a?n.a.createElement(ue.a,{className:t.lItem},n.a.createElement(de.a,{primary:"Total"}),n.a.createElement(pe.a,null,n.a.createElement(S.a,{variant:"body1",component:"span",color:"textSecondary"},a))):null,this.renderFeature()))}}]),a}(r.Component),Ce={updateFeature:ne},xe=Object(O.a)(Object(l.b)((function(e){return{total:e.geojsonData.totalFeatures,index:e.geojsonData.index,feature:e.geojsonData.feature,data:e.geojsonData.data}}),Ce),Object(ve.a)((function(e){return{container:{display:"flex",flex:1,flexDirection:"column",alignContent:"center",justifyContent:"flex-start",alignItems:"stretch"},listfeatures:{display:"flex",flexDirection:"column",maxHeight:"calc(100vh - 64px - 32px - 70px - ".concat(530,"px - ").concat(93.5,"px)"),overflow:"auto",width:"100%",padding:e.spacing(2),paddingRight:0},tabContainer:{minHeight:535,padding:0},chartContainer:{height:530,padding:0},lItem:{paddingBottom:2,paddingRight:0,paddingLeft:0,paddingTop:2,wordWrap:"break-word"},lItemText:{marginBottom:2,marginTop:2},primaryText:{textAlign:"center",color:"#808080"},secondaryText:{color:"red",fontSize:"1rem"},paddinBox:{padding:e.spacing(2)},canvasContainer:{textAlign:"left",padding:8,height:530},image:{maxHeight:530},tableSmall:{overflow:"hidden",height:530,position:"relative",width:"auto",pointerEvents:"none"},label:{fontSize:"1rem",fontWeight:600},tableBig:{height:1290,width:1290,display:"grid",gridTemplateColumns:"repeat(3, ".concat(430,"px)"),gridTemplateRows:"repeat(3, ".concat(430,"px)"),gridColumnGap:0,gridRowGap:0,overflow:"hidden",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",pointerEvents:"none"},div1:{gridArea:"1 / 1 / 2 / 2",border:"1px solid red",pointerEvents:"none"},div2:{gridArea:"1 / 2 / 2 / 3",border:"1px solid red",pointerEvents:"none"},div3:{gridArea:"1 / 3 / 2 / 4",border:"1px solid red",pointerEvents:"none"},div4:{gridArea:"2 / 1 / 3 / 2",border:"1px solid red",pointerEvents:"none"},div5:{gridArea:"2 / 2 / 3 / 3",border:"1px solid red",pointerEvents:"none"},div6:{gridArea:"2 / 3 / 3 / 4",border:"1px solid red",pointerEvents:"none"},div7:{gridArea:"3 / 1 / 4 / 2",border:"1px solid red",pointerEvents:"none"},div8:{gridArea:"3 / 2 / 4 / 3",border:"1px solid red",pointerEvents:"none"},div9:{gridArea:"3 / 3 / 4 / 4",border:"1px solid red",pointerEvents:"none"}}})))(ke),Fe=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).save=r.save.bind(Object(F.a)(r)),r.keyFunction=r.keyFunction.bind(Object(F.a)(r)),r.updateFeatureKey=r.updateFeatureKey.bind(Object(F.a)(r)),r}return Object(_.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.keyFunction,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyFunction,!1)}},{key:"updateFeatureKey",value:function(e){var t=this.props,a=t.feature,r=t.updateFeature;if(a){var n=Object(a),o=!!n.properties[e];n.properties[e]=!o,n.properties.uuid_difference=Object(Z.a)(),["sizeImage"].forEach((function(e){n.properties[e]&&delete n.properties[e]})),r(n)}}},{key:"keyFunction",value:function(e){var t=this.props,a=t.updateIndex,r=t.index,n=t.totalFeatures,o=e.shiftKey,i="".concat(e.key).toLocaleLowerCase();if(n){switch(i){case"arrowright":case"2":a(r+1);break;case"arrowleft":case"1":a(r-1)}"q"!==i||o||(Q.NotificationManager.success("Paved","vacant_lots",800),this.updateFeatureKey("prop_feature__vacant_lots__paved")),"w"!==i||o||(Q.NotificationManager.success("Info Unpaved","vacant_lots",800),this.updateFeatureKey("prop_feature__vacant_lots__unpaved")),"e"!==i||o||(Q.NotificationManager.success("Info Overgrown","vacant_lots",800),this.updateFeatureKey("prop_feature__vacant_lots__overgrown")),"a"!==i||o||(Q.NotificationManager.success("Fenced","vacant_lots",800),this.updateFeatureKey("prop_feature__vacant_lots__fenced")),"s"!==i||o||(Q.NotificationManager.success("Litter/dumping/Tires","vacant_lots",800),this.updateFeatureKey("prop_feature__vacant_lots__litter_dumping_tires")),"q"===i&&o&&(Q.NotificationManager.info("Damaged roof","structures",800),this.updateFeatureKey("prop_feature__structures__damaged_roof")),"w"===i&&o&&(Q.NotificationManager.info("Broken windows / doors ","structures",800),this.updateFeatureKey("prop_feature__structures__broken_windows_doors")),"e"===i&&o&&(Q.NotificationManager.info("Missing windows / doors","structures",800),this.updateFeatureKey("prop_feature__structures__missing_windows_doors")),"a"===i&&o&&(Q.NotificationManager.info("Boarded up windows / doors ","structures",800),this.updateFeatureKey("prop_feature__structures__boarded_up_windows_doors")),"s"===i&&o&&(Q.NotificationManager.info("Overgrown lawn ","structures",800),this.updateFeatureKey("prop_feature__structures__overgrown_lawn")),"d"===i&&o&&(Q.NotificationManager.info("Overgrown shrubbery/trees","structures",800),this.updateFeatureKey("prop_feature__structures__overgrown_shrubbery_trees")),"z"===i&&o&&(Q.NotificationManager.info("Structural issues ","structures",800),this.updateFeatureKey("prop_feature__structures__structural_issues")),"x"===i&&o&&(Q.NotificationManager.info("Faded paint","structures",800),this.updateFeatureKey("prop_feature__structures__faded_paint")),"c"===i&&o&&(Q.NotificationManager.info("Litter in / around structure","structures",800),this.updateFeatureKey("prop_feature__structures__litter_in_around_structure")),console.log(" key",i,"shiftKey",o)}}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.props,a=t.index,r=t.data,n=t.totalFeatures,o=t.downloadGeojsonFile,i=t.fetchFeature;e.index!==a&&i(e.index,r,n),e.downloadFile&&(this.save(),o(!1))}},{key:"save",value:function(){var e=this.props,t=e.data,a=e.fileName;if(t&&t.features){var r=Object(k.a)(Object(k.a)({},t),{},{features:t.features.map((function(e){var t=Object.keys(e.properties||{}).filter((function(e){return e.includes("prop_feature")})).map((function(t){return{key:"".concat(t),value:e.properties[t]}})),a={sub_category:t.filter((function(e){return e.value})).map((function(e){return e.key.split("__")[2]})),category:Object(J.a)(new Set(t.filter((function(e){return e.value})).map((function(e){return e.key.split("__")[1]}))))};return Object(k.a)(Object(k.a)({},e),{},{properties:Object(k.a)(Object(k.a)({},e.properties),a)})}))}),n=new Blob([JSON.stringify(r)],{type:"application/json;charset=utf-8"});Object(Y.saveAs)(n,a)}}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.feature,r=Object(B.a)(t.paper,t.fixedHeight);return console.log(a),n.a.createElement("main",{className:t.content},n.a.createElement(X.a,{maxWidth:"xl",className:t.container},n.a.createElement(q.a,{container:!0,spacing:1},n.a.createElement(q.a,{item:!0,xs:12,sm:6,md:9,lg:9,xl:8},n.a.createElement(V.a,{className:r,elevation:3},n.a.createElement(ce,null))),n.a.createElement(q.a,{item:!0,xs:12,sm:6,md:3,lg:3,xl:4},n.a.createElement(V.a,{className:Object(B.a)(r,t.overflowNone),elevation:3},n.a.createElement(xe,null)))),n.a.createElement(Q.NotificationContainer,null)))}}]),a}(r.Component),Ne={downloadGeojsonFile:L,fetchFeature:ae,updateIndex:te,updateFeature:ne},De=Object(O.a)(Object(l.b)((function(e){return{data:e.geojsonData.data,feature:e.geojsonData.feature,index:e.geojsonData.index,totalFeatures:e.geojsonData.totalFeatures,fileName:e.geojsonData.fileName,downloadFile:e.control.downloadFile}}),Ne),Object(y.a)(x))(Fe),Te=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).state={},r}return Object(_.a)(a,[{key:"render",value:function(){var e=this.props.classes;return n.a.createElement("div",{className:e.root},n.a.createElement(G,{handleDrawerOpen:this.handleDrawerOpen}),n.a.createElement(De,null))}}]),a}(r.Component),Se=Object(O.a)(Object(l.b)((function(){return{}})),Object(y.a)(x))(Te),Ae=Object(E.a)({palette:{primary:g.a,secondary:v.a}}),Ie=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"render",value:function(){return n.a.createElement(w.a,{theme:Ae},n.a.createElement(j.a,null),n.a.createElement(Se,null))}}]),a}(r.Component),Be=a(37),Le=a(94),He=a.n(Le),ze=a(95),Me={downloadFile:!1};var Ue={data:{features:[]},feature:null,loading:!0,error:null,fileName:"",index:0,totalFeatures:0,buffer:0};var Ke=Object(Be.c)({geojsonData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_DATA_BEGIN":return Object(k.a)(Object(k.a)({},e),{},{loading:!0,error:null});case"FETCH_DATA_SUCCESS":return Object(k.a)(Object(k.a)({},e),{},{loading:!1,data:t.payload.fData,fileName:t.payload.fileName,totalFeatures:t.payload.totalFeatures});case"FETCH_DATA_FAILURE":return Object(k.a)(Object(k.a)({},e),{},{loading:!1,error:t.payload.error,data:{}});case"SET_INDEX":return Object(k.a)(Object(k.a)({},e),{},{index:t.payload.index});case"SET_FEATURE":return Object(k.a)(Object(k.a)({},e),{},{feature:t.payload.feature});case"UPDATE_DATA":return Object(k.a)(Object(k.a)({},e),{},{data:t.payload.fData});case"UPDATE_FEATURE":return Object(k.a)(Object(k.a)({},e),{},{feature:t.payload.feature});case"UPDATE_BUFFER":return Object(k.a)(Object(k.a)({},e),{},{buffer:t.payload.buffer});default:return e}},control:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DOWNLOAD_FILE":return Object(k.a)(Object(k.a)({},e),{},{downloadFile:t.payload.download});default:return e}}}),Pe=[ze.a,He.a],Re=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Be.d,We=Object(Be.e)(Ke,Re(Be.a.apply(void 0,Pe)));i.a.render(n.a.createElement(c.a,null,n.a.createElement(l.a,{store:We},n.a.createElement(u.a,{basename:"/chips-ahoy"},n.a.createElement(d.c,null,n.a.createElement(d.a,{exact:!0,component:Ie,path:"/"}))))),document.getElementById("root"))}},[[109,1,2]]]);
//# sourceMappingURL=main.d38bddc5.chunk.js.map