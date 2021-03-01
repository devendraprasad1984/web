import React, {createRef} from "react"
import Input from "../common/input";
import Button from "../common/Button";
import {post} from "../common/api";
import {config} from "../common/config";

const BuildProject = props => {
    const {header} = props
    const title = createRef()
    const tags = createRef()
    const desc = createRef()
    const handleSave = () => {
        let [v_title, v_tags, v_desc] = [title.current.value, tags.current.value, desc.current.value]
        let payload = {payload: {v_title, v_tags, v_desc}}
        post(config.endpoints.projectBuildEndpoint, payload, data => {
            console.log('build project calls', data)
        })
    }
    return <div>
        <h2>{header}</h2>
        <div>
            <Input ref={title} label='Title'/>
            <Input ref={tags} label='Project Tags'/>
            <Input ref={desc} label='Description (optional)' type='area'/>
            <Button val='save' click={handleSave}/>
        </div>
    </div>
}

export default BuildProject
