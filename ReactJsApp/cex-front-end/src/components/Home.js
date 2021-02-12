import React, {useState, createRef, useRef} from "react"
import Button from "./common/Button";
import Modalify from "./common/modal";
import Progress from "./common/progress";
import Input from "./common/textInput";
import Select from "./common/select";

const Home = props => {
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [isload, setIsload] = useState(false)
    const name = createRef()
    const date = createRef()
    const seldate = createRef()
    return <div>
        <h2>Home</h2>
        <Modalify header={'Alert!!!'} text={"Your Data has been saved"} state={modal} callback={(x) => setModal(x)}/>
        <Modalify state={modal2} header={'hello world'} callback={(x) => setModal2(x)}>
            <span>World!!!</span>
        </Modalify>
        <div className='inrow'>
            <Button val={'modal1'} click={() => setModal(true)}/>
            <Button val={'modal2'} click={() => setModal2(true)}/>
            <Button val={'stop load'} click={() => setIsload(!isload)}/>
        </div>
        <Progress loader={isload}/>
        <div className='wid30'>
            <Input ref={name} label='Enter Name'/>
            <Input ref={date} label='date' type='date'/>
            <Select ref={seldate} label='choose dates' data={['one','two','three']}/>
            <Button val='save' color='green' click={() => {
                console.log(name.current.value, date.current.value, seldate.current.value)
            }}/>
        </div>
    </div>
}

export default Home
