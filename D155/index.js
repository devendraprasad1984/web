function handleUnlock() {
    swal({title: "Unlocked"});

}

function postData(url = '', data = {}, success, error) {
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data,
        success,
        error
    });
}

function getData(url = '', success, error) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success,
        error
    });
}

function success (res){
    let isaved = res.status === 'success' ? true : false;
    if(!false) {
        console.log(res);
        return res;
    }
    swal({
        title: isaved ? "Your Entry is saved" : "Not Saved, contact admin",
        icon: isaved ? "success" : "error",
        button: 'Ok',
    });
}

function error (err) {
    swal({
        title: "some error contact admin",
        button: 'Ok',
    });
    console.log(err);
}



function handleSubmit() {
    data = {};
    data['save'] = 1;
    data['name'] = names.value;
    data['time'] = time.value;
    data['amount'] = amount.value;
    data['remarks'] = remarks.value===""?"regular maintenance":remarks.value;

    swal(
        {
            title: "Are you sure to save.",
            text: '"'+data['name']+'" has entered amount "'+data['amount']+'" for month of "'+data['time']+'" and this is what it is for "'+data['remarks']+'"',
            buttons: ['No', 'Yes'],
        }
    ).then((flag) => {
        if (flag === true) {
            postData('./d155.php', data, success, error);
        }
    });
}

function handleRefresh() {
    getData('./d155.php?expenses=1',success,error);
}
