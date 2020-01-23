import React from 'react'
import HeaderComponent from "./HeaderComponent";
import '../styles/BaseResumeApp.css'
import TopComponent from "./TopComponent";
import SimpleModal from "./SimpleModal";
import axios from "axios";
import parser from 'html-react-parser'

class BaseResumeAppNaive extends React.Component {
    constructor(props) {
        super(props)
        this.url = this.props.url
        this.tag = this.props.tag
        this.adhocUrl = "./resources/adhoc.json"
        this.data = {
            "Summary": {
                "url": "./resources/summary.json"
            }, "Education": {
                "url": "./resources/education.json"
            }, "Certification": {
                "url": "./resources/certifications.json"
            }, "Experience": {
                "url": "./resources/prof_expr.json"
            }, "Projects": {
                "url": "./resources/projects.json"
            }, "Skills": {
                "url": "./resources/skills.json"
            },
        }
        this.state = {
            isOpen: false,
            content: "default",
            adhocResources: {},
            tag: "Certification",
            url: "./resources/certifications.json",
            summary: [],
            projects: [],
            profexpr: {}
        }
    }

    getAdhocResources = async () => {
        if (Object.keys(this.state.adhocResources).length === 0) {
            const res = await axios.get(this.adhocUrl)
            let xdata = res.data
            this.setState({adhocResources: xdata})
        }
    }

    toggleModal = (sval) => {
        this.getAdhocResources()
        if (sval === "") {
            this.setState({isOpen: !this.state.isOpen})
        } else {
            this.setState({isOpen: !this.state.isOpen, tag: sval, url: this.data[sval].url})
        }
    }

    getSummary = () => {
        if (this.state.summary.length !== 0)
            return null
        let url = this.data["Summary"].url
        //its result is a promise
        let retObj = (async (xdata) => {
            const res = await axios.get(url)
            this.setState({summary: res.data.data})
        })()
        Promise.resolve(retObj).then(xdata => null) //dummy fill to resolve so no react warning
        // return Promise.resolve(retObj).then(arr => {
        //         return (
        //             <div>
        //                 <h1>Who I Am.......</h1>
        //                 <h2>Tech Lead Developer - python | react | js | html5 | plsql | AWS</h2>
        //                 {arr.map((x, id) => <p key={"pleft_" + id}>{x}</p>)}
        //             </div>
        //         )
        //     }
        // )
    }

    getProjects = () => {
        if (this.state.projects.length !== 0)
            return null
        let url = this.data["Projects"].url
        //its result is a promise
        let retObj = (async (xdata) => {
            const res = await axios.get(url)
            this.setState({projects: res.data.data})
        })()
        Promise.resolve(retObj).then(xdata => null)
    }
    getProf_Expr = () => {
        if (Object.keys(this.state.profexpr).length !== 0)
            return null
        let url = this.data["Experience"].url
        //its result is a promise
        let retObj = (async (xdata) => {
            const res = await axios.get(url)
            this.setState({profexpr: res.data})
        })()
        Promise.resolve(retObj).then(xdata => null)
    }

    displaySummary = () => {
        this.getSummary()
        return (
            <div>
                <h1 style={{textAlign: 'initial',fontSize: '30pt'}}>Who I Am....</h1>
                <h2>Tech Lead Developer - python | react | js | html5 | plsql | AWS</h2>
                {this.state.summary.map((x, id) => <p key={"pleft_" + id}>{parser(x)}</p>)}
            </div>
        )
    }

    displayProjects = () => {
        this.getProjects()
        return this.state.projects.map((x, id) => {
            let title = Object.keys(x)[0]
            let txt = Object.values(x)[0]
            return (
                <div key={"proj_" + id} className='projects'>
                    <span className='title'>{title}</span>
                    <span className='time-period'></span>
                    <span>{txt}</span>
                </div>
            )
        })
    }

    displayProfExpr = () => {
        this.getProf_Expr()
        let profexpr = {...this.state.profexpr}
        let elm = []
        for (let x in profexpr) {
            // console.log(profexpr[x]["role"], profexpr[x]["time"])
            elm.push(<div key={"prof_expr_" + x} className='position'>
                    <span className='title'>{profexpr[x]["role"]}</span>
                    <span className='time-period'>{profexpr[x]["time"]}</span>
                </div>
            )
        }
        return elm.map(x=>x)
    }

    render() {
        if (!this.props.isActive)
            return null

        return (
            <div id="main_id" className="container" style={{marginBottom: '5em'}}>

                <SimpleModal show={this.state.isOpen} onClose={() => this.toggleModal("")}
                             header={this.state.tag + "->"}
                             contents={this.state.adhocResources[this.state.tag]}/>

                <div className="">
                    <div id="div_fix_top" className="row fixed-top">
                        <div className="col-lg-12 bg-dark">
                            <HeaderComponent/>
                        </div>
                        <div className="col-lg-12 bg-dark">
                            <TopComponent/>
                        </div>
                    </div>

                    <div id="div_container" style={{marginTop: '1em', paddingLeft: '10px'}}>
                        <div className="row">
                            <div id="div_container_naive_left" className="col-lg-6">
                                <div className='content'>
                                    {this.displaySummary()}
                                </div>
                            </div>

                            <div id="div_container_naive_right" className="col-lg-6">
                                <div className='content'>
                                    <h3 onClick={() => this.toggleModal("Summary")}>Synopsis</h3>
                                    <div className='synopsis'>
                                        <span className='title'>
                                        Technology Enthuziast, Tech Lead Developer, I love solving challenges in software programming
                                        </span>
                                    </div>

                                    <h3 onClick={() => this.toggleModal("Experience")}>Career History</h3>
                                    {this.displayProfExpr()}

                                    <h3 onClick={() => this.toggleModal("Projects")}>Projects</h3>
                                    {this.displayProjects()}

                                    <h3 onClick={() => this.toggleModal("Education")}>Education</h3>
                                    <div className='education'>
                                        <span className='title'>SCDL, Symbiosis, Pune, India</span>
                                        <span className='supplemental'>PGDITM, 2015-2017</span>
                                    </div>
                                    <div className='education'>
                                        <span className='title'>MDU, Rohtak, Haryana, India</span>
                                        <span className='supplemental'>BTech IT, 2002-2006</span>
                                    </div>

                                    <h3 onClick={() => this.toggleModal("Certification")}>Certifications</h3>
                                    <div className='cert'>
                                        <span className='title'>Certified Associate in Python</span>
                                        <span className='supplemental'>Python Institute</span>
                                    </div>
                                    <div className='cert'>
                                        <span className='title'>1Z0-071 Oracle DB SQL (OC1849712)</span>
                                        <span className='supplemental'>Oracle University</span>
                                    </div>
                                    <div className='cert'>
                                        <span className='title'>React+Redux (UC-91YOYH2M)</span>
                                        <span className='supplemental'>Udemy</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BaseResumeAppNaive

