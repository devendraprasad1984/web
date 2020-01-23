import React, {Component} from 'react'
import '../styles/BottomComponent.css'


export default class Overview extends Component {
    render() {
        return (
            <div className="container" style={{width:'100%',overflow:'none', marginLeft:'100px'}}>
                <strong>Tech Lead</strong>, by Profession @ <strong>RBS</strong>, I practice fullstack mode of software development. I lead a
                small team of software developers. We follow agile practices and devOps toolsets for our build and
                delivery. I also code in the sprints apart from playing a lead role and helping on team mates in
                various sorts of impediments that they encounter. My favourite tech stack is <strong>python, plsql, html5,
                react, JS</strong> etc. I am a versatile developer also. I also love to discuss on architectureal patterns and
                proposing solutions that can scale to business problems.
            </div>
        )
    }
}