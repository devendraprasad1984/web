import React, {Component} from 'react'
import {polyfill} from 'es6-promise'
import axios from "axios";
import '../styles/RightComponent.css'


export default class RightComponent extends Component {
    url = "./resources/skills.json"
    state = {
        skills: {}
    }

    getskill_data = async () => {
        const res = await axios.get(this.url)
        this.setState({skills: res.data.skills})
        this.props.callback_skills(res.data.skills)
        // console.log(this.state.skills)
    }

    componentDidMount() {
        polyfill()
        this.getskill_data()
    }

    display = () => {
        let vals = this.state.skills
        // console.log("vals",vals)
        return Object.keys(vals).map((k, id) => {
            return (
                <div className="right_skills" key={"id" + id}>
                    <div className="text-success  bg-light font-weight-bolder">{k}</div>
                    {vals[k].map((v, id) => {
                        return <div key={"id" + k + id}><span className="color-1">{v.split(":")[0]}</span> <span
                            className="color-2">{v.split(":")[1]}</span></div>
                    })}
                </div>
            )
        })
    }

    render() {
        return (
            <div id="rightPanel">
                <div className="bg-dark text-white font-weight-bolder" style={{fontSize: '12pt'}}>Skills</div>
                <div>
                    {this.display()}
                </div>
            </div>
        )
    }
}