let leftMenu = {
    "About": {
        url: ['images/dp.png'],
        text: "Who I Am...",
        uri: "resources/summary.json",
        overlayID: "Summary",
        displaySubDiv: true
    },
    "Education": {
        url: [],
        text: "Education Details",
        uri: "resources/education.json",
        overlayID: "Education",
        displaySubDiv: false
    },
    "Certification": {
        url: [],
        text: "Certification Details",
        uri: "resources/certifications.json",
        overlayID: "Certification",
        displaySubDiv: false
    },
    "Experience": {
        url: [],
        text: "Experience Summary",
        uri: "resources/prof_expr.json",
        overlayID: "Experience",
        displaySubDiv: false
    },
    "Projects": {
        url: [],
        text: "Projects I have Undertaken most recently",
        uri: "resources/projects.json",
        overlayID: "Projects",
        displaySubDiv: true
    },
    "Skills": {
        url: [],
        text: "What else I know",
        uri: "resources/skills.json",
        overlayID: "whatElse",
        displaySubDiv: false
    }
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
let mobile=false;

let getById = function (id) {
    return document.getElementById(id);
};
document.addEventListener('DOMContentLoaded', function (event) {
    app(); //run when document is initialised and contents are ready to be displayed
    getLinksDisplay();
});

function getAdhocListing(key,what2run) {
    getFromWeb(true, 'resources/adhoc.json', function (successData) {
        adhocDataSet = successData;
        akeys=Object.keys(adhocDataSet);
        if(akeys.indexOf(key)!==-1)
            what2run(adhocDataSet[key]);
    }, function (failedData) {
        console.log(failedData)
    })
}

function getLinksDisplay() {
    getFromWeb(true, 'resources/links.json', function (successData) {
        let header = successData.header;
        let links = []
        for (let x in header) {
            links.push('<a href="' + header[x] + '" target="_blank">' + x + '</a>')
        }
        let linksDiv = getById('idLinks');
        linksDiv.innerHTML += links.join(' | ');
    }, function (failedData) {
        console.log(failedData)
    })
}


//init function
function app() {
    left=getById('leftPanel');
    window.mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    mobile=mobilecheck();
    let elm = [];
    for (let ex in leftMenu) {
        elm.push('<li id=' + ('id' + ex) + ' onclick="handleAnchorClick(\'' + ex + '\')"><span>' + ex + '</span></li>');
    }
    getById(idLeftMenu).innerHTML = elm.join('');
    handleAnchorClick(menuKeys[0]);
}

let doRotate = function () {
    setInterval(rotate, 2000);

    function rotate() {
        cnt += 1;
        if (cnt >= menuKeys.length) cnt = 0;
        rotatorView(cnt);
    }
}

let rotatorView = function (x) {
    handleAnchorClick(menuKeys[x]);
}

let toggleLeftPanel = function (e) {
    left.style.display = (left.style.display == 'none' ? 'block' : 'none');
}
let handleAnchorClick = function (key) {
    // moveProgress();
    let rightContainer = getById(rightPanelDiv);
    rightContainer.style.backgroundColor = "white";
    let allLeftLI = document.querySelectorAll('.content-left ul li');
    for (let i in allLeftLI) {
        let x = allLeftLI[i];
        x.className = (x.id == 'id' + key ? 'cursel' : '');
    }
    current = leftMenu[key];
    let url = current["url"];
    let text = current["text"];
    let uri = current["uri"];
    let overlayID = current["overlayID"];
    let subDisplay = current["displaySubDiv"];

    let sub = getById(subDiv);
    sub.style.display = 'none';
    let pageHeader = '<h1 onclick="handleOverlayContent(\'' + text + '\',\'' + overlayID + '\')">' + text + '</h1>';
    let container = getById(rightPanelDiv);
    let xurls = [];
    for (let i in url) {
        let e = url[i];
        let x = '';
        if (e.indexOf("https:") !== -1) {
            x = '<a href="' + e + '" target="_blank">' + e.substr(e.lastIndexOf('/') + 1) + '</a>';
        } else if (e.indexOf('images') !== -1) {
            x = '<div class="box"><img class="dp" src="' + e + '"/></div>';
        }
        xurls.push(x);
    }
    getFromWeb(false, uri, function (successData) {
        container.innerHTML = pageHeader + successData + xurls.join(br);
    }, function (failedData) {
        console.log(failedData)
    });
    //subdiv display
    if (subDisplay) {
        getAdhocListing(key,fnSubDivDisplay);
    }
    if(mobile) left.style.display='none';
}


function fnSubDivDisplay(ds) {
    let sub = getById(subDiv);
    let contRightSub = '';
    // let dataSub = [['images/mongo.png', 'images/dp_lead_nlg.png'], ['images/oracle_sql.png', 'images/open_edg.png'], ['images/js.png'], ['images/gitpy.png', 'images/linkedin.png', 'images/sdlc.png']];
    let dataSub = ds;
    for (let i in dataSub) {
        contRightSub += '<div  id="subxdiv" class="row" >';
        x = dataSub[i];
        for (let j in x) {
            let y = x[j].indexOf('.png') !== -1 ? '<img class="dp" src="' + x[j] + '" />' : x[j];
            contRightSub += '<div class="box column bg-white click"><a href="' + x[j] + '" target="_blank">' + y + '</a></div>';
        }
        contRightSub += '</div>';
    }
    sub.innerHTML = contRightSub;
    sub.style.display = 'block';
}

//older js callbacks way, similar to return new Promise(resolve,reject)
let getFromWeb = function (raw, uri, resolve, reject) {
    that = this;
    let req = new XMLHttpRequest();
    req.onload = function () {
        var data = JSON.parse(this.response);
        if (req.status >= 200 && req.status < 400) {
            let vals2display = raw ? data : '<ul class="noHover">';
            if (!raw) {
                let cbox = '<div class="box">';
                for (let x in data) {
                    if (data[x] instanceof Object) {
                        vals2display += (x === 'data' ? cbox : cbox + '<h1>' + x.replace('data', '').toUpperCase() + '</h1>');
                    }
                    for (let i in data[x]) {
                        let el = data[x][i];
                        if (isNaN(i)) {
                            // vals2display += '<b>' + i.toUpperCase() + ': </b>' + br + beforeLI + (Array.isArray(el) ? el.join(br + beforeLI) : el) + br;
                            vals2display += '<b>' + i.toUpperCase() + '</b>';
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
                            vals2display += '<li>' + beforeLI + el + '</li>';
                    }
                    vals2display += '</div>';
                }
                vals2display += '</ul>';
            }
            resolve(vals2display);
        } else {
            req.onerror = reject(req.statusText);
        }
    }
    // xmlhttp.open("POST", url, true);
    // xmlhttp.setRequestHeader("Content-Type", "application/json");
    // xmlhttp.send(JSON.stringify(body));
    req.open('GET', uri, true);
    req.send();
}

function getStar(n) {
    let out = '';
    for (i = 0; i < n; i++) {
        out += '&#9733;';
    }
    return out;
}


function handleOverlayContent(text, id) {
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
