import React from "react"
import '../appstyles.css'

const AppButton = props => {
    const {click, val, color} = props
    const btnColor=color || 'black white'
    return <div onClick={click}>
        <span className={`btn ${btnColor}`}>{val}</span>
    </div>
}

export default AppButton
