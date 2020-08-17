const express = require('express');
const app = express();
// const router = express.Router();

const AutomatonService = require('../services/automaton.service')
 
const requestSimBody = { //Only for initial testing
    clicheId: 'problem_unconfirmed',
    date_start: '12.02.2020',
    date_end:'30.05.2021',
    time_start: '10:00',
    time_end: '22:00',
    service: 'Собачьи ножки',
    isScreenshot: true,
    url: 'https://dogslegs.ru',
    SDNumber: '',
}

app.get('/automaton', async (req, res) => {
    
    res.send(await AutomatonService.clicheHandler(requestSimBody));
})

module.exports = app;