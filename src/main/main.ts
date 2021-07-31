'use strict';

import { join } from 'path';
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const chokidar = require('chokidar');
const { spawn } = require('child_process');

const isProduction = app.isPackaged;
let loadURL = 'http://localhost:3000';

if (isProduction) {
  loadURL = `file://${join(__dirname, '../renderer/index.html')}`;
} else {
  const watcher = chokidar.watch(join(__dirname, './**/*'));
  watcher.once('change', () => {
    const child = spawn(
      require(`${__dirname}/../../node_modules/electron`),
      [app.getAppPath()],
      {
        detached: true,
        stdio: 'inherit',
      },
    );
    child.unref();
    app.quit();
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    useContentSize: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  win.loadURL(loadURL);

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
