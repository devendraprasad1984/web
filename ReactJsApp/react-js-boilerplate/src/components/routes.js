import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./screens/Home";
import BuildProject from "./screens/BuildProject";
import Signoff from "./screens/signoff";
import Uploader from "./screens/uploader";
import Blank from "./screens/Blank";
import Ingest from "./screens/Ingest";
import Download from "./screens/download";
import ViewScenario from "./screens/viewScen";
import Nav from "./common/Nav";
import {connect} from 'react-redux'
import {getSetUser} from "./redux/actions";

// https://reactrouter.com/web/guides/quick-start
const routnames = [
    {name: '/'}
    , {name: 'home', icon: 'home'}
    , {name: 'build', icon: 'build'}
    , {name: 'ingest', icon: 'vpn_lock'}
    , {name: 'upload', icon: 'publish'}
    , {name: 'view', icon: 'table_view'}
    , {name: 'download', icon: 'get_app'}
    , {name: 'tweaking', icon: 'track_changes'}
    , {name: 'visualisation', icon: 'analytics'}
    , {name: 'docs', icon: 'article'}
    , {name: 'signout', icon: 'login'}
]
const comps = {
    '/': <Home header='Home'/>
    , home: <Home header='Home'/>
    , build: <BuildProject header='Build The Project'/>
    , ingest: <Ingest header='Ingest Data'/>
    , upload: <Uploader header='Uploader'/>
    , view: <ViewScenario header='View Scenario Data'/>
    , download: <Download header='Download Scenario Data'/>
    , tweaking: <Blank header='Tweaking Scenarios'/>
    , visualisation: <Blank header='Visualisation'/>
    , docs: <Blank header='Docs'/>
    , signout: <Signoff header='SignOff'/>
}

// const compKeys = Object.keys(comps)
const RoutesComponent = props => {
    const {userData} = props
    // console.log('in routes', props)

    useEffect(() => {
        props.updateUser(userData)
    }, [])

    return <div className='rows'>
        <div id='mainLeftDiv' className='cols mainLeftDiv'>
            {routnames.map((x, i) => <Nav icon={x.icon} key={'knav' + i} val={x.name}/>)}
        </div>

        <div className='mainRightDiv'>
            <Switch>
                {routnames.map((x, i) => {
                    if (comps[x.name] === undefined) return null
                    if (x.name === '/' || x.name === 'home')
                        return <Route key={'routekeys' + i} exact path={`/${x.name}`}>{comps[x.name]}</Route>
                    else
                        return <Route key={'routekeys' + i} path={`/${x.name}`}>{comps[x.name]}</Route>
                })}
            </Switch>
        </div>
    </div>
}
const mapx = state => ({...state})
const mapd = dispatch => ({
    updateUser: (data) => dispatch(getSetUser(data))
})
export default connect(mapx, mapd)(RoutesComponent)

