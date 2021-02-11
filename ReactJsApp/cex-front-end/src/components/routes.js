import React from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import './appstyles.css'
import Home from "./Home";
import About from "./About";
import Users from "./Users";

// https://reactrouter.com/web/guides/quick-start
export const RoutesComponent = props => {
    return <div className='rows'>
        <div className='cols mainLeftDiv'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about" activeClassName='activeLink'>About</NavLink>
            <NavLink to="/users" activeClassName='activeLink'>Users</NavLink>
        </div>

        <div className='mainRightDiv'>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/about"><About/></Route>
                <Route path="/users"><Users/></Route>
            </Switch>
        </div>
    </div>
}
export default RoutesComponent

