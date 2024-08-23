const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow
let newProductWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))


    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);


    mainWindow.on('closed', () => {
        app.quit();
    })

});

function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Agregar un nuevo producto'
    });
    // newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }));
    newProductWindow.on('closed', () => {
        newProductWindow = null;
    })
}

ipcMain.on('product:new', (e, newProduct) => {
    console.log(newProduct);
});

const templateMenu = [{
    label: 'File',
    submenu: [{
            label: 'New Product',
            click() {
                createNewProductWindow();
            }

        },
        {
            label: 'Remove all Products',
        },
        {
            label: 'Exit',
            accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }
    ]

}];

if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    });
}

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        accelerator: 'Ctrl+D',
        submenu: [{
                label: 'Show/Hide dev Tools',
                click(item, focuseWindow) {
                    focuseWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}