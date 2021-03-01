import React from "react"
import '../../style.css'
import {NavLink} from "react-router-dom";

const Nav = props => {
    const {val,icon} = props
    let iconObj=<span className="icons">{icon}</span>
    if(val==='/') return null
    return icon!==undefined ?
        <NavLink to={`/${val}`} activeClassName='activeLink'>{iconObj} <span>{val.toUpperCase()}</span></NavLink>
        : <NavLink to={`/${val}`} activeClassName='activeLink'><span>{val.toUpperCase()}</span></NavLink>
}
export default Nav
