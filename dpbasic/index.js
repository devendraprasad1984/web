let leftMenu = {
    "About": {
        url: ['images/dp.png'],
        text: "About Us",
        uri: "resources/summary.json"
    }
    , "Education": {url: [], text: "Education Details", uri: "resources/education.json"}
    , "Certification": {url: [], text: "Certification Details", uri: "resources/certifications.json"}
    , "Experience": {url: [], text: "Experience Summary", uri: "resources/prof_expr.json"}
    , "Projects": {url: [], text: "Projects I have Undertaken most recently", uri: "resources/projects.json"}
    , "WhatElse": {url: [], text: "What else I know", uri: "resources/skills.json"}
};
let menuLKeys = Object.keys(leftMenu);
let idLeftMenu = 'leftMenu';
let rightPanelDiv = 'rightPanelDiv';
let br = '<br>';
let br2 = '<br><br>';

String.prototype.camelize = function () {
    return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

let getTab = function (id) {
    return document.getElementById(id);
};
document.addEventListener('DOMContentLoaded', function (event) {
    app(); //run when document is initialised and contents are ready to be displayed
    getLinksDisplay();
});

function getLinksDisplay() {
    getFromWeb(true, 'resources/links.json', function (successData) {
        let header=successData.header;
        let links=[]
        for(let x in header){
            links.push('<a href="'+header[x]+'" target="_blank">'+x+'</a>')
        }
        let linksDiv=getTab('idLinks');
        linksDiv.innerHTML+=links.join(' | ');
    }, function (failedData) {
        console.log(failedData)
    })
}

//init function
function app() {
    let elm = [];
    for (let ex in leftMenu) {
        elm.push('<li id=' + ('id' + ex) + ' onclick="handleAnchorClick(\'' + ex + '\')"><span>' + ex + '</span></li>');
    }
    getTab(idLeftMenu).innerHTML = elm.join('');
    handleAnchorClick(menuLKeys[0]);
}

let toggleLeftPanel = function (e) {
    let panel = getTab('leftPanel');
    panel.style.display = (panel.style.display == 'none' ? 'block' : 'none');
    e.innerText = e.innerText == 'Hide Menu' ? 'Menu' : 'Hide Menu';
}
let handleAnchorClick = function (key) {
    let allLeftLI = document.querySelectorAll('.content-left ul li');
    for (let i in allLeftLI) {
        let x = allLeftLI[i];
        x.className = (x.id == 'id' + key ? 'cursel' : '');
    }
    let url = leftMenu[key]["url"];
    let text = leftMenu[key]["text"];
    let uri = leftMenu[key]["uri"];
    let pageHeader = '<h1>' + text + '</h1>';
    let container = getTab(rightPanelDiv);
    let xurls = [];
    for (let i in url) {
        let e = url[i];
        let x = '';
        if (e.indexOf("https:") !== -1) {
            x = '<a href="' + e + '" target="_blank">' + e.substr(e.lastIndexOf('/') + 1) + '</a>';
        } else if (e.indexOf('images') !== -1) {
            x = '<img src="' + e + '"/>';
        }
        xurls.push(x);
    }
    // getFromWeb(uri).then(function (dataFromURI) {
    //     container.innerHTML = pageHeader + dataFromURI + br2 + xurls.join(br);
    // }).catch(function (x) {
    //     console.log(x)
    // });
    getFromWeb(false, uri, function (successData) {
        container.innerHTML = pageHeader + successData + br2 + xurls.join(br);
    }, function (failedData) {
        console.log(failedData)
    });
}

//ES6 promise is handles from async calls of calling an api end point
// let getFromWeb = function (uri) {
//     return new Promise(function (resolve, reject) {
//         let req = new XMLHttpRequest();
//         req.onload = function () {
//             var data = JSON.parse(this.response);
//             if (req.status >= 200 && req.status < 400) {
//                 let dataKeys = Object.keys[data];
//                 let vals2display = '';
//                 for (let x in data) {
//                     if (data[x] instanceof Object)
//                         vals2display += '<h1>' + x.replace('data', '') + '</h1>';
//                     for (let i in data[x]) {
//                         if (isNaN(i))
//                             vals2display += '<b>' + i + ': </b>' + data[x][i] + br;
//                         else
//                             vals2display += data[x][i] + br;
//                     }
//                 }
//                 resolve(vals2display);
//             } else {
//                 req.onerror = reject('check input error');
//             }
//         }
//         // xmlhttp.open("POST", url, true);
//         // xmlhttp.setRequestHeader("Content-Type", "application/json");
//         // xmlhttp.send(JSON.stringify(body));
//         req.open('GET', uri, true);
//         req.send();
//     });
// }

//older js callbacks way
let getFromWeb = function (raw, uri, resolve, reject) {
    that = this;
    let req = new XMLHttpRequest();
    req.onload = function () {
        var data = JSON.parse(this.response);
        if (req.status >= 200 && req.status < 400) {
            let vals2display = raw ? data : '';
            if (!raw) {
                for (let x in data) {
                    if (data[x] instanceof Object)
                        vals2display += '<h1>' + x.replace('data', '').toUpperCase() + '</h1>';
                    for (let i in data[x]) {
                        if (isNaN(i)) {
                            let el = data[x][i];
                            vals2display += '<b>' + i.toUpperCase() + ': </b>' + br + (Array.isArray(el) ? el.join(br) : el) + br;
                        } else
                            vals2display += data[x][i] + br;
                    }
                }
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

// (app)();

