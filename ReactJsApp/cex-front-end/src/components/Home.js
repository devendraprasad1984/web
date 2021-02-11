import React, {useState} from "react"
import AppButton from "./common/AppButton";
import Modalify from "./common/modal";
import Progress from "./common/progress";

const Home = props => {
    const [modal, setModal] = useState(false)
    const [isload, setIsload] = useState(false)
    return <div>
        <h2>Home</h2>
        <div className='inrow'>
            <AppButton val={'save'} click={() => setModal(true)}/>
            <AppButton val={'clear'}/>
            <AppButton val={'delete'} color='red white'/>
            <AppButton val={'stop load'} click={() => setIsload(!isload)}/>
        </div>
        <Modalify header={'Alert!!!'} text={"Your Data has been saved"} state={modal} callback={(x) => setModal(x)}/>
        <Progress loader={isload}/>
    </div>
}

export default Home
