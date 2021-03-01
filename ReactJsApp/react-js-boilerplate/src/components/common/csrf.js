import React from 'react'
import {getCookie, getLocalStore} from "./api";
import {config} from "./config";

var csrftoken = getCookie('csrftoken');
// let csrftoken=getLocalStore(config.enum.cex_app_token_key)

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;
