(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){e.exports=a(244)},207:function(e,t,a){},208:function(e,t,a){},229:function(e,t,a){},241:function(e,t,a){},242:function(e,t,a){},243:function(e,t,a){},244:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a(5),s=a(7),c=a(6),l=a(8),i=(a(104),a(68),a(0)),o=a.n(i),u=a(101),m=a.n(u);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(207),a(208);var d=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("span",{id:"linksSpan"},o.a.createElement("a",{href:"http://dpresume.com/docs/pdf/Devendra_Prasad_sidebar.pdf",rel:"noopener noreferrer",target:"_blank"},o.a.createElement("i",{className:"fas fa-download","aria-hidden":"true"}),"CV"),o.a.createElement("a",{href:"http://dpresume.com/docs/pdf/dp_cover_letter.pdf",rel:"noopener noreferrer",target:"_blank"},o.a.createElement("i",{className:"fas fa-download","aria-hidden":"true"}),"Cover"),o.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"http://dpresume.com/docs/pdf/pythonTrainingKIT.pdf"},o.a.createElement("i",{className:"fab fa-python","aria-hidden":"true"}),"Python"),o.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"http://dpresume.com/docs/pdf/aws-symbi-project.pdf"},o.a.createElement("i",{className:"fas fa-cloud","aria-hidden":"true"}),"AWS"),o.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"http://dpresume.com/docs/pdf/aws-dev-associate-notes.pdf"},o.a.createElement("i",{className:"fab fa-aws"}),"Cloud"))}}]),t}(i.Component),p=a(10),f=a.n(p),h=a(15),v=a(16),b=a.n(v),g=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).formatResources=function(e){return e.indexOf(".png")>=0||e.indexOf(".jpg")>=0?o.a.createElement("img",{src:e,alt:e,style:a.imgStyle}):e.indexOf(".pdf")>=0?o.a.createElement("div",null,o.a.createElement("object",{data:""+a.cururl+e+"#view=FitH",type:"application/pdf",style:{height:"50vh",width:"100%"}},e)):e.indexOf(".txt")>=0||e.indexOf(".htm")>=0?o.a.createElement("div",null,a.readTextFile(e)):e},a.displayContents=function(){return a.props.contents?a.props.contents.map(function(e,t){var n=a.formatResources(e),r=o.a.createElement("a",{href:e,className:"text-primary font-weight-bold",target:"_blank",rel:"noopener noreferrer"},n),s=o.a.createElement("pre",{className:"text-primary"},n),c=e.indexOf(".png")>=0||e.indexOf(".jpg")>=0?r:s;return o.a.createElement("div",{key:"k1_"+t},c)}):null},a.readTextFile=function(e){return function(){var e=Object(h.a)(f.a.mark(function e(t){var n,r;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get(t);case 2:return n=e.sent,e.next=5,n.data;case 5:r=e.sent,a.setState({filetxt:r});case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()(e),o.a.createElement("pre",{style:{wordWrap:"break-word",whiteSpace:"pre-wrap"}},a.state.filetxt)},a.imgStyle={height:"400px",width:"98%",padding:"10px 10px",border:"2px solid black",marginBottom:"10px"},a.hval=a.props.header.split("->"),a.cururl=window.location.href,a.state={filetxt:"",ht:"500px"},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.setState({ht:window.screen.height-210+"px"})}},{key:"setHeader",value:function(){return o.a.createElement("div",null,o.a.createElement("span",{style:{textAlign:"center",fontSize:"24pt"},className:"font-weight-bold text-danger"},this.hval[0]))}},{key:"render",value:function(){return this.props.show?o.a.createElement("div",null,o.a.createElement("div",{className:"modal-backdrop h-100 w-100"},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"modal-content h-100"},o.a.createElement("div",{className:"modal-header font-weight-bold"},this.setHeader(),o.a.createElement("button",{onClick:this.props.onClose,className:"btn btn-dark"},"Close")),o.a.createElement("div",{className:"container w-75 p-3 overflow-auto",style:{height:this.state.ht}},this.displayContents()))))):null}}]),t}(o.a.Component),E=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).toggleModal=function(){a.setState({isOpen:!a.state.isOpen})},a.tag="notes",a.url_notes={notes:["./docs/my_notes.txt"]},a.state={isOpen:!1},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"h_left"},"Devendra Prasad - Tech Lead Developer",o.a.createElement(d,null)),o.a.createElement("div",{className:"h_right"},"Email: devendraprasad1984@gmail.com",o.a.createElement("br",null),"Mob: +91 9582797772",o.a.createElement("span",{style:{float:"right",color:"white"}},o.a.createElement("i",{className:"fas fa-sticky-note",style:{cursor:"pointer"},onClick:this.toggleModal}))),o.a.createElement(g,{show:this.state.isOpen,onClose:this.toggleModal,header:this.tag,contents:this.url_notes[this.tag]}))}}]),t}(i.Component),y=(a(229),a(45)),j=a(25),k=a.n(j),O=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).getdata=Object(h.a)(f.a.mark(function e(){var t;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get(a.url);case 2:t=e.sent,a.valsObj=t.data,"experience"===a.tag.toLowerCase()?a.setState({data:a.valsObj,content:JSON.stringify(a.valsObj)}):a.setState({data:a.valsObj.data,content:JSON.stringify(a.valsObj)});case 5:case"end":return e.stop()}},e)})),a.getAdhocResources=Object(h.a)(f.a.mark(function e(){var t,n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==Object.keys(a.state.adhocResources).length){e.next=6;break}return e.next=3,b.a.get(a.adhocUrl);case 3:t=e.sent,n=t.data,a.setState({adhocResources:n});case 6:case"end":return e.stop()}},e)})),a.display=function(){return"projects"===a.tag.toLowerCase()?a.display_projects():"experience"===a.tag.toLowerCase()?a.display_prof_exp():a.state.data.map(function(e,t){return o.a.createElement("p",{key:"idDiv"+t},k()(e))})},a.display_prof_exp=function(){var e=a.state.data;return Object.keys(e).map(function(t){return e[t]}).map(function(e,t){var a=e.role,n=e.time,r=e.projects,s=e.summary;return o.a.createElement("div",{key:"idDiv"+a,style:{marginTop:"10px"}},o.a.createElement("div",{className:"text-success  bg-light"},o.a.createElement("span",null,k()(a)),o.a.createElement("span",{style:{float:"right"}},k()(n))),o.a.createElement("div",null,o.a.createElement("span",null,"Projects Undertaken:"),o.a.createElement("div",null,r.map(function(e,t){return o.a.createElement("li",{key:"Proj"+t},k()(e))})),o.a.createElement("span",null,"Role Summary:"),o.a.createElement("div",null,s.map(function(e,t){return o.a.createElement("p",{key:"Role"+t},k()(e))}))))})},a.display_projects=function(){return a.state.data.map(function(e,t){var a=Object.keys(e)[0],n=Object.keys(e).map(function(t){return e[t]})[0];return o.a.createElement("div",{key:"id"+a},o.a.createElement("div",{style:{fontWeight:"bold",marginTop:"10px"},className:"text-success bg-light"},k()(a)),o.a.createElement("div",{style:{paddingLeft:"10px"}},k()(n)))})},a.onClick=function(){a.setState({json_tree_visible:!a.state.json_tree_visible})},a.toggleModal=function(){a.getAdhocResources(),a.setState({isOpen:!a.state.isOpen})},a.valsObj="",a.adhocUrl="./resources/adhoc.json",a.url=a.props.url,a.tag=a.props.tag,a.state={data:[],json_tree_visible:!1,isOpen:!1,content:"default",adhocResources:{}},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidUpdate",value:function(e,t,a){if(this.props.tag!==e.tag)return this.display()}},{key:"componentDidMount",value:function(){Object(y.polyfill)(),this.getdata()}},{key:"render",value:function(){return"none"===this.props.xblock?null:o.a.createElement("div",{className:this.props.grid_col_val,style:{marginBottom:"2em"}},o.a.createElement("div",{className:"text-white bg-dark font-weight-bolder",onClick:this.toggleModal,style:{cursor:"pointer"}},o.a.createElement("span",{style:{textDecoration:"underline"}},this.tag),o.a.createElement("span",null)),o.a.createElement(g,{show:this.state.isOpen,onClose:this.toggleModal,header:this.tag+"->"+this.url,contents:this.state.adhocResources[this.tag]}),o.a.createElement("div",{id:"project_summary",className:"content"},o.a.createElement("div",null,this.display())))}}]),t}(i.Component),N=(a(241),function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).url="./resources/skills.json",a.state={skills:{}},a.getskill_data=Object(h.a)(f.a.mark(function e(){var t;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get(a.url);case 2:t=e.sent,a.setState({skills:t.data.skills}),a.props.callback_skills(t.data.skills);case 5:case"end":return e.stop()}},e)})),a.display=function(){var e=a.state.skills;return Object.keys(e).map(function(t,a){return o.a.createElement("div",{className:"right_skills",key:"id"+a},o.a.createElement("div",{className:"text-success  bg-light font-weight-bolder"},t),e[t].map(function(e,a){return o.a.createElement("div",{key:"id"+t+a},o.a.createElement("span",{className:"color-1"},e.split(":")[0])," ",o.a.createElement("span",{className:"color-2"},e.split(":")[1]))}))})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){Object(y.polyfill)(),this.getskill_data()}},{key:"render",value:function(){return o.a.createElement("div",{id:"rightPanel"},o.a.createElement("div",{className:"bg-dark text-white font-weight-bolder",style:{fontSize:"12pt"}},"Skills"),o.a.createElement("div",null,this.display()))}}]),t}(i.Component)),x=(a(242),function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"bottom_div bg-dark"},o.a.createElement("div",{className:"bg-primary text-white font-weight-bolder"}),o.a.createElement("div",null,o.a.createElement("span",{className:"badge badge-primary"},"(C) Devendra Prasad"),o.a.createElement("span",{className:"badge badge-success"},"+91 958 279 7772"),o.a.createElement("div",{className:"badge badge-light"},o.a.createElement("span",{className:"badge badge-info"},"Python3"),o.a.createElement("span",{className:"badge badge-info"},"AWS"),o.a.createElement("span",{className:"badge badge-info"},"React+redux+js+html5"),o.a.createElement("span",{className:"badge badge-info"},"PLSql"),o.a.createElement("span",{className:"badge badge-info"},"Agile"))))}}]),t}(i.Component)),_=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).callback_skills=function(e){for(var t in e){var n=e[t];for(var r in n)a.skills.push({text:n[r],value:""})}},a.skills=[],a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"main_center_div"},o.a.createElement("div",{className:"row align-content-center"},o.a.createElement("div",{className:"col-lg-3",id:"profile_img"},o.a.createElement("img",{src:"./global/dp.png",alt:""})),o.a.createElement("div",{className:"col-lg-9"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement(O,{xblock:"block",tag:"Summary",grid_col_val:"col-sm-12",url:"./resources/summary.json"}))))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-6"},o.a.createElement(O,{xblock:"block",tag:"Education",grid_col_val:"col-sm-12",url:"./resources/education.json"})),o.a.createElement("div",{className:"col-lg-6"},o.a.createElement(O,{xblock:"block",tag:"Certification",grid_col_val:"col-sm-12",url:"./resources/certifications.json"}))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-10"},o.a.createElement(O,{xblock:"block",tag:"Experience",grid_col_val:"col-sm-12",url:"./resources/prof_expr.json"}),o.a.createElement(O,{xblock:"block",tag:"Projects",grid_col_val:"col-sm-12",url:"./resources/projects.json"}),o.a.createElement("div",{className:"col-lg-12"},o.a.createElement(x,null))),o.a.createElement("div",{className:"col-lg-2"},o.a.createElement(N,{callback_skills:this.callback_skills}))))}}]),t}(i.Component),w=(a(67),a(243),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).fetchlinks=Object(h.a)(f.a.mark(function e(){var t,n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get(a.linksurl);case 2:t=e.sent,n=t.data[a.props.keyid],a.setState({data:n});case 5:case"end":return e.stop()}},e)})),a.displayLinks=function(){var e=[];if(!a.state.data)return null;for(var t in a.state.data)e.push(o.a.createElement("a",{key:"id"+t,href:a.state.data[t],style:{fontSize:"10pt"},className:"text-primary",target:"_blank",rel:"noopener noreferrer"},t));return e.map(function(e){return e})},a.linksurl="./resources/links.json",a.state={data:{}},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.fetchlinks()}},{key:"render",value:function(){return o.a.createElement("div",{className:"bg-light"},this.displayLinks())}}]),t}(o.a.Component)),C=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"top_div"},o.a.createElement("div",{className:"top_div_a"},o.a.createElement(w,{keyid:"header"})))}}]),t}(i.Component),S=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return this.props.isActive?o.a.createElement("div",{id:"main_id",className:"container",style:{marginBottom:"5em"}},o.a.createElement("div",{className:""},o.a.createElement("div",{id:"div_fix_top",className:"row fixed-top"},o.a.createElement("div",{className:"col-lg-12 bg-dark"},o.a.createElement(E,null)),o.a.createElement("div",{className:"col-lg-12 bg-dark"},o.a.createElement(C,null))),o.a.createElement("div",{id:"div_container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement(_,null)))))):null}}]),t}(o.a.Component),P=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).updateData=function(e){a.setState({curtag:e})},a.display=function(e){var t=[];for(var n in a.data){var r=a.state.curtag===n?"block":"none";t.push(o.a.createElement("div",{key:"xid"+n,style:{display:r}},o.a.createElement(O,{xblock:r,tag:n,grid_col_val:a.data[n].grid_col_val,url:a.data[n].url})))}return t.map(function(e){return e})},a.data={Summary:{grid_col_val:"col-sm-12",url:"./resources/summary.json"},Education:{grid_col_val:"col-sm-12",url:"./resources/education.json"},Certification:{grid_col_val:"col-sm-12",url:"./resources/certifications.json"},Experience:{grid_col_val:"col-sm-12",url:"./resources/prof_expr.json"},Projects:{grid_col_val:"col-sm-12",url:"./resources/projects.json"}},a.state={curtag:"Summary",curClass:"badge badge-dark text-white",activeClass:"badge bg-white text-primary border border-secondary "},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return this.props.isActive?o.a.createElement("div",{id:"main_id",className:"tabbedPane"},o.a.createElement("div",{id:"div_fix_top",className:"row fixed-top"},o.a.createElement("div",{className:"col-lg-12 bg-dark"},o.a.createElement(E,null)),o.a.createElement("div",{className:"col-lg-12"},o.a.createElement(C,null))),o.a.createElement("div",{className:"",style:{position:"fixed",left:0,height:"100%"}},o.a.createElement("div",{className:"Summary"===this.state.curtag?this.state.activeClass:this.state.curClass,style:{cursor:"pointer"},onClick:function(){return e.updateData("Summary")}},"Summary"),o.a.createElement("br",null),o.a.createElement("div",{className:"Education"===this.state.curtag?this.state.activeClass:this.state.curClass,style:{cursor:"pointer"},onClick:function(){return e.updateData("Education")}},"Education"),o.a.createElement("br",null),o.a.createElement("div",{className:"Certification"===this.state.curtag?this.state.activeClass:this.state.curClass,style:{cursor:"pointer"},onClick:function(){return e.updateData("Certification")}},"Certification"),o.a.createElement("br",null),o.a.createElement("div",{className:"Experience"===this.state.curtag?this.state.activeClass:this.state.curClass,style:{cursor:"pointer"},onClick:function(){return e.updateData("Experience")}},"Experience"),o.a.createElement("br",null),o.a.createElement("div",{className:"Projects"===this.state.curtag?this.state.activeClass:this.state.curClass,style:{cursor:"pointer"},onClick:function(){return e.updateData("Projects")}},"Projects"),o.a.createElement("br",null)),o.a.createElement("div",{className:"",style:{marginLeft:"7rem"}},o.a.createElement("div",{className:"row",style:{marginBottom:"5rem"}},o.a.createElement("div",{className:"col-lg-12"},this.display(this.state.curtag))))):null}}]),t}(o.a.Component),T=a(102),D=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).getAdhocResources=Object(h.a)(f.a.mark(function e(){var t,n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==Object.keys(a.state.adhocResources).length){e.next=6;break}return e.next=3,b.a.get(a.adhocUrl);case 3:t=e.sent,n=t.data,a.setState({adhocResources:n});case 6:case"end":return e.stop()}},e)})),a.toggleModal=function(e){a.getAdhocResources(),""===e?a.setState({isOpen:!a.state.isOpen}):a.setState({isOpen:!a.state.isOpen,tag:e,url:a.data[e].url})},a.getSummary=function(){if(0!==a.state.summary.length)return null;var e=a.data.Summary.url,t=function(){var t=Object(h.a)(f.a.mark(function t(n){var r;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.get(e);case 2:r=t.sent,a.setState({summary:r.data.data});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()();Promise.resolve(t).then(function(e){return null})},a.getProjects=function(){if(0!==a.state.projects.length)return null;var e=a.data.Projects.url,t=function(){var t=Object(h.a)(f.a.mark(function t(n){var r;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.get(e);case 2:r=t.sent,a.setState({projects:r.data.data});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()();Promise.resolve(t).then(function(e){return null})},a.getProf_Expr=function(){if(0!==Object.keys(a.state.profexpr).length)return null;var e=a.data.Experience.url,t=function(){var t=Object(h.a)(f.a.mark(function t(n){var r;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.get(e);case 2:r=t.sent,a.setState({profexpr:r.data});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()();Promise.resolve(t).then(function(e){return null})},a.displaySummary=function(){return a.getSummary(),o.a.createElement("div",null,o.a.createElement("h1",null,"Who I Am......."),o.a.createElement("h2",null,"Tech Lead Developer - python | react | js | html5 | plsql | AWS"),a.state.summary.map(function(e,t){return o.a.createElement("p",{key:"pleft_"+t},k()(e))}))},a.displayProjects=function(){return a.getProjects(),a.state.projects.map(function(e,t){var a=Object.keys(e)[0],n=Object.values(e)[0];return o.a.createElement("div",{key:"proj_"+t,className:"projects"},o.a.createElement("span",{className:"title"},a),o.a.createElement("span",{className:"time-period"}),o.a.createElement("span",null,n))})},a.displayProfExpr=function(){a.getProf_Expr();var e=Object(T.a)({},a.state.profexpr),t=[];for(var n in e)t.push(o.a.createElement("div",{key:"prof_expr_"+n,className:"position"},o.a.createElement("span",{className:"title"},e[n].role),o.a.createElement("span",{className:"time-period"},e[n].time)));return t.map(function(e){return e})},a.url=a.props.url,a.tag=a.props.tag,a.adhocUrl="./resources/adhoc.json",a.data={Summary:{url:"./resources/summary.json"},Education:{url:"./resources/education.json"},Certification:{url:"./resources/certifications.json"},Experience:{url:"./resources/prof_expr.json"},Projects:{url:"./resources/projects.json"},Skills:{url:"./resources/skills.json"}},a.state={isOpen:!1,content:"default",adhocResources:{},tag:"Certification",url:"./resources/certifications.json",summary:[],projects:[],profexpr:{}},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return this.props.isActive?o.a.createElement("div",{id:"main_id",className:"container",style:{marginBottom:"5em"}},o.a.createElement(g,{show:this.state.isOpen,onClose:function(){return e.toggleModal("")},header:this.state.tag+"->",contents:this.state.adhocResources[this.state.tag]}),o.a.createElement("div",{className:""},o.a.createElement("div",{id:"div_fix_top",className:"row fixed-top"},o.a.createElement("div",{className:"col-lg-12 bg-dark"},o.a.createElement(E,null)),o.a.createElement("div",{className:"col-lg-12 bg-dark"},o.a.createElement(C,null))),o.a.createElement("div",{id:"div_container",style:{marginTop:"1em",paddingLeft:"10px"}},o.a.createElement("div",{className:"row"},o.a.createElement("div",{id:"div_container_naive_left",className:"col-lg-6"},o.a.createElement("div",{className:"content"},this.displaySummary())),o.a.createElement("div",{id:"div_container_naive_right",className:"col-lg-6"},o.a.createElement("div",{className:"content"},o.a.createElement("h3",{onClick:function(){return e.toggleModal("Summary")}},"Synopsis"),o.a.createElement("div",{className:"synopsis"},o.a.createElement("span",{className:"title"},"Technology Enthuziast, Tech Lead Developer, I love solving challenges in software programming")),o.a.createElement("h3",{onClick:function(){return e.toggleModal("Experience")}},"Career History"),this.displayProfExpr(),o.a.createElement("h3",{onClick:function(){return e.toggleModal("Projects")}},"Projects"),this.displayProjects(),o.a.createElement("h3",{onClick:function(){return e.toggleModal("Education")}},"Education"),o.a.createElement("div",{className:"education"},o.a.createElement("span",{className:"title"},"SCDL, Symbiosis, Pune, India"),o.a.createElement("span",{className:"supplemental"},"PGDITM, 2015-2017")),o.a.createElement("div",{className:"education"},o.a.createElement("span",{className:"title"},"MDU, Rohtak, Haryana, India"),o.a.createElement("span",{className:"supplemental"},"BTech IT, 2002-2006")),o.a.createElement("h3",{onClick:function(){return e.toggleModal("Certification")}},"Certifications"),o.a.createElement("div",{className:"cert"},o.a.createElement("span",{className:"title"},"Certified Associate in Python"),o.a.createElement("span",{className:"supplemental"},"Python Institute")),o.a.createElement("div",{className:"cert"},o.a.createElement("span",{className:"title"},"1Z0-071 Oracle DB SQL (OC1849712)"),o.a.createElement("span",{className:"supplemental"},"Oracle University")),o.a.createElement("div",{className:"cert"},o.a.createElement("span",{className:"title"},"React+Redux (UC-91YOYH2M)"),o.a.createElement("span",{className:"supplemental"},"Udemy")))))))):null}}]),t}(o.a.Component);a.d(t,"default",function(){return A});var A=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).handleTabClick=function(e){for(var t=0;t<a.tabs.length;t++)document.getElementById(a.tabs[t]).style.display="none";document.getElementById(e).style.display="block",a.setState({curTab:e})},a.tabsElem=o.a.createRef(),a.tabs=["tab1","tab2","tab3"],a.tabClass="btn btn-primary font-weight-bold text-white",a.tabClassActive="btn btn-dark font-weight-bold text-dark bg-white",a.state={curTab:a.tabs[2]},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.handleTabClick(this.state.curTab)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("div",{id:"bottomPane",ref:this.tabsElem,className:"bg-dark fixed-bottom",style:{padding:"2px",width:"100%"}},o.a.createElement("span",{className:this.state.curTab===this.tabs[0]?this.tabClassActive:this.tabClass,onClick:function(){return e.handleTabClick(e.tabs[0])}},"Tabbed"),o.a.createElement("span",{className:this.state.curTab===this.tabs[1]?this.tabClassActive:this.tabClass,onClick:function(){return e.handleTabClick(e.tabs[1])}},"Split"),o.a.createElement("span",{className:this.state.curTab===this.tabs[2]?this.tabClassActive:this.tabClass,onClick:function(){return e.handleTabClick(e.tabs[2])}},"Naive")),o.a.createElement("div",{className:"container"},o.a.createElement("div",{id:"tabs",className:""},o.a.createElement("div",{id:"tab1",style:{display:"none"}},o.a.createElement(P,{isActive:this.state.curTab===this.tabs[0]})),o.a.createElement("div",{id:"tab2",style:{display:"none"}},o.a.createElement(S,{isActive:this.state.curTab===this.tabs[1]})),o.a.createElement("div",{id:"tab3",style:{display:"none"}},o.a.createElement(D,{isActive:this.state.curTab===this.tabs[2]})))))}}]),t}(o.a.Component);m.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},67:function(e,t,a){}},[[103,1,2]]]);
//# sourceMappingURL=main.9c8edb4d.chunk.js.map