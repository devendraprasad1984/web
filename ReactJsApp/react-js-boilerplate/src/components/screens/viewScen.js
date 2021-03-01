import React, {createRef, useEffect, useState} from "react"
import Select from "../common/select";
import Button from "../common/Button";
import GridX from "../common/gridx";
import {config, generateCSV} from "../common/config";
import OnOff from "../common/switch";
import {get, post} from "../common/api";

const data = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

const ViewScenario = props => {
    const {header} = props
    const [selects, setSelects] = useState({})
    const [meta, setMeta] = useState({
        scenarios: [],
        transform: [],
        categories: [],
        startDates: [],
        endDates: [],
        frequency: [],
        version: []
    })
    const [viewdata, setViewdata] = useState([])
    const [mnemonic, setMnemonic] = useState(true)

    useEffect(() => {
        get(config.endpoints.cexmetaEndpoint, data => {
            setMeta({
                scenarios: data.meta.scenarios,
                transform: data.meta.Transform,
                categories: data.meta.categories,
                endDates: data.meta.endDates.map(x => x.substring(0, 10)),
                frequency: data.meta.frequency,
                startDates: data.meta.startDates.map(x => x.substring(0, 10)),
                version: data.meta.version,
            })
        })
        setViewdata(data)
    }, [])

    const handleView = () => {
        let payload = {payload: {...selects}}
        post(config.endpoints.viewScenEndpoint, payload, data => {
            console.log('view scen', data)
        })
    }
    const handleChange = (cur) => {
        let name = cur.target.name
        let value = cur.target.value
        let obj = {}
        obj[name] = value
        setSelects({...selects, ...obj})
    }
    const handleDownload = () => {
        let [scen, ver] = [0, 0]
        let vals = {scen, ver}
    }

    const handleExportCsv = () => {
        generateCSV(viewdata)
    }

    return <div>
        <h2>{header}</h2>
        <div className='inrow'>
            <div className='wid50'>
                <Select label='Scenarios' data={meta.scenarios} change={e => handleChange(e)}/>
                <Select label='Category' data={meta.categories} change={e => handleChange(e)}/>
                <Select label='Transform' data={meta.transform} change={e => handleChange(e)}/>
                <Select label='Frequency' data={meta.frequency} change={e => handleChange(e)}/>
                <OnOff label={(mnemonic ? 'RBS' : 'Moody') + ' Mneumonic'} checked={mnemonic}
                       toggle={() => setMnemonic(!mnemonic)}/>
            </div>
            <div className='wid50'>
                <Select label='StartDate' data={meta.startDates} change={e => handleChange(e)}/>
                <Select label='EndDate' data={meta.endDates} change={e => handleChange(e)}/>
                <Select label='Version' data={meta.version} change={e => handleChange(e)}/>
                <Select label='Subsection'/>
                <Select label='Variable'/>
            </div>
        </div>
        <div>
            <Button val='View' click={handleView}/>
            <Button val='ExportCSV' click={handleExportCsv}/>
            <Button val='Export Xls' click={handleDownload}/>
        </div>
        <div>
            <GridX data={viewdata} searchable={true} edit={(row) => {
                console.log(row)
            }}/>
        </div>
    </div>
}

export default ViewScenario
