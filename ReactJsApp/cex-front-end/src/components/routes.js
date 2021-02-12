import React from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Users from "./screens/Users";

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

