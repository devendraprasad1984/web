var stuDB = new Array(1000); //init a 2d array
var recCounter = 0;

$(function () {
    initVars();
});

function initVars() {
    for (i = 0; i < stuDB.length; i++) {
        stuDB[i] = new Array(6);
    }
}

function storeRecords() {
    var name, age, eng, hin, math, id;
    name = $("#tName").val();
    age = $("#tAge").val();
    eng = $("#tEng").val();
    hin = $("#tHin").val();
    math = $("#tMath").val();
    id = $("#tId").val();
    if (id == "") {
        stuDB[recCounter][0] = name;
        stuDB[recCounter][1] = age;
        stuDB[recCounter][2] = eng;
        stuDB[recCounter][3] = hin;
        stuDB[recCounter][4] = math;
        stuDB[recCounter][5] = recCounter;
        recCounter += 1;
    } else {
        stuDB[id][0] = name;
        stuDB[id][1] = age;
        stuDB[id][2] = eng;
        stuDB[id][3] = hin;
        stuDB[id][4] = math;
    }
    displayStuRecord();
}
function displayStuRecord() {
    //loop over array and display table
    var sData = "";
    sData += "<table width='100%' border=0>";
    sData += "<th>RowId</th><th>Name</th><th>Age</th><th>English</th><th>Hindi</th><th>Maths</th>";
    for (i = 0; i < stuDB.length; i++) {
        if (typeof stuDB[i][0] == 'undefined' || stuDB[i][0] == "")
            break;
        if (stuDB[i][0] != "---") {
            sData += "<tr>";
            sData += "<td>" + (stuDB[i][stuDB[i].length - 1] + 1) + "</td>";
            for (j = 0; j < stuDB[i].length - 1; j++) {
                sData += "<td>" + stuDB[i][j] + "</td>";
            }
            sData += "<td><a href=# onclick='editRecord(" + i + ");'>edit</a></td>"; //edit link or button image
            sData += "<td><a href=# onclick='deleteRecord(" + i + ");'>delete</a></td>"; //delete link or button image
            sData += "</tr>";
        }
    }
    sData += "</table>";
    $("#myReport").html(sData);
}

function editRecord(index) {
    $("#tName").val(stuDB[index][0]);
    $("#tAge").val(stuDB[index][1]);
    $("#tEng").val(stuDB[index][2]);
    $("#tHin").val(stuDB[index][3]);
    $("#tMath").val(stuDB[index][4]);
    $("#tId").val(stuDB[index][5]);
    displayStuRecord();
}
function deleteRecord(index) {
    stuDB[index][0] = "---";
    stuDB[index][1] = "---";
    stuDB[index][2] = "---";
    stuDB[index][3] = "---";
    stuDB[index][4] = "---";
    //permanent deletion method
    //stuDB.splice(index,1);
    displayStuRecord();
}

