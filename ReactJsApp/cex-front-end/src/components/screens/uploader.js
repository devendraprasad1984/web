import React, {useState} from "react"
import Input from "../common/textInput";
import Button from "../common/Button";
import Progress from "../common/progress";

const Uploader = props => {
    const {header} = props
    const [selfile, setSelfile] = useState(null)
    const [isload,setIsload]=useState(false)

    const handleFileChange = (e) => {
        let file = e.target.files[0]
        setSelfile(file)
        e.preventDefault()
    }
    const handleFileUpload = () => {
        setIsload(true)
        console.log('file being uploaded', selfile)
        setTimeout(()=>{
            setIsload(false)
        },1500)
    }
    return <div>
        <h2>{header}</h2>
        <Input type={'file'} change={handleFileChange}/>
        <Button val='Upload' click={handleFileUpload}/>
        <Progress loader={isload}/>
    </div>
}

export default Uploader
