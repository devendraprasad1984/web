import React, {Component} from 'react'
import '../styles/HeaderComponent.css'
import LinksComponent from "./LinksComponent"
import SimpleModal from './SimpleModal'

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.tag = "notes"
        // this.url_notes = {
        //     "notes": ["http://dpresume.com/docs/my_notes.txt"]
        // }
        this.url_notes = {
            "notes": ["./docs/my_notes.txt"]
        }
        this.state = {
            isOpen: false
        }
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <div>
                <div>
                    <div className="h_left" style={{textAlign: 'initial',fontSize: '20pt'}}>Devendra Prasad-Tech Lead Developer</div>
                    <div style={{wordWrap: 'initial'}}><LinksComponent/></div>
                </div>
                <div className="h_right"  style={{textAlign: 'initial',fontSize: '12px'}}>
                    Email: devendraprasad1984@gmail.com<br/>
                    Mob: +91 9582797772
                    <span style={{float: 'right', color:'white'}}>
                        <i className="fas fa-sticky-note" style={{cursor: 'pointer'}} onClick={this.toggleModal}></i>
                    </span>
                </div>

                <SimpleModal show={this.state.isOpen} onClose={this.toggleModal} header={this.tag}
                             contents={this.url_notes[this.tag]}/>
            </div>
        )
    }
}