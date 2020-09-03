import express, {Request, Response} from 'express'
import fs from 'fs'
import {serverInfo} from './serverInfo'


const app = express();
import * as automaton from './services/Automaton'


app.get('/automaton', async (req: Request, res: Response) => {
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
    const AutomatonWorker = new automaton.AutomatonWorker(requestSimBody);
    await AutomatonWorker.clicheHandler().then(
        (result: string) => {
            res.send(result)
        }
    )
})

app.listen(serverInfo.port, serverInfo.host, () => {
    console.log(`Listening on ${serverInfo.host}:${serverInfo.port}`)
})