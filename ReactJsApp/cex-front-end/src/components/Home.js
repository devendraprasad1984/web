import React, {useState} from "react"
import AppButton from "./common/AppButton";
import Modalify from "./common/modal";
import Progress from "./common/progress";

const Home = props => {
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [isload, setIsload] = useState(false)
    return <div>
        <h2>Home</h2>
        <div className='inrow'>
            <AppButton val={'modal1'} click={() => setModal(true)}/>
            <AppButton val={'modal2'} click={() => setModal2(true)}/>
            <AppButton val={'delete'} color='red white'/>
            <AppButton val={'stop load'} click={() => setIsload(!isload)}/>
        </div>
        <Modalify header={'Alert!!!'} text={"Your Data has been saved"} state={modal} callback={(x) => setModal(x)}/>
        <Modalify state={modal2} callback={(x) => setModal2(x)}>
            <h2>Hello</h2>
            <h3>World!!!</h3>
        </Modalify>
        <Progress loader={isload}/>
    </div>
}

export default Home
