import React, {useEffect, useState} from "react"
import Button from "../common/Button";
import {clearStore, get, getLocalStore} from "../common/api";
import {config} from "../common/config";

const Signoff = props => {
    const {header} = props
    const [states, setStates, startdate] = useState({})

    useEffect(() => {
        let item = getLocalStore(config.enum.appkey)
        let curdate = config.getDate()
        let {loggedin, timeout, startdate} = item
        let {days} = config.getDateDiff(curdate, timeout)
        setStates({loggedin, timeout, startdate, days, curdate})
    }, [])

    const logout = () => {
        clearStore(config.enum.appkey,()=>{
            config.goto(config.urls.home)
        })
    }
    return <div>
        <h2>{header}</h2>
        <div>you last logged on <span className='bold'>{states.startdate}</span> and will auto login till <span
            className='bold'>{states.timeout}</span></div>
        <div>today is <span className='bold'>{states.curdate}</span> and you will be automatically logged out on/after <h3>{states.days} day(s)</h3></div>
        <Button val='logout' click={logout}/>
    </div>
}

export default Signoff
