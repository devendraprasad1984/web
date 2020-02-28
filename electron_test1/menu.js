const funcs=require('./appFunctions');

module.exports.mainMenu=()=> {
    let menuArr=[{
        label: 'File',
        submenu: [
            {
                label: 'add item',
                click(){
                    funcs.createItem();
                }
            },
            {
                label: 'clear all',
                click(){
                    funcs.removeItem();
                }
            },
            {
                label: 'quit',
                accelerator:process.platform=='darwin'?'Command+Q':'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }];

    if(process.env.NODE_ENV!=='production'){
        let devtools={
            label:'dev tools',
            click(item,focusedWindow){
                focusedWindow.toggleDevTools();
            }
        };
        menuArr.push(devtools);
    }
    return menuArr;
}
