import express, {Request, Response, NextFunction} from 'express'
import fs from 'fs'
import {serverInfo} from './serverInfo'

const app = express();
import StorageWorker, {ILayout} from './services/Storage'

//to dev
import {Automaton} from './services/Automaton'

app.use(express.json());

app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.header('Access-Contol-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    next();
})


app.post('/automaton/:id', async (req: Request, res: Response)=> {
    Automaton(req.params.id).then((handler) => {
        const handledLayout = handler(...req.body.args);
        res.status(200).send(handledLayout)
    })
})


app.listen(serverInfo.port, serverInfo.host, () => {
    console.log(`Listening on ${serverInfo.host}:${serverInfo.port}`)
})

app.post('/layout', (req: Request, res: Response) => {
    const storageWorker = new StorageWorker();
    storageWorker.pushLayout(req.body)
        .then((data: ILayout) => {
            res.status(202).send(data)
        }).catch((err) => {
            res.status(500).send(`${err} on POST on /layout`)
        });
})

app.delete('/layout/:id', (req: Request, res: Response) => {
    const storageWorker = new StorageWorker();
    storageWorker.deleteLayout(req.params.id)
        .then(() => {
            res.status(202).send('success')
        }).catch((err) => {
            res.status(500).send(`${err} on DELETE on /layout`)
        })
})

app.get('/layout/all', (req: Request, res: Response) => {
    const storageWorker = new StorageWorker();
    storageWorker.findAllLayouts()
        .then(data => res.status(200).send(data))
        .catch(err=> res.status(500).send(`${err} on GET on /layout/all`))
})

app.put('/layout/:id', (req: Request, res: Response) => {
    const storageWorker = new StorageWorker();
    storageWorker.updateLayout(req.params.id, req.body)
        .then(() => res.status(202).send('success'))
        .catch(err => res.status(500).send(`${err} on PUT on /layout`))
})

app.get('/layout/:id', (req: Request, res: Response) => {
    const storageWorker = new StorageWorker();
    storageWorker.findLayout(req.params.id)
        .then(val => res.status(200).send(val))
        .catch(err => res.status(500).send(`${err} on GET on /layout`))
})