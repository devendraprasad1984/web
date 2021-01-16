var isLoadVBA = 0;
var activeNewItem = 0;
//var urlContactForm="https://docs.google.com/forms/d/1Tk7GNyQIb73iL7oKK4rEfmeSBkXRBqjZgSOIzlCaD64/viewform?embedded=true";
var urlContactForm = "http://goo.gl/forms/rYzDnwCthw";

$(function () {
    getNoYrs();
    getSlider();
    getPageViews();
    //loadStartUpTw();
    //loadMyTw();
});

function getNoYrs() {
    var dt = new Date();
    var noyrs = "<span style='font-weight: bold; font-size: 18pt;'>" + (dt.getFullYear() - 2006) + "</span>";
    var intCnt = setInterval(function () {
        $("#noYrs").html(noyrs);
        if ($("#noYrs").length) {
            clearInterval(intCnt);
        }
    }, 100);

}

function getSlider() {
    var intSlider = setInterval(function () {
        $("#slider ul").cycle({
            fx: 'fade',
            speed: 'slow',
            timeout: 1000
        });
        if ($("#slider").length)
            clearInterval(intSlider);
    }, 500);
    // 'scrollLeft,scrollDown,scrollRight,scrollUp',blindX, blindY, blindZ,
    // cover, curtainX, curtainY, fade, fadeZoom, growX, growY, none,
    // scrollUp,scrollDown,scrollLeft,scrollRight,scrollHorz,scrollVert,shuffle,slideX,slideY,toss,turnUp,turnDown,turnLeft,turnRight,uncover,ipe
    // ,zoom
}

function loadOnce() {
    setInterval(fadeLogo, 1500);
    setInterval(mydate, 1000);
    loadPageDiv('home');
    $("#myHome").html($("#mainContentPanel").html());
    $("#myVBAList").load("service.php?id=getVBAGalaxy");
}

function setThisTop(obj) {
    $("#tLeft").hide();
    $("#topmenu td").attr("id", "");
    $(obj).attr("id", "current");
}

function setThisSide(obj) {
    $("#side1 td").attr("id", "");
    $("#side2 td").attr("id", "");
    $("#side3 td").attr("id", "");
    $("#side4 td").attr("id", "");
    $(obj).attr("id", "current");
}
function handleSide(obj) {
    $("#aboutus,#services,#contactus").hide();
    $("#tLeft").show();
    $("#" + obj).show();
}

function loadPageDiv(id) {
    var sPage = "Modules/contents.html #" + id;
    var obj = "#mainContentPanel";
    $(obj).html("");
    $(obj).load(sPage);
}
function loadSideMenu(id) {
    var sPage = "Modules/contents.html #" + id;
    var obj = "#tLeft";
    $(obj).load(sPage);
}

function fadeLogo() {
    $("#myLogo").fadeOut("slow").fadeIn("slow");
}

function mydate() {
    var dt = new Date();
    dt = dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
    $("#divDate").html(dt);
}

function setTR(id, h, w) {
    $(id).jqFancyTransitions({
        width: w,
        height: h
    });
}

function loadVBAGalaxy() {
    var obj = "#mainContentPanel";
    $(obj).html("");
    if (isLoadVBA == 0) {
        $("#myVBAList").load("service.php?id=getVBAGalaxy");
        isLoadVBA = 1;
    }
    if (isLoadVBA == 1) {
        $(obj).html($("#myVBAList").html());
    }
}

function loadDashboard() {
    var surl = "./dashboard";
    window.open(surl, '', '');
}


function getPage(pageid) {
    // document.getElementById("divMainContentPanel").innerHTML = "<p
    // class='text'><?php echo page("+pageid+"); ?></p>";
    // alert(document.getElementById("divMainContentPanel").innerHTML);
}

function setText() {
    fade('out');
    showLoad();
}

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

function showLoad() {
    fade('out');
    var e = document.getElementById('divstatus');
    e.style.display = 'block';
}
function hideLoad() {
    var e = document.getElementById('divstatus');
    e.style.display = 'none';
    fade('in');
}
function hide(id) {
    var e = document.getElementById(id);
    e.style.display = 'none';
}

function DisplayContents(div, div1) {
    // var w = window.open();
    var w = myWin = window
            .open(
                    "",
                    null,
                    "location=0,toolbar=0,menubar=0,scrollbars=1,left=30px,top=40px,height=400px,width=400px");
    var html = $(div).html();
    if (div1 != null) {
        html = html + "\n" + $(div1).html();
    }
    w.document
            .writeln('<link href="css/mainCSS.css" rel="stylesheet" type="text/css" />');
    html.replace("read more +", " ");
    w.document.writeln(html);
    scrolllock();
}

function makeTabContentsVisibleFalse() {
    var tab = document.getElementById("tabcontents");
    var items = tab.getElementsByTagName("div");
    for (var i = 0; i < items.length; ++i) {
        // do something with items[i], which is a <li> element
        items[i].style.display = 'none';
    }
}

function loopFormGetValues(id) {
    var strValues = $(id).serialize();
    strValues = "&" + strValues;
    return strValues;
}

function gotoPage(page) {
    location.href = page;
}

// Page Dynamic URIs
function getEmailQueryURI(id) {
    var sPage = "service.php?mail=cb" + loopFormGetValues(id);
    $("mail").html("sending mail...");
    $("#mail").load(sPage);
    // $("#txtemail,#txtmsg").val("");
}

function getContactEmailQueryURI(id) {
    var sPage = "service.php?mail=mail_1" + loopFormGetValues(id);
    $("#mail_1").html("plz wait while we send your query...");
    $("#mail_1").load(sPage);
    // $("#tname,#temail,#tmob,#tsub,#tmsg").val("");
}

function clearTimeoutHtml(id, tm) {
    setTimeout(function () {
        $(id).html("");
    }, tm);
}
function clearTimeoutVal(id, tm) {
    setTimeout(function () {
        $(id).val("");
    }, tm);
}

function fade(type) {
    if (type == 'out')
        document.getElementById("mainContentPanel").style.opacity = 0.2;
    if (type == 'in')
        document.getElementById("mainContentPanel").style.opacity = 1;
}

function loadPage(obj, page) {
    var sPage = "Modules/" + page + ".html";
    $(obj).load(sPage);
}

function show(id) {
    var e = document.getElementById(id);
    e.style.display = 'block';
}


function getBaseUrl() {
    // set the variables depending upon prod or local settings
    if (document.URL.indexOf("localhost") < 0) {
        return "http://54.213.81.190/Dropbox/serverDeploy/dmonrestapi/";
    } else {
        return "http://localhost/dmonrestapi/";
    }
}

function LoadRatingFromServer() {
    var sHTML = "";
    sHTML += "<table border=0>";
    sHTML += "<tr>";
    sHTML += "<td width=70%><input type='text' id='tName' style='width:200px;' placeholder='Type your NAME here...' /> <input type='text' id='tCom' style='width:600px;' placeholder='Type your COMMENTS here...' /></td>";
    sHTML += "<td width=15%><p id='istar' class='hide'></p>";
    sHTML += "<div class='rating'><span id='star1' onclick='sethover(1)'>&#9734;</span><span" +
            " id='star2' onclick='sethover(2)'>&#9734;</span><span" +
            " id='star3' onclick='sethover(3)'>&#9734;</span><span" +
            " id='star4' onclick='sethover(4)'>&#9734;</span><span" +
            " id='star5' onclick='sethover(5)'>&#9734;</span></div>";
    sHTML += "</td>";
    sHTML += "<td width=15%><input type='button' id='bSaveComment' value='Save' onClick='saveAndGetComment();'/></td>";
    sHTML += "</tr>";
    sHTML += "<tr><td colspan=3><input type='text' id='tMobile' style='width:300px;' placeholder='Leave your mobile number with us' />" +
            " <input type='text' id='tMobile' style='width:600px;' placeholder='Short Message' />" +
            " <input type='button' id='bLeaveMobileNumber' value='Send' onClick='LeaveMobileNumber();'/></td></tr>";
    sHTML += "<tr><td colspan=3><p id='lStatus' style='color:red;'></p></td></tr>";
    sHTML += "<tr><td colspan=3 id='tabRating'></td></tr>";
    sHTML += "</table>";
    $("#idRating").html(sHTML);
    getRatingFromServer();
}

function saveAndGetComment() {
    // save the comments to a file using php and load the file recursively to
    if ($("#tCom").val() == "" || $("#tName").val() == "") {
        $("#lStatus").html("please input your name and comments");
        return;
    }
    var sUrl = getBaseUrl() + "sonicageindia/?id=saveRating";
    var dataArr = [];
    var dt = new Date();
    dataArr.push({
        comment: "@" + $("#tName").val() + " - " + $("#tCom").val()
        , rating: $("#istar").html()
        , date: dt.toUTCString()
    }
    );

    // $.post(sUrl,{arr : dataArr},function(res){
    // $("#lStatus").html(res);
    // });
    // return;
    $.post(sUrl, {arr: dataArr}, function (res, st) {
        var msg = res.jsonArr["msg"];
        var err = res.jsonArr["err"];
        if (err != "")
            $("#lStatus").html(err);
        else
            $("#lStatus").html(msg);
        getRatingFromServer();
        // $("#lStatus").html(res.jsonArr["data"]);
    });
    resetRating();
    setTimeout(function () {
        $("#lStatus").html("");
    }, 1500);
}

function getRatingFromServer() {
    $("#tabRating").html("Please wait...");
    var sData = "<table class='commentTable' border=1>";
    sData += "<th>Comments/Feedback</th><th>Rating</th><th>Updated On</th>"
    // display all comments
    var sUrl = getBaseUrl() + "sonicageindia/?id=getRating";
    // $("#tabRating").html(sUrl);
    $.get(sUrl, function (data) {
        sData += data;
        sData += "</table>"
        $("#tabRating").html(sData);
    });
}

function resetRating() {
    $("#tName").val("");
    $("#tCom").val("");
    $("#istar").html("");
    for (var i = 1; i <= 5; i++) {
        $("#star" + i).css({color: "#23527c"});
    }
}

function sethover(icnt) {
    var txtStar = "<span style='color:red;'>&#9734;</span>";
    var tAllStar = "";
    for (var i = 1; i <= 5; i++) {
        $("#star" + i).css({color: "#23527c"});
    }
    for (var i = 0; i < icnt; i++) {
        tAllStar += txtStar;
    }
    for (var i = 1; i <= icnt; i++) {
        $("#star" + i).css({color: "red"});
    }

    $("#istar").html(tAllStar);
}
function LeaveMobileNumber() {
    $("#lStatus").html("Thanks! We will call you back");
    $("#tMobile").val("");
}


function getPageViews() {
    // using ajax fetch the json object via url and display the result
    var sUrl = getBaseUrl() + "sonicageindia/?id=getPageViews";
    $.getJSON(sUrl, function (jsonData) {
        var cntr = jsonData.jsonArr["data"];
        $("#idPageViews").html(cntr); //this would be total page views so far
    });
}

// function loadContactForm(){
//     // var iFrm=setInterval(function () {
//     //     alert($("#gContactForm").length);
//     //     $("#gContactForm").load(urlContactForm);
//     //     if($("#gContactForm").length){
//     //         alert($("#gContactForm").html());
//     //         clearInterval(iFrm);
//     //     }
//     // }, 500);
//     $("#gContactForm").load(urlContactForm);

// }

function loadStartUpTw() {
    if (document.URL.indexOf("localhost") < 0) {
        var elm = "<a class=\"twitter-timeline\" href=\"https://twitter.com/hashtag/StartupIndia\" data-widget-id=\"688612655385329664\">#StartupIndia Tweets</a>";
        elm += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>";
        $("#twStartUp").html(elm);
    }
}
function loadMyTw() {
    if (document.URL.indexOf("localhost") < 0) {
        var elm = "<a class=\"twitter-timeline\" href=\"https://twitter.com/devendraprasad1\" data-widget-id=\"688616049659392000\">Tweets by @devendraprasad1</a>";
        elm += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>";
        $("#twDp").html(elm);
    }
}

function saveContact(em) {
    var btnSave = "#" + em.id;
    $(btnSave).html("Please Wait, while we save your records...");
    if ($("#tName").val() == "" || $("#tEmail").val() == "" || $("#tMob").val() == "" || $("#tSub").val() == "" || $("#tMsg").val() == "") {
        $(btnSave).html("please fill field(s)");
        setTimeout(function () {
            $(btnSave).html("Send");
        }, 3000);

        return;
    }
    var sUrl = getBaseUrl() + "sonicageindia/?id=saveContact";
    var dataArr = [];
    dataArr.push({
        name: $("#tName").val()
        , email: $("#tEmail").val()
        , mobile: $("#tMob").val()
        , subject: $("#tSub").val()
        , query: $("#tMsg").val()
    }
    );

    $.post(sUrl, {arr: dataArr}, function (res, st) {
        var msg = res.jsonArr["msg"];
        var err = res.jsonArr["err"];
        if (err != "")
            $(btnSave).html(err);
        else
            $(btnSave).html(msg);
    });

    setTimeout(function () {
        $(btnSave).html("Send");
        resetContact();
    }, 3000);
}

function resetContact() {
    $("#tName").val("");
    $("#tEmail").val("");
    $("#tMob").val("");
    $("#tSub").val("");
    $("#tMsg").val("");
}

function getContactFromServer() {
    var tAdm = $("#tContactAdmin").val();
    if (tAdm == "6200") {
        sData = $("#tabContact").load("Modules/contents.html #getDataForTest");
        return;
    }
    if (tAdm == "" || tAdm != "sonicAdmin") {
        return;
    }
    $("#tabContact").html("Please wait...");
    var sData = "<table class='commentTable' border=1>";
    sData += "<th>Name</th><th>Email</th><th>Mobile</th><th>Subject</th><th>Msg</th><th>Sent On</th>"
    var flt = $("#tcontactFilter").val();
    var sUrl = getBaseUrl() + "sonicageindia/?id=getContact&filter=" + flt;
    $.get(sUrl, function (data) {
        sData += data;
        sData += "</table>"
        $("#tabContact").html(sData);
    });
}

function setAdminEnterKey() {
    if (event.keyCode == 13 || event.which == 13)
        getContactFromServer();
}
