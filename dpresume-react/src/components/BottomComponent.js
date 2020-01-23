import React, {Component} from 'react'
import '../styles/BottomComponent.css'


export default class BottomComponent extends Component {
    render() {
        return (
            <div className="bottom_div bg-dark">
                <div className="bg-primary text-white font-weight-bolder"></div>
                <div>
                    <span className="badge badge-primary">(C) Devendra Prasad</span>
                    <span className="badge badge-success">+91 958 279 7772</span>

                    <div className="badge badge-light">
                        <span className="badge badge-info">Python3</span>
                        <span className="badge badge-info">AWS</span>
                        <span className="badge badge-info">React+redux+js+html5</span>
                        <span className="badge badge-info">PLSql</span>
                        <span className="badge badge-info">Agile</span>
                    </div>
                </div>

            </div>
        )
    }
}