let leftMenu = {
    "Home": {
        icon: `<i class="icons size20">person_outline</i>`,
        text: "About Me",
        uri: "resources/summary.json",
        overlayID: "Summary",
        displaySubDiv: false,
        displayInMenu: true,
        displayContent: true,
        loadDemo: true
        , speek: true
    },
    "Education": {
        icon: `<i class="icons size20">school</i>`,
        text: "Education Details",
        uri: "resources/education.json",
        overlayID: "Education",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
        , speek: true
    },
    "Certification": {
        icon: `<i class="icons size20">badge</i>`,
        text: "Certification Details",
        uri: "resources/certifications.json",
        overlayID: "Certification",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
        , speek: true
    },
    "Experience": {
        icon: `<i class="icons size20">calendar_view_month</i>`,
        text: "Experience Summary",
        uri: "resources/prof_expr.json",
        overlayID: "Experience",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
        , speek: false
    },
    "SomeJs": {
        icon: `<i class="icons size20">code</i>`,
        text: "Some Javascript Alogrithms - mostly linearly complex",
        uri: "resources/fewjs.txt",
        displaySubDiv: false,
        displayInMenu: true,
        displayContent: true
        , speek: false
    },
    "Projects": {
        icon: `<i class="icons size20">engineering</i>`,
        text: "most recent projects",
        uri: "resources/projects.txt",
        overlayID: "Projects",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
        , speek: false
    },
    "Skills": {
        icon: `<i class="icons size20">security</i>`,
        text: "What else I know",
        uri: "resources/skills.json",
        overlayID: "whatElse",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
        , speek: false
    },
    "Notes": {
        icon: `<i class="icons size20">edit_note</i>`,
        text: "This is What I make notes on...",
        uri: "resources/my_notes.txt",
        overlayID: "",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
        , speek: false
    },
    "Code": {
        icon: `<i class="icons size20">code</i>`,
        text: "Html/Javascript/Python/Sql Code Blocks that I practice",
        uri: "code.html",
        displaySubDiv: false,
        displayInMenu: true,
        displayContent: true,
        loadLocal: true
        , speek: false
    },
    "CodeAPI": {
        icon: `<i class="icons size20">code</i>`,
        text: "Code Example API endpoint",
        uri: 'https://dpresume.com/API/getCode.php?',
        displaySubDiv: false,
        displayInMenu: false,
        displayContent: true,
        loadLocal: false
        , speek: false
    },
    "donate": {
        icon: ``,
        text: "Donate Me",
        uri: "resources/donate.json",
        overlayID: "Education",
        displayInMenu: false,
        displayContent: true,
        displaySubDiv: false
        , speek: false
    },
    "Blogs": {
        icon: `<i class="icons size20">rss_feed</i>`,
        text: "Some Blogs",
        uri: "resources/blogs.txt",
        displaySubDiv: false,
        displayInMenu: true,
        displayContent: true
        , speek: false
    },
};
let subDiv = 'rightPanelDivSub';
let menuKeys = Object.keys(leftMenu);
let idLeftMenu = 'leftMenu';
let rightPanelDiv = 'rightPanelDiv';
let isLocal = window.location.host.indexOf('localhost') !== -1
let uriPrefix = isLocal ? 'http://localhost:8000/' : 'https://dpresume.com/'
let br = '<br>';
let br2 = '<br><br>';
let idOverlay = 'idOverlay';
let idOverlayContent = 'idOverlayContent';
// let beforeLI = '<span>&#10004;</span>';
let beforeLI = '';
let adhocDataSet = {};
var width = 1;
var bar = document.getElementById("barStatus");
let current = {}
let cnt = 0;
let left;
let mobile = false;
let plzWaitMsg = '<span class="plzwait"><i class="icons">autorenew</i> please wait...</span>'
let globalObject = {}
let appkey = 'dpresume'
let displayCaptcha = `<div class=""><h2><span id="mainCaptcha" class="tld"></h2><input type="text" id="txtInput" placeholder="enter captcha"/>    </div>`
let welcomeTag = document.getElementById('welcomeTag')
let synthesis = 'speechSynthesis' in window ? window.speechSynthesis : undefined;
let isSpeaking = false;

let colorsArray = [
    '#cbf8df', '#f5dabe', '#66CDAA', '#F0FFFF',
    '#FAFAD2', '#FFEBCD', '#66d9ff', '#F8EC7B',
    '#E8B2EE', '#F8C67B', '#C3EEF1', '#D9B2EE',
    '#B2EED2', '#EEB2CE', '#f8a5ae', '#E1EAAF',
    '#e7e8d7', '#7FB4EC', '#7ffcd9', '#ecb88a',
    '#437dc7', '#caf3bf', '#c8a1fc', '#f5c16d',
    '#ff8566', '#f6e23d', '#e2e0e3', '#ea9517',
    '#f6def8', '#f8c6bf', '#61fab4', '#fc75b1',
    '#7dce8a', '#daef51', '#9388d7', '#bea9cd'
]
let volumeup = (id) => `<span class="icons click size25" onclick="speakOut(this,'${id}')">volume_up</span>`

let getById = (id) => document.getElementById(id);
let rightContainer = getById(rightPanelDiv);
let loadID = getById('idLoad');

function Captcha() {
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    var i;
    for (i = 0; i < 6; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
    document.getElementById("mainCaptcha").innerHTML = code
    document.getElementById("mainCaptcha").value = code
}

function ValidCaptcha() {
    var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
    var string2 = removeSpaces(document.getElementById('txtInput').value);
    if (string1 == string2) {
        return true;
    } else {
        return false;
    }
}

function removeSpaces(string) {
    return string.split(' ').join('');
}


function getAdhocListing(key, what2run) {
    getFromWeb(true, 'resources/adhoc.json', function (successData) {
        adhocDataSet = successData;
        akeys = Object.keys(adhocDataSet);
        if (akeys.indexOf(key) !== -1)
            what2run(adhocDataSet[key]);
    }, function (failedData) {
        console.log(failedData)
    })
}

function getLinksDisplay() {
    getFromWeb(true, 'resources/links.json', function (successData) {
        // linksDiv.innerHTML=""
        let linksDiv = getById('idLinks');
        if (linksDiv === null) return;

        let header = successData.header;
        let links = []
        for (let x in header) {
            links.push('<a class="btn" href="' + header[x] + '" target="_blank">' + x + '</a>')
        }
        linksDiv.innerHTML = links.join(' ');
    }, function (failedData) {
        console.log(failedData)
    })
}

let notifyMe = (msg, autohide = true, callback) => {
    let iserr = msg.substring(0, 1) === '?'
    let msgNotifyInstance = new Notify({
        title: 'hey there',
        status: iserr ? 'error' : 'success',
        text: iserr ? msg.substring(1) : msg,
        position: 'right bottom',
        customIcon: '',
        customClass: '',
        autoclose: autohide
    })
    setTimeout(() => {
        if (callback !== undefined) callback()
    }, 700)
}

//init function
function app() {
    getLinksDisplay()
    left = getById('leftPanel');
    if (left === null) return;
    window.mobilecheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    mobile = mobilecheck();
    let elm = [];
    let whichElemOnLoad = undefined
    let winhash = window.location.hash
    let curHrefLoc = winhash.replace('#/', '')
    let codeapi = winhash.toLowerCase().indexOf('codeapi')
    let sufApi = ''
    if (codeapi) {
        //nodes=jsDataTypeTest
        let strUriArr = curHrefLoc.split('/')
        curHrefLoc = strUriArr[0]
        sufApi = strUriArr[1]
    }
    let keyonload = (curHrefLoc === '' ? menuKeys[0] : curHrefLoc)
    elm.push(globalObject.welcomeMsg || '')
    for (let ex in leftMenu) {
        let curElem = undefined
        let icon = leftMenu[ex].icon || ''
        let wannaDisplayClickLink = (leftMenu[ex].displayInMenu === true)
        let curKeyFound = (ex.toLowerCase() === keyonload.toLowerCase())
        if (wannaDisplayClickLink)
            curElem = `<li id=${'id' + ex} class="${curKeyFound ? 'active' : ''}"><a href="#/${ex}" onclick="handleLeftButtonClick(this,'${ex}')">${icon + ex}</a></li>`
        if (curKeyFound && wannaDisplayClickLink) whichElemOnLoad = curElem
        elm.push(curElem);
    }
    left.innerHTML = elm.join('');
    globalObject.thisKey = keyonload
    globalObject.hash = window.location.hash
    if (leftMenu[keyonload].displayContent === true) handleLeftButtonClick(whichElemOnLoad, keyonload, sufApi);
}

const handleX = (type = 'get', payload = {}, cb) => {
    let isget = (type === 'get')
    let uri = isget ? 'service/service.php?get=1' : 'service/service.php?set=1'
    let headers = isget ? {method: type} : {method: type, body: JSON.stringify(payload)}
    const call = async () => {
        const res = await fetch(uriPrefix + uri, headers)
        const data = await res.json()
        if (cb !== undefined) cb(data)
    }
    call()
}


let doRotate = function () {
    setInterval(rotate, 2000);

    function rotate() {
        cnt += 1;
        if (cnt >= menuKeys.length) cnt = 0;
        rotatorView(cnt);
    }
}

// let rotatorView = function (x) {
//     handleLeftButtonClick(menuKeys[x]);
// }

let toggleLeftPanel = function (e) {
    let disp = left.style.display == 'none'
    let rightPanel = getById(rightPanelDiv)
    left.style.display = disp ? 'block' : 'none'
    // rightPanel.style.width = disp ? '80%' : '100%'
}

let demoPageContent = async () => {
    let res = await fetch('resources/demo.json')
    let data = await res.json()
    let print = () => data.map(x => {
        let num = Math.floor(Math.random() * colorsArray.length)
        let bgColor = colorsArray[num] || 'white'
        return `<a style="background-color: ${bgColor};"  target="_blank" href="${x.href}" class="mcard">
        <span>${x.name}</span>
        </a>`
    }).join('')

    return `<div>
    <h1>few Live Demo Examples</h1>
    <div class="demo flexbox cards">${print()}</div>
    </div>`
}

let handleLeftButtonClick = function (cur, key, sufApi = '') {
    let curUndefined = cur === undefined
    let resetText = () => {
        if (mobile) left.style.display = 'none';
        if (curUndefined) return
        setTimeout(() => {
            cur.innerHTML = oldText
        }, 500)
    }
    let oldText = curUndefined ? '' : cur.innerHTML
    // if (!curUndefined) cur.innerHTML = plzWaitMsg
    // show(loadID);
    // moveProgress();
    let rightContainer = getById(rightPanelDiv);
    let pageHeader = undefined;
    pageHeader = '<h1 class="size20">Loading...</h1>';
    rightContainer.innerHTML = pageHeader;
    rightContainer.style.backgroundColor = "white";
    let allLeftLI = document.querySelectorAll('div.content-left li');
    for (let i in allLeftLI) {
        let x = allLeftLI[i];
        x.class = (x.id == 'id' + key ? 'cursel' : '');
    }
    current = leftMenu[key];
    let text = current["text"];
    let uri = current["uri"] + sufApi;
    let overlayID = current["overlayID"];
    let subDisplay = current["displaySubDiv"];
    let loadLocal = current["loadLocal"];
    let loadDemo = current["loadDemo"] || false;
    let speek = current["speek"] || false;
    // console.log(text, uri, loadLocal);
    let sub = getById(subDiv);
    sub.style.display = 'none';
    // pageHeader = '<h1 onclick="handleOverlayContent(\'' + text + '\',\'' + overlayID + '\')">' + text + '</h1>';
    pageHeader = `<h1 class="size20">${text}</h1>`
    // let container = getById(rightPanelDiv);

    globalObject.currentKey = key
    if (loadLocal === true) {
        let iframeContent = '<iframe id="codeBlock" src="' + uri + '"></iframe>';
        rightContainer.innerHTML = iframeContent;
        resetText()
        return;
    }
    let somejs = (key.toLowerCase() === 'somejs')
    let somepy = (key.toLowerCase() === 'somepy')
    if (somejs || somepy) {
        getFromWeb(true, uri, data => {
            let block = `<div id='jsEditor'>${data}</div>`
            rightContainer.innerHTML = pageHeader + block;
        })
        resetText()
        return;
    }

    getFromWeb(isHtmlHttpTextTrue(uri), uri, function (successData) {
        let canspeek = () => {
            if (speek)
                pageHeader = `<h1 class="size20">${text} ${volumeup('nohover')}</h1>`
        }
        canspeek()
        let code = globalObject.thisKey.toLowerCase() === 'codeapi'
        let dataValue = code ? `<div id='jsEditor'></div>` : successData
        if (loadDemo) {
            let xyz = async () => {
                let demodata = await demoPageContent()
                rightContainer.innerHTML = pageHeader + dataValue + demodata;
            }
            xyz()
        } else
            rightContainer.innerHTML = pageHeader + dataValue;
        if (code) setCodeData('nodes', JSON.parse(successData))
        if (subDisplay)
            getAdhocListing(key, fnSubDivDisplay);

        resetText()
    }, function (failedData) {
        console.error(failedData)
    });
}

function show(id2show) {
    id2show.style.display = 'block';
}

function hide(id2hide) {
    id2hide.style.display = 'none';

    // setTimeout(function () {
    //     id2hide.style.display = 'none';
    // }, 800);
}

function isHtmlHttpTextTrue(x) {
    let ishtml = (x.indexOf('.html') !== -1) ? true : false;
    let ishttp = (x.indexOf('http') !== -1) ? true : false;
    let istxt = (x.indexOf('.txt') !== -1) ? true : false;
    return (ishtml || ishttp || istxt) ? true : false;
}

function fnSubDivDisplay(ds) {
    let sub = getById(subDiv);
    let contRightSub = '';
    // let dataSub = [['images/mongo.png', 'images/dp_lead_nlg.png'], ['images/oracle_sql.png', 'images/open_edg.png'], ['images/js.png'], ['images/gitpy.png', 'images/linkedin.png', 'images/sdlc.png']];
    let dataSub = ds;
    let mdiv = '<div class="box column bg-white click">';
    for (let i in dataSub) {
        contRightSub += '<div  id="subxdiv" class="row" >';
        x = dataSub[i];
        if (isHtmlHttpTextTrue(x[0])) {
            contRightSub += '<iframe src="' + x[0] + '" width="600" height="400"></iframe>';
        } else {
            for (let j in x) {
                let y = x[j].indexOf('.png') !== -1 ? '<img class="dp" src="' + x[j] + '" />' : x[j];
                contRightSub += mdiv;
                contRightSub += '<a href="' + x[j] + '" target="_blank">' + y + '</a>';
                contRightSub += '</div>';
            }
        }
        contRightSub += '</div>';
    }
    sub.innerHTML = contRightSub;
    sub.style.display = 'block';
    // hide(loadID);
}

//older js callbacks way, similar to return new Promise(resolve,reject)
let getFromWeb = function (raw, uri, resolve, reject) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        var data = (isHtmlHttpTextTrue(uri)) ? this.response : JSON.parse(this.response);
        if (req.status >= 200 && req.status < 400) {
            let vals2display = raw ? data : '';
            if (!raw) vals2display += '<ul id="nohover" class="noHover">' + customFormat(data) + '</ul>';
            resolve(vals2display);
        } else {
            // hide(loadID);
            req.onerror = reject(req.statusText);
        }
    }
    req.open('GET', uri, true);
    req.send();
}

function customFormat(data) {
    let vals2display = '';
    let cbox = `<div class=${globalObject.currentKey.toLowerCase() !== 'projects' ? 'box ' : ''}>`;
    for (let x in data) {
        if (data[x] instanceof Object) {
            vals2display += (x === 'data' ? cbox : cbox + '<h1>' + x.replace('data', '').toUpperCase() + '</h1>');
        }
        let allowSpeek = false
        for (let i in data[x]) {
            let el = data[x][i];
            if (i.toLowerCase() === 'speek' && el === true) {
                allowSpeek = true
                continue
            }
            let canspeek = allowSpeek ? `${volumeup(`speek${x}`)}` : ''
            if (isNaN(i)) { //json types
                vals2display += `<h1><span>${i.toUpperCase()}</span> ${canspeek}</h1>`;
                if (allowSpeek) {
                    vals2display += `<div id="speek${x}">`;
                }
                if (Array.isArray(el)) {
                    for (let k in el) {
                        if (x.toLowerCase() === 'skills' && el[k].indexOf('~') !== -1) {
                            d1 = el[k].split('~');
                            vals2display += '<div><span>' + d1[0] + '</span>' + '<span class="right star" title="I know ' + d1[0] + ' - ' + d1[1] + '/5">' + getStar(d1[1]) + '</span></div>';
                        } else {
                            vals2display += '<div>' + el[k] + '</div>';
                        }
                    }
                } else {
                    vals2display += '<div>' + el + '</div>';
                }
            } else
                vals2display += `<li class=${globalObject.currentKey.toLowerCase() === 'projects' ? 'box  ' : ''}>${beforeLI} ${el} </li>`;
        }
        if (allowSpeek) vals2display += '</div>';
        vals2display += '</div>';
    }
    return vals2display;
}

function getContentsByTag(tag, text) {
    return text.match('<' + tag + '>(.*)?</' + tag + '>')[1];
}

function getStar(n) {
    let out = '';
    for (i = 0; i < n; i++) {
        out += '&#9733;';
    }
    return out;
}


function handleOverlayContent(text, id) {
    loadID.style.display = 'block';
    // moveProgress();
    let overlayDiv = getById(idOverlay);
    let xobj = {text: text};
    let headerLine = '<h1>' + xobj.text + '</h1>';
    let contetnLine = '<div>';
    let ds = adhocDataSet[id];
    for (let i in ds) {
        let line = '<img class="dp" src="' + ds[i] + '"/>';
        contetnLine += '<div class="box">' + line + '</div>';
    }
    contetnLine += '</div>';
    let overlayContentDiv = getById(idOverlayContent);
    overlayContentDiv.innerHTML = headerLine + contetnLine;
    openNav(overlayDiv.id);
    loadID.style.display = 'none';
}

function openNav(divid, param) {
    let x = getById(divid);
    x.style.width = "100%";
    x.style.display = "block";
}

function closeNav(divid) {
    let x = getById(divid);
    x.style.width = "0%";
    x.style.display = "none";
}

//for progress bar
function moveProgress() {
    bar.style.display = 'block';
    bar.style.width = width + '%';
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            width = 1;
            clearInterval(id);
            bar.style.display = 'none';
        } else {
            width++;
            bar.style.width = width + '%';
        }
    }
}

let setCodeData = (type, data) => {
    let editor;
    if (type === 'nodes') {
        editor = window.ace.edit('jsEditor');
        editor.session.setMode("ace/mode/javascript");
    } else if (type === 'python') {
        editor = window.ace.edit('pythonEditor');
        editor.session.setMode("ace/mode/python");
    }

    editor.setTheme("ace/theme/chrome");
    editor.setReadOnly(true);

    let contentToDisplay = ''
    for (let d in data) {
        contentToDisplay += data[d];
    }
    editor.setValue(contentToDisplay);
    editor.clearSelection();
}
let checkCaptch = (isCaptcha = false) => {
    if (isCaptcha) {
        let validated = ValidCaptcha()
        if (validated === false) {
            notifyMe('please enter valid captch')
            return validated
        }
        return validated
    }
    return true
}

let moveAwayIntr = undefined
let saveSession = (isCaptcha = false) => {
    if (moveAwayIntr !== undefined) clearInterval(moveAwayIntr)
    if (!checkCaptch(isCaptcha)) return
    let name = document.getElementById('visitorname').value || ''
    let mobile = document.getElementById('visitormobile').value || ''
    let appdata = JSON.stringify({name, mobile, lastloggedon: new Date()})
    localStorage.setItem(appkey, appdata)
    notifyMe('welcome, thanks for visiting my app', true, () => {
        location.href = '/'
    })
}
let whoareyou = (isCaptcha = false) => {
    let counter = 15
    let showLoader = () => {
        let moveAwayId = document.getElementById('moveAwayCounter')
        let show = i => {
            moveAwayId.innerHTML = `<h1 class="xred">Landing to home in <span class="size20">${i}</span> <span class="btn danger xwhite" onclick="clearInterval(${moveAwayIntr})">stop</span></h1>`
        }
        moveAwayIntr = setInterval(() => {
            if (counter <= 1) {
                clearInterval(moveAwayIntr)
                saveSession(isCaptcha)
                return
            }
            counter = counter - 1
            show(counter)
        }, 1000)
        show(counter)
    }
    if (isCaptcha === true) Captcha()
    let elm = []
    elm.push('<div style="width: 50%">')
    elm.push(`<h1>only for one time in life, i just need to know who visited my page</h1>`)
    elm.push(`<div id="moveAwayCounter"></div>`)
    elm.push(`<h3 class="xinfo">this is only one time ask</h3>`)
    elm.push(`<input id="visitorname" placeholder="enter you name(optional)" />`)
    elm.push(`<input id="visitormobile" placeholder="enter you contact number (optional)" />`)
    elm.push(isCaptcha ? displayCaptcha : null)
    elm.push(`<div><span class="btn primary xwhite" onclick="saveSession(${isCaptcha})">Proceed</span></div>`)
    elm.push('</div>')
    rightContainer.innerHTML = elm.join('')
    showLoader()
}

let localise = () => {
    let found = localStorage.getItem(appkey)
    if (found === undefined || found === null || found === false) {
        return false
    }
    return found
}

const animate = (clsid, type = 1) => {
    let textWrapper = document.querySelector('.' + clsid);
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    if (type === 1) {
        anime.timeline({loop: true})
            .add({
                targets: `.${clsid} .letter`,
                translateY: ["0.7em", 0],
                translateZ: 0,
                duration: 850,
                delay: (el, i) => 50 * i
            }).add({
            targets: `.${clsid}`,
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
    }
    if (type === 2) {
        anime.timeline({loop: true})
            .add({
                targets: `.${clsid} .letter`,
                scale: [2, 1],
                opacity: [0, 1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 750,
                delay: (el, i) => 70 * i
            }).add({
            targets: `.${clsid}`,
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        })
    }
    if (type === 3) {
        anime.timeline({loop: true})
            .add({
                targets: `.${clsid} .letter`,
                translateY: [100, 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 300 + 30 * i
            }).add({
            targets: `.${clsid} .letter`,
            translateY: [0, -100],
            opacity: [1, 0],
            easing: "easeInExpo",
            duration: 1200,
            delay: (el, i) => 100 + 30 * i
        });
    }
}


function speakOut(cur, id) {
    let elemId = getById(id)
    let text = elemId.innerText
    if (text === '') return
    if (cur.innerHTML.toLowerCase() === 'volume_off') {
        stopPlay()
        cur.innerHTML = 'volume_up'
        return;
    }
    isSpeaking = true;
    let utterance = new SpeechSynthesisUtterance(text);
    speechUtteranceChunker(utterance, {
        chunkLength: 120
    }, function () {
    });
    cur.innerHTML = 'volume_off'
}

function stopPlay() {
    isSpeaking = false;
    if (typeof window.speechSynthesis === 'undefined') {
        notifyMe('no voice assistant present');
        return;
    }
    synthesis.cancel();
}


const speechUtteranceChunker = function (utt, settings, callback) {
    if (!isSpeaking) return;

    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    } else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    // console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        if (!isSpeaking) return;
        // speechSynthesis.speak(newUtt);
        synthesis.speak(newUtt);
    }, 0);
};

const runAll = () => {
    rightContainer.innerHTML = `<h1>Loading Contents, Please Wait...</h1>`
    let initCall = () => {
        // animate('ml6', 1)
        // animate('ml2', 2)
        // animate('ml13', 3)
        let iskeyset = localise()
        if (iskeyset === false) {
            whoareyou()
            return
        }
        let appObject = JSON.parse(iskeyset)
        globalObject.welcomeMsg = appObject.name !== '' ? `<div class="labelx xinfo">Welcome, <span class="xred">${appObject.name || 'XXXX'}</span>, you last came on <span class="time xgray">${appObject.lastloggedon || ''}</span></div>` : `<div class="labelx xred">Welcome, Mate!</div>`
        app()
        handleX('get', undefined, (data) => {
            welcomeTag.innerHTML = `<h1 class="ml13"><span class="icons size25">visibility</span> <span class="size25">${data.counter.visits || '0'}</span></h1>`
            // animate('ml13', 3)
        })
    }
    window.addEventListener('load', () => {
        initCall()
        let payload = JSON.parse(localise())
        handleX('post', payload)
        notifyMe('welcome mate!!')
    });
    window.addEventListener('hashchange', initCall)
    window.addEventListener('onpopstate', initCall);
}

document.addEventListener('DOMContentLoaded', runAll)


