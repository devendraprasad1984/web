import React from "react"
import '../appstyles.css'

const Button = props => {
    const {click, val, color} = props
    const btnColor = color || 'btn black white'
    return <a className={`${btnColor} riple`} onClick={click}>{val}</a>
}

export default Button
