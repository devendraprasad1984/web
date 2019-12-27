var users = new Array(5);
var users1 = [];

$(function() {
	init();
});

function init() {
	// init user array and assign default user and password values
	users[0] = new Array(2);
	users[0][0] = "1";
	users[0][1] = "1";
	users[1] = new Array(2);
	users[1][0] = "2";
	users[1][1] = "2";
	users[2] = new Array(2);
	users[2][0] = "3";
	users[2][1] = "3";
	users[3] = new Array(2);
	users[3][0] = "4";
	users[3][1] = "4";
	users[4] = new Array(2);
	users[4][0] = "5";
	users[4][1] = "5";

	var arr = [ "dp", "dp" ];
	users1.push(arr);
	arr = [ "dp1", "dp1" ];
	users1.push(arr);
	$("#status").html("users have been initiated");
}

function checkLogin() {
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
	var found = 0;
	for (i = 0; i < users.length; i++) {
		if (users[i][0] === uid && users[i][1] === pwd) {
			$("#status").html("Success!!! Users have been found.");
			found = 1;
		}
	}
	if (found === 0) {
		$("#status").html("Users not found.");
	}
}