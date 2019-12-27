var colorsArray = ["bg-success", "bg-info", "bg-aqua", "bg-orange", "bg-danger", "bg-warning", "bg-primary", "bg-blue", "bg-fuchsia"]

var getRESTResource = function (url) {
    return $.getJSON(url, function (data) {
        console.log(data)
        return data
    });
}

var GetRestResources = React.createClass({
    getInitialState: function () {
        return {
            restData: null
            , htmlData: null
            , keyCounter: 0
            , isLoad: this.props.initLoad
        }
    },
    setHref: function (id, url, gotoUrl, tagName) {
        var thisObj = this
        var osName = navigator.platform.toLowerCase();
        var xHeight = screen.height + "px";
        var content = "";
        if (url.indexOf("http") != -1 || url.indexOf(".pdf") != -1 || url.indexOf(".png") != -1 || url.indexOf(".jpg") != -1) {
            content = thisObj.getConcatenatedObjects(url, gotoUrl);
        } else if (url.indexOf(".html") != -1) {
            content = <iframe className='pdfView' src={url} frameborder='0'></iframe>
        } else if (url.indexOf(".mp4") != -1 || url.indexOf("youtube") != -1) {
            content = <iframe className='pdfView' src={url} frameborder='0'></iframe>
        } else {
            content = <iframe className='pdfView' src={url} frameborder='0'></iframe>
        }
        var bgTagColor = colorsArray[Math.round(Math.random() * colorsArray.length)]
        $("#mTag").html("<div class='" + bgTagColor + "'><span>" + tagName + "</span><p class='btn btn-danger' style='text-align: right;float:right;display:inline-block'>[X]</p></div>");
        $("#mContent").html(content);
        // console.log(content)
        $("#myNav").css({width: '100%'});
    },
    getConcatenatedObjects: function (stringOfUrls, gotoUrl) {
        //apply a loop to run over each images and append in a div one after another
        var newGotoUrl = (typeof gotoUrl == "undefined") ? "" : gotoUrl;
        var xHeight = xHeight = screen.height + "px";
        var imagesArr = stringOfUrls.split(",");
        // console.log(imagesArr)
        var mcnt = 0;
        var content = ""
        imagesArr.forEach(function (objUrl) {
            mcnt += 1
            newGotoUrl = (newGotoUrl == "") ? objUrl : newGotoUrl;
            if (objUrl.indexOf(".pdf") != -1) {
                content += "<div key='myDymElem" + mcnt + "' class='pdfView' style='backgroundColor: white; height:'" + xHeight + "'><object data='" + objUrl + "' type='application/pdf' class='pdfView'></object></div>"
            } else if (objUrl.indexOf("http") != -1) {
                content += "<a key='myDymElem" + mcnt + "' href='" + objUrl + "' target='_blank'><div class='badge badge-pill badge-danger'>" + objUrl + "</div></a>"
            } else if (objUrl.indexOf(".png") != -1 || objUrl.indexOf(".jpg") != -1) {
                content += "<div key='myDymElem" + mcnt + "'><a href='" + newGotoUrl + "' target='_blank'><img src='" + objUrl + "' alt='" + objUrl + "' class='imgs' /></a></div>"
            }
            newGotoUrl = "";
        });
        // console.log(content)
        return content
    },
    setDisplayValues: function (idTag) {
        var tagName = "";
        var content = "";
        var imgs = "";
        var counter = 0
        var bgTagColor = colorsArray[Math.round(Math.random() * colorsArray.length)]
        $.getJSON("resources/projects.json",function (res) {
            var data = res.data.experience;
            var images = {};
            for (i = 0; i < data.length; i++) {
                if (data[i].key == idTag) {
                    counter += 1
                    tagName = data[i].name;
                    content = "<p style='color: lightgoldenrodyellow'>" + data[i].desc + "</p>";
                    images = data[i].images;
                    imgs += "<div style='margin: 1px; padding: 2px'>";
                    for (j = 0; j < images.length; j++) {
                        imgs += "<div><img src='" + images[j] + "' class='imgs' /></div>";
                    }
                    imgs += "</div>";
                    break;
                }
            }
            $("#mTag").html("<div class='"+bgTagColor+"'><span>"+tagName+"</span><p class='btn btn-danger' style='text-align: right; float: right; display: inline-block'>[X]</p></div>");
            $("#mContent").html(imgs)
        });
        $("#myNav").css({'width': '100%', 'display': 'block'})
    },
    getRestData: function (myCurUrl) {
        if (!this.state.isLoad) {
            var allValues = this;
            var counter = 0;
            $.getJSON(myCurUrl, function (res) {
                var newObj = null;
                if (!Array.isArray(res[Object.keys(res)[0]])) {
                    newObj = res
                } else {
                    newObj = res[Object.keys(res)[0]];
                }
                var myData = Object.keys(newObj).map(function (key) {
                    counter += 1
                    var xObj = newObj[key];
                    return (
                        <div key={"skill-div" + counter} style={{padding: '5px'}}>
                            <span className="badge badge-success" style={{
                                fontSize: '10pt',
                                fontWeight: 'bold'
                            }}>{key}</span>
                            {
                                ((typeof xObj != 'object') ? xObj : Object.keys(xObj).map(function (key1) {
                                    return <div className="row col-lg-12">{key1 + " : " + xObj[key1]}</div>
                                }))
                            }
                        </div>);
                });
                allValues.setState({restData: myData, keyCounter: allValues.state.keyCounter + 1})
            });
        }
    },
    getSkillsREST: function (myCurUrl) {
        if (!this.state.isLoad) {
            var allValues = this;
            var counter = 0;
            $.getJSON(myCurUrl, function (res) {
                var newObj = newObj = res[Object.keys(res)[0]];
                var myData = Object.keys(newObj).map(function (key) {
                    counter += 1
                    var xObj = newObj[key];
                    // console.log(xObj)
                    var mstyle = {
                        width: xObj.rating  + '%'
                        , fontSize: '12px'
                        , paddingLeft: '5px'
                    }
                    return (
                        <div key={"skill-div" + counter}>
                            <a href="#" onClick={() => allValues.setHref(this, xObj.href, undefined, xObj.skillName)}>
                                <div className="progress" style={{margin: '10px', fontSize: '10pt'}}>
                                    <div className={xObj.bgReact} style={mstyle} aria-valuenow={xObj.rating} aria-valuemin="0" aria-valuemax="100" role="progressbar">{xObj.skillName}</div>
                                    <span className="text-right badge-warning">{xObj.rating}%</span>
                                </div>
                            </a>
                        </div>
                    );
                });
                allValues.setState({restData: myData, keyCounter: allValues.state.keyCounter + 1})
            });
        }
    }
    , getProjectsREST: function (myCurUrl) {
        if (!this.state.isLoad) {
            var allValues = this;
            var counter = 0
            $.getJSON(myCurUrl, function (res) {
                var newObj = newObj = res[Object.keys(res)[0]];
                var myData = Object.keys(newObj).map(function (key) {
                    counter += 1
                    var xObj = newObj[key];
                    // console.log(xObj.bg,xObj.bg.indexOf('badge-info'))
                    if (xObj.bg.indexOf('badge-info')!=-1){
                        return (
                            <div>
                                <div className='' style={{float: 'left'}}><h4>{xObj.company}</h4></div>
                                <div key={"skill-div" + counter} className="wrapper container-fluid" style={{
                                    margin: '2px',
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        fontSize: '12pt',
                                        fontWeight: 'bolder'
                                    }} className={xObj.bg}>
                                        {xObj.name}
                                        <div style={{float: 'right', fontSize: '10pt'}}>
                                            <div className="badge badge-danger">{xObj.role}</div>
                                        </div>
                                    </div>
                                    <div className="">{xObj.desc}</div>
                                    <div className="badge badge-warning" style={{
                                        float: 'right',
                                        fontSize: '10pt'
                                    }}>{xObj.tech}</div>
                                </div>
                            </div>
                        );
                    }
                });
                allValues.setState({restData: myData, keyCounter: allValues.state.keyCounter + 1})
            });
        }
    }
    , fetchExternalHTML: function (htmlURI, loadInto) {
        var allValues = this;
        $.get(htmlURI, function (res) {
            // var myData = $.parseHTML('<div>{res}</div>')
            var myData = res
            $(loadInto).html(res)
            // allValues.setState({restData: myData})
        })
    }
    , buttonClickHandler: function (url, what2load, buttonClick) {
        // if (buttonClick) {
        //     this.setState({isLoad: false})
        //     setTimeout(function () {
        //         this.setState({isLoad: true})
        //     },500)
        // }
        if (what2load == "") {
            this.getRestData(url)
        } else if (what2load == 'skills') {
            this.getSkillsREST(url)
        } else if (what2load == 'projects') {
            this.getProjectsREST(url)
        } else if (what2load.substr(0, 1) == '#') {
            this.fetchExternalHTML(url, what2load)
        } else {
        }
        // console.log(this.state)
    },
    componentDidMount: function () {
        this.setState({isLoad: true})
        toastr.success(this.props.label + " - component load completed")
    },
    render: function () {
        // const {restData, htmlData, initLoad} = this.state;
        {
            !this.state.isLoad && this.buttonClickHandler(this.props.url, this.props.what2load, this.state.isLoad)
        }
        return (
            <div key={"divKey" + this.state.keyCounter}>
                <div onClick={() => this.buttonClickHandler(this.props.url, this.props.what2load, this.state.isLoad)} className={this.props.cls} style={{
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: '12pt'
                }}>{this.props.label}</div>
                <div style={{width: '100%', position: 'relative', overflow: 'auto'}}>{this.state.restData}</div>
            </div>
        );
    }
});

var TopContentsReactComponent = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return false;
    },
    getInitialState() {
        return {initLoad: true}
    },
    render() {
        return (
            <div>
                <div className="row container-fluid">
                    <div className="col-lg-12 h2">
                        <span className="badge badge-success badge-pill text-sm-left" style={{float: 'left'}}>Devendra Prasad</span>
                        <span className="badge badge-danger badge-pill text-sm-right" style={{float: 'right'}}>Fullstack Tech Lead</span>
                    </div>
                </div>
            </div>
        );
    }
});


// var LeftContentsReactComponent = React.createClass({
//     // getDefaultProps:function(){
//     //   // console.log(this.defaultProps)
//     // },
//     // componentWillMount:function(){
//     //   // console.log("left component is going to render")
//     // },
//     // componentDidMount: function(){
//     //     console.log("left component is render complete")
//     //     this.setState({initLoad:false})
//     // },
//     // shouldComponentUpdate: function(nextProps, nextState) {
//     //     return false;
//     // },
//     getInitialState: function () {
//         return {initLoad: true}
//     },
//     render() {
//         return (
//             // this.state.initLoad &&
//             <div>
//                 {/*{console.log(this.state.initLoad)}*/}
//                 <GetRestResources cls="btn btn-danger" url="resources/IT.json" label={this.props.tag} what2load="skills" initLoad={this.state.initLoad}/>
//             </div>
//         );
//     }
// });
//
// var MiddleContentsReactComponent = React.createClass({
//     shouldComponentUpdate: function(nextProps, nextState) {
//         return false;
//     },
//     getInitialState() {
//         return {initLoad: true}
//     },
//     render() {
//         return (
//             <div>
//                 <GetRestResources cls="btn btn-success" url="resources/projects.json" label={this.props.tag} what2load="projects" initLoad={this.state.initLoad}/>
//             </div>
//         );
//     }
// });
//
// class RightContentsReactComponent extends React.Component {
//     shouldComponentUpdate(nextProps, nextState) {
//         return false;
//     }
//     constructor() {
//         super();
//         this.test1 = 'hello this is a test';
//         this.state = {
//             initLoad: false
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <GetRestResources cls="btn btn-warning" url="services/server.php?id=getServerLog" label={this.props.tag} what2load="" initLoad={this.state.initLoad}/>
//             </div>
//         );
//     }
// };

var Bottom1ReactComponent = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return false;
    },
    render() {
        return (
            <div>
                <GetRestResources cls="btn btn-danger" url="templates/footerIKnow.html" label={this.props.tag} what2load="#idSkillContainer"/>
                <div id="idSkillContainer"></div>
            </div>
        );
    }
});

// var Bottom2ReactComponent = React.createClass({
//     shouldComponentUpdate: function (nextProps, nextState) {
//         return false;
//     },
//     render() {
//         return (
//             <div>
//                 <GetRestResources cls="btn bg-orange" url="templates/ichart.html" label={this.props.tag} what2load="#idGraphContainer"/>
//                 <div id="idGraphContainer"></div>
//             </div>
//         );
//     }
// });


var CommonContentsReactComponent = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    getInitialState() {
        return {initLoad: this.props.defaultLoad}
    },
    render() {
        let elm;
        if (this.props.tag == "Education") {
            elm = <run-time-templates url={this.props.url}></run-time-templates>;
        } else {
            elm =<GetRestResources cls={this.props.cls} url={this.props.url} label={this.props.tag} what2load={this.props.what2load} initLoad={!this.state.initLoad}/>;
        }
        // console.log(elm)
        return (<div>{elm}</div>);
    }
});


ReactDOM.render(<div><TopContentsReactComponent/></div>, document.getElementById("idReactTop"));

ReactDOM.render(<div>
    <CommonContentsReactComponent cls="btn btn-danger" url="resources/IT.json" what2load="skills" tag="Highlights" defaultLoad={true}/>
</div>, document.getElementById("idReactLeft"));

ReactDOM.render(<div>
    <CommonContentsReactComponent cls="btn btn-success" url="resources/projects.json" what2load="projects" tag="Experience" defaultLoad={true}/>
</div>, document.getElementById("idReactMiddle"));

ReactDOM.render(<div>
    <CommonContentsReactComponent cls="btn btn-warning" url="services/server.php?id=getServerLog" what2load="" tag="Miscellaneous" defaultLoad={true}/>
</div>, document.getElementById("idReactRight"));

// ReactDOM.render(<div>
//     <CommonContentsReactComponent cls="btn btn-info" url="templates/educationTemplate.html" what2load="" tag="Education" defaultLoad={true}/>
// </div>, document.getElementById("idReactEdu"));


ReactDOM.render(<div><Bottom1ReactComponent tag="Skills"/></div>, document.getElementById("idBottom1"));

