
export const getFromAPI = (uri, success, error) => {
    const errMsg = msg => 'something went wrong - ' + msg;
    const header = {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
    }
    try {
        fetch(uri, header).then(res => res.json()).then(data => success(data)).catch(err => alert(errMsg(err)));
    } catch (err) {
        alert(errMsg(err));
    }
}


export const postToAPI = (uri, payload, success) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    let data2send = {
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


export const postToApiFormSerializer = (uri, payload) => {
    const formData = new FormData();
    formData.append('payload', payload);
    //for image
    // formData.append('files[]', {uri: x, type: 'image/jpeg', name: fn})
    fetch(uri, {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': "application/x-www-form-urlencoded"
        },
        body: formData
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.status)
        })
        .catch((error) => {
            console.error(error);
        });
}


