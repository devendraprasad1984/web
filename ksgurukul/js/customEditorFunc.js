// $("#idFullEditor").load("full_editor.html")
// var dataInHtmlString = $("#txtEditor .fr-element p").html()


var hide = "hide"
var show = "show"
var bgColor = "bg-white"
var textColor = "text-dark"
var successColor = "btn-success"
var darkColor = "btn-dark " + bgColor + " " + textColor
var guidGen;

// var editorElem=$("#txtEditor").data('editor');

function saveData() {
    if (checkSession() == 0) {
        logoutControl()
        return
    }

    if ($("#idAdminPanel select").prop('selectedIndex') == 0) return

    // console.log( $("#idAdminPanel select").find(":selected").text(), $("#idAdminPanel select").find(":selected").val())
    var tag = $("#idAdminPanel select").find(":selected").val()
    tag = tag.substr(tag.indexOf("=") + 1)
    // if (tag.indexOf("//") <= -1)
    //     tag = tag.substr(0, tag.lastIndexOf("/")) + "/" + $("#idTag").val() + ".txt"
    // else
    if (tag.indexOf(".txt") <= -1)
        tag = tag + "/" + $("#idTag").val() + ".txt"
    var dataInHtmlString = $("#txtEditor").data('editor').html()
    sParam = {tag: tag, data: dataInHtmlString}
    // console.log($.param(sParam))
    $.ajax({
        type: "POST",
        url: '../services/ServiceDetails.php?saveData=1&jwt='+getToken()
        , data: $.param(sParam)
        , success: function (res) {
            // console.log(res)
            toastr.success("data save successfully, please refresh application")
            $("#statusMessage").html(res)
            // resetData()
            if (res.indexOf("err") != -1) {
                console.log("error", res)
            }
        }
        , error: function (err) {
            toastr.error("there is some save error, please check log")
            console.log("save error", err)
        }
        , complete: function (res) {
            $("#statusMessage").html(res)
        }
    });
}

function resetData() {
    if (checkSession() == 0) {
        logoutControl()
        return
    }

    $("#txtEditor").data('editor').html("")
    $("#idPanel input").val("");
    $("#idPanel textarea").val("");
    setTimeout(function () {
        $("#statusMessage").html("")
    }, 10000)
}

function deleteData() {
    if (checkSession() == 0) {
        logoutControl()
        return
    }

    if ($("#idAdminPanel select").prop('selectedIndex') == 0) return

    var deleteURI = $("#idAdminPanel select").find(':selected').val()
    var deleteText = $("#idAdminPanel select").find(':selected').text()
    var deleteFileName = deleteURI.substr(deleteURI.indexOf("=") + 1)
    if (deleteText.substr(0, 1) == "*") {
        var sParam = {fileDelete: deleteFileName}
        var url = "../services/ServiceDetails.php?jwt="+getToken()+"&" + $.param(sParam)
        $.get(url, function (res) {
            $("#statusMessage").html("please wait...")
        }).success(function (res) {
            toastr.success(res)
            $("#statusMessage").html(res)
        })
        refresh(event)
    } else {
        toastr.warning("cannot delete parent information tree")
    }
}

function getToken(){
    return sessionStorage.guid;
}

function checkSession() {
    // $.get("../services/ServiceDetails.php?sessionCheck=1", function (res) {
    //     return res.trim();
    // })
    // console.log("logged in session value: " + sessionStorage.guid)
    if (sessionStorage.guid == "" || typeof sessionStorage.guid == 'undefined') {
        return 0
    }
    else {
        $("#idSession").html("session key: "+sessionStorage.guid.substr(0,40))
        return 1
    }

}

function refresh(e) {
    if (checkSession() == 0) {
        logoutControl()
        return
    }
    var searchString = $.param({"search": $("#idSearch").val()})
    $("#idAdminPanel").load("../services/ServiceDetails.php?jwt="+getToken()+"&getDataFile=data&getType=option&toload=txtEditor&search=" + $("#idSearch").val())
    // toastr.info("refreshed successfully")
    resetData()
    e.preventDefault()
}

function manageSlider() {
    if (checkSession() == 0) {
        logoutControl()
        return
    }
    $.get("../services/ServiceDetails.php?manageSlider=1&jwt="+getToken(), function (res) {
        var newVal = ""
        newVal += "<div class='row'><div class='col-lg-10'><iframe id='idFrameForForm' name='idFrameForForm' class='btn btn-light'></iframe></div>" +
            "<div class='col-lg-2'><span onclick='closeNav()' class='btn btn-danger'>Close</span></div></div>"
        newVal += "<form id='sliderForm' name='sliderForm' target='idFrameForForm' action='../services/ServiceDetails.php?manageSlider=add' method='post' enctype='multipart/form-data'>" +
            "<div class='row'>"+
            "<div class='col-lg-10'><input name='file2upload' type='file' class='btn btn-light' placeholder='choose new slider image' /> </div>" +
            "<div class='col-lg-2'><input type='submit' class='btn btn-success' value='Save' /></div>" +
            "</div></form>"
        newVal += "<div>"
        var cnt = 0
        $.each(res.split(";"), function (i, v) {
            cnt += 1
            vslideId = "vslideId" + cnt;
            filename=v.substr(v.lastIndexOf("/")+1)
            newVal += "<div id='mainRow" + vslideId + "' class='row'><div id='" + vslideId + "' class='col-lg-10'><img src='" + v + "' class='imgEdit'></div> <div class='col-lg-2'><span id='span" + vslideId + "' class='btn btn-danger' onclick='deleteSlider(\"" + vslideId + "\",\""+filename+"\")'>[x]</span></div></div>"
        })
        newVal += "</div>"
        $("#tempContainer").html(newVal)
        $("#tempContainer").css({"width": "100%", "display": "block"})
    })
}

function deleteSlider(cur,filename) {
    $("#" + cur).load("../services/ServiceDetails.php?jwt="+getToken()+"&manageSlider=del&filename="+filename, function (res) {
        toastr.info(res)
        $("#mainRow" + cur).html("")
    })
}
function checkLogs() {
    $.get("../services/ServiceDetails.php?logging=1&jwt="+getToken(), function (res) {
        var dt="<span onclick='closeNav()' class='btn btn-danger'>Close</span>"
        dt+="<div  style='height: 600px; overflow: auto'>"+res+"</div>"
        $("#tempContainer").html(dt)
        $("#tempContainer").css({"width": "100%", "display": "block"})
    })
}

// function loadMsg(){
//     $("form").submit(function(e){
//         toastr.success($("#idFrameForForm").html())
//         e.preventDefault()
//     })
// }

// function saveSlider(formId) {
//     var elm = $("#" + formId)
//     var url = elm.attr('action')
//     var formData = new FormData(elm)
//     // var formData = new FormData(this)
//     elm.submit(function (e) {
//             $.ajax({
//                 type: elm.attr('method'),
//                 url: elm.attr('action')
//                 , data: formData
//                 , success: function (res) {
//                     toastr.info(res)
//                 }
//                 ,error:function (res) {
//                     toastr.error(res)
//                     console.log(res)
//                 }
//             });
//             // e.preventDefault();
//             return false
//         }
//     )
// }

function closeNav() {
    $("#tempContainer").html("")
    $("#tempContainer").css({"width": "0%", "display": "none"})
}

$(document).ready(function () {
    // editorElem = $("#txtEditor").data('editor')
    $("#loginContainer").load("../admin/login.html")
    $("#txtEditor").Editor()
    $("#statusMessage").click(function () {
        $("#statusMessage").html("")
    })

    // $("form").submit(function(){
    //     toastr.success($("#idFrameForForm").html())
    //     // e.preventDefault()
    // })

    if (checkSession() == 0) {
        $("#mainContainer").hide()
        $("#loginContainer").show()
        $("#idControls").attr('disabled', true)
    } else {
        $("#loginContainer").hide()
        $("#mainContainer").show()
        $("#idControls").removeAttr('disabled')
        refresh(event)
    }

});

function getServerData(url, div2LoadIn, label) {
    // if ($("#idAdminPanel select").prop('selectedIndex') == 0)
    //     $("#idAdminPanel select").prop('size', 1)
    // console.log(url)
    var selVal = $("#idAdminPanel select").find(":selected").text()
    if (selVal.substr(0, 1) == "*") {
        selVal = selVal.substr(1)
        $("#idTag").val(selVal)
    }
    url+="&jwt="+getToken()
    $.get(url, function (res) {
        // toastr.info("please wait...")
    }).success(function (res) {
        var newData = ""
        if (typeof label != 'undefined')
            newData = "<div class='btn " + successColor + " font-weight-bold' style='width: 100%; font-size: 11pt;'>" + label + "</div>";
        // newData += "<div class='box'>" + res + "</div>";
        newData += "<div>" + res + "</div>";
        $("#" + div2LoadIn).data('editor').html(newData);
    })
}

function loginControl() {
    var sParam = {
        "username": $("#idLogin").val()
        , "password": $("#idPassword").val()
    }
    guidGen = guid()
    $.ajax({
        type: "POST",
        url: '../services/ServiceDetails.php?login=1'
        , data: $.param(sParam)
        , success: function (res) {
            res=$.parseJSON(res)
            // console.log(res,$.parseJSON(res))
            if (res.isLoggedIn == 1) {
                $("#idSession").html("session: " + guidGen)
                sessionStorage.guid = res.jwt
                toastr.success("Welcome, " + $("#idLogin").val())
                $("#idLoginContainer input").val("");
                $("#mainContainer").show()
                $("#loginContainer").hide()
                $("#idControls").removeAttr('disabled')
                refresh(event)
            } else {
                toastr.error("invalid username or password, please try again with correct credentials")
                console.log(res)
            }
        }
        , error: function (err) {
            toastr.error("there is some save error, please check log")
            console.log("save error", err)
        }
    })
}

function logoutControl() {
    $.get("../services/ServiceDetails.php?logout=1&jwt="+getToken(), function (res) {
        if (res.trim() == 0) {
            var mainContainer = $("#mainContainer")
            var loginContainer = $("#loginContainer")
            mainContainer.hide()
            loginContainer.show()
            sessionStorage.guid = ""
            $("#idSession").html("")
            $("#idControls").attr('disabled', true)
        }
    })
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


function forgotControl() {
    $("#statusMessage").html("please wait...")
    $.get("../services/ServiceDetails.php?forgotPassword=1&jwt="+getToken(), function () {
    }).success(function (res) {
        if (res.toLowerCase().indexOf("err:") != -1) {
            toastr.error("there is some error")
            $("#statusMessage").html(res)
            console.log(res)
        } else {
            var msg = "msg: " + res
            toastr.success("msg: " + res)
            $("#statusMessage").html(msg)
            // console.log(res)
        }
    }).error(function (err) {
        toastr.error("there has been some error")
        $("#statusMessage").html(err)
        console.log(res)
    });
}