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
let loginModal = document.getElementById('loginModal')
let membersform = document.getElementById('membersform')
let appEnum = {
    isAdmin: 'isAdmin',
    loginName: 'loginName',
    userid: 'userid',
    isLogin: 'isLogin',
    member: 'member',
    admin: 'admin',
    president: 'president',
    treasurer: 'treasurer',
    logout: 'Logout',
    login: 'Login',
    none: 'none',
    block: 'block',
    byname: 'byname',
    byamount: 'byamount',
    byaddress: 'byaddress',
}
let defaultEntryType = appEnum.member //member or admin
let curRefreshType = appEnum.byname
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

function getAddContributionForm({cur, id}) {
    //singleton implementation
    // if (componentContributionForm !== '') return componentContributionForm
    if (timePeriods === '')
        timePeriods = preparePeriod()
    let obj = config.prepareJSONForParam({cur, id})
    return `
        <div class='green size25'>Add Contribution for this month / Reversal</div>
        <form id="contriform" action="#" class="formInputs">
            <select id="time" class="wid200px">${timePeriods}</select>
            <input class="input-right wid200px amount" id="amount" placeholder="enter your amount" type="number" value="200" min="200" max="5000"/>
            <input id="remarks" placeholder="eg regular maintenance" type="text" class="wid200px"/>
            <button class="btn transition  red" id="btnSubmit" onclick="handleSubmit('contriform',${obj})">Save</button>
        </form>
    `
}

function memberCardClick(cur, id) {
    let contributionForm = config.isAdmin() ? getAddContributionForm({cur, id}) : ""
    getData(`${phpServing}?expensesByMember=1&id=${id}`, (res) => {
        let rows = res.map((x, i) => {
            return `
                <div class="col size12">
                    <div class='wid100 bl'>${x.date} - ${partDateTime(x.when)}</div>
                    <div class='row margin10L'>
                        <span class='wid80'>${x.remarks}</span>
                        <span>${rsSymbol}${x.amount}</span>
                        ${config.isAdmin() ? `<a class="red" onclick="handleExpensesDelete(${x.id},${config.prepareJSONForParam({
                cur,
                memberId: id
            })},'memberCard');">delete</a>` : ''}
                    </div>
                </div>
            `
        })
        let xdiv = document.createElement('div')
        xdiv.id = 'openCardId'
        let txnData = `
            <div class="size30">Previous Contributions</div>
            <div class="height450">${rows.join('')}</div>
        `;
        let baseHeader = `
            <div class='row center'>
                <h2>Member View</h2>
            </div>
            <div class='row'>
                <h2>Hello, ${cur.name}</h2>
                <h1>${rsSymbol} ${cur.amount}</h1>
            </div>
            <div class='size12 row'>
                <span>${cur.address}</span>
                <span>${cur.type}</span>
            </div>
        `
        xdiv.innerHTML = baseHeader + contributionForm.toString() + txnData.toString()
        xdiv.className = 'carddiv'
        // Array.from(xdiv.children).map(a => a.classList.remove('amt'))
        config.prepareSwal(xdiv)
    }, error)
}

function deleteSwal(callback) {
    swal({
        icon: 'warning',
        title: "Sure To Delete?",
        buttons: ['No, Cancel', 'Yes, Please'],
        dangerMode: true,
    }).then((isConfirm) => {
        if (isConfirm) {
            callback()
        }
    })

}

function handleDeleteMember(e, id) {
    let adminId = config.getByKeyFromLocal(appEnum.userid)
    let adminUser = config.getByKeyFromLocal(appEnum.loginName)
    deleteSwal(() => {
        postData(phpServing, {deleteMember: 1, id, admin: adminUser, adminId}, res => {
            if (res.status === 'success') {
                onInit()
            }
        }, error)
    })
    e.stopPropagation()
    e.preventDefault()
}

function handleEditMember(e, obj) {
    e.stopPropagation()
    e.preventDefault()
    handleFormsToggle({show: 'membersform', hide: 'expenseform'})
    let {id, name, address, sort} = obj
    let memidInput = config.get('memberid')
    config.get('name').value = name
    memidInput.value = id
    config.get('address').value = address
    config.get('addresssort').value = sort
    memidInput.disabled = true
    scrollToTop()
}

let partDateTime = (strDateTime) => {
    let sdateArr = strDateTime.split(' ')
    let sDate = new Date(sdateArr[0]).toLocaleDateString()
    let sTime = sdateArr[1]
    return `<span>${sDate}</span>`
}

function searchExpenses(text = undefined) {
    let searchSuffix = `&search=${text}`
    if (text === undefined) searchSuffix = ""
    getData(`${phpServing}?expensesOnly=1${searchSuffix}`, (res) => {
        config.displayRows(res)
    }, error)
}

function handleExpensesSearch(e, _this) {
    if (e.keyCode === 13) {
        let searchText = _this.value
        config.searchExpense = searchText
        searchExpenses(searchText)
    }
}

function handleExpensesDelete(id, {cur, memberId}, type) {
    deleteSwal(() => {
        postData(phpServing, {deleteExpense: 1, id}, res => {
            if (res.status === 'success') {
                if (type === 'expense') searchExpenses()
                if (type === 'memberCard') {
                    handleRefresh()
                    // memberCardClick(cur, memberId)
                }
            } else {
                error('failed to delete')
            }
        }, error)
    })
}

function getIconByMemberType(type) {
    let ret = ''
    let basePath = 'images'

    function getImage(name) {
        return `<img class='icon-logo' src='${basePath}/${name}' />`
    }

    switch (type) {
        case appEnum.president:
            ret = getImage('crown.png')
            break
        case appEnum.treasurer:
            ret = getImage('treasurer.jpg')
            break
        case appEnum.member:
            ret = getImage('member.png')
            break
        default:
            ret = getImage('member.png')
            break
    }
    return ret
}

const config = {
    prepareSwal: (xdiv) => {
        swal({
            content: xdiv,
            button: 'Close'
        }).then(flag => {
            xdiv.remove()
            let overlayContainer = Array.from(document.getElementsByClassName('swal-overlay'))
            overlayContainer.map(x => x.remove())
            config.isAdmin() && handleRefresh()
        })
    },
    get: (id) => document.getElementById(id),
    isAdmin: () => defaultEntryType === appEnum.admin,
    modifyCardBorderColor: function () {
        Array.from($('.card')).map((x, i) => x.style.borderTop = '5px solid ' + (x.getAttribute('xtype') === '+' ? getRandomBorderColor() : 'red'))
    },
    prepareJSONForParam: (obj) => JSON.stringify(obj).split('"').join("&quot;"),
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
    },
    getSummaryCard: function (balance = 0, total = 0, expenses = 0, membersCount = 0) {
        // <div>Adhoc in hand (miscellaneous balance): <span className=" size14">${rsSymbol}${balance}</span></div>
        return `
            <div id="summaryFundCard" xtype="+" class="right column card size14 bl bggray">
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
                <div class='bottom'>
                    <button class='btn' onClick="searchExpenses()">Expenses Summary</button>
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
            let obj = _that.prepareJSONForParam({cur: '', memberId: ''})
            return `
            <div class='col line size12'>
                <div class='row'>
                    <span>${partDateTime(x.when)}</span>
                    ${_that.isAdmin() ? `<a class="red" onclick="handleExpensesDelete(${x.id},${obj},'expense')">delete</a>` : ''}
                 </div>
             <div class='row'>
                <span class="min-content">${x.remarks}</span>
                <span class="bl right">${rsSymbol}${Math.abs(x.amount)}</span>
             </div>
            </div>
            <hr/>
            `
        })
        report1.innerHTML = `
        <div class="">
            <div class='green size30'>
                <span>Expenses made so far</span>
                <button class="btn" onclick="handleRefresh()">Home</button>
            </div>
            <div>
                <input type='text' value="${_that.searchExpense || ''}" placeholder="search expenses" class="wid100" onkeydown="handleExpensesSearch(event, this)" />
            </div>
            <div class='row line bl green'>
                <span class="min-content">Total Expenditure</span>
                <span class="right">${rsSymbol}${Math.abs(total)}</span>
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

            let memObj = _that.prepareJSONForParam(
                {
                    name: x.name,
                    id: x.memkey,
                    address: x.address,
                    sort: x.address_number_sort,
                    amount: x.amount,
                    type: x.type
                }
            )
            let nameSplitArr = x.name.split(' ')
            let profileIcon
            try {
                profileIcon = nameSplitArr.map(x => x[0].toUpperCase()).join('')
            } catch (e) {
                profileIcon = x.name[0]
            }
            return `
                <div id="card${i}" class="card" xtype="+" onclick="memberCardClick(${memObj},${x.id})">
                    <div class="size25 bl row" title="${x.name}">
                        <div class='ellipsis'>
                            ${profileIcon !== '' ? `<span class='profileIcon'>${profileIcon}</span>` : ''} 
                            <span>${x.name}</span>
                        </div>
                        <span class="size20 bl right">${rsSymbol}${Math.abs(x.amount)}</span>
                    </div>
                    <div class="size20 bl row"><span class="txtpurple">${x.memkey}</span> <span class="right time">${x.when}</span></div>
                    <div class="size14 row">
                        <span>${x.address}</span>
                    </div>
                    <div><span class="size12 bl">${x.type} (sort by:${x.address_number_sort})</span></div>
                    <div class='row bl'>
                        ${_that.isAdmin() ? `<a onclick="handleEditMember(event, ${memObj})">Edit</a>` : ''}
                        <span>${getIconByMemberType(x.type)}</span>
                        ${_that.isAdmin() ? `<button class='btn transition  red' onclick="handleDeleteMember(event, ${x.id})">Delete</button>` : ''}
                    </div>
                </div>
            `
        })
        result.splice(0, 0, _that.getSummaryCard(0, total, expenses, membersCount))
        let curSelBtn = 'current'
        report1.innerHTML = `
            <div class='green size35'>Summary By
            <button class="btn ${curRefreshType === appEnum.byname ? curSelBtn : ''}" onClick="handleLeaderBoard('${appEnum.byname}')">Name</button>
            <button class="btn ${curRefreshType === appEnum.byamount ? curSelBtn : ''}" onClick="handleLeaderBoard('${appEnum.byamount}')">Amount</button>
            <button class="btn ${curRefreshType === appEnum.byaddress ? curSelBtn : ''}" onClick="handleLeaderBoard('${appEnum.byaddress}')">Address</button>
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
        icon: 'warning',
        dangerMode: true,
        text: err.toString()
    })
    // console.error(err)
}

function handleSubmit(formName, {id, cur}) {
    let parentForm = document.getElementById(formName)
    let data = {}
    data['save'] = 1
    data['memid'] = id
    data['time'] = parentForm.time.value
    data['amount'] = parentForm.amount.value
    data['remarks'] = parentForm.remarks.value === "" ? "regular maintenance" : parentForm.remarks.value
    postData(phpServing, data, (res) => {
        handleRefresh()
        memberCardClick({...cur, amount: parseInt(cur.amount) + parseInt(data['amount'])}, id)
    }, error)
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
    config.get('addresssort').value = ''
    config.get('memberid').disabled = false
}

function handleSubmitMember(id) {
    let cur = $('#' + id)
    data = {}
    data['addMember'] = 1
    data['memberid'] = document.getElementById('memberid').value
    data['name'] = document.getElementById('name').value
    data['address'] = document.getElementById('address').value
    data['address_number_sort'] = document.getElementById('addresssort').value
    postData(phpServing, data, res => {
        resetMemberForm()
        handleRefresh()
        // config.alert(res)
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

function refreshDataByType(type) {
    let search = document.getElementById('idSearchBox').value
    getData(`${phpServing}?expensesGroup=1&name=${search}&${type}=1`, config.group, error)
}

function handleRefresh() {
    report1.innerHTML = '<div class="size35">please wait, loading...</div>'
    refreshDataByType(curRefreshType)
}

function handleLeaderBoard(type) {
    curRefreshType = type
    config.setByKeyToLocal('cursel', type)
    refreshDataByType(type)
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

function handleGetContacts() {
    getData(`${phpServing}?keycontacts=1`, res => {
        let xdiv = document.createElement('div')
        let elem = res.map(x => {
            return `
                <div class='rowgrid middle'>
                    <span>${getIconByMemberType(x.type)}</span>                
                    <span>${x.name}</span>
                    <span>${x.type}</span>
                    <span>${x.memkey}</span>
                    <span onClick="handleClickContactMe()" class="btn primary">Contact</span>
                </div>
            `
        }).join('')
        let baseHeader = `
             <h2>Key RWA Members - Governing Body</h2>
        `
        xdiv.innerHTML = `
            <div class='left height450 rwacard'>${baseHeader + elem}</div>
        `
        config.prepareSwal(xdiv)
    }, error)
}

const getWAReminderMessage = (name) => {
    return `Hello Sir/Madam, ${name}, We from RWA hereby request you to submit your dues asap for smooth functioning of RWA. Your cooperation is crucial. Regards From RWA Sector 8 D Block Managing Group`
}


function handleSendWA(phone, message) {
    console.log(phone, message)
}

function handleRemindAllWA(listOfDefaulters) {
    listOfDefaulters.forEach(x => handleSendWA(x.memkey, getWAReminderMessage(x.name)))
}

function handleShowReminders() {
    getData(`${phpServing}?showReminders=1`, res => {
        let xdiv = document.createElement('div')
        let elem = res.map(x => {
            let phone = x.memkey
            return `
                <div class='rowgrid marginud'>
                    <span>${x.name}</span>
                    <span>${x.memkey}</span>
                    <span>${x.lastSubmitted}</span>
                    <span onClick="handleSendWA('${phone}','${getWAReminderMessage(x.name)}')" class="btn primary">Remind</span>
                </div>
            `
        })
        let header = `<div className='rowgrid'>
                <span>Name</span>
                <span>Phone Number</span>
                <span>Last Contribution In</span>
            </div>`

        elem.splice(0, 0, header)
        let resObj = config.prepareJSONForParam(res)
        let baseHeader = `
             <h2>Group Reminder</h2>
             <div class='right'>
                <span class='btn' onClick="handleRemindAllWA(${resObj})">Remind All</span>
             </div>
        `
        xdiv.innerHTML = `
            <div class='left height450 rwacard'>${baseHeader + elem.join('')}</div>
        `
        config.prepareSwal(xdiv)
    }, error)
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
        case 'xls':
            getData(`${phpServing}?backupJSON=1`, (res) => {
                let filename = `backup_rwa_${new Date().toLocaleDateString()}.xls`
                json2xls(res, filename)
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
            // console.log('config', res)
            curRefreshType = config.getByKeyFromLocal('cursel') || 'byname'
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

function json2xls(data, filename) {
    let wsMembers = XLSX.utils.json_to_sheet(data.members || []);
    let wsExpenses = XLSX.utils.json_to_sheet(data.expenses || []);
    let wsCollection = XLSX.utils.json_to_sheet(data.collection || []);

    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsMembers, "members");
    XLSX.utils.book_append_sheet(wb, wsExpenses, "expenses");
    XLSX.utils.book_append_sheet(wb, wsCollection, "collection");

    XLSX.writeFile(wb, filename);
}