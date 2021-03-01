export const get = (uri, success, error) => {
    const errMsg = msg => {
        if (error !== undefined) error(msg)
        console.log('something went wrong - ' + msg)
    };
    const header = {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
    }
    try {
        fetch(uri, header).then(res => res.json()).then(data => success(data)).catch(err => errMsg(err));
    } catch (err) {
        errMsg(err);
    }
}


export const download = (uri) => {
    const header = {
        "Content-Type": 'application/octet-stream',
    }
    try {
        fetch(uri, header).then(res => res.blob()).then(blob => {
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `FileName.pdf`,
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
    } catch (err) {
        console.log(err)
    }
}

export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const post = (uri, payload, success) => {
    // const csrftoken = getCookie('csrftoken');
    // const csrftoken = getLocalStore(config.enum.cex_app_token_key)
    // let headers = {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    // };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    // headers.append('GET', 'POST', 'OPTIONS');
    // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    let data2send = {
        // credentials:'include',
        method: 'POST'
        , headers: headers
        , body: JSON.stringify(payload)
    };
    try {
        fetch(uri, data2send)
            .then(res => res.json())
            .then(data => success(data))
            .catch(err => console.log(err));
    } catch (err) {
        console.log(err)
    }
}


export const sendFiles = (uri, payload, callback) => {
    const formData = new FormData();
    // formData.append('files[]', payload)
    // formData.append('file', {uri: '', name: payload.name, type: payload.type})
    formData.append('enctype', 'multipart/form-data')
    formData.append('content-type', 'application/octet-stream')
    formData.append('file', payload)
    fetch(uri, {
        method: 'post',
        headers: {
            'Accept': "application/x-www-form-urlencoded"
        },
        body: formData
    })
        .then((res) => res.json())
        .then((data) => {
            callback(data.status)
        })
        .catch((error) => {
            callback(error);
        });
}

export const setLocalStore = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}
export const getLocalStore = (key) => {
    let val = localStorage.getItem(key)
    let res = ((val === null || val === undefined) ? undefined : JSON.parse(val))
    return res
}
export const clearStore = (key,cb) => {
    localStorage.removeItem(key)
    cb()
}