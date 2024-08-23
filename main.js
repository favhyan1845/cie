const { app, BrowserWindow } = require('electron')
require('./app')


let mainWindow = null

function main() {
    //mainWindow = new BrowserWindow({minimizable: true, resizable: false, frame: true }),
    mainWindow = new BrowserWindow({ resizable: true, minimizable: true, frame: true, minWidth: 1360, minHeight: 768, width: 1360, height: 768 }),
        mainWindow.loadURL(`http://localhost:3000/`),
        mainWindow.on('close', event => {
            mainWindow = null
        })
}
app.on('ready', main)