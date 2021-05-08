let leftMenu = {
    "About": {
        icon: `<i class="icons">person_outline</i>`,
        text: "Who I Am...",
        uri: "resources/summary.json",
        overlayID: "Summary",
        displaySubDiv: false,
        displayInMenu: true,
        displayContent: true,
        loadDemo: true
    },
    "Education": {
        icon: `<i class="icons">school</i>`,
        text: "Education Details",
        uri: "resources/education.json",
        overlayID: "Education",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false

    },
    "Certification": {
        icon: `<i class="icons">badge</i>`,
        text: "Certification Details",
        uri: "resources/certifications.json",
        overlayID: "Certification",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
    },
    "Experience": {
        icon: `<i class="icons">calendar_view_month</i>`,
        text: "Experience Summary",
        uri: "resources/prof_expr.json",
        overlayID: "Experience",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
    },
    "Projects": {
        icon: `<i class="icons">engineering</i>`,
        text: "Projects I have Undertaken most recently",
        uri: "resources/projects.json",
        overlayID: "Projects",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
    },
    "Skills": {
        icon: `<i class="icons">security</i>`,
        text: "What else I know",
        uri: "resources/skills.json",
        overlayID: "whatElse",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
    },
    "Notes": {
        icon: `<i class="icons">edit_note</i>`,
        text: "This is What I make notes on...",
        uri: "resources/my_notes.txt",
        overlayID: "",
        displayInMenu: true,
        displayContent: true,
        displaySubDiv: false
    },
    "Code": {
        icon: `<i class="icons">code</i>`,
        text: "Html/Javascript/Python/Sql Code Blocks that I practice",
        uri: "code.html",
        displaySubDiv: false,
        displayInMenu: true,
        displayContent: true,
        loadLocal: true
    },
    "CodeAPI": {
        icon: `<i class="icons">code</i>`,
        text: "Code Example API endpoint",
        uri: 'https://dpresume.com/API/getCode.php?nodes=jsDataTypeTest',
        displaySubDiv: false,
        displayInMenu: true,
        displayContent: true,
        loadLocal: false
    },
    "donate": {
        icon: ``,
        text: "Donate Me",
        uri: "resources/donate.json",
        overlayID: "Education",
        displayInMenu: false,
        displayContent: true,
        displaySubDiv: false
    },
};
let subDiv = 'rightPanelDivSub';
let menuKeys = Object.keys(leftMenu);
let idLeftMenu = 'leftMenu';
let rightPanelDiv = 'rightPanelDiv';
let br = '<br>';
let br2 = '<br><br>';
let idOverlay = 'idOverlay';
let idOverlayContent = 'idOverlayContent';
let beforeLI = '<span>&#10004;</span>';
let adhocDataSet = {};
var width = 1;
var bar = document.getElementById("barStatus");
let current = {}
let cnt = 0;
let left;
let mobile = false;
let plzWaitMsg = '<span class="plzwait"><i class="icons">autorenew</i> please wait...</span>'
let globalObject = {}


let getById = function (id) {
    return document.getElementById(id);
}

// const loader=(svgName)=>{
//     icon='loading, plz wait...'
//     if(svgName==='loader1'){
//         icon='<img class="imgsvg" src="./js/bar.svg" width="40" alt="loading..."/>';
//     }
//     return icon;
// }

let loadID = getById('idLoad');

// loadID.innerHTML=loader('loader1');

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

//init function
function app() {
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
    let curHrefLoc = window.location.hash.replace('#/', '')
    let keyonload = (curHrefLoc === '' ? menuKeys[0] : curHrefLoc)
    for (let ex in leftMenu) {
        let curElem = undefined
        let icon = leftMenu[ex].icon || ''
        if (leftMenu[ex].displayInMenu === true)
            curElem = `<li id=${'id' + ex}><a href="#/${ex}" onclick="handleLeftButtonClick(this,${ex})">${icon + ex}</a></li>`
        if (ex.toLowerCase() === keyonload.toLowerCase() && leftMenu[ex].displayInMenu === true) {
            whichElemOnLoad = curElem = `<li id=${'id' + ex} class="active">${icon}<a href="#/${ex}" onclick="handleLeftButtonClick(this,${ex})">${ex}</a></li>`
        }
        elm.push(curElem);
    }
    left.innerHTML = elm.join('');
    globalObject.thisKey = keyonload
    globalObject.hash = window.location.hash
    if (leftMenu[keyonload].displayContent === true) handleLeftButtonClick(whichElemOnLoad, keyonload);
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

let demoPageContent = () => {
    let demoLinks = [
        {href: 'https://dpresume.com/debounceExampleLazySearch/', name: 'Lazy Search Debounce Example'},
        {href: 'https://dpresume.com/docs/bdfdemojan21.webm', name: 'BDF Native App Demo'},
        {href: 'https://dpresume.com/docs/supply-chain.webm', name: 'Supply Chain App Demo'},
        {href: 'https://dpresume.com/react-js-python/#/', name: 'React JS Library Based - without Node'},
        {
            href: 'https://dpresume.com/ciim/',
            name: `Post & Reply system ${`<b style="font-size: 8px;">(username: test@gmail.com, password: test)</b>`}`
        },
        {href: 'https://dpresume.com/mocha/mocha.html', name: 'Mocha Unit Tests'},
        {href: 'https://dpresume.com/dpvoicebanking', name: 'Open Banking Hackathon'},
    ]
    return `<div>
    <h1>few Live Demo Examples</h1>
    <div class="demo flexbox cards">
        ${demoLinks.map(x => `<a target="_blank" href="${x.href}">${x.name}</a>`).join('')}
    </div>
    </div>`
}

let handleLeftButtonClick = function (cur, key) {
    let curUndefined = cur === undefined
    let resetText = () => {
        if (curUndefined) return
        setTimeout(() => {
            cur.innerHTML = oldText
        }, 500)
    }
    let oldText = curUndefined ? '' : cur.innerHTML
    if (!curUndefined) cur.innerHTML = plzWaitMsg
    // show(loadID);
    // moveProgress();
    let rightContainer = getById(rightPanelDiv);
    let pageHeader = undefined;
    pageHeader = '<h1>Loading...</h1>';
    rightContainer.innerHTML = pageHeader;
    rightContainer.style.backgroundColor = "white";
    let allLeftLI = document.querySelectorAll('div.content-left li');
    for (let i in allLeftLI) {
        let x = allLeftLI[i];
        x.class = (x.id == 'id' + key ? 'cursel' : '');
    }
    current = leftMenu[key];
    let text = current["text"];
    let uri = current["uri"];
    let overlayID = current["overlayID"];
    let subDisplay = current["displaySubDiv"];
    let loadLocal = current["loadLocal"];
    let loadDemo = current["loadDemo"] || false;
    // console.log(text, uri, loadLocal);
    let sub = getById(subDiv);
    sub.style.display = 'none';
    pageHeader = '<h1 onclick="handleOverlayContent(\'' + text + '\',\'' + overlayID + '\')">' + text + '</h1>';
    // let container = getById(rightPanelDiv);

    if (loadLocal === true) {
        let iframeContent = '<iframe id="codeBlock" src="' + uri + '"></iframe>';
        rightContainer.innerHTML = iframeContent;
        resetText()
        return;
    }
    globalObject.currentKey = key
    getFromWeb(isHtmlHttpTextTrue(uri), uri, function (successData) {
        let code = globalObject.thisKey.toLowerCase() === 'codeapi'
        let dataValue = code ? `<div id='jsEditor'></div>` : successData
        rightContainer.innerHTML = pageHeader + dataValue + (loadDemo ? demoPageContent() : '');
        if (code) setCodeData('nodes', JSON.parse(successData))
        if (subDisplay)
            getAdhocListing(key, fnSubDivDisplay);
        resetText()
    }, function (failedData) {
        console.error(failedData)
    });
    if (mobile) left.style.display = 'none';
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
            if (!raw) vals2display += '<ul class="noHover">' + customFormat(data) + '</ul>';
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
    let cbox = `<div class=${globalObject.currentKey.toLowerCase() !== 'projects' ? 'box  ' : ''}>`;
    for (let x in data) {
        if (data[x] instanceof Object) {
            vals2display += (x === 'data' ? cbox : cbox + '<h1>' + x.replace('data', '').toUpperCase() + '</h1>');
        }
        for (let i in data[x]) {
            let el = data[x][i];
            if (isNaN(i)) { //json types
                vals2display += '<b>' + i.toUpperCase() + '</b>';
                if (Array.isArray(el)) {
                    for (let k in el) {
                        if (x.toLowerCase() === 'skills' && el[k].indexOf('~') !== -1) {
                            d1 = el[k].split('~');
                            vals2display += '<div><span>' + d1[0] + '</span>' + '<span class="right star" title="I know ' + d1[0] + ' - ' + d1[1] + '/5">' + getStar(d1[1]) + '</span></div>';
                        } else
                            vals2display += '<div>' + el[k] + '</div>';
                    }
                } else {
                    vals2display += '<div>' + el + '</div>';
                }
            } else
                vals2display += `<li class=${globalObject.currentKey.toLowerCase() === 'projects' ? 'box  ' : ''}>${beforeLI} ${el} </li>`;
        }
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


document.addEventListener('DOMContentLoaded', function (event) {
    let initCall = () => {
        app()
    }
    window.addEventListener('load', initCall);
    window.addEventListener('hashchange', initCall)
    window.addEventListener('onpopstate', initCall);
    getLinksDisplay()
});


