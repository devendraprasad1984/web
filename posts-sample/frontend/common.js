

// window.onbeforeunload = function () {
//     return "Do you really want to close?";
// };

window.addEventListener("beforeunload", function (e) {
    $.ajax({
        type: "POST",
        url: './backend/logout.php',
        dataType: 'text',
        data: {
            unload: 1,
        },
        success: function (response) {},
        error: function (response) {}
    });
    return;
});
