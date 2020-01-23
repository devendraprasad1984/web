import React from 'react'
import ReactDOM from 'react-dom'

const ModalWindowDP =(props)=>{
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e)=>{e.stopPropagation()}} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.description}</div>
                <div className="actions">{props.action}</div>
            </div>
        </div>
        ,document.getElementById('root_modal_window'))
}

export default ModalWindowDP
