import React, {Component} from 'react'
import '../styles/CenterComponent.css'
import GenericComponent from "./GenericComponent";
// import WordCloud  from './wordcloud'
import RightComponent from "./RightComponent";
import BottomComponent from "./BottomComponent";
// import Overview from "./Overview";


export default class CenterComponent extends Component {
    constructor(props){
        super(props)
        // this.skills= [{text: 'Git',value:''}]
        this.skills= []
        // {text: 'nodejs',value: 11},
    }

    callback_skills=skills=>{
        for(let x in skills){
            let xar=skills[x]
            for(let j in xar){
                this.skills.push({text: xar[j],value:''})
            }
        }
    }

    render() {
        return (
            <div id="main_center_div">
                <div className="row align-content-center">
                    {/*<div className="col-lg-6"><WordCloud words={this.skills}/></div>*/}
                    <div className="col-lg-3" id="profile_img" ><img src="./global/dp.png" alt="" /></div>
                    <div className="col-lg-9">
                        <div className="row">
                            {/*<div className="col-lg-12" style={{marginLeft:'20px'}}><Overview/></div>*/}
                            <div className="col-lg-12"><GenericComponent xblock="block" tag="Summary" grid_col_val="col-sm-12" url="./resources/summary.json"/></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6"><GenericComponent xblock="block" tag="Education" grid_col_val="col-sm-12" url="./resources/education.json"/></div>
                    <div className="col-lg-6"><GenericComponent xblock="block" tag="Certification" grid_col_val="col-sm-12" url="./resources/certifications.json"/></div>
                </div>

                <div className="row">
                    <div className="col-lg-10">
                        <GenericComponent xblock="block" tag="Experience" grid_col_val="col-sm-12" url="./resources/prof_expr.json"/>
                        <GenericComponent xblock="block" tag="Projects" grid_col_val="col-sm-12" url="./resources/projects.json"/>
                        <div className="col-lg-12"><BottomComponent/></div>
                    </div>
                    <div className="col-lg-2"><RightComponent callback_skills={this.callback_skills}/></div>
                </div>
            </div>
        )
    }
}