import React from 'react'
import HeaderComponent from "./HeaderComponent";
import CenterComponent from "./CenterComponent";
import '../styles/BaseResumeApp.css'
import TopComponent from "./TopComponent";


class BaseResumeApp extends React.Component {
    // constructor(props){
    //     super(props)
    // }
    render() {
        if(!this.props.isActive)
            return null
        return (
            <div id="main_id" className="container" style={{marginBottom:'5em'}}>
                <div className="">
                    <div id="div_fix_top" className="row fixed-top">
                        <div className="col-lg-12 bg-dark">
                            <HeaderComponent/>
                        </div>
                        <div className="col-lg-12 bg-dark">
                            <TopComponent/>
                        </div>
                    </div>

                    <div  id="div_container">
                        <div className="row">
                            <div className="col-lg-12"><CenterComponent/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BaseResumeApp

