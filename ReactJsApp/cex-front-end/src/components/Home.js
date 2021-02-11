import React, {useState} from "react"
import AppButton from "./common/AppButton";
import Modalify from "./common/modal";

const Home = props => {
    const [modal,setModal]=useState(false)
    return <div>
        <h2>Home</h2>
        <div className='inrow'>
            <AppButton val={'save'} click={()=>setModal(true)}/>
            <AppButton val={'clear'}/>
            <AppButton val={'delete'} color='red white'/>
        </div>
        <Modalify header={'Alert!!!'} text={"Your Data has been saved"} state={modal} callback={(x)=>setModal(x)}/>
    </div>
}

export default Home
