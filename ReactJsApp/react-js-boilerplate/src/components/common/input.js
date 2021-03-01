import React from 'react'

const sty={width:'100%'}
const Input = React.forwardRef((props, ref) => {
    const {type, label, change, placeholder, style, keydown} = props
    const stylex=style||{width:'100%'}
    const txtInput = <input
        ref={ref}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={change}
        onKeyDown={keydown}
        style={sty}
    />
    const txtArea = <textarea
        ref={ref}
        placeholder={placeholder}
        onChange={change}
        rows={5}
        cols={10}
        style={sty}
    />
    return <div className='cols' style={style}>
        <span className='label'>{label}</span>
        {type === 'area' ? txtArea : txtInput}
    </div>
})

export default Input
