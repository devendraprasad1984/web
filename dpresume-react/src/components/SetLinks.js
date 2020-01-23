import React from 'react'
import axios from "axios";


export default class SetLinks extends React.Component {
    constructor(props) {
        super(props)
        this.linksurl = "./resources/links.json"
        this.state = {data: {}}
    }

    fetchlinks = async () => {
        let res = await axios.get(this.linksurl)
        let x = res.data[this.props.keyid]
        this.setState({data:x})
    }
    componentDidMount() {
        this.fetchlinks()
    }

    displayLinks = () => {
        let elm=[]
        if(!this.state.data)
            return null
        for (let x in this.state.data) {
            elm.push(<a key={"id"+x} href={this.state.data[x]} style={{fontSize:'10pt'}} className="text-primary" target="_blank" rel="noopener noreferrer">{x}</a>)
        }
        return elm.map(x=>x)
    }

    render() {
        return (
            <div className="bg-light">
                {this.displayLinks()}
            </div>
        )
    }
}