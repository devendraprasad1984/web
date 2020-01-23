import React,{Component} from 'react'
import '../styles/TopComponent.css'
import './SetLinks'
import SetLinks from "./SetLinks";

export default class TopComponent extends Component{
    render(){
        return(
            <div className="top_div">
                <div  className="top_div_a">
                    <SetLinks keyid="header"/>
                </div>
            </div>
        )
    }
}