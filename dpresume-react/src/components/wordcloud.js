import React from 'react'
import ReactWordcloud from 'react-wordcloud'

export default class WordCloud extends React.Component {
    constructor(props) {
        super(props)
        this.words = this.props.words
        this.options = {
            colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', 'pink'],
            enableTooltip: false,
            deterministic: false,
            fontFamily: '"Google Sans"',
            fontStyle: 'normal',
            fontWeight: 'bold',
            padding: 2,
            rotations: 3,
            fontSizes: [22, 30, 20, 35, 50, 55],
            rotationAngles: [-90, 15 + Math.round(0 + Math.random() * 100)],
            scale: 'sqrt',
            spiral: 'archimedean',
            transitionDuration: 1,
        };
        this.height=300
        this.state = {height: this.height}
        this.divRef = React.createRef() //this is controlled component as its DOM will be controlled by react
    }

    // componentDidMount() {
    //     this.divRef.current.addEventListener('click',(evt)=>this.rerun(evt))
    // }
    updateComponent = () => {
        let curdiv = this.divRef.current
        let nextdiv = curdiv.firstChild
        if (nextdiv.height === undefined || nextdiv.height === "")
            nextdiv.height = this.state.height
        console.log(nextdiv, nextdiv.height)
        nextdiv.height = (nextdiv.height >= this.height ? this.height+1 : this.height)
    }

    renderWords = () => {
        let swords = this.words
        return <ReactWordcloud options={this.options} words={swords}/>
        // return <ReactWordcloud words={swords}/>
    }

    rerun = () => {
        // this.options.fontSizes=[Math.round(5+Math.random()*20), Math.round(15+Math.random()*75)]
        // this.options.rotationAngles=[0, Math.round(0+Math.random()*90)]
        this.options.fontSizes = [13, 16, 20, 26, 35, 49]
        this.options.rotationAngles = [-90, 25 + Math.round(0 + Math.random() * 100)]

        let curdiv = this.divRef.current
        let nextdiv = curdiv.firstChild
        let nextsvg = nextdiv.firstChild
        // console.log(nextsvg,nextsvg.style.height)
        let xval = nextsvg.style.height === "" || nextsvg.style.height === "300px" ? "301px" : "300px"
        nextsvg.style.height = xval
        // let xvar=this.state.height===300 ? 301 : 300
        // console.log(evt.target,evt.target.height,evt.target.style.height)
        // let xvar=(evt.target.style.height==='300px' || evt.target.style.height==="" || evt.target.style.height===undefined?'301px':'300px')
        // evt.target.style.height=xvar
        // this.setState({height:xvar})
        // this.updateComponent()
    }

    render() {
        return (
            <div>
                {/*<div><button onClick={this.rerun} className="badge btn btn-danger">...</button></div>*/}
                <div style={{width: '100%', height: this.state.height + "px"}} ref={this.divRef}
                     onClick={this.rerun}>{this.renderWords()}</div>
            </div>
        )
    }
}