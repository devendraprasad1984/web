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
            alert(d.status + ' - ' + d.msg)
        })
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `http://192.168.1.3:8888/upload/dpresumebs1dac.pdf`;
        link.target = '_blank'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDownload2=()=>{
        get(config.endpoints.downloadEndpoint, d=>{
            console.log(d)
        })
    }

    return <div>
        <h2>{header}</h2>
        <Input type={'file'} change={handleFileChange}/>
        <Button val='Upload' click={handleFileUpload}/>
        <Button val='Download' click={handleDownload}/>
        <Button val='Download-2' click={handleDownload2}/>
        <Progress loader={isload}/>
    </div>
}

export default Uploader