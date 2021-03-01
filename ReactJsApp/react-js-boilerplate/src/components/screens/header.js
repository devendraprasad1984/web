import React, {useEffect, useState} from "react";
import Button from "../common/Button";
import {config} from "../common/config";
import {getLocalStore} from "../common/api";

const Header = props => {
    const [name, setName] = useState('user')
    const [days, setDays] = useState(0)
    useEffect(() => {
        let item = getLocalStore(config.enum.appkey)
        if (item === undefined) return
        let {name, timeout} = item
        let {days} = config.getDateDiff(config.getDate(), timeout)
        setName(name)
        setDays(days)
    }, [])
    const toggle = () => {
        if (document.getElementById('mainLeftDiv') === null) return;
        let leftNav = document.getElementById('mainLeftDiv')
        if (typeof leftNav === "undefined") return
        leftNav.style.display = leftNav.style.display === 'none' ? '' : 'none'
    }
    return <div>
        <Button color={'white'} click={toggle} icon='reorder'/>
        <span className='h1'>Core eXpansion</span>
        <span className='right bold'>Welcome, {name} <br/> <b className='cred'>{days} days to auto logoff</b></span>
    </div>
}
export default Header
