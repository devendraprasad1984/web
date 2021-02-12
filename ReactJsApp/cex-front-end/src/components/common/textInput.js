import React from 'react'

const Input=React.forwardRef((props,ref) => {
    const {type, label, change, placeholder} = props
    return <div className='cols'>
        <span className='label'>{label}</span>
        <input
            ref={ref}
            type={type || 'text'}
            placeholder={placeholder}
            onChange={change}
        /></div>
})

export default Input
