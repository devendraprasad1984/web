import React, {useState} from "react"
import Input from "../common/textInput";
import Button from "../common/Button";
import Progress from "../common/progress";
import {get, sendFiles} from "../common/apiHandler";
import {config} from "../common/config";

const Uploader = props => {
    const {header} = props
    const [selfile, setSelfile] = useState(null)
    const [isload, setIsload] = useState(false)

    const handleFileChange = (e) => {
        // console.log(e.target.files)
        let file = e.target.files[0]
        setSelfile(file)
        e.preventDefault()
    }
    const handleFileUpload = () => {
        setIsload(true)
        sendFiles(config.endpoints.uploaderEndpoint, selfile, (d) => {
            console.log(d)
            setIsload(false)
            alert(d.status+' - '+d.msg)
        })
    }

    const handleDownload=()=>{
        get(config.endpoints.downloadEndpoint, d=>{
            console.log(d)
        })
    }

    return <div>
        <h2>{header}</h2>
        <Input type={'file'} change={handleFileChange}/>
        <Button val='Upload' click={handleFileUpload}/>
        <Button val='Download' click={handleDownload}/>
            <Progress loader={isload}/>
    </div>
}

export default Uploader
