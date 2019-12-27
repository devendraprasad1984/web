
$(function () {
    loadHeader();
    loadMainmenu();
    loadLeftNav();
    loadFooter();
});

function loadHeader() {
    $("#header-container .page-center").load("modules/header.html");
}
function loadMainmenu() {
    $("#custom-menu-primary .page-center").load("modules/main-menu.html")
}
function loadLeftNav() {
    $("#custom-left-content").load("modules/left-nav.html")
    setTimeout(function () {
        $('.left-nav').hide();
    }, 1000);
}
function loadFooter() {
    $("#footer-container .page-center").load("modules/footer.html");
}

function getLeftListItem(elemId) {
    $("#custom-left-content").load("modules/left-nav.html " + elemId);
}