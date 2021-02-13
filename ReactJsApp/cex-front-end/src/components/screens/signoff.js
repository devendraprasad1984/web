import React from "react"
import Button from "../common/Button";
import {getFromAPI} from "../common/apiHandler";
import {config} from "../common/config";

const Signoff = props => {
    const {header}=props
    return <div>
        <h2>{header}</h2>
        <Button val='test json' click={()=>{
            getFromAPI(config.endpoints.testEndpoint,data=>{
                console.log(data)
            })
        }}/>
    </div>
}

export default Signoff
