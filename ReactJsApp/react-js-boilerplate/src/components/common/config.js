import {getLocalStore} from "./api";
import getEnv from "./env";

const appkey = 'cex'
const optCommon = {
    progressbar: 'top'
    , duration: 1200
    , width: 300
    , margin: 10
    , unfocusduration: 1200
}
const optPass = {
    ...optCommon
    , backgroundcolor: "mediumseagreen"
}
const optFail = {
    ...optCommon
    , backgroundcolor: "#f2dbf8"
}

const env = getEnv()
const urls = {
    local: "http://127.0.0.1:8000",
    dev: "https://cex-backend-api-dev.edi02-apps.dev-pcf.lb4.rbsgrp.net",
    uat: "https://cex-backend-api-dev.edi02-apps.dev-pcf.lb4.rbsgrp.net",
    prod: "https://cex-backend-api-dev.edi02-apps.dev-pcf.lb4.rbsgrp.net",
}
const uriPrefix = urls[env]
const actionsPrefix = uriPrefix + '/actions/'
const moodyPrefix = uriPrefix + '/moodys_api/api/'
console.log('env', env, uriPrefix)


export const config = {
    endpoints: {
        uploaderEndpoint: uriPrefix + 'upload',
        loginSsoEndpoint: actionsPrefix + 'sso',
        testloginSsoEndpoint: actionsPrefix + 'testsso',
        authTokenEndpoint: actionsPrefix + 'token',
        downloadEndpoint: actionsPrefix + 'download',
        ingestEndpoint: actionsPrefix + 'ingest',
        viewScenEndpoint: actionsPrefix + 'view_scenario',
        projectBuildEndpoint: actionsPrefix + 'build_project',
        cexmetaEndpoint: moodyPrefix + 'cex_meta'
    },
    enum: {
        appkey
        , cex_app_token_key: 'cex_app_token_key'
    },
    urls: {
        home: '/',
    },
    colors: {}
    , goto: (url) => {
        window.location.href = url
    },
    getDateDiff: (dt1, dt2) => {
        const date1 = new Date(dt1);
        const date2 = new Date(dt2);
        const time = Math.abs(date2 - date1);
        const days = Math.ceil(time / (1000 * 60 * 60 * 24));
        return {days, time}
    },
    getDate: () => {
        let dt = new Date()
        return dt.toISOString().split('T')[0]
    },
    msgok: (msg) => window.vt.show('Notification', msg, optPass),
    msgfail: (msg) => window.vt.show('Notification', msg, optFail),
    loginCheck: (callback) => {
        let item = getLocalStore(appkey)
        // console.log(appkey, item)
        if (item === undefined || item === null) callback(false)
        let {loggedin, timeout} = item || {loggedin: 0, timeout: new Date()}
        let {days} = config.getDateDiff(config.getDate(), timeout)
        if (days <= 0) callback(false)
        callback(loggedin === 1 ? true : false, item)
    },
    deepCopy: data => JSON.parse(JSON.stringify(data))
}


export const generateCSV = (rows) => {
    let delim = ',';
    let csvContent = rows.map(e => Object.values(e).join(delim)).join("\n");
    //console.log('data', rows, csvContent)
    var blob = new Blob([csvContent], {
        type: "application/csv;charset=utf-8;"
    });
    let fileName = 'download.csv';
    // FOR OTHER BROWSERS
    var link = document.createElement("a");
    var csvUrl = URL.createObjectURL(blob);
    link.href = csvUrl;
    link.target = '_blank';
    link.style = "visibility:hidden";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}