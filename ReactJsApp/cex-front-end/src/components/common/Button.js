import React from "react"
import '../appstyles.css'

const Button = props => {
    const {click, val, color} = props
    const btnColor=color || 'black white'
    return <div onClick={click}>
        <span className={`btn ${btnColor} riple`}>{val}</span>
    </div>
}

export default Button
