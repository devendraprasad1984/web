import React from "react"

const NoFound = props => {
    const {val}=props
    const txt=val||'No data Found'
    return <div>
        <div className='bold'>{txt}</div>
    </div>
}

export default NoFound
