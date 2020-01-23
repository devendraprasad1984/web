import React, {Component} from 'react'
import {polyfill} from 'es6-promise'
import axios from "axios";
import parser from 'html-react-parser'
// import ModalWindowDP from './modalWindow'
import SimpleModal from './SimpleModal'
// import JSONTree from 'react-json-tree'
// import * as x from "./JSONTheme"

export default class GenericComponent extends Component {
    constructor(props) {
        super(props)
        this.valsObj = ""
        this.adhocUrl = "./resources/adhoc.json"
        this.url = this.props.url
        this.tag = this.props.tag
        this.state = {
            data: [],
            json_tree_visible: false,
            isOpen: false,
            content: "default",
            adhocResources: {}
        }
        // console.log("props",this.props)
        // this.divXRef = React.createRef()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log(this.props, prevProps)
        if(this.props.tag!==prevProps.tag){
            return this.display()
        }
    }

    getdata = async () => {
        const res = await axios.get(this.url)
        this.valsObj = res.data
        if (this.tag.toLowerCase() === "experience") {
            this.setState({data: this.valsObj, content: JSON.stringify(this.valsObj)})
        } else {
            this.setState({data: this.valsObj.data, content: JSON.stringify(this.valsObj)})
        }
    }
    getAdhocResources = async () => {
        if (Object.keys(this.state.adhocResources).length === 0) {
            const res = await axios.get(this.adhocUrl)
            let xdata = res.data
            this.setState({adhocResources: xdata})
        }
    }

    componentDidMount() {
        polyfill()
        this.getdata()
    }

    display = () => {
        // console.log(this.tag.toLowerCase(),this.tag.toLowerCase() === "projects")
        if (this.tag.toLowerCase() === "projects") {
            return this.display_projects()
        } else if (this.tag.toLowerCase() === "experience") {
            return this.display_prof_exp()
        } else {
            let vals = this.state.data
            return vals.map((k, id) => {
                return (
                    <p key={"idDiv" + id}>{parser(k)}</p>
                )
            })
        }
    }
    display_prof_exp = () => {
        let {data} = this.state //destruct syntax
        //for ie support also
        return Object.keys(data).map(i => data[i]).map((obj, k) => {
            let {role, time, projects, summary} = obj //ES6 desctruct syntax
            return (
                <div key={"idDiv" + role} style={{marginTop:'10px'}}>
                    <div className="text-success  bg-light">
                        <span>{parser(role)}</span>
                        <span style={{float: 'right'}}>{parser(time)}</span>
                    </div>
                    <div>
                        <span>Projects Undertaken:</span>
                        <div>{projects.map((x, id) => <li key={"Proj" + id}>{parser(x)}</li>)}</div>
                        <span>Role Summary:</span>
                        <div>{summary.map((x, id) => <p key={"Role" + id}>{parser(x)}</p>)}</div>
                    </div>
                </div>
            )
        })
    }

    display_projects = () => {
        let vals = this.state.data
        // this.setState({content:vals})
        return vals.map((k, id) => {
            let key = Object.keys(k)[0]
            //let desc = Object.values(k)[0]
            let descObj = Object.keys(k).map(function (item) {
                return k[item]
            }) //for ie support
            let desc = descObj[0]
            // console.log(Object.keys(k)[0],Object.values(k)[0])
            return (
                <div key={"id" + key}>
                    <div style={{fontWeight: 'bold',marginTop:'10px'}} className="text-success bg-light">{parser(key)}</div>
                    <div style={{paddingLeft: '10px'}}>{parser(desc)}</div>
                </div>
            )
        })
    }
    onClick = () => {
        this.setState({json_tree_visible: !this.state.json_tree_visible})
    }
    toggleModal = () => {
        this.getAdhocResources()
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        if(this.props.xblock==="none")
            return null
        return (
            <div className={this.props.grid_col_val} style={{marginBottom:'2em'}}>
                <div className="text-white bg-dark font-weight-bolder" onClick={this.toggleModal}
                     style={{cursor: 'pointer'}}>
                    <span style={{textDecoration: 'underline'}}>{this.tag}</span><span></span>
                </div>

                <SimpleModal show={this.state.isOpen} onClose={this.toggleModal} header={this.tag + "->" + this.url}
                             contents={this.state.adhocResources[this.tag]}/>

                <div id="project_summary" className="content">
                    {/*<div id="x1" className="collapse" ref={this.divXRef}>*/}
                    <div>
                        {this.display()}
                    </div>
                </div>
            </div>
        )
    }
}