let colors = ['violet', 'green', 'gray', 'goldenrod', 'purple', 'mediumseagreen', 'blue', '#8b7bce', "#85179b"]
let colorx = '#428bdb'
let isLocal = window.location.href.indexOf('localhost') !== -1
let server = isLocal ? "http://localhost:8080" : "https://dpresume.com/rwa8"
let serverPrefix = `${server}/rwasec8`
let phpServing = `${serverPrefix}/rwa.php`
let rsSymbol = '₹'
let container = document.getElementById('container')
let adminSection = document.getElementById('adminSection')
let report1 = document.getElementById('report1')
let logoutBtn = document.getElementById('logoutBtn')
let currentReportType = 'summary'
let loginModal = document.getElementById('loginModal')
let membersform = document.getElementById('membersform')
let appEnum = {
    isAdmin: 'isAdmin',
    loginName: 'loginName',
    userid: 'userid',
    isLogin: 'isLogin',
    member: 'member',
    admin: 'admin',
    logout: 'Logout',
    login: 'Login',
    none: 'none',
    block: 'block'
}
let defaultEntryType = appEnum.member //member or admin
let scrollToTopBtn = document.getElementById('scrollToTopBtn')
let toast = window.toastr
// toast.options.showEasing = 'easeOutBounce' //slideDown easeOutBounce slideUp easeInBack swing
toast.options.preventDuplicates = true;
toast.options.escapeHtml = true
toast.options.closeButton = true
toast.options.closeDuration = 200
// toast.options.timeOut = 200 //set to 0 or remove it
// toast.options.extendedTimeOut = 300
toast.options.progressBar = true

// document.location.reload(false)

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
        <div class='green size35'>Add Contribution for this month / Reversal</div>
        <form id="contriform" action="#" class="formInputs">
            <select id="time" class="wid200px">${timePeriods}</select>
            <input class="input-right wid200px amount" id="amount" placeholder="enter your amount" type="number" value="200" min="200" max="5000"/>
            <input id="remarks" placeholder="eg regular maintenance" type="text" class="wid200px"/>
            <button class="btn transition  red" id="btnSubmit" onclick="handleSubmit('contriform',${id})">Save</button>
        </form>
    `
    // return componentContributionForm
}

function memberCardClick(cur, id) {
    let cardid = cur.id
    if (typeof cur === 'string') {
        cardid = cur
    }

    let contributionForm = config.isAdmin() ? getAddContributionForm(id) : ""
    getData(`${phpServing}?expensesByMember=1&id=${id}`, (res) => {
        let rows = res.map((x, i) => {
            return `
                <div class="row">
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

function handleDeleteMember(e, id) {
    let adminId = config.getByKeyFromLocal(appEnum.userid)
    let adminUser = config.getByKeyFromLocal(appEnum.loginName)
    postData(phpServing, {deleteMember: 1, id, admin: adminUser, adminId}, res => {
        if (res.status === 'success') {
            onInit()
        }
    }, error)
    e.stopPropagation()
    e.preventDefault()
}

function handleEditMember(e, obj) {
    e.stopPropagation()
    e.preventDefault()
    handleFormsToggle({show: 'membersform', hide: 'expenseform'})
    let {id, name, address} = obj
    let memidInput = config.get('memberid')
    config.get('name').value = name
    memidInput.value = id
    config.get('address').value = address
    memidInput.disabled = true
    scrollToTop()
}

let partDateTime = (strDateTime) => {
    let sdateArr = strDateTime.split(' ')
    let sDate = new Date(sdateArr[0]).toLocaleDateString()
    let sTime = sdateArr[1]
    return '<span><span style="color: ' + colorx + '">' + sDate + '</span> <span class="">' + sTime + '</span></span>'
}

const config = {
    get: (id) => document.getElementById(id),
    isAdmin: () => defaultEntryType === appEnum.admin,
    modifyCardBorderColor: function () {
        Array.from($('.card')).map((x, i) => x.style.borderTop = '5px solid ' + (x.getAttribute('xtype') === '+' ? getRandomBorderColor() : 'red'))
    },
    alert: function (res) {
        toast.options.onHidden = handleRefresh
        toast.options.onclick = handleRefresh
        toast.options.onCloseClick = handleRefresh

        let isaved = res.status === 'success' ? true : false
        if (isaved) {
            toast.success(res.msg || 'Processed')
        } else {
            toast.error(res.msg || 'Processed')
        }
        // swal({
        //     title: isaved ? "Processed" : res.msg !== undefined ? res.msg || "" : "Not processed.",
        //     icon: isaved ? "success" : "error",
        //     button: 'Ok'
        // }).then(flag => handleRefresh())
    },
    getSummaryCard: function (balance = 0, total = 0, expenses = 0, membersCount = 0) {
        return `
            <div id="summaryFundCard" xtype="+" class="right column card size14 bl bggray">
                <div>Adhoc in hand (miscellaneous balance): <span class=" size14">${rsSymbol}${balance}</span></div>
                <div class="right">
                    <div>Total Members: <span class="size30 txtgreen">${membersCount}</span></div>
                </div>
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
            return `
            <div class='row line'>
                <span class="min-content">${(i + 1)} - ${x.remarks}</span>
                <span class="bl right">${rsSymbol}${Math.abs(x.amount)}</span>
                <span class="time">${partDateTime(x.when)}</span>
            </div>
            <hr/>
            `
        })
        report1.innerHTML = `
        <div class="">
            <div class='green size35'>Expenses made so far</div>
            <br/>
            <div class='row line bl green'>
                <span class="min-content">Total Expenditure</span>
                <span class="right">${rsSymbol}${Math.abs(total)}</span>
                <span></span>
            </div>
            <div id="divLines" class=" height650">${result.join('')}</div>
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
        let total = 0, expenses = 0, membersCount = 0
        result = res.map((x, i) => {
            if (x.id.toLowerCase() === 'expenses') {
                expenses = parseFloat(x.amount || 0)
                return null
            } else if (x.id.toLowerCase() === 'credits') {
                total = parseFloat(x.amount || 0)
                return null
            } else if (x.id.toLowerCase() === 'members') {
                membersCount = parseFloat(x.amount || 0)
                return null
            }

            let memObj = JSON.stringify({name: x.name, id: x.memkey, address: x.address}).split('"').join("&quot;")

            return `
                <div id="card${i}" class="card" xtype="+" onclick="memberCardClick(this,${x.id})">
                    <div class="size25 bl ellipsis row" title="${x.name}">
                        <span>${x.name}</span> 
                        ${_that.isAdmin() ? `<a onclick="handleEditMember(event, ${memObj})">Edit</a>` : ''}
                        ${_that.isAdmin() ? `<button class='btn transition  red' onclick="handleDeleteMember(event, ${x.id})">Delete</button>` : ''}
                    </div>
                    <div class="size20 bl row"><span class="txtpurple">${x.memkey}</span> <span class="right time">${x.when}</span></div>
                    <div class="size14">${x.address}</div>
                    <div class="right"><span class="size20 bl">${rsSymbol}${Math.abs(x.amount)}</span></div>
                </div>
            `
        })
        result.splice(0, 0, _that.getSummaryCard(0, total, expenses, membersCount))
        report1.innerHTML = `
            <div class='green size35'>Summary by members 
            <button class="btn" onClick="handleLeaderBoard()">${!isLeader ? "By Leader" : "By Names"}</button>
            <button class="btn" onClick="handleBoardAddress()">By Address</button>
            </div>
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

function resetMemberForm() {
    config.get('name').value = ''
    config.get('address').value = ''
    config.get('memberid').value = ''
    config.get('memberid').disabled = false
}

function handleSubmitMember(id) {
    let cur = $('#' + id)
    data = {}
    data['addMember'] = 1
    data['memberid'] = document.getElementById('memberid').value
    data['name'] = document.getElementById('name').value
    data['address'] = document.getElementById('address').value
    postData(phpServing, data, res => {
        resetMemberForm()
        config.alert(res)
    }, error)
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
    report1.innerHTML = '<div class="size35">please wait, loading...</div>'
    getData(`${phpServing}?expensesGroup=1&name=${byname}&byname=1`, config.group, error)
}

let isLeader = false

function handleLeaderBoard() {
    isLeader = !isLeader
    getData(`${phpServing}?expensesGroup=1&name=&${isLeader ? 'byleader=1' : 'byname=1'}`, config.group, error)
}

function handleBoardAddress() {
    getData(`${phpServing}?expensesGroup=1&name=&byaddress=1}`, config.group, error)
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
    getData(`${phpServing}?expensesOnly=1&byname=1`, (res) => {
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
    let user = document.getElementById('adminId').value
    let pwd = document.getElementById('adminPwd').value
    postData(phpServing, {loginCheck: 1, user, pwd}, (res) => {
        if (res.status !== undefined)
            if (res.status.indexOf('failed') !== -1) {
                error('Login failed')
                return
            }
        config.setByKeyToLocal(appEnum.isAdmin, true)
        config.setByKeyToLocal(appEnum.isLogin, true)
        config.setByKeyToLocal(appEnum.loginName, user)
        config.setByKeyToLocal(appEnum.userid, res[0].id)
        defaultEntryType = appEnum.admin
        report1.classList.add('wid70')
        logoutBtn.innerHTML = `Logout (${res[0].username})`
        onInit()
    }, error)
}

function handleMemberLogin() {
    loginModal.style.display = appEnum.none
    adminSection.style.display = appEnum.none
    config.setByKeyToLocal(appEnum.isAdmin, false)
    config.setByKeyToLocal(appEnum.isLogin, false)
    config.removeByKeyFromLocal(appEnum.loginName)
    config.removeByKeyFromLocal(appEnum.userid)
    defaultEntryType = appEnum.member
    report1.classList.add('wid100')
    doPrelimCheck()
}

function searchByKeyword(e) {
    if (e.keyCode === 13) {
        handleRefresh()
        e.preventDefault()
    }
}

//initialise
function onInit() {
    loginModal.style.display = appEnum.none
    let isAdmin = config.getByKeyFromLocal(appEnum.isAdmin)
    if (isAdmin === 'true') {
        defaultEntryType = appEnum.admin
    } else {
        defaultEntryType = appEnum.member
    }
    handleRefresh()
    container.style.display = appEnum.block
    if (config.isAdmin())
        adminSection.style.display = appEnum.block
}

function doPrelimCheck(callback = undefined, isLogout = false) {
    let isLogin = config.getByKeyFromLocal(appEnum.isLogin)
    let isAdmin = config.getByKeyFromLocal(appEnum.isAdmin)
    let id = config.getByKeyFromLocal(appEnum.userid)
    let username = config.getByKeyFromLocal(appEnum.loginName)
    report1.innerHTML = ""
    if (isLogin === "true" && isAdmin === "true") {
        getData(`${phpServing}?loginCheck=1&id=${id}&user=${username}`, (res) => {
            loginModal.style.display = appEnum.none
            adminSection.style.display = appEnum.block
            logoutBtn.innerHTML = `${appEnum.logout} (${username})`
            report1.classList.add('wid70')
            let isResponseOk = (res.status === 'success' ? true : false)
            if (!isResponseOk) {
                adminSection.style.display = appEnum.none
                loginModal.style.display = appEnum.block
                // error('login is failed, try again')
            }
            if (callback !== undefined)
                callback(isResponseOk)
        }, (er) => {
            adminSection.style.display = appEnum.none
            loginModal.style.display = appEnum.block
            error(er)
        })
    } else if (isAdmin === "false" && isLogin === "false") {
        logoutBtn.innerHTML = isLogout ? appEnum.login : `${appEnum.logout} (member)`
        adminSection.style.display = appEnum.none
        loginModal.style.display = appEnum.block
        report1.classList.add('wid100')
        if (!isLogout) onInit()
        isLogout && loginCleanup()
    } else {
        loginModal.style.display = appEnum.block
        adminSection.style.display = appEnum.none
        report1.classList.add('wid100')
    }
}

function loginCleanup() {
    Object.values(appEnum).forEach(x => config.removeByKeyFromLocal(x))
}

function handleLogout() {
    let isMemberLoggingOut = logoutBtn.innerHTML.toLowerCase().indexOf(appEnum.member) !== -1
    doPrelimCheck(function (val) {
        if (!val) return
        let id = config.getByKeyFromLocal(appEnum.userid)
        let username = config.getByKeyFromLocal(appEnum.loginName)
        getData(`${phpServing}?logout=1&id=${id}&user=${username}`, (res) => {
            loginCleanup()
            logoutBtn.innerHTML = appEnum.login
            adminSection.style.display = appEnum.none
            loginModal.style.display = appEnum.block
        }, err => error(err))
    }, true)
}

function handleChangePassword() {
    if (!config.isAdmin()) return
    let newPassword = prompt('Enter new password')
    if (newPassword === undefined || newPassword === null || newPassword === '') return;
    let id = config.getByKeyFromLocal(appEnum.userid)
    let user = config.getByKeyFromLocal(appEnum.loginName)
    postData(phpServing, {passwordChange: 1, id, user, pwd: newPassword}, config.alert, error)
}

function handleBackup(type = 'csv') {
    switch (type) {
        case 'json':
            getData(`${phpServing}?backupJSON=1`, (res) => {
                download(JSON.stringify(res), `backup_rwa_${new Date().toLocaleDateString()}.json`)
            }, err => error(err))
            break
        case 'csv':
            getData(`${phpServing}?backupJSON=1`, (res) => {
                let csvData = json2csv(res)
                download(csvData, `backup_rwa_${new Date().toLocaleDateString()}.csv`)
            }, err => error(err))
            break
        default:
            break
    }
}

function scrollTo(e) {
    let scrollpos = Math.floor(sessionStorage.getItem('scrollpos'))
    if (scrollpos) {
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        })
        e.stopPropagation()
        e.preventDefault()
    }
}

function handleScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener("scroll", handleScroll)

// document.addEventListener("scroll", function (e) {
//     var top = window.pageYOffset || document.documentElement.scrollTop
//     sessionStorage.setItem('scrollpos', top);
// })

document.addEventListener("DOMContentLoaded", (e) => {
        scrollToTopBtn.addEventListener("click", scrollToTop)
        // scrollTo(e)
        getData(`${phpServing}?config=1`, res => {
            console.log('config', res)
            doPrelimCheck(val => {
                val && onInit()
            }, false)
        }, error)
        e.stopPropagation()
        e.preventDefault()
    }
)

function download(content, fileName, contentType = "text/plain") {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function json2csv(data) {
    // let json = data
    let csv = ""
    let sep = '\r\n'
    let line = '-'.repeat(80)
    let replacer = function (key, value) { return value === null ? '' : value }
    for (let f of Object.keys(data)) {
        let obj = data[f]
        csv += f
        let flds = Object.keys(obj[0])
        csv += sep + line + sep
        csv += flds + sep
        Object.values(obj).map(x => {
            let vals = Object.values(x).join(',')
            csv += vals + sep
        })
        csv += line + sep
    }
    return csv
}
