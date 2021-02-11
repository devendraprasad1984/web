import React from "react"
import AppButton from "./common/AppButton";

const Home = props => {
    return <div>
        <h2>Home</h2>
        <div className='inrow'>
            <AppButton val={'save'}/>
            <AppButton val={'clear'}/>
            <AppButton val={'delete'} color='red white'/>
        </div>
    </div>
}

export default Home
