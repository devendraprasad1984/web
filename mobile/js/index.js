function getDOMObject(ref) {
    return document.querySelector(ref);
}

function changeBg() {
    var colors = ["#1F5EA8", "#20D2DC", "#1BBC9B", "#FA5021"];
    var fontColors = ["black", "navy", "olive", "pink"];
    var rand = Math.floor(Math.random() * colors.length);
    let bg = getDOMObject('.change');
    bg.style.backgroundColor = colors[rand];
    document.body.style.color = fontColors[rand];
}

document.addEventListener("DOMContentLoaded", function () {
    setInterval(function(){
        changeBg();
    },5000);
});

