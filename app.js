const {Builder, By, Key, until}= require('selenium-webdriver');
const express = require('express');
const app = express();
const {host, port} = require('./config/config.js')

app.use(require('./controllers/automaton.controller'));

app.listen(port, host, () => {
    console.log(`On ${host}:${port}`)
})