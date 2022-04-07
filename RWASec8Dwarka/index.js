let summaryObject1 = {};
let colors = ['pink', 'green', 'gray', 'goldenrod', 'navy', 'blue', 'magenta']
let imgObj = {
    anish: 'images/anish.png'
    , dp: 'images/dp.png'
    , dev: 'images/dev.png'
    , ajay: 'images/ajay.png'
}
let curObj = {}
let searchBtn = $('#idSearchBtn');
let colorx = '#428bdb';
let serverPrefix = "http://localhost:8080/rwasec8"
let phpServing = `${serverPrefix}/rwa.php`
let rsSymbol = '₹'
let entryform = document.getElementById('entryform')
let membersform = document.getElementById('membersform')
let report1 = document.getElementById('report1')
let defaultEntryType = 'member' //member or admin
let adminform = document.getElementById('adminform')


function handleEntryType(type) {
    adminform.classList.add('show')
    adminform.classList.remove('hide')

    // handleFormsToggle(undefined, true)
    defaultEntryType = type
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

function handleFormsToggle(_this, isShow = false) {
    membersform.classList.remove(isShow ? 'hide' : 'show')
    membersform.classList.add(!isShow ? 'hide' : 'show')

    entryform.classList.remove(!isShow ? 'hide' : 'show')
    entryform.classList.add(isShow ? 'hide' : 'show')
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

function getRandomBorderColor() {
    let ln = colors.length;
    let num = Math.round(Math.random() * ln, 0);
    // console.log(ln,num,colors[num]);
    return colors[num];
}

function cardClick(cur) {
    let cardid = cur.id;
    if (typeof cur === 'string') {
        cardid = cur;
    }
    let xdiv = document.createElement('div');
    xdiv.id = 'openCardId';
    xdiv.innerHTML = document.getElementById(cardid).innerHTML;
    xdiv.className = 'carddiv';
    Array.from(xdiv.children).map(a => a.classList.remove('amt'));
    swal({
        content: xdiv,
        button: 'Close'
    }).then(flag => {
        xdiv.remove();
        let overlayContainer = Array.from(document.getElementsByClassName('swal-overlay'));
        overlayContainer.map(x => x.remove());
    });
}

let partDateTime = (strDateTime) => {
    let sdateArr = strDateTime.split(' ');
    let sDate = sdateArr[0];
    let sTime = sdateArr[1];
    return '<span><span style="color: ' + colorx + '">' + sDate + '</span><span class="time">' + sTime + '</span></span>';
}

let success = {
    modifyCardBorderColor: function () {
        Array.from($('.card')).map((x, i) => x.style.borderTop = '3px solid ' + (x.getAttribute('xtype') === '+' ? 'green' : 'red'))
    },
    alert: function (res) {
        let isaved = res.status === 'success' ? true : false;
        swal({
            title: isaved ? "Action Processed" : "Not Processed",
            icon: isaved ? "success" : "error",
            button: 'Ok',
        }).then(flag => getSummaryAndRefresh());
    },
    getSummaryCard: function (balance, total) {
        return `
            <div id="summaryFundCard" xtype="+" onclick="cardClick(this)" class="column card size14 bl">
            <div>Adhoc in hand (miscellaneous balance):  ${rsSymbol} <span class="txtgreen size20">${balance}</span></div>
            <div>Current Fund Value (credit-debit):  ${rsSymbol} <span class="txtgreen size20">${total}</span></div>
            </div>        
        `
    },
    displayRows: function (res) {
        let _that = success
        if (res.status !== undefined)
            if (res.status.indexOf('failed') !== -1) {
                report1.innerHTML = `<div>No Data Found. ${res.status}</div>`
                return
            }

        let result = [];
        let total = 0;
        //for all cards group by memid
        result = res.map((x, i) => {
            total += parseFloat(x.amount);
            let isnegative = x.amount < 0 ? true : false;
            return '<div id="card' + i + '" class="card" onclick="cardClick(this)" xtype="' + (isnegative ? '-' : '+') + '">' +
                // '<span><img src="' + imgObj[x.name] + '" class="imgdrop"/></span>' +
                `<h1>${x.memid.toUpperCase()}</h1>` +
                '<div class="flex">' +
                '<span class=" ' + (isnegative ? 'red' : '') + '">' + rsSymbol + Math.abs(x.amount) + ' (' + x.remarks + ')</span>' +
                '<span class="time">' + partDateTime(x.when) + ' <span style="color:' + colorx + '">' + x.date + '</span></span>' +
                '</div>' +

                '<div style="float: right">' +
                '<button class="btn red" onclick="handleDelete(' + x.id.trim() + ')">Delete</button>' +
                '</div>' +
                '</div>';
        });
        //for summary card
        result.splice(0, 0, _that.getSummaryCard(0, total));
        report1.innerHTML = rowx + '<div id="divLines" class="flexboxCards">' + result.join('') + '</div>';
        _that.modifyCardBorderColor()
    },
    group: function (res) {
        let _that = success
        if (res.status !== undefined)
            if (res.status.indexOf('failed') !== -1) {
                report1.innerHTML = `<div>No Data Found. ${res.status}</div>`
                return
            }

        let result = [];
        let total = 0
        result = res.map((x, i) => {
            total += parseFloat(x.amount)
            return `
                <div id="card${i}" class="card" xtype="+" onclick="cardClick(this)">
                    <h1>${x.name.toUpperCase()}</h1>
                    <h3>code: <span class="txtpurple">${x.memkey} - ${x.memid}</span></h3>
                    <div class="size14">Total Contributions ${rsSymbol} <span class="txtgreen size20">${Math.abs(x.amount)}</span></div>
                </div>
            `
        });
        result.splice(0, 0, _that.getSummaryCard(0, total));
        report1.innerHTML = '<div id="divLines" class="flexboxCards">' + result.join('') + '</div>';
        _that.modifyCardBorderColor()
    }
}

function error(err) {
    swal({
        title: "some error contact admin",
        button: 'Ok',
    });
    console.log(err);
}

function handleDelete(id) {
    let pass = prompt('enter passphrase');
    if (pass !== '6200') return;

    data = {};
    data['delete'] = 1;
    data['id'] = id;
    swal(
        {
            title: "Are you sure to delete.",
            icon: 'error',
            text: 'please review entry before deleting',
            buttons: ['No', 'Yes'],
        }
    ).then((flag) => {
        if (flag === true) {
            postData(phpServing, data, success.alert, error);
        }
    });

}


function handleSubmit(id) {
    let cur = $('#' + id);
    let oldval = cur.html();
    cur.html('please wait...');
    data = {};
    data['save'] = 1;
    data['memid'] = memid.value;
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
            curObj.submit = cur;
            curObj.submitText = oldval;
            postData(phpServing, data, success.alert, error);
        } else {
            cur.html(oldval);
        }
    });
}

function handleSubmitMember(id) {
    let cur = $('#' + id);
    let oldval = cur.html();
    cur.html('please wait...');
    data = {};
    data['addMember'] = 1;
    data['memberid'] = document.getElementById('memberid').value;
    data['name'] = document.getElementById('name').value;
    data['address'] = document.getElementById('address').value;

    swal(
        {
            title: "Are you sure to add new member.",
            text: `Adding ${data.memberid} - ${data.name} to RWA group sector 8 D Block Dwarka`,
            buttons: ['No', 'Yes'],
        }
    ).then((flag) => {
        if (flag === true) {
            postData(phpServing, data, success.alert, error);
            cur.html(oldval);
        } else {
            cur.html(oldval);
        }
    });
}

function getSummaryAndRefresh() {
    getData(`${phpServing}?summary1=1`, (res) => {
        summaryObject1 = res;
        handleRefresh();
    });
}

function handleRefresh() {
    // searchBtn.html('Please Wait...');
    let oldval = searchBtn.html();
    report1.innerHTML = '<h1>please wait, loading...</h1>';
    // let txt = idSearchBox.value.toLowerCase();
    getData(`${phpServing}?expensesGroup=1`, success.group, error);
    if (typeof curObj.submit !== "undefined") {
        curObj.submit.html(curObj.submitText);
        curObj.submit = undefined;
    }
}

function preparePeriod() {
    let years = [];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let curDate = new Date();
    let curPeriod = months[curDate.getMonth()] + ' ' + curDate.getFullYear();
    for (let i = 2022; i < 2035; i++) {
        years.push(months.map(x => {
            let cval = x + ' ' + i;
            let xelem = cval === curPeriod ? '<option value="' + cval + '" selected>' + cval + '</option>' : '<option value="' + cval + '">' + cval + '</option>';
            return xelem
        }).join(''));
    }
    time.innerHTML = years.join('');
}

function handleAdminCheck() {
    let id = document.getElementById('adminId')
    let pwd = document.getElementById('adminPwd')
    if (1 === 1) {
        handleEntryType('admin')
        handleDefaultView()
        adminform.classList.add('hide')
        adminform.classList.remove('show')
    } else {
        handleEntryType('member')
        adminform.classList.add('show')
        adminform.classList.remove('hide')
        swal({
            title: 'Error logging in',
            text: 'Wrong admin id or password',
            button: 'Close'
        })
    }
}

function searchByKeyword(e) {
    if (e.keyCode === 13) {
        getSummaryAndRefresh();
        e.preventDefault();
    }
}

function handleDefaultView() {
    if (defaultEntryType === 'member') {
        report1.classList.add('wid100')
        report1.classList.remove('wid70')

        entryform.classList.add('hide')
        entryform.classList.remove('show')
    } else if (defaultEntryType === 'admin') {
        report1.classList.add('wid70')
        report1.classList.remove('wid100')

        entryform.classList.add('show')
        entryform.classList.remove('hide')
    }
}

//initialise
function onInit() {
    preparePeriod();
    handleDefaultView()
    getSummaryAndRefresh();
}

document.addEventListener("DOMContentLoaded", onInit);
