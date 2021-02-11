import React from "react";
import {Switch, Route, NavLink} from "react-router-dom";
import './appstyles.css'

// https://reactrouter.com/web/guides/quick-start

function Home(props) {
    return <h2>Home</h2>;
}

function About(props) {
    return <h2>About</h2>;
}

function Users(props) {
    return <h2>Users</h2>;
}


export const RoutesComponent = props => {
    return <div className='rows'>
        <div className='cols mainLeftDiv'>
            <NavLink to="/" >Home</NavLink>
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

