let colors = ['violet', 'green', 'gray', 'goldenrod', 'purple', 'mediumseagreen', 'blue', '#8b7bce', "#85179b"]
let colorx = '#428bdb'
let serverPrefix = "http://localhost:8080/rwasec8"
let phpServing = `${serverPrefix}/rwa.php`
let rsSymbol = '₹'
let container = document.getElementById('container')
let adminSection = document.getElementById('adminSection')
let report1 = document.getElementById('report1')
let adminform = document.getElementById('adminform')
let logoutBtn = document.getElementById('logoutBtn')
let currentReportType = 'summary'
let loginModal = document.getElementById('loginModal')
let appEnum = {
    isAdmin: 'isAdmin',
    loginName: 'loginName',
    userid: 'userid',
    isLogin: 'isLogin',
    member: 'member',
    admin: 'admin',
    logout: 'Logout',
    login: 'Login'
}
let defaultEntryType = appEnum.member //member or admin

function postData(url, data = {}, success, err) {
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data,
        success,
        error: function (xhr, status, errTxt) {
            err(errTxt)
        }
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
        <form id="contriform" action="#" class="formInputs">
            <select id="time" class="wid200px">${timePeriods}</select>
            <input class="input-right wid200px" id="amount" placeholder="enter your amount" type="text" value="200" />
            <input id="remarks" placeholder="eg regular maintenance" type="text" class="wid200px"/>
            <button class="btn red" id="btnSubmit" onclick="handleSubmit('contriform',${id})">Save</button>
        </form>
    `
    // return componentContributionForm
}

function memberCardClick(cur, id) {
    let cardid = cur.id
    if (typeof cur === 'string') {
        cardid = cur
    }

    let contributionForm = defaultEntryType === appEnum.admin ? getAddContributionForm(id) : ""
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

const config = {
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
        let _that = config
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
        let _that = config
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
    },
    setByKeyToLocal: function (key, value) {
        localStorage.setItem(key, value)
    },
    getByKeyFromLocal: function (key) {
        return localStorage.getItem(key)
    },
    removeByKeyFromLocal: function (key) {
        return localStorage.removeItem(key)
    }
}

function error(err) {
    swal({
        title: "some error contact admin",
        button: 'Ok',
        text: err.toString()
    })
    // console.error(err)
}

function handleSubmit(formName, id) {
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
    postData(phpServing, data, config.alert, error)
    cur.html(oldval)
}


function handleSubmitExpense(id) {
    let cur = $('#' + id)
    let oldval = cur.html()
    cur.html('please wait...')
    data = {}
    data['saveExpense'] = 1
    data['amount'] = amountexpense.value
    data['reason'] = reason.value === "" ? "regular maintenance" : reason.value
    postData(phpServing, data, config.alert, error)
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
            postData(phpServing, data, config.alert, error)
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
    getData(`${phpServing}?expensesGroup=1&name=${byname}`, config.group, error)
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
        config.displayRows(res)
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
    let id = document.getElementById('adminId').value
    let pwd = document.getElementById('adminPwd').value
    postData(phpServing, {loginCheck: 1, id, pwd}, (res) => {
        if (res.status !== undefined)
            if (res.status.indexOf('failed') !== -1) {
                error('Login failed')
                return
            }
        config.setByKeyToLocal(appEnum.isAdmin, true)
        config.setByKeyToLocal(appEnum.isLogin, true)
        config.setByKeyToLocal(appEnum.loginName, id)
        config.setByKeyToLocal(appEnum.userid, res[0].id)
        defaultEntryType = appEnum.admin
        logoutBtn.innerHTML = `Logout (${res[0].username})`
        onInit()
    }, error)
}

function handleMemberLogin() {
    loginModal.style.display = 'none'
    adminSection.style.display = 'none'
    config.setByKeyToLocal(appEnum.isAdmin, false)
    config.setByKeyToLocal(appEnum.isLogin, false)
    config.removeByKeyFromLocal(appEnum.loginName)
    config.removeByKeyFromLocal(appEnum.userid)
    defaultEntryType = appEnum.member
    onInit()
}

function searchByKeyword(e) {
    if (e.keyCode === 13) {
        handleRefresh()
        e.preventDefault()
    }
}

function handleDefaultView() {
    if (defaultEntryType === appEnum.member) {
        report1.classList.add('wid100')
        report1.classList.remove('wid70')
    } else if (defaultEntryType === appEnum.admin) {
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
    if (defaultEntryType === appEnum.admin)
        adminSection.style.display = 'block'
}

function doPrelimCheck() {
    let isLogin = config.getByKeyFromLocal(appEnum.isLogin)
    let isAdmin = config.getByKeyFromLocal(appEnum.isAdmin)
    let userid = config.getByKeyFromLocal(appEnum.userid)
    let username = config.getByKeyFromLocal(appEnum.loginName)
    report1.innerHTML = ""
    logoutBtn.innerHTML = `${appEnum.logout} (member)`
    if (isLogin === "true" && isAdmin === "true") {
        getData(`${phpServing}?loginCheck=1&id=${userid}&user=${username}`, (res) => {
            loginModal.style.display = 'none'
            adminSection.style.display = 'block'
            logoutBtn.innerHTML = `${appEnum.logout} (${username})`
            onInit()
        }, (er) => {
            adminSection.style.display = 'none'
            loginModal.style.display = 'block'
            error(er)
        })
    } else if (isAdmin === "false" && isLogin === "false") {
        loginModal.style.display = 'block'
        adminSection.style.display = 'none'
    } else {
        loginModal.style.display = 'block'
        adminSection.style.display = 'none'
    }
}

function handleLogout() {
    Object.values(appEnum).forEach(x => config.removeByKeyFromLocal(x))
    doPrelimCheck()
    logoutBtn.innerHTML = appEnum.login
}

function handleChangePassword() {
    if (defaultEntryType === appEnum.member) return
    let newPassword = prompt('Enter new password')
    if (newPassword === undefined || newPassword === null || newPassword === '') return;
    let id = config.getByKeyFromLocal(appEnum.userid)
    let user = config.getByKeyFromLocal(appEnum.loginName)
    postData(phpServing, {passwordChange: 1, id, user, pwd: newPassword}, config.alert, error)
}


document.addEventListener("DOMContentLoaded", doPrelimCheck)
