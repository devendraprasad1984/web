let imgObj = {
    anish: 'images/anish.png'
    , dp: 'images/dp.png'
    , dev: 'images/dev.png'
    , ajay: 'images/ajay.png'
}

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

let success = {
    alert: function (res) {
        let isaved = res.status === 'success' ? true : false;
        swal({
            title: isaved ? "Your Entry is saved" : "Not Saved, contact admin",
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
                '</div>'
        });
        result.splice(0, 0, '<div class="xhead">' +
            '<span class="xcell" style="width: 50px">Name</span>' +
            '<span class="xcell" style="width: 150px">When</span>' +
            '<span class="xcell" style="width: 100px">Month</span>' +
            '<span class="xcell right" style="width: 150px">Amount: ' + total + '</span>' +
            '<span class="xcell" style="width: 300px">Remarks</span>' +
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


function handleSubmit() {
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
            postData('./d155.php', data, success.alert, error);
        }
    });
}

function handleRefresh() {
    let txt=idSearchBox.value.toLowerCase();
    getData('./d155.php?expenses=1&by='+txt, success.refresh, error);
}

function preparePeriod() {
    let years = [];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 2020; i < 2025; i++) {
        years.push(months.map(x => '<option value="' + x + ' ' + i + '">' + x + ' ' + i + '</option>').join(''));
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


(function () {
    preparePeriod();
    handleRefresh();
})();
