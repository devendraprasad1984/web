const url = require('url');
const path = require('path');
const customMenu=require('./menu');
const custFunc=require('./appFunctions');

let {app, BrowserWindow, Menu, ipcMain} = require('electron');
let mainWindow;
app.on('ready', function () {
    mainWindow = new BrowserWindow({height:300,width:400,title:'main page'});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed',()=>app.quit());
    let mainMenu=Menu.buildFromTemplate(customMenu.mainMenu());
    Menu.setApplicationMenu(mainMenu);

    ipcMain.on('xitem',(e,item)=>{
        alert("from add item",item);
        // mainWindow.webContents.send('xitem',item);
        custFunc.closeAddItemWindow();
    });
});

