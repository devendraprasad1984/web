const url = require('url');
const path = require('path');
let addWindow;
let {BrowserWindow,ipcMain}=require('electron');

module.exports.closeAddItemWindow=()=>{
    alert('window to be closed');
    addWindow.close();
}
module.exports.createItem = () => {
    console.log("create item is clicked");
    addWindow = new BrowserWindow({height: 200, width: 300, title: 'add shopping item'});
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'itemAdd.html'),
        protocol: 'file:',
        slashes: true
    }));
    addWindow.on('close', () => {
        addWindow = null;
    });
}

module.exports.removeItem = () => {
    console.log("remove item is clicked");
}

