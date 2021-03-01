import React, {createRef, useEffect, useState} from 'react';
import Input from "./input";
import Button from "./Button";
import NoFound from "./notfound";
import {config} from "./config";

const GridX = (props) => {
    const {data, edit, del, searchable} = props
    const [localDataCopy, setLocalDataCopy] = useState([])
    const isSearch = searchable !== undefined ? true : false
    const txtSearch = createRef()

    useEffect(() => {
        setLocalDataCopy(config.deepCopy(data))
        // console.log('effect log',data,localDataCopy, config.deepCopy(data))
    }, [data])

    const noAction = edit === undefined && del === undefined
    const rowAction = (row) => !noAction ? <div>
        {edit !== undefined ? <Button color='badge' val='edit' click={() => edit(row)}/> : null}
        {del !== undefined ? <Button color='badge red' val='delete' click={() => del(row)}/> : null}
    </div> : null


    const displayGrid = () => {
        // console.log(localDataCopy, data)
        if (data === undefined || data.length === 0) return <NoFound/>
        let header = {}
        let tmpKeys = Object.keys(data[0])
        if (!noAction) tmpKeys = ['act', ...tmpKeys]
        tmpKeys.forEach(x => header[x] = x.toUpperCase())
        // console.log('header',header)
        const dataWithHeader = [header, ...localDataCopy]
        let setRows = (row, rownum) => {
            return tmpKeys.map((k, j) => {
                return <span key={'colkey' + k + j}>{j === 0 && rownum !== 0 ? rowAction(row) : row[k]}</span>
            })
        }
        return dataWithHeader.map((r, i) => {
            return <div key={'row' + i} className={i === 0 ? 'line header' : 'line'}>{setRows(r, i)}</div>
        })
    }
    const searchData = e => {
        if (e.key !== 'Enter') return
        let newdata = []
        let searchVal = txtSearch.current.value
        newdata = data.filter(x => {
            let linedata = Object.values(x).join('~')
            let found = false
            if (linedata.toLowerCase().indexOf(searchVal) !== -1) found = true
            return found ? x : undefined
        }).filter(y => y !== undefined)
        // console.log(e.key, txtSearch.current.value, newdata)
        setLocalDataCopy(newdata)
    }
    return (
        <div className='gridContainer'>
            {isSearch ?
                <div className=''><Input ref={txtSearch} placeholder={'search...'} keydown={searchData}/></div> : null}
            <div className='table'>{displayGrid()}</div>
        </div>
    );
}
export default GridX
