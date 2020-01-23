import React from 'react'
import HeaderComponent from "./HeaderComponent";
import '../styles/BaseResumeApp.css'
import TopComponent from "./TopComponent";
import GenericComponent from "./GenericComponent";

// import WordCloud  from './wordcloud'

class BaseResumeAppTabbed extends React.Component {
    constructor(props) {
        super(props)
        this.data = {
            "Summary": {
                "grid_col_val": "col-sm-12",
                "url": "./resources/summary.json"
            }, "Education": {
                "grid_col_val": "col-sm-12",
                "url": "./resources/education.json"
            }, "Certification": {
                "grid_col_val": "col-sm-12",
                "url": "./resources/certifications.json"
            }, "Experience": {
                "grid_col_val": "col-sm-12",
                "url": "./resources/prof_expr.json"
            }, "Projects": {
                "grid_col_val": "col-sm-12",
                "url": "./resources/projects.json"
            }
        }
        this.state = {
            curtag: "Summary",
            curClass:"badge badge-dark text-white",
            activeClass:"badge bg-white text-primary border border-secondary "
        }
    }

    updateData = tagVal => {
        this.setState({curtag: tagVal})
        // this.forceUpdate()
        // return this.display(tagVal)
    }

    display = tagVal => {
        let elm = []
        for (let key in this.data) {
            let xblock=this.state.curtag===key?"block":"none"
            elm.push(
                <div key={"xid"+key} style={{display: xblock}}>
                    <GenericComponent
                        xblock={xblock}
                        tag={key}
                        grid_col_val={this.data[key].grid_col_val}
                        url={this.data[key].url}/>
                </div>
                )
        }
        return elm.map(x => x)
    }


    render() {
        if (!this.props.isActive)
            return null
        return (
            <div id="main_id" className="tabbedPane">
                <div id="div_fix_top" className="row fixed-top">
                    <div className="col-lg-12 bg-dark">
                        <HeaderComponent/>
                    </div>
                    <div className="col-lg-12">
                        <TopComponent/>
                    </div>
                </div>
                <div className="" style={{position: 'fixed',left: 0, height:'100%'}}>
                    <div className={this.state.curtag==="Summary"?this.state.activeClass:this.state.curClass} style={{cursor: 'pointer'}}
                         onClick={() => this.updateData("Summary")}>Summary
                    </div>
                    <br/>
                    <div className={this.state.curtag==="Education"?this.state.activeClass:this.state.curClass} style={{cursor: 'pointer'}}
                         onClick={() => this.updateData("Education")}>Education
                    </div>
                    <br/>
                    <div className={this.state.curtag==="Certification"?this.state.activeClass:this.state.curClass} style={{cursor: 'pointer'}}
                         onClick={() => this.updateData("Certification")}>Certification
                    </div>
                    <br/>
                    <div className={this.state.curtag==="Experience"?this.state.activeClass:this.state.curClass} style={{cursor: 'pointer'}}
                         onClick={() => this.updateData("Experience")}>Experience
                    </div>
                    <br/>
                    <div className={this.state.curtag==="Projects"?this.state.activeClass:this.state.curClass} style={{cursor: 'pointer'}}
                         onClick={() => this.updateData("Projects")}>Projects
                    </div>
                    <br/>
                </div>
                <div className="" style={{marginLeft: '7rem'}}>
                    <div className="row" style={{marginBottom: '5rem'}}>
                        <div className="col-lg-12">
                            {this.display(this.state.curtag)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BaseResumeAppTabbed

