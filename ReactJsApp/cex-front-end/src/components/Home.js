import React, {useState, createRef, useRef} from "react"
import Button from "./common/Button";
import Modalify from "./common/modal";
import Progress from "./common/progress";
import Input from "./common/textInput";
import Select from "./common/select";
import OnOff from "./common/switch";

const Home = props => {
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [isload, setIsload] = useState(false)
    const [checkedOnOff, setCheckedOnOff] = useState(false)
    const name = createRef()
    const selnum = createRef()
    const date = createRef()
    const seldate = createRef()
    const onoff = createRef()
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
            <Select ref={selnum} label='choose..' data={[1,2,3,4,5,6,7,8,9,10]}/>
            <OnOff ref={onoff} label='permanent?' checked={checkedOnOff} toggle={()=>setCheckedOnOff(!checkedOnOff)}/>
            {/*<Input type='checkbox' ref={onoff} label='permanent?'/>*/}
            <Button val='save' color='green' click={() => {
                console.log(selnum.current.value, name.current.value, date.current.value, seldate.current.value, checkedOnOff)
            }}/>
        </div>
    </div>
}

export default Home
