app = angular.module("myAjs", []);
var isChartLoadOnce = false
var isLoadedGoogleCharts = false
var timerId;
var timerValue = 2000;
var views = ["view1", "vew2", "view3", "view4", "view6"]
var defaultView = "view1";
// var defaultView = views [Math.round(Math.random() * views.length)] ||"view6"
// alert("current selected view is " + defaultView)
var viewsToHaveCharts = ["view1", "view6"];
// var colorsArray = ["bg-success", "bg-info", "bg-aqua", "bg-orange", "bg-danger", "bg-warning", "bg-primary", "bg-blue", "bg-fuchsia"]
var colorsArray = ["bg-success", "bg-info", "bg-dark", "bg-light"]
var loadJsElemForGoogleCharts = "<script src='js/loader.js'></script>"
var view3CircleJs = "<link rel='stylesheet' href='css/view3.css'><script src='js/view3.js'></script>"
var objUrlLoaded = {}
var cntr = 0

var hide = "hide"
var show = "show"
var bgColor = "bg-dark"
var textColor = bgColor+" text-white"
var successColor = "btn btn-info text-white"
var backColor="#17a2b8"; //css: color-12
 // var darkColor = successColor+" " + textColor
var changeBtnDisplay=false

$(function () {
    loadOnView4()
    setBtnDisplay();
});


function setBtnDisplay(){
    $(".btn").addClass(successColor)
    $("#timelineBar .btn").removeClass(successColor)
    if(!changeBtnDisplay){
        $("#mobiMenu, #topColors").hide()
    }
   if(changeBtnDisplay){
       $("#mobiMenu, #topColors").show()
       var backColor="lightgray";
       $("#topColors a").on('click', function () {
           var curAnc = $(this)
           backColor = curAnc.css("background-color")
           // $("#idcolor").css({"background-color":backColor})
           $("#idcolor").html(backColor)
           xset()
       })
       xset()
   }
    function xset(){
        backColor=$("#idcolor").html()||backColor
        // $(".btn").css({"font-size":"12pt"})
        $(".badge,#idExperienceController").css({"font-size":"12px"})
        if(backColor===""||backColor==="#286090"){
            $(".btn").css({"background-color": backColor, "color": "black"})
        }else{
            $(".btn").css({"background-color": backColor, "color": "white"})
        }
        $("h1,h2,h3").css({"color": backColor})
        $("#idExperienceController .badge").css({"background-color": backColor, "color": "white"})
        $("div.progress-bar").removeClass(bgColor).css({"background-color": backColor, "color": "white"})
    }
}

function loadOnView4() {
    if (defaultView == "view4") {
        //slideNext("view4MainSlide")
    }

}

var loadScript = function (src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body').appendChild(tag);
}


var createReactMenu = function (curObj) {
    $("#" + curObj.id).contextMenu([
        {
            name: 'View React Design',
            fun: function () {
                // var scope = angular.element($('#idMainContainer')).scope();
                // scope.displayMyViews('react','ReactJS');
                window.open("react.html", '_blank');
            }
        },
        {
            name: 'View GitHub',
            fun: function () {
                var gitUrl = "https://github.com/devendraprasad1984/PythonAndNodeSamples/tree/master/react";
                window.open(gitUrl, '_blank');
            }
        }
    ], {
        'displayAround': 'trigger',
        horAdjust: '-10px'
    });
}

var openJavaGitHubPage = function () {
    var gitUrl = "https://github.com/devendraprasad1984/java/tree/master/src";
    window.open(gitUrl, '_blank');
}

 var openPythonGitHubPage = function () {
     var gitUrl = "https://github.com/devendraprasad1984/PythonAndNodeSamples/tree/master/python";
     window.open(gitUrl, '_blank');
 }


var createJavaMenu = function (curObj) {
    $("#" + curObj.id).contextMenu([
        {
            name: 'View GitHub',
            fun: function () {
                var gitUrl = "https://github.com/devendraprasad1984/java/tree/master/src";
                window.open(gitUrl, '_blank');
            }
        }
    ], {
        'displayAround': 'trigger',
        horAdjust: '-10px'
    });
}

var loadDefaultChart = function (curView) {
    curView = curView.replace('.html', '');
    // console.log(curView)
    if (viewsToHaveCharts.indexOf(curView) >= 0) {
        setTimeout(function () {
            var scope = angular.element($('#myCharts')).scope();
            scope.drawPieChart();
        }, 5000);
    }
}

app.controller("runX", function ($scope, $rootScope, $http) {
    $scope.url = "TEST URL"
    $scope.slideId = "dummyId"
    $scope.objCount = 0
    $scope.objUrlLoaded = {}
    $scope.xdata = "dummy"
    $scope.curUrl = ""
    $scope.curTitle = "default"

    $scope.bgTagColor = colorsArray[Math.round(Math.random() * colorsArray.length)]

    // console.log(attr)
    $scope.startSlider = function (sId) {
        $scope.hideSliderElem(sId)
        timerId = setInterval(function () {
            $scope.slideNext(sId)
        }(sId), timerValue)
    }

    // $scope.$watch("objCount", function (nv,ov) {
    //     $scope.objCount = nv
    //     console.log("watch counter",ov,nv, $scope.objCount)
    // },true)

    $scope.$on("objCounter", function (e, cnt) {
        $scope.objCount = cnt
        // console.log("on counter", $scope.objCount)
        e.stopPropagation()
    })

    $scope.hideSliderElem = function (sId) {
        // console.log("hideElem",sId)
        // $("#" + sId + " > div:gt(0)").hide();
        // $("#" + sId + " > iframe:gt(0)").hide();
        // $("#" + sId + " > object:gt(0)").hide();
        hideSliderElem(sId)
    }

    $scope.getHtmlContents = function (url) {
        $scope.xdata = "default..."
        $http.get(url).then(function (res) {
            $scope.xdata = res.data
        });
        return $scope.xdata
    }

    $scope.slideNext = function (sId) {
        $scope.hideSliderElem(sId)
        $('#' + sId + ' > div:first').show().next().end().appendTo('#' + sId);
    }

    $scope.slidePrev = function (sId) {
        $scope.hideSliderElem(sId)
        $('#' + sId + ' >div:last-child').hide().prev().show().end().prependTo("#" + sId)
    }

    // $.extend($scope.objUrlLoaded,{url:attrs.url,isLoaded:true})
    // console.log($scope.objUrlLoaded)
});

app.directive("runTimeTemplates", function () {
    return {
        restrict: 'E',
        scope: true,
        controller: 'runX',
        controllerAs: 'x',
        templateUrl: function (elm, attr) {
            // setBtnDisplay();
            return attr.url;
        },
        bindToController: true,
        link: function (scope, element, attrs, runXCtrl) {
            // $.extend(scope.objUrlLoaded, {url: attrs.url, isLoaded: true, contents: scope.getHtmlContents(attrs.url)})
            if (attrs.slideid != undefined) {
                runXCtrl.slideId = attrs.slideid
                scope.hideSliderElem(runXCtrl.slideId)
                // setBtnDisplay()
                // $rootScope.$emit('sliderNextFromNg',$scope.slideNext(runXCtrl.slideId))
                // $rootScope.$broadcast('sliderNextFromNg-bgk',$scope.slideNext(runXCtrl.slideId))
            }
        }
    }
});

app.directive("runTimeOnClickLoad", function () {
    return {
        restrict: 'E',
        scope: {
            url: '@' //isolated scope
            , title: '@'
            , id: '@'
        },
        replace: false,
        bindToController: true,
        transclude: true,
        template: [
            "<span class='btn text-white' ng-click='getHtmlContents(id,url,title)'>{{title}}</span>"
        ].join("")
        // , compile: function (tElem,tAttr) {
        //     return function ($scope) {
        //         $scope.curUrl = tAttr.url
        //         $scope.curTitle = tAttr.title
        //     }
        // }
        , controller: function ($scope, $http, $compile) {
            $scope.getHtmlContents = function (cur, url,title) {
                // setBtnDisplay()
                // $("#view7Menu span.btn").removeClass(darkColor).addClass(successColor)
                // $('#'+cur +" span btn").removeClass(successColor).addClass(darkColor)

                //implement simple cache for speed and no network trip
                $http.get(url).then(function (res) {
                    $scope.xdata = res.data
                    $.extend(objUrlLoaded, {url: url, isLoaded: true, contents: res.data})
                    var elm = $("#idRightHtmlContent")
                    elm.html($scope.xdata)
                    elm.prepend("<div class='h1 "+textColor+"'>"+title+"</div>")
                    $compile(elm.contents())($scope);
                });
                // console.log("cache",objUrlLoaded)
            }
        },
        controllerAs: 'x'
        , link: function ($scope, element, attrs) {
            $scope.url = attrs.url
            $scope.id = attrs.id
            $scope.title = attrs.title
            // $scope.xdata=$scope.getHtmlContents($scope.url)
        }
    }
});
// $http, $templateCache, $compile
app.directive("mainContentPanel", function ($http, $templateCache, $compile) {
    var url;
    var linker = function (scope, elem) {
        scope.$watch('viewName', function () {
            console.log(scope.viewName);
            url = (scope.viewName || defaultView);
            if (url.indexOf('.html') < 0) {
                url += ".html";
            }
            $http.get(url).then(function (results) {
                elem.html(results.data);
                $compile(elem.contents())(scope);
            });
        }, true);
    };
    return {
        restrict: 'EA',
        // replace: true,
        controller: 'mainViewController',
        controllerAs: 'vwCtrl',
        scope: {
            curview: "=curView"
        },
        transclude: true,
        // link: linker,
        // templateUrl: vwCtrl.viewName,
        template: 'hello dp - {{myView.myView}} - {{vwCtrl.viewName}}',
        bindToController: true
    }

});

app.controller('mainViewController', function ($scope, $element) {
    $scope.viewName = defaultView + ".html";
    $scope.displayMyViews = function (cur, url, curLabel) {
        // $("#topMenu span.btn").removeClass(darkColor).addClass(successColor)
        // $("#" + cur).removeClass(successColor).addClass(darkColor)
        // var viewLabel = (typeof curObj == "undefined") ? "..." : $(curObj).text();
        $("#idBadgeInfo").html(curLabel);
        if (url == "curr") {
            url = defaultView;
        }
        if (url == "view3") {
            loadView3JS()
        }
        $scope.viewName = url + ".html";

        setBtnDisplay()
        // loadDefaultChart(this.viewName);
        loadOnView4();
    }
});


$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        // escape key maps to keycode `27`
        closeNav();
        clearInterval(timerId);
    }
    if (e.keyCode == 13) {
        // escape key maps to keycode `27`
        startLoad();
    }
});
// $(function () {
//     startLoad();
//     getVisitCounter();
// });
function startLoad() {
    timerId = setInterval(function () {
        changeBg();
    }, 5000);
}

function changeBg() {
    var imgNum = Math.round(1 + Math.random() * 15);
    var imgUrl = "images/cover/" + imgNum + ".jpg";
    $("html").css({
        "background-image": "url(" + imgUrl + ")",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover"
    });
}


app.controller("Summary", function ($scope, $timeout, $http) {
    // setBtnDisplay()
    $scope.setDisplayValues = function (idTag) {
        cleanTags();
        var tagName = "";
        var content = "";
        var imgs = "";
        var counter = 0
        var bgTagColor = colorsArray[Math.round(Math.random() * colorsArray.length)]
        $http.get("resources/projects.json").then(function (res) {
            var data = res.data.experience;
            var images = {};
            for (i = 0; i < data.length; i++) {
                if (data[i].key == idTag) {
                    counter += 1
                    // tagName ="<p style='color:RGB(" +vRed +"," +vGreen +"," +vBlue +");'>" +data[i].name +"</p>";
                    tagName = data[i].name;
                    content = "<p>" + data[i].desc + "</p>";
                    images = data[i].images;
                    imgs += "<div style='margin: 1px; padding: 2px'>";
                    for (j = 0; j < images.length; j++) {
                        imgs += "<div><img src='" + images[j] + "' class='imgs' /></div>";
                    }
                    imgs += "</div>";
                    break;
                }
            }
            // $("#mTag").html("<div class='" + bgTagColor + "'><span style='font-size:20pt;color: white'>" + tagName + "</span><p class='btn btn-danger' style='text-align: right; float: right; display: inline-block'>[X]</p></div>");
            $("#mTag").html("<div class='bg-light'><span style='font-size:20pt;color: black'>" + tagName + "</span><p class='btn btn-danger' style='text-align: right; float: right; display: inline-block'>[X]</p></div>");
            $("#mContent").html(imgs)
            $scope.$emit("objCounter", counter)
        });
        $("#myNav").css({'width': '100%', 'display': 'block'})
        displayRunTimeNav(counter)
        // document.getElementById("myNav").style.width = "100%";
    };
});
app.controller("pageVisits", function ($scope, $http) {
    var visitCounter = 0;
    $http.get("services/counter.php?id=getVisitCounter").then(function (res) {
        // console.log(res.data);
        visitCounter = res.data;
        $scope.pageVisitCounter = visitCounter;
    });
});
app.controller("serverCallLog", function ($scope, $http) {
    var logData = null;
    $http.get("services/server.php?id=getServerLog").then(function (res) {
        // console.log(res.data);
        logData = res.data;
        $scope.serverLog = logData;
    });
});

function displayRunTimeNav(cnt) {
    if (cnt <= 1)
        $("#runTimeTemplateId").css({"display": "none"})
    else
        $("#runTimeTemplateId").css({"display": "block"})
}

// app.config(function($routeProvider) {
//     $routeProvider
//         .when("/home", {
//             templateUrl : "'templates/leftTemplate.html'"
//         })
//         .when("/red", {
//             templateUrl : "'templates/educationTemplate.html'"
//         })
//         .when("/green", {
//             templateUrl : "'templates/experienceTemplate.htm'"
//         })
//         .when("/blue", {
//             templateUrl : "'templates/footerIKnow.htm'"
//         });
// });

app.controller("templatesController", function ($scope, $http) {
    // setBtnDisplay()
    $scope.viewLabel = 'Home';
    $scope.strTemplateUrl = "templates/leftTemplatePlane.html";
    $scope.getTemplates = function (cur,a, b) {
        // setBtnDisplay()
        $scope.viewLabel = a;
        $scope.strTemplateUrl = "templates/" + b + ".html";
        // console.log($scope.viewLabel,$scope.strTemplateUrl)
    }
    // $scope.bgTagColor=colorsArray[$scope.colorValueChange]
    // console.log($scope)
});

app.controller("experienceController", function ($scope, $http) {
    var myStr = "";
    var counter = 0
    var myCurUrl = "resources/projects.json"
    $scope.testVar = 10.0
    $http.get(myCurUrl).then(function (res) {
        // $scope.experienceData = Array.from(res.data);
        $scope.experienceData = res.data.experience;
    });
    // $.getJSON(myCurUrl, function (res) {
    //     $scope.experienceData=res.experience;
    //     // var newObj = res[Object.keys(res)[0]];
    //     // Object.keys(newObj).map(function (key) {
    //     //     counter += 1
    //     //     var xObj = newObj[key];
    //     //     myStr += "<div  class='wrapper container-fluid' style='margin: 2px;padding: 20px'>"
    //     //     myStr += "<div style='width:100%;font-size:12pt;font-weight:bolder' class=" + xObj.bg + ">" + xObj.name + ""
    //     //     myStr += "<div style='float:right;font-size:10pt'><div class='badge badge-danger'>" + xObj.role + "</div></div></div>"
    //     //     myStr += "<div>" + xObj.desc + "</div>"
    //     //     myStr += "<div class='badge badge-warning' style='float:right;font-size:10pt'>" + xObj.tech + "</div></div>"
    //     // });
    //     // $scope.allDataInString=myStr
    //     // console.log($scope.allDataInString)
    // });
});

// angular.element("#myCharts").ready(function () {
//     var scope = angular.element(document.getElementById('#myCharts')).scope();
//     scope.drawPieChart();
// })
// ;

app.controller("googleChartsController", function ($scope, $http, $window) {
    $scope.chartLoaderMsg = "x"
    $scope.setCurLinkActive = function (curElem) {
        $("#myChartElem a").each(function (i, elm) {
            $(elm).removeClass("active");
        });
        $(curElem).addClass("active");
        // console.log(curElem)
    }
    $scope.checkGoogleChartsLoaded = function () {
        if (typeof google == 'undefined') {
            $scope.chartLoaderMsg = isLoadedGoogleCharts == false ? "not loaded" : "please wait...";
            return isLoadedGoogleCharts;
        }
        if (!isLoadedGoogleCharts) {
            $scope.chartLoaderMsg = "please wait...";
            google.charts.load('current', {'packages': ['corechart', 'controls', 'bar', 'map', 'line', 'scatter', 'sankey', 'timeline']});
            google.charts.setOnLoadCallback(function () {
                // $scope.drawPieChart(this)
                $scope.drawToolbar()
            });
            isLoadedGoogleCharts = true
        }
        return isLoadedGoogleCharts
    }
    $scope.chartLoadFinish = function (msg) {
        // console.log(msg)
        $scope.chartLoaderMsg = msg;
    }

    $scope.drawToolbar = function () {
        var components = [
            {
                type: 'igoogle', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA',
                gadget: 'https://www.google.com/ig/modules/pie-chart.xml',
                userprefs: {'3d': 1}
            },
            {type: 'html', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA'},
            {type: 'csv', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA'},
            {
                type: 'htmlcode', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA',
                gadget: 'https://www.google.com/ig/modules/pie-chart.xml',
                userprefs: {'3d': 1},
                style: 'width: 800px; height: 700px; border: 3px solid purple;'
            }
        ];

        var container = document.getElementById('toolbar_div');
        google.visualization.drawToolbar(container, components);
    };

    $scope.drawDashboard = function (curElem) {
        // Create our data table.
        var data = google.visualization.arrayToDataTable([
            ['Name', 'Donuts eaten'],
            ['Michael', 5],
            ['Elisa', 7],
            ['Robert', 3],
            ['John', 2],
            ['Jessica', 6],
            ['Aaron', 1],
            ['Margareth', 8]
        ]);

        var dashboard = new google.visualization.Dashboard(document.getElementById('chart_div'));
        var donutRangeSlider = new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': 'filter_div',
            'options': {
                'filterColumnLabel': 'Donuts eaten'
            }
        });

        var pieChart = new google.visualization.ChartWrapper({
            'chartType': 'PieChart',
            'containerId': 'chart_div',
            'options': {
                'width': 300,
                'height': 300,
                'pieSliceText': 'value',
                'legend': 'right'
            }
        });

        dashboard.bind(donutRangeSlider, pieChart);
        dashboard.draw(data);
    }

    $scope.drawPieChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        var options = {
            'title': 'stats',
            'width': 400,
            'height': 300
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        var msg = "pie loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, options);
    }
    $scope.drawBarChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses', 'Profit'],
            ['2014', 1000, 400, 200],
            ['2015', 1170, 460, 250],
            ['2016', 660, 1120, 300],
            ['2017', 1030, 540, 350]
        ]);

        var options = {
            chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            },
            bars: 'horizontal', // Required for Material Bar Charts.
            hAxis: {format: 'decimal'},
            height: 400,
            colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var chart = new google.charts.Bar(document.getElementById('chart_div'));
        var msg = "bar loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    $scope.drawAreaChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 400],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540]
        ]);

        var options = {
            title: 'Company Performance',
            hAxis: {title: 'Year', titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0},
            height: 300,
            tooltip: {trigger: 'selection'},
            legend: {position: 'top', maxLines: 3}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        var msg = "area loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, options);
        $scope.chartLoaderMsg = "";
    }
    $scope.drawDonutChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = google.visualization.arrayToDataTable([
            ['Language', 'Speakers (in millions)'],
            ['German', 5.85],
            ['French', 1.66],
            ['Italian', 0.316],
            ['Romansh', 0.0791]
        ]);

        var options = {
            title: 'stats',
            pieHole: 0.4,
            pieStartAngle: 100,
            legend: 'none',
            pieSliceText: 'label',
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        $scope.chartLoaderMsg = "";
    }
    $scope.drawMapChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        // var data = google.visualization.arrayToDataTable([
        //     ['Country', 'Population'],
        //     ['China', 'China: 1,363,800,000'],
        //     ['India', 'India: 1,242,620,000'],
        //     ['US', 'US: 317,842,000'],
        //     ['Indonesia', 'Indonesia: 247,424,598'],
        //     ['Brazil', 'Brazil: 201,032,714'],
        //     ['Pakistan', 'Pakistan: 186,134,000'],
        //     ['Nigeria', 'Nigeria: 173,615,000'],
        //     ['Bangladesh', 'Bangladesh: 152,518,015'],
        //     ['Russia', 'Russia: 146,019,512'],
        //     ['Japan', 'Japan: 127,120,000']
        // ]);

        var data = google.visualization.arrayToDataTable([
            ['Lat', 'Long', 'Name'],
            [37.4232, -122.0853, 'Work'],
            [37.4289, -122.1697, 'University'],
            [37.6153, -122.3900, 'Airport'],
            [37.4422, -122.1731, 'Shopping']
        ]);

        var options = {
            showTooltip: true,
            showInfoWindow: true
        };

        var map = new google.visualization.Map(document.getElementById('chart_div'));
        var msg = "map loaded"
        google.visualization.events.addListener(map, 'animationfinish', $scope.chartLoadFinish(msg));
        map.draw(data, options);
        $scope.chartLoaderMsg = "";
    };
    $scope.drawLineChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Day');
        data.addColumn('number', 'Guardians of the Galaxy');
        data.addColumn('number', 'The Avengers');
        data.addColumn('number', 'Transformers: Age of Extinction');

        data.addRows([
            [1, 37.8, 80.8, 41.8],
            [2, 30.9, 69.5, 32.4],
            [3, 25.4, 57, 25.7],
            [4, 11.7, 18.8, 10.5],
            [5, 11.9, 17.6, 10.4],
            [6, 8.8, 13.6, 7.7],
            [7, 7.6, 12.3, 9.6],
            [8, 12.3, 29.2, 10.6],
            [9, 16.9, 42.9, 14.8],
            [10, 12.8, 30.9, 11.6],
            [11, 5.3, 7.9, 4.7],
            [12, 6.6, 8.4, 5.2],
            [13, 4.8, 6.3, 3.6],
            [14, 4.2, 6.2, 3.4]
        ]);

        var options = {
            chart: {
                title: 'Box Office Earnings in First Two Weeks of Opening',
                subtitle: 'in millions of dollars (USD)'
            },
            width: 900,
            height: 500
        };
        var chart = new google.charts.Line(document.getElementById('chart_div'));
        var msg = "line loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, google.charts.Line.convertOptions(options));
        $scope.chartLoaderMsg = "";
    }
    $scope.drawWaterFallChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = google.visualization.arrayToDataTable([
            ['Mon', 28, 28, 38, 38],
            ['Tue', 38, 38, 55, 55],
            ['Wed', 55, 55, 77, 77],
            ['Thu', 77, 77, 66, 66],
            ['Fri', 66, 66, 22, 22]
            // Treat the first row as data.
        ], true);

        var options = {
            legend: 'none',
            bar: {groupWidth: '100%'}, // Remove space between bars.
            candlestick: {
                fallingColor: {strokeWidth: 0, fill: '#a52714'}, // red
                risingColor: {strokeWidth: 0, fill: '#0f9d58'}   // green
            }
        };
        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
        var msg = "waterfall loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, options);
        $scope.chartLoaderMsg = "";
    }
    $scope.drawScatterChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Hours Studied');
        data.addColumn('number', 'Final');

        data.addRows([
            [0, 67], [1, 88], [2, 77],
            [3, 93], [4, 85], [5, 91],
            [6, 71], [7, 78], [8, 93],
            [9, 80], [10, 82], [0, 75],
            [5, 80], [3, 90], [1, 72],
            [5, 75], [6, 68], [7, 98],
            [3, 82], [9, 94], [2, 79],
            [2, 95], [2, 86], [3, 67],
            [4, 60], [2, 80], [6, 92],
            [2, 81], [8, 79], [9, 83],
            [3, 75], [1, 80], [3, 71],
            [3, 89], [4, 92], [5, 85],
            [6, 92], [7, 78], [6, 95],
            [3, 81], [0, 64], [4, 85],
            [2, 83], [3, 96], [4, 77],
            [5, 89], [4, 89], [7, 84],
            [4, 92], [9, 98]
        ]);

        var options = {
            width: 800,
            height: 500,
            chart: {
                title: 'Students\' Final Grades',
                subtitle: 'based on hours studied'
            },
            hAxis: {title: 'Hours Studied'},
            vAxis: {title: 'Grade'}
        };
        var chart = new google.charts.Scatter(document.getElementById('chart_div'));
        var msg = "scatter loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, google.charts.Scatter.convertOptions(options));
        $scope.chartLoaderMsg = "";
    }
    $scope.drawSankeyChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addRows([
            ['Brazil', 'Portugal', 5],
            ['Brazil', 'France', 1],
            ['Brazil', 'Spain', 1],
            ['Brazil', 'England', 1],
            ['Canada', 'Portugal', 1],
            ['Canada', 'France', 5],
            ['Canada', 'England', 1],
            ['Mexico', 'Portugal', 1],
            ['Mexico', 'France', 1],
            ['Mexico', 'Spain', 5],
            ['Mexico', 'England', 1],
            ['USA', 'Portugal', 1],
            ['USA', 'France', 1],
            ['USA', 'Spain', 1],
            ['USA', 'England', 5],
            ['Portugal', 'Angola', 2],
            ['Portugal', 'Senegal', 1],
            ['Portugal', 'Morocco', 1],
            ['Portugal', 'South Africa', 3],
            ['France', 'Angola', 1],
            ['France', 'Senegal', 3],
            ['France', 'Mali', 3],
            ['France', 'Morocco', 3],
            ['France', 'South Africa', 1],
            ['Spain', 'Senegal', 1],
            ['Spain', 'Morocco', 3],
            ['Spain', 'South Africa', 1],
            ['England', 'Angola', 1],
            ['England', 'Senegal', 1],
            ['England', 'Morocco', 2],
            ['England', 'South Africa', 7],
            ['South Africa', 'China', 5],
            ['South Africa', 'India', 1],
            ['South Africa', 'Japan', 3],
            ['Angola', 'China', 5],
            ['Angola', 'India', 1],
            ['Angola', 'Japan', 3],
            ['Senegal', 'China', 5],
            ['Senegal', 'India', 1],
            ['Senegal', 'Japan', 3],
            ['Mali', 'China', 5],
            ['Mali', 'India', 1],
            ['Mali', 'Japan', 3],
            ['Morocco', 'China', 5],
            ['Morocco', 'India', 1],
            ['Morocco', 'Japan', 3]
        ]);

        // Set chart options
        var options = {
            width: 600,
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById('chart_div'));
        var msg = "sankey loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, options);
        $scope.chartLoaderMsg = "";
    }
    $scope.drawTimelineChart = function (curElem) {
        if (!$scope.checkGoogleChartsLoaded()) return
        this.setCurLinkActive(curElem)
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Team');
        data.addColumn('date', 'Season Start Date');
        data.addColumn('date', 'Season End Date');

        data.addRows([
            ['Baltimore Ravens', new Date(2000, 8, 5), new Date(2001, 1, 5)],
            ['New England Patriots', new Date(2001, 8, 5), new Date(2002, 1, 5)],
            ['Tampa Bay Buccaneers', new Date(2002, 8, 5), new Date(2003, 1, 5)],
            ['New England Patriots', new Date(2003, 8, 5), new Date(2004, 1, 5)],
            ['New England Patriots', new Date(2004, 8, 5), new Date(2005, 1, 5)],
            ['Pittsburgh Steelers', new Date(2005, 8, 5), new Date(2006, 1, 5)],
            ['Indianapolis Colts', new Date(2006, 8, 5), new Date(2007, 1, 5)],
            ['New York Giants', new Date(2007, 8, 5), new Date(2008, 1, 5)],
            ['Pittsburgh Steelers', new Date(2008, 8, 5), new Date(2009, 1, 5)],
            ['New Orleans Saints', new Date(2009, 8, 5), new Date(2010, 1, 5)],
            ['Green Bay Packers', new Date(2010, 8, 5), new Date(2011, 1, 5)],
            ['New York Giants', new Date(2011, 8, 5), new Date(2012, 1, 5)],
            ['Baltimore Ravens', new Date(2012, 8, 5), new Date(2013, 1, 5)],
            ['Seattle Seahawks', new Date(2013, 8, 5), new Date(2014, 1, 5)],
        ]);

        var options = {
            height: 450,
            timeline: {
                groupByRowLabel: true
            }
        };
        var chart = new google.visualization.Timeline(document.getElementById('chart_div'));
        var msg = "timeline loaded"
        google.visualization.events.addListener(chart, 'animationfinish', $scope.chartLoadFinish(msg));
        chart.draw(data, options);
        $scope.chartLoaderMsg = "";
    }
});
//
// app.service("sharedDataService",function () {
//     var bgTagColor=colorsArray[Math.round(Math.random() * colorsArray.length)]
//     return{
//         getBgColor:function(){
//             return bgTagColor
//         },
//         setBgColor:function(value){
//             bgTagColor=value
//         }
//     }
// })

app.controller("ITSummary", function ($scope, $http) {
    // $scope.setScopeVariable = function (variable, value) {
    //     $scope[variable] = value;
    // }

    var uri = 'resources/IT.json';// var host=location.hostname;
    // $scope.$on('colorValueChange', function (event, colorValue) {
    //     $scope.bgTagColor = colorValue
    //     console.log("from on", colorValue)
    //     event.stopPropagation()
    // });
    //
    // $scope.$watch('bgTagColor', function (newColorValue, oldValue) {
    //     if (typeof (newValue) !== 'undefined') {
    //         $scope.bgTagColor = newColorValue;
    //         console.log("from watch", newColorValue)
    //     }
    // }, true);

    // $scope.content = ""
    // $scope.bgTagColor = colorsArray[Math.round(Math.random() * colorsArray.length)]
    $scope.tagName = "[]"
    $http.get(uri).then(function (res) {
        $scope.ratingData = res.data.skills;
        setBtnDisplay()
    });
    $scope.setHref = function (id, url, gotoUrl, mTag) {
        $scope.bgTagColor = colorsArray[Math.round(Math.random() * colorsArray.length)]
        $scope.tagName = mTag
        // sharedDataService.setBgColor(bgTagColor)
        // $scope.$emit('colorValueChange', bgTagColor);
        var osName = navigator.platform.toLowerCase();
        var xHeight = screen.height + "px";
        var contentData = ""
        if (url.indexOf("http") != -1 || url.indexOf(".pdf") != -1 || url.indexOf(".png") != -1 || url.indexOf(".jpg") != -1) {
            contentData = this.getConcatenatedObjects(url, gotoUrl);
        } else if (url.indexOf(".html") != -1) {
            contentData = "<iframe class='pdfView' style='background-color: white; height: " + xHeight + ";' src='" + url + "#view=FitH' frameborder=1></iframe>";
        } else if (url.indexOf(".mp4") != -1 || url.indexOf("youtube") != -1) {
            contentData = "<iframe class='pdfView' style='background-color: white; height: " + xHeight + ";' src='" + url + "#view=FitH' frameborder=1></iframe>";
        } else {
            contentData = "<iframe class='pdfView'style='background-color: white; height: " + xHeight + ";' src='" + url + "#view=FitH' style='background-color:white;' frameborder=1></iframe>";
        }
        // console.log("from sethref",$scope.bgTagColor)
        // if ($scope.bgTagColor=="" || $scope.bgTagColor=='undefined')
        // $("#mTag").html("<div class='" + $scope.bgTagColor + "'><span style='font-size:20pt'>" + $scope.tagName + "</span><p class='btn btn-danger' style='text-align: right; float: right; display: inline-block'>[X]</p></div>");
        $("#mTag").html("<div class='bg-light'><span style='font-size:20pt;color: black;'>" + $scope.tagName + "</span><p class='btn btn-danger' style='text-align: right; float: right; display: inline-block'>[X]</p></div>");
        $("#mContent").html(contentData);
        // document.getElementById("myNav").style.width = "100%";
        $("#myNav").css({'width': '100%', 'display': 'block'})
        hideSliderElem("tempSlideExpId")
    }

    $scope.getConcatenatedObjects = function (stringOfUrls, gotoUrl) {
        //apply a loop to run over each images and append in a div one after another
        var newGotoUrl = (typeof gotoUrl == "undefined") ? "" : gotoUrl;
        var xHeight = xHeight = screen.height + "px";
        var imagesArr = stringOfUrls.split(",");
        var countOfObjects = 0
        // var content = "<div class='carousel slide' data-ride='carousel'><div class='carousel-inner'>";
        var content = "<div id='tempSlideExpId'>";
        imagesArr.forEach(function (objUrl) {
            newGotoUrl = (newGotoUrl == "") ? objUrl : newGotoUrl;
            //console.log(imgUrl);
            countOfObjects += 1
            if (objUrl.indexOf(".pdf") != -1) {
                content += "<div id='slide" + countOfObjects + "' class='pdfView' style='background-color: white; height: " + xHeight + ";'><object data='" + objUrl + "#view=FitH' type='application/pdf' class='pdfView'></object></div>";
            } else if (objUrl.indexOf("http") != -1) {
                content += "<div id='slide" + countOfObjects + "' class=''><a href='" + objUrl + "' target='_blank'><div class='badge badge-pill badge-danger'>" + objUrl + "</div></a></div>";
            } else if (objUrl.indexOf(".png") != -1 || objUrl.indexOf(".jpg") != -1) {
                content += "<div id='slide" + countOfObjects + "' class=''><a href=" + newGotoUrl + " target='_blank'><img src='" + objUrl + "' alt='" + objUrl + "' class='imgs' /></a></div>";
            }
            newGotoUrl = "";
        });
        content += "</div>";
        $scope.objCount = countOfObjects
        $scope.$emit("objCounter", countOfObjects)
        content = "<div class='badge badge-info'>found [" + countOfObjects + "] experiences</div>" + content
        displayRunTimeNav(countOfObjects)
        return content
    }

});

var hideSliderElem = function (sId) {
    // var scope = angular.element(document.getElementById('#runTimeTemplateId')).scope();
    // scope.hideSliderElem(slideId)
    $("#" + sId + " > div:gt(0)").hide();
    $("#" + sId + " > iframe:gt(0)").hide();
    $("#" + sId + " > object:gt(0)").hide();
}

var slideNext = function (slideId) {
    var scope = angular.element(document.getElementById('#runTimeTemplateId')).scope();
    scope.slideNext(slideId)
}

var slidePrev = function (slideId) {
    var scope = angular.element(document.getElementById('#runTimeTemplateId')).scope();
    scope.slidePrev(slideId)
}

function hide(id) {
    $("#" + id).hide();
}

function show(id) {
    $(id).show();
}

function setHref(id, url, gotoUrl, tagName) {
    var scope = angular.element(document.getElementById('itSummaryScope')).scope();
    scope.setHref(id, url, gotoUrl, tagName);

//    for mailer runtimer add of some functions
//     if(url.indexOf("mailer.html")!=-1)
//         addMailerScripts()
}

function cleanTags() {
    // $("#mTag").html("");
    $("#mContent").html("");
    $("#mImages").html("");
}

function stopSliderTimer() {
    clearInterval(timerId)
}

function closeNav() {
    cleanTags();
    document.getElementById("myNav").style.width = "0%";
    timerValue = 5000
    stopSliderTimer()
}


function testChartClick() {
    var scope = angular.element($('#myCharts')).scope();
    scope.drawPieChart();
}

function loadRuntimeScripts() {
    if (isChartLoadOnce) return

    var elmContainer = $('#idRunTimeScriptsContainer')
    elmContainer.append(loadJsElemForGoogleCharts)
    var scope = angular.element(document.getElementById('myCharts')).scope();
    scope.checkGoogleChartsLoaded()
    isChartLoadOnce = true
}

function loadView3JS() {
    var elmContainer = $('#view3MainDiv')
    // if(elmContainer.find(view3CircleJs).length<=0)
    elmContainer.append(view3CircleJs)
}


function loopFormGetValues(id) {
    var strValues = $("#" + id).serialize();
    strValues = "&" + strValues;
    return strValues;
}

function getContactEmailQueryURI(id, msgId) {
    var myIds = loopFormGetValues(id)
    var sPage = "../services/ServiceDetails.php?mail=mail_1" + myIds;
    // $('#message').load(sPage);
    var oldText = $("#" + msgId).html()
    $("#" + msgId).html("please wait, do not refresh")
    $("#" + msgId).addClass("bg-success")
    $.get(sPage, function (res) {
    }).success(function (msg) {
        clearForm(id)
        toastr.success("message has been sent successfully, we will get back")
    }).error(function (er) {
        toastr.error("error, please contact admin: " + er)
        console.error("error, please contact admin: ", er)
    }).complete(function () {
        $("#" + msgId).html(oldText)
        $("#" + msgId).removeClass("bg-success")
    })
}

function clearForm(id) {
    $("#" + id + " input").val("")
    $("#" + id + " textarea").val("")
}

function listMultipleUploadFile() {
    //get the input and UL list
    var input = document.getElementById('uploadArr');
    var list = document.getElementById('fileList');
    var myFileList = "";
    for (var x = 0; x < input.files.length; x++) {
        myFileList = myFileList + 'File ' + (x + 1) + ':  ' + input.files[x].name + "<br/>";
    }
    list.innerHTML = myFileList;
}

function addMailerScripts() {
    var strScripts = "<link rel='stylesheet' href='../bootstrap/css/bootstrap.min.css'/>"
    strScripts += "<link rel='stylesheet' href='../css/style1.css'/>"
    strScripts += "<link rel='stylesheet' href='../js/toastr.min.css'/>"
    strScripts += "<script src='../js/jquery.js'></script>"
    strScripts += "<script src='../js/toastr.min.js'></script>"
    strScripts += "<script src='../js/myJs1.js'></script>"
    $("#mailerRunTimeScripts").append(strScripts)
}


function resizeIframe(obj) {
    // obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    let objFrame=$(obj)
    // console.log(objFrame.contents().outerHeight())
    $(objFrame).innerHeight(4000)
    // objFrame.height(objFrame.contents().outerHeight() );
}



loadPDF=(url,pages)=>{
    // var pdfjsLib = window['pdf.worker'];
    var pdfjsLib = window['pdfjsLib'];
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
        console.log('PDF loaded');
        // Fetch the first page
        var pageNumber = 1;
        for (let i=1; i<=pages; i++){
            pdf.getPage(i).then(function(page) {
                console.log('Page loaded-',i);
                var scale = 2;
                var viewport = page.getViewport(scale);
                // Prepare canvas using PDF page dimensions
                var canvas = document.getElementById('pdfcanvas-'+i);
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.then(function () {
                    console.log('Page rendered');
                });
            });
        }
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
}
