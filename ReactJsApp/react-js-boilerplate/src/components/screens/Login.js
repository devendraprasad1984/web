import React, {createRef, useEffect, useState} from "react"
import Input from "../common/input";
import Button from "../common/Button";
import {post, setLocalStore} from "../common/api";
import {config} from "../common/config";
import OnOff from "../common/switch";

const Login = props => {
    const {header} = props
    const [login, setLogin] = useState(false)
    const [europa, setEuropa] = useState(true)
    const username = createRef()
    const password = createRef()

    useEffect(() => {
        config.loginCheck(flag => setLogin(flag))
    }, [])

    const handleLogin = () => {
        let [name, pwd] = [username.current.value, password.current.value]
        if (name === '' || pwd === '') {
            config.msgfail('username or password is empty')
            return
        }
        let payload = {name, pwd, domain: (europa ? 'europa' : 'fm')}
        post(config.endpoints.loginSsoEndpoint, {payload}, data => {
            if (!data.data.found) {
                config.msgfail('user not found')
                return
            }
            config.msgok('login successful to cex platform')
            let dt = new Date()
            let startdate = config.getDate()
            dt.setDate(dt.getDate() + 30)
            let timeout = dt.toISOString().split('T')[0]
            let mail = data.data.mail.substring(0, data.data.mail.indexOf('@'))
            let name_mail = mail + '(' + data.name + ')'
            let val = {racf: data.name, name: name_mail, loggedin: 1, timeout, startdate}
            // console.log('found', val)
            setLocalStore(config.enum.appkey, val)
            config.goto(config.urls.home)
        })
    }

    const handleTestBuild = () => {
        let payload = {payload: {v_title: 'test', v_tags: 'test', v_desc: 'test'}}
        post(config.endpoints.projectBuildEndpoint, payload, data => {
            console.log('test build project calls', data)
        })
    }
    const handleByPass = () => {
        config.msgok('login successful to cex platform')
        let dt = new Date()
        let startdate = config.getDate()
        dt.setDate(dt.getDate() + 30)
        let timeout = dt.toISOString().split('T')[0]
        let mail = 'devendra.prasad@natwest.com'
        let name_mail = mail + '(prasadf)'
        let val = {racf: 'prasadf', name: name_mail, loggedin: 1, timeout, startdate}
        // console.log('found', val)
        setLocalStore(config.enum.appkey, val)
        config.goto(config.urls.home)
    }

    const handleTestSSO = () => {
        let [name, pwd] = [username.current.value, password.current.value]
        let payload = {payload: {name, pwd, domain: (europa ? 'europa' : 'fm')}}
        post(config.endpoints.testloginSsoEndpoint, payload, data => {
            console.log('test sso call without AD Auth', data)
        })
    }

    if (login) {
        config.goto(config.urls.home)
        return
    }
    return <div className='pageCenter'>
        <div className='wid50'>
            <h2>{header}</h2>
            <div className='wid50'>
                <Input ref={username} label='UserName'/>
                <Input ref={password} label='Password' type={'password'}/>
                <OnOff label={europa ? 'europa' : 'fm'} checked={europa}
                       toggle={() => setEuropa(!europa)}/>
                <Button val='Login' click={handleLogin}/>
                <Button val='ByPass' click={handleByPass}/>
                <Button val='TEST BUILD' click={handleTestBuild}/>
                <Button val='TEST SSO' click={handleTestSSO}/>
            </div>
        </div>
    </div>
}
export default Login
