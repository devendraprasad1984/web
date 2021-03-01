import React, {createRef, useEffect, useState} from "react"
import Select from "../common/select";
import Button from "../common/Button";
import {get, post} from "../common/api";
import {config} from "../common/config";

const Download = props => {
    const {header} = props
    const [meta, setMeta] = useState({scenarios: [], version: []})
    const selScen = createRef()
    const selVersion = createRef()

    const handleGetMeta = () => {
        get(config.endpoints.cexmetaEndpoint, data => {
            setMeta({version: data.meta.version, scenarios: data.meta.scenarios})
        })
    }
    useEffect(() => {
        handleGetMeta()
    }, [])
    const handleDownload = () => {
        let [scen, ver] = [selScen.current.value, selVersion.current.value]
        let payload = {payload: {scen, ver}}
        post(config.endpoints.downloadEndpoint, payload, data => {
            console.log('download', data)
        })
    }
    return <div>
        <h2>{header}</h2>
        <Button val='Refresh' click={handleGetMeta}/>
        <div className='inrow'>
            <Select ref={selScen} label='Scenarios' data={meta.scenarios}/>
            <Select ref={selVersion} label='Version' data={meta.version}/>
        </div>
        <Button val='Download' click={handleDownload}/>
    </div>
}

export default Download
