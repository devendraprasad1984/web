////// mongo Retrieve
//var Db = require('mongodb').Db,
//        MongoClient = require('mongodb').MongoClient,
//        Server = require('mongodb').Server,
//        ReplSetServers = require('mongodb').ReplSetServers,
//        ObjectID = require('mongodb').ObjectID,
//        Binary = require('mongodb').Binary,
//        GridStore = require('mongodb').GridStore,
//        Grid = require('mongodb').Grid,
//        Code = require('mongodb').Code,
//        BSON = require('mongodb').pure().BSON,
//        assert = require('assert');
//


//ANGULAR+JS CODE
var app = angular.module('myAjs', []);
var newCars = new Array();
//var demoObj=document.getElementById('demo');

//simple test
app.controller('myName', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.count = 0;
    $scope.getName = function () {
        return $scope.firstName + " " + $scope.lastName;
    }
});

//names array test
app.controller('nameArrTest', function ($scope) {
    $scope.names = [{
        name: 'Devendra',
        country: 'India'
    }, {
        name: 'Kittu',
        country: 'USA'
    }, {
        name: 'Raman',
        country: 'India'
    }, {
        name: 'Jyoti',
        country: 'Japan'
    }, {
        name: 'Papa',
        country: 'India'
    }, {
        name: 'Mama',
        country: 'China'
    }];
});

//read json from php
app.controller('customersCtrl', function ($scope, $http) {
    sUrl = "http://www.w3schools.com/angular/customers.php";
    $http.get(sUrl)
        .success(function (response) {
            $scope.names = response.records;
        });
});

//form validation
app.controller('validateCtrl', function ($scope) {
    $scope.user = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
});

//user table
app.controller('userCtrl', function ($scope) {
    $scope.fName = '';
    $scope.lName = '';
    $scope.passw1 = '';
    $scope.passw2 = '';
    $scope.users = [{
            id: 1,
            fName: 'Hege',
            lName: "Pege"
        },
        {
            id: 2,
            fName: 'Kim',
            lName: "Pim"
        },
        {
            id: 3,
            fName: 'Sal',
            lName: "Smith"
        },
        {
            id: 4,
            fName: 'Jack',
            lName: "Jones"
        },
        {
            id: 5,
            fName: 'John',
            lName: "Doe"
        },
        {
            id: 6,
            fName: 'Peter',
            lName: "Pan"
        }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editUser = function (id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.fName = '';
            $scope.lName = '';
        } else {
            $scope.edit = false;
            $scope.fName = $scope.users[id - 1].fName;
            $scope.lName = $scope.users[id - 1].lName;
        }
    };

    $scope.$watch('passw1', function () {
        $scope.test();
    });
    $scope.$watch('passw2', function () {
        $scope.test();
    });
    $scope.$watch('fName', function () {
        $scope.test();
    });
    $scope.$watch('lName', function () {
        $scope.test();
    });

    $scope.test = function () {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.fName.length ||
                !$scope.lName.length ||
                !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };

});


//note app[ control
app.controller("myNoteCtrl", function ($scope) {
    $scope.message = "";
    $scope.left = function () {
        return 100 - $scope.message.length;
    };
    $scope.clear = function () {
        $scope.message = "";
    };
    $scope.save = function () {
        alert("Note Saved");
    };
});


//JAVASCRIPT CODE
var person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
};

function getPerson(obj) {
    //alert(obj.innerHTML.substring(0,3));
    var sName = "";
    sName = person.firstName + ", " + person.lastName + " is " + person.age + " years Old. His Eye Color is " + person.eyeColor;
    if (obj.innerHTML.substring(0, 3) != "Get")
        sName = "Get Person Object";
    return sName;
}

function checkTypes() {
    return "Checking Types of Objects<br>" + typeof "john" + "<br>" +
        typeof 3.14 + "<br>" +
        typeof false + "<br>" +
        typeof [1, 2, 3, 4] + "<br>" +
        typeof {
            name: 'john',
            age: 34
        };
}

function chgSizeNColor() {
    var x = document.getElementById("demo");
    x.style.fontSize = "25px";
    x.style.color = "red";
}

function checkNumber() {
    var x, text;
    // Get the value of the input field with id="numb"
    x = document.getElementById("numb").value;
    // If x is Not a Number or less than one or greater than 10
    if (isNaN(x) || x < 1 || x > 10) {
        text = "Input not valid";
    } else {
        text = "Input OK";
    }
    document.getElementById("demo").innerHTML = text;
}

function testArray(delim) {
    var idx = 0;
    var cars = ["Audi", "Volvo", "BMW"];
    var sData = "The Value at " + idx + " is: " + cars[idx] + ". The total length of car object is: " + cars.length;
    sData = cars.join(delim);
    // sData=cars;
    // if(isArray(cars)){
    //   var counter=0;
    //   sData="";
    //   if(delim=="|"){
    //     for(counter=0; counter<cars.length; counter++){
    //       sData+=cars[counter]+delim;
    //     }
    //   }
    //   else if(delim==","){
    //     sData=cars.valueOf();
    //   } else
    //     sData=cars.join(delim);
    // }
    return sData;
}

function pushCars(carName) {
    //either make cars object public or get cars object into string from test array and then obtain array from it by split and then pushing
    // var newCars=testArray("|");
    // newCars=newCars.split("|");
    newCars.push(document.getElementById(carName).value);
    newCars = newCars.sort();
    //newCars=newCars.reverse();
    var secondArr = ["Pulser", "Discover", "Honda"];
    var thirdArr = ["1", "2", "3"];
    //newCars=newCars.concat(secondArr, thirdArr);
    //newCars=newCars.slice(1);
    return newCars.join(" * ");
}

function isArray(myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
}

function ifElCheck() {
    var demoObj = document.getElementById('demo');
    var greeting = "Couldnt get time";
    var time = new Date().getHours();
    if (time < 10) {
        greeting = "Good morning";
    } else if (time < 20) {
        greeting = "Good day";
    } else {
        greeting = "Good evening";
    }

    var day = "";
    switch (new Date().getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }

    var text;
    switch (new Date().getDay()) {
        case 6:
            text = "Today is Saturday";
            break;
        case 0:
            text = "Today is Sunday";
            break;
        default:
            text = "Looking forward to the Weekend";
    }
    //return greeting;
    demoObj.innerHTML = greeting + ", Its " + day + " today. " + text;
}


function checkForLoop() {
    var person = {
        fname: "John",
        lname: "Doe",
        age: 25
    };
    var text = "";
    var x;
    for (x in person) {
        text += person[x] + "|";
    }
    document.getElementById("demo").innerHTML = text;
}

function getArray() {
    var row, col;
    row = document.getElementById("mRow").value;
    col = document.getElementById("mCol").value;
    //creating a 2 d array
    MultiArray = new Array(5);
    MultiArray[0] = new Array(2);
    MultiArray[0][0] = "Tom";
    MultiArray[0][1] = "scientist";
    MultiArray[1] = new Array(2);
    MultiArray[1][0] = "Beryl";
    MultiArray[1][1] = "engineer";
    MultiArray[2] = new Array(2);
    MultiArray[2][0] = "Ann";
    MultiArray[2][1] = "surgeon";
    MultiArray[3] = new Array(2);
    MultiArray[3][0] = "Bill";
    MultiArray[3][1] = "taxman";
    MultiArray[4] = new Array(2);
    MultiArray[4][0] = "Myrtal";
    MultiArray[4][1] = "bank robber";
    return MultiArray[row][col];
}

function getNodes(id) {
    var myTag = document.getElementById(id);
    var myDemoTag = document.getElementById("demo");
    var myChild = myTag.childNodes; //includes the whitespace
    myChild = myTag.children;
    var myChildLength = myChild.length;
    var data = "";
    for (i = 0; i < myChildLength; i++) {
        data += myChild[i].tagName + "->" +
            myChild[i].id + "->" +
            myChild[i].style.color + "->" +
            myChild[i].innerHTML +
            "<br/>";
    }
    myDemoTag.innerHTML = data;
}

function getBrowserVersion() {
    var browserDetail = "Name is " + navigator.appName +
        "<br/>Code name is " + navigator.appCodeName +
        "<br/>Is cookie enabled is " + navigator.cookieEnabled +
        "<br/>app version is " + navigator.appVersion +
        "<br/>language is " + navigator.language +
        "<br/>dont track " + navigator.doNotTrack +
        "<br/>mime type is " + navigator.mimeTypes +
        "<br/>vendor is " + navigator.vendor +
        "<br/>platform is " + navigator.platform.toString() +
        "<br/>user agent is " + navigator.userAgent.toString();
    var myDemoTag = document.getElementById("demo");
    myDemoTag.innerHTML = browserDetail;
}

function checkEmail() {
    $.ajax({
        type: 'Get',
        url: 'https://webservice.exacttarget.com/Service.asmx/',
        success: function (data) {
            alert(data);
        }
    });
}

//https://webservice.exacttarget.com/Service.asmx
//https://webservice.exacttarget.com/etframework.wsdl

//mongo tests
//
//// Connect to the db
//function testMongoConnect() {
//    // Set up the connection to the local db
//    var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
//
//    // Open the connection to the server
//    mongoclient.open(function (err, mongoclient) {
//
//        // Get the first db and do an update document on it
//        var db = mongoclient.db("mydb");
//        db.collection('mycol').update({a: 1}, {b: 1}, {upsert: true}, function (err, result) {
//            assert.equal(null, err);
//            assert.equal(1, result);
//
//            // Get another db and do an update document on it
//            var db2 = mongoclient.db("mydb");
//            db2.collection('mycol').update({a: 1}, {b: 1}, {upsert: true}, function (err, result) {
//                assert.equal(null, err);
//                assert.equal(1, result);
//
//                // Close the connection
//                mongoclient.close();
//            });
//        });
//    });
//}

var aLine = [
    []
]; //init a 2d array
var aPos = 0;

function Add2List() {
    var aColumns = []; //INIT a 1d array
    var name, subject, marks;
    name = document.getElementById("txtName").value;
    subject = document.getElementById("txtSubject").value;
    marks = document.getElementById("txtMarks").value;
    aColumns.push(name, subject, marks); // Creates array with "record"
    aLine.splice(aPos, 0, aColumns); // Inserts new "record" at position aPos in main array
    aPos++; // Increments position not to overlap previous "records"
    var sData = "";
    sData += "<br>Length: " + aLine.length;
    sData += "<br>nth Record Length: " + aLine[aLine.length - 1];
    //return sData+"<br>Array: "+aLine+"<br>Last Element in Last Row: "+aLine[aLine.length-1][1];
    return sData + "<br>Array: " + aLine + "<br>Last Element in Last Row: ";
}


//read json from php
app.controller('dmonRestApi', function ($scope, $http) {
    //sUrl = "http://www.w3schools.com/angular/customers.php";
    sUrl = "http://localhost/dmonrestapi/?bkName=java";
    $http.get(sUrl)
        .success(function (response) {
            $scope.prices = response.price;
        });
});


function checkdmonRestApi() {
    //using ajax fetch the json object via url and display the result
    var sUrl = "http://localhost/dmonrestapi/dummy/";
    $.getJSON(sUrl, function (jsonData) {
        //alert(jsonData.book+" -> "+jsonData.price);
        alert(jsonData.books["php"]);
        iterateJson(jsonData);
    });
}

function iterateJson(data) {
    $.each(data, function () {
        $.each(this, function (key, value) {
            alert(key + "=>" + value);
        });
    });
}