import React from 'react'

const Select = React.forwardRef((props, ref) => {
    const {label, change, data, style} = props
    const datax = data || ['']
    const stylex = style || {width: '100%'}
    // const datax = [label,...data] || [label]
    return <div className='cols' style={stylex}>
        <span className='label'>{label}</span>
        <select
            name={'name_'+label}
            ref={ref}
            type={'select'}
            onChange={change}
        >
            <option key={'opt-'} className='opt' value={''}>{''}</option>
            {datax.map((x, i) => <option key={'opt' + i} className='opt' value={x}>{x}</option>)}
        </select>
    </div>
})

export default Select
