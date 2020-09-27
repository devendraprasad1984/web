let imgObj = {
    anish: 'images/anish.png'
    , dp: 'images/dp.png'
    , dev: 'images/dev.png'
    , ajay: 'images/ajay.png'
}
let curObj={}
let searchBtn = $('#idSearchBtn');

function handleUnlock(id) {
    let oldval=$('#'+id).html();
    $('#'+id).html('Please Wait...');
    let pass=prompt('enter passphrase');
    if(pass!=='6200') {
        $('#'+id).html(oldval);
        return;
    }else{
        formInputs.classList.remove('hide');
        $('#'+id).html(oldval);
    }
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

let success = {
    alert: function (res) {
        let isaved = res.status === 'success' ? true : false;
        swal({
            title: isaved ? "Action Processed" : "Not Processed",
            icon: isaved ? "success" : "error",
            button: 'Ok',
        }).then(flag => handleRefresh());
    }, refresh: function (res) {
        let result = [];
        let total = 0;
        result = res.map(x => {
            total += parseFloat(x.amount);
            let isnegative = x.amount < 0 ? true : false;
            return '<div class="xrow">' +
                '<span class="xcell" style="width: 50px"><img src="' + imgObj[x.name] + '" class="imgdrop"/></span>' +
                '<span class="xcell" style="width: 150px">' + x.when + '</span>' +
                '<span class="xcell" style="width: 100px">' + x.date + '</span>' +
                '<span class="xcell '+(isnegative?'red textwhite':'')+' right" style="width: 150px">' + x.amount + '</span>' +
                '<span class="xcell" style="width: 300px">' + x.remarks + '</span>' +
                '<span class="xcell" style="width: 300px; text-align: right;">' +
                    '<button class="btn red" onclick="handleDelete('+x.id.trim()+')">Delete</button>' +
                '</span>' +
                '</div>'
        });
        result.splice(0, 0, '<div class="xhead">' +
            '<span class="xcell" style="width: 50px"></span>' +
            '<span class="xcell" style="width: 150px">When</span>' +
            '<span class="xcell" style="width: 100px">Month</span>' +
            '<span class="xcell right" style="width: 150px">Amount: ' + total + '</span>' +
            '<span class="xcell" style="width: 300px">Remarks</span>' +
            '<span class="xcell" style="width: 300px; text-align: right;">Actions</span>' +
            '</div>');
        report1.innerHTML = result.join('');
    }
}

function error(err) {
    swal({
        title: "some error contact admin",
        button: 'Ok',
    });
    console.log(err);
}

function handleDelete(id){
    let pass=prompt('enter passphrase');
    if(pass!=='6200') return;

    data={};
    data['delete']=1;
    data['id']=id;
    swal(
        {
            title: "Are you sure to delete.",
            icon:'error',
            text:'please review entry before deleting',
            buttons: ['No', 'Yes'],
        }
    ).then((flag) => {
        if (flag === true) {
            postData('./d155.php', data, success.alert, error);
        }
    });

}


function handleSubmit(id) {
    let cur=$('#'+id);
    let oldval=cur.html();
    cur.html('please wait...');
    data = {};
    data['save'] = 1;
    data['name'] = names.value;
    data['time'] = time.value;
    data['amount'] = amount.value;
    data['remarks'] = remarks.value === "" ? "regular maintenance" : remarks.value;

    swal(
        {
            title: "Are you sure to save.",
            text: '"' + data['name'] + '" has entered amount "' + data['amount'] + '" for month of "' + data['time'] + '" and this is what it is for "' + data['remarks'] + '"',
            buttons: ['No', 'Yes'],
        }
    ).then((flag) => {
        if (flag === true) {
            curObj.submit=cur;
            curObj.submitText=oldval;
            postData('./d155.php', data, success.alert, error);
        }else{
            cur.html(oldval);
        }
    });
}

function handleRefresh() {
    let oldval=searchBtn.html();
    searchBtn.html('Please Wait...');
    report1.innerHTML = '<h1>please wait, loading...</h1>';
    let txt=idSearchBox.value.toLowerCase();
    getData('./d155.php?expenses=1&by='+txt, success.refresh, error);
    searchBtn.html(oldval);
    if(typeof curObj.submit !=="undefined"){
        curObj.submit.html(curObj.submitText);
        curObj.submit=undefined;
    }
}

function preparePeriod() {
    let years = [];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let curDate=new Date();
    let curPeriod=months[curDate.getMonth()]+' '+curDate.getFullYear();
    for (let i = 2020; i < 2025; i++) {
        years.push(months.map(x => {
            let cval=x + ' ' + i;
            let xelem= cval===curPeriod ? '<option value="' + cval + '" selected>' + cval + '</option>' : '<option value="' + cval + '">' + cval + '</option>';
            return xelem
        }).join(''));
        // years.push('<option value="'+i+'">'+i+'</option>');
    }
    time.innerHTML = years.join('');
}
function searchByKeyword(e){
    if(e.keyCode===13){
        handleRefresh();
        e.preventDefault();
    }
}

function sendMsg(){
    let data={};
    data['whatsapp']=1;
    data['msg']='this is a test message';
    postData('./d155.php', data, (res)=>{
        console.log('from server',res)
    }, (err)=>{
        console.error(err);
    });
}


(function () {
    preparePeriod();
    handleRefresh();
})();
