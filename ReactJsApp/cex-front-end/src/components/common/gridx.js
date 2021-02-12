import React, {useEffect, useState} from 'react';
import Button from "./Button";
import Input from "./textInput";

const GridX = (props) => {
    const {data} = props
    const [datax, setDatax] = useState([])

    useEffect(() => {
        setDatax(data)
    }, [])

    const rowAction = [
        <a href='#' className=''>edit</a>
        , <a href='#' className=''>delete</a>
    ]
    const displayGrid = () => {
        if (datax === undefined || datax.length === 0) return null
        let header = {}
        const cols = [
            rowAction.map((x, i) => header['act' + i] = ''),
            , Object.keys(datax[0]).map(x => header[x] = x.toUpperCase())
        ]
        const dataWithHeader = [header, ...datax]
        console.log(dataWithHeader)
        return dataWithHeader.map((x, i) => {
            return <div key={'row' + i} className={i === 0 ? 'line header' : 'line'}>
                {rowAction.map((btn, n) => <span key={'btn' + n}>{i === 0 ? '' : btn}</span>)}
                <span>{x.id}</span>
                <span>{x.lastName}</span>
                <span>{x.firstName}</span>
                <span>{x.age}</span>
            </div>
        })
    }
    return (
        <div style={{height: 400, width: '100%'}}>
            <div className=''><Input placeholder={'search...'}/></div>
            <div className='table'>{displayGrid()}</div>
        </div>
    );
}
export default GridX
