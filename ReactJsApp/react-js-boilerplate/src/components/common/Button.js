import React from "react"
import '../../style.css'

const Button = props => {
    const {click, val, color,icon} = props
    const btnColor = color || 'btn purple white'
    let iconObj=<span className="icons">{icon}</span>
    return icon!==undefined ? <a className={`${btnColor} riple`} onClick={click}>{iconObj} {val}</a> : <a className={`${btnColor} riple`} onClick={click}>{val}</a>
}
export default Button
