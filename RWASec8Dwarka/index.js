let summaryObject1 = {}
let colors = ['violet', 'green', 'gray', 'goldenrod', 'purple', 'mediumseagreen', 'blue', '#8b7bce', "#85179b"]
let imgObj = {
    anish: 'images/anish.png'
    , dp: 'images/dp.png'
    , dev: 'images/dev.png'
    , ajay: 'images/ajay.png'
}
// let curObj = {}
// let searchBtn = $('#idSearchBtn')
let colorx = '#428bdb'
let serverPrefix = "http://localhost:8080/rwasec8"
let phpServing = `${serverPrefix}/rwa.php`
let rsSymbol = '₹'
// let entryform = document.getElementById('entryform')
let container = document.getElementById('container')
let adminSection = document.getElementById('adminSection')
let membersform = document.getElementById('membersform')
let report1 = document.getElementById('report1')
let defaultEntryType = 'member' //member or admin
let adminform = document.getElementById('adminform')
let currentReportType = 'summary'
let loginModal = document.getElementById('loginModal')


function handleEntryType(type) {
    adminform.classList.add('show')
    adminform.classList.remove('hide')
    defaultEntryType = type
    loginModal.style.display = 'block'
}

function postData(url, data = {}, success, error) {
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data,
        success,
        error
    })
    // const requestPayload = {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin,
    //                                    // strict-origin-when-cross-origin, unsafe-url
    //     // credentials: 'same-origin', // include, *same-origin, omit
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     // mode: 'cors', // no-cors, *cors, same-origin
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // }
    // fetch(url, requestPayload).then(r => r.json()).then(data => {
    //     success(data)
    // }).catch(e => {
    //     error(r)
    // })
}

function handleFormsToggle({show, hide}) {
    let showForm = document.getElementById(show)
    let hideForm = document.getElementById(hide)
    showForm.classList.remove('show')
    hideForm.classList.remove('show')
    showForm.classList.add('hide')
    hideForm.classList.add('hide')
    // [showForm, hideForm].forEach(x=>x.classList.add('hide'))
    showForm.classList.add('show')
}

function getData(url, success, error) {
    // $.ajax({
    //     type: "GET",
    //     url: url,
    //     dataType: 'json',
    //     success,
    //     error
    // })
    fetch(url).then(r => r.json()).then(d => {
        if (success === undefined) return
        success(d)
    }).catch(e => {
        if (error === undefined) return
        error(e)
    })
}

function getRandomBorderColor() {
    let ln = colors.length
    let num = Math.floor(Math.random() * ln, 0)
    // console.log(ln,num,colors[num])
    return num < 0 || num === undefined ? "#85179b" : colors[num]
}

// let componentContributionForm = ""
let timePeriods = ''

function getAddContributionForm(id) {
    //singleton implementation
    // if (componentContributionForm !== '') return componentContributionForm
    if (timePeriods === '')
        timePeriods = preparePeriod()
    return `
        <h2 class='green'>Add Contribution for this month / Reversal</h2>
        <form id="contriform" class="formInputs">
            <select id="time" class="wid200px">${timePeriods}</select>
            <input class="input-right wid200px" id="amount" placeholder="enter your amount" type="text" value="200" />
            <input id="remarks" placeholder="eg regular maintenance" type="text" class="wid200px"/>
            <button class="btn red" id="btnSubmit" onclick="handleSubmit(e,'contriform',${id})">Save</button>
        </form>
    `
    // return componentContributionForm
}

function memberCardClick(cur, id) {
    let cardid = cur.id
    if (typeof cur === 'string') {
        cardid = cur
    }

    let contributionForm = defaultEntryType === 'admin' && getAddContributionForm(id)
    getData(`${phpServing}?expensesByMember=1&id=${id}`, (res) => {
        let rows = res.map((x, i) => {
            return `
                <div class="row flex">
                    <span>${(i + 1)} ${x.remarks}</span>
                    <span>${x.date}</span>
                    <span>${rsSymbol}${x.amount}</span>
                    <span>${partDateTime(x.when)}</span>
                </div>
            `
        })
        let xdiv = document.createElement('div')
        xdiv.id = 'openCardId'
        let cardBaseElements = document.getElementById(cardid).innerHTML
        let txnData = `
            <div class="size30">Previous Contributions</div>
            <div class="height450">${rows.join('')}</div>
        `
        xdiv.innerHTML = cardBaseElements.toString() + contributionForm.toString() + txnData.toString()
        xdiv.className = 'carddiv'
        Array.from(xdiv.children).map(a => a.classList.remove('amt'))
        swal({
            content: xdiv,
            button: 'Close'
        }).then(flag => {
            xdiv.remove()
            let overlayContainer = Array.from(document.getElementsByClassName('swal-overlay'))
            overlayContainer.map(x => x.remove())
        })
    }, error)
}

let partDateTime = (strDateTime) => {
    let sdateArr = strDateTime.split(' ')
    let sDate = new Date(sdateArr[0]).toLocaleDateString()
    let sTime = sdateArr[1]
    return '<span><span style="color: ' + colorx + '">' + sDate + '</span> <span class="">' + sTime + '</span></span>'
}

let success = {
    modifyCardBorderColor: function () {
        Array.from($('.card')).map((x, i) => x.style.borderTop = '5px solid ' + (x.getAttribute('xtype') === '+' ? getRandomBorderColor() : 'red'))
    },
    alert: function (res) {
        let isaved = res.status === 'success' ? true : false
        swal({
            title: isaved ? "Action Processed" : res.status !== undefined ? res.status : "Not processed.",
            icon: isaved ? "success" : "error",
            button: 'Ok',
        }).then(flag => handleRefresh())
    },
    getSummaryCard: function (balance = 0, total = 0, expenses = 0) {
        return `
            <div id="summaryFundCard" xtype="+" class="right column card size14 bl">
                <div>Adhoc in hand (miscellaneous balance): <span class=" size14">${rsSymbol}${balance}</span></div>
                <div class="row">
                    <div class="column">
                        <span class="txtgreen size14">CR: ${rsSymbol}${total}</span>
                        <span class="red size14">DR: ${rsSymbol}${Math.abs(expenses)}</span>
                    </div>
                    <div class="column">
                        <span class="size14">CR-DR: ${rsSymbol}${total + expenses}</span>
                        <span class="txtpurple size16">Total: ${rsSymbol}${total + expenses + balance}</span>
                    </div>
                </div>
            </div>        
        `
    },
    displayRows: function (res) {
        let _that = success
        let result = []
        let total = 0
        result = res.map((x, i) => {
            total += parseFloat(x.amount)
            let isnegative = x.amount < 0 ? true : false
            return `
            <div class='row'>
                <span class="">${(i + 1)} - ${x.remarks}</span>
                <span class="bl right">${rsSymbol}${Math.abs(x.amount)}</span>
                <span>${partDateTime(x.when)}</span>
            </div>
            `
        })
        report1.innerHTML = `
        <div class="white height450">
            <h1 class='green'>Expenses made so far</h1>
            <div class="right">
                <button class="btn green" onclick="">Export PDF</button>
            </div>
            <br/>
            <div class='row bl green'>
                <span>Total Expenditure</span>
                <span class="right">${rsSymbol}${Math.abs(total)}</span>
                <span></span>
            </div>
            <div id="divLines">${result.join('')}</div>
        </div>
        `
    },
    group: function (res) {
        let _that = success
        if (res.status !== undefined)
            if (res.status.indexOf('failed') !== -1) {
                report1.innerHTML = `<div>No Data Found. ${res.status}</div>`
                return
            }

        let result = []
        let total = 0, expenses = 0
        result = res.map((x, i) => {
            if (x.id !== null)
                if (x.id.toLowerCase() === 'expenses') {
                    expenses = parseFloat(x.amount)
                    return null
                }
            total += parseFloat(x.amount)
            return `
                <div id="card${i}" class="card" xtype="+" onclick="memberCardClick(this,${x.id})">
                    <h1 class="ellipsis" title="${x.name.toUpperCase()}">${x.name.toUpperCase()}</h1>
                    <h3>unique code: <span class="txtpurple">${x.memkey} ${x.id === null ? '' : '(' + x.id + ')'}</span></h3>
                    <div class="right"><span class=" txtgreen size30">${rsSymbol}${Math.abs(x.amount)}</span></div>
                </div>
            `
        })
        result.splice(0, 0, _that.getSummaryCard(0, total, expenses))
        report1.innerHTML = `
            <h1 class='green'>Summary by members</h1>
            <div id="divLines" class="flexboxCards">${result.join('')}</div>
        `
        _that.modifyCardBorderColor()
    }
}

function error(err) {
    swal({
        title: "some error contact admin",
        button: 'Ok',
        content: JSON.stringify(err)
    })
    console.error(err)
}

function handleSubmit(e,formName, id) {
    let cur = $('#' + id)
    let oldval = cur.html()
    cur.html('please wait...')
    let parentForm = document.getElementById(formName)
    data = {}
    data['save'] = 1
    data['memid'] = id
    data['time'] = parentForm.time.value
    data['amount'] = parentForm.amount.value
    data['remarks'] = parentForm.remarks.value === "" ? "regular maintenance" : parentForm.remarks.value
    postData(phpServing, data, success.alert, error)
    cur.html(oldval)
    e.preventDefault()
}


function handleSubmitExpense(id) {
    let cur = $('#' + id)
    let oldval = cur.html()
    cur.html('please wait...')
    data = {}
    data['saveExpense'] = 1
    data['amount'] = amountexpense.value
    data['reason'] = reason.value === "" ? "regular maintenance" : reason.value
    postData(phpServing, data, success.alert, error)
    cur.html(oldval)
}

function handleSubmitMember(id) {
    let cur = $('#' + id)
    let oldval = cur.html()
    cur.html('please wait...')
    data = {}
    data['addMember'] = 1
    data['memberid'] = document.getElementById('memberid').value
    data['name'] = document.getElementById('name').value
    data['address'] = document.getElementById('address').value

    swal(
        {
            title: "Are you sure to add new member.",
            text: `Adding ${data.memberid} - ${data.name} to RWA group sector 8 D Block Dwarka`,
            buttons: ['No', 'Yes'],
        }
    ).then((flag) => {
        if (flag === true) {
            postData(phpServing, data, success.alert, error)
            cur.html(oldval)
        } else {
            cur.html(oldval)
        }
    })
}

function pullMembersList() {
    getData(`${phpServing}?membersList=1`, (res) => {
        let data = res.map(x => {
            return `<option value="${x.id}">${x.name}</option>`
        })
        memid.innerHTML = data.join('')
    })
}


function handleRefresh() {
    let byname = document.getElementById('idSearchBox').value
    report1.innerHTML = '<h1>please wait, loading...</h1>'
    getData(`${phpServing}?expensesGroup=1&name=${byname}`, success.group, error)
}

function handlePullExpenses(_this) {
    let cur = document.getElementById(_this.id)
    currentReportType = (currentReportType === 'expenses' ? 'summary' : "expenses")
    if (currentReportType === 'summary') {
        cur.innerHTML = 'Pull Expenses'
        handleRefresh()
        return
    }
    cur.innerHTML = 'Pull Summary'
    getData(`${phpServing}?expensesOnly=1`, (res) => {
        success.displayRows(res)
    }, error)
}

function preparePeriod() {
    let years = []
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let curDate = new Date()
    let curPeriod = months[curDate.getMonth()] + ' ' + curDate.getFullYear()
    for (let i = 2022; i < 2035; i++) {
        years.push(months.map(x => {
            let cval = x + ' ' + i
            let xelem = cval === curPeriod ? '<option value="' + cval + '" selected>' + cval + '</option>' : '<option value="' + cval + '">' + cval + '</option>'
            return xelem
        }).join(''))
    }
    return years.join('')
}

function handleAdminCheck() {
    let id = document.getElementById('adminId')
    let pwd = document.getElementById('adminPwd')
    if (1 === 1) {
        handleEntryType('admin')
        onInit()
        adminform.classList.add('hide')
        adminform.classList.remove('show')
    }
}

function handleMemberLogin() {
    loginModal.style.display = 'none'
    onInit()
}

function searchByKeyword(e) {
    if (e.keyCode === 13) {
        handleRefresh()
        e.preventDefault()
    }
}

function handleDefaultView() {
    if (defaultEntryType === 'member') {
        report1.classList.add('wid100')
        report1.classList.remove('wid70')
    } else if (defaultEntryType === 'admin') {
        report1.classList.add('wid70')
        report1.classList.remove('wid100')
    }
}

//initialise
function onInit() {
    loginModal.style.display = 'none'
    handleDefaultView()
    handleRefresh()
    container.style.display = 'block'
    document.getElementById('footer').style.postion = 'relative'
    if (defaultEntryType === 'admin')
        adminSection.style.display = 'block'
}

document.addEventListener("DOMContentLoaded", function () {
    loginModal.style.display = 'block'
    adminSection.style.display = 'none'
})
