import React from 'react'

const Input = React.forwardRef((props, ref) => {
    const {type, label, change, placeholder} = props
    const txtInput = <input
        ref={ref}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={change}
    />
    const txtArea = <textarea
        ref={ref}
        placeholder={placeholder}
        onChange={change}
        rows={5}
        cols={10}
    />
    return <div className='cols'>
        <span className='label'>{label}</span>
        {type === 'area' ? txtArea : txtInput}
    </div>
})

export default Input
