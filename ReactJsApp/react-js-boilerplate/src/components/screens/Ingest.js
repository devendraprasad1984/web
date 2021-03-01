import React, {createRef, useEffect, useState} from "react"
import Button from "../common/Button";
import Select from "../common/select";
import {getSetUser} from "../redux/actions";
import {connect} from "react-redux";
import {get, post} from "../common/api";
import {config} from "../common/config";

const Ingest = props => {
    const {header} = props
    const [meta, setMeta] = useState({projects: [], scenarios: []})
    const selProj = createRef()
    const selScen = createRef()

    const {user} = props
    const {racf} = user.user||'user'

    const handleGetMeta = () => {
        get(config.endpoints.cexmetaEndpoint, data => {
            setMeta({projects: data.meta.projects, scenarios: data.meta.scenarios})
        })
    }

    useEffect(() => {
        handleGetMeta()
    }, [])

    const handleIngestMapper = () => {
        alert('clicked')
    }

    const handlePullData = () => {
        let [proj, scen] = [selProj.current.value, selScen.current.value]
        let payload = {payload: {racf, proj, scen}}
        post(config.endpoints.ingestEndpoint, payload, data => {
            console.log('ingest', data)
        })
    }

    return <div>
        <h2>{header}</h2>
        <div>
            <Button val='Ingest Mapping Data' click={handleIngestMapper}/>
            <div><b>Selected User is: {racf}</b></div>
            <Button val='Refresh' click={handleGetMeta}/>
            <div className='inrow'>
                <Select ref={selProj} label='Projects' data={meta.projects}/>
                <Select ref={selScen} label='Scenarios' data={meta.scenarios}/>
            </div>
            <Button val='Pull Data' click={handlePullData}/>
        </div>
    </div>
}
const mapx = state => ({
    user: state.user.user
})
export default connect(mapx)(Ingest)
