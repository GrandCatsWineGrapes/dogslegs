import express, {Request, Response, NextFunction, Express} from 'express'
import fs from 'fs'
import {serverInfo} from './serverInfo'

import StorageWorker from './services/Storage'
import {ILayout} from './interfaces/layout'

import {Automaton} from './services/Automaton'

class Application {
    private static instance: Application;
    private app: Express;

    constructor() {
        this.app = express()
    };

    public static getInstance() {
        if (!Application.instance) {
            Application.instance = new Application()
        } 
        return Application.instance;
    }

    public setMainRoutes(): Application {
        this.app.post('/automaton/:id', async (req: Request, res: Response)=> {
            Automaton(req.params.id).then((handler) => {
                // console.log(req.body)
                const handledLayout = handler(...req.body);
                res.status(200).send(handledLayout)
            })
        })
        
        this.app.post('/layout', (req: Request, res: Response) => {
            const storageWorker = new StorageWorker();
            storageWorker.pushLayout(req.body)
                .then((data: ILayout) => {
                    res.status(202).send(data)
                }).catch((err) => {
                    res.status(500).send(`${err} on POST on /layout`)
                });
        })
        
        this.app.delete('/layout/:id', (req: Request, res: Response) => {
            const storageWorker = new StorageWorker();
            storageWorker.deleteLayout(req.params.id)
                .then(() => {
                    res.status(202).send('success')
                }).catch((err) => {
                    res.status(500).send(`${err} on DELETE on /layout`)
                })
        })
        
        this.app.get('/layout/all', (req: Request, res: Response) => {
            const storageWorker = new StorageWorker();
            storageWorker.findAllLayouts()
                .then(data => res.status(200).send(data))
                .catch(err=> res.status(500).send(`${err} on GET on /layout/all`))
        })
        
        this.app.put('/layout/:id', (req: Request, res: Response) => {
            const storageWorker = new StorageWorker();
            storageWorker.updateLayout(req.params.id, req.body)
                .then(() => res.status(202).send('success'))
                .catch(err => res.status(500).send(`${err} on PUT on /layout`))
        })
        
        this.app.get('/layout/:id', (req: Request, res: Response) => {
            const storageWorker = new StorageWorker();
            storageWorker.findLayout(req.params.id)
                .then(val => res.status(200).send(val))
                .catch(err => res.status(500).send(`${err} on GET on /layout`))
        })

        this.app.get('/layoutmaker', (req: Request, res: Response) => {
            res.send('AAA')
            // res.redirect(`${serverInfo.host}:${serverInfo.port}/`)
        })

        return this
    }

    public setMiddleware(): Application {
        this.app.use(function(req: Request, res: Response, next: NextFunction) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            next();
        })
        this.app.use(express.json());
        return this;
    }

    public run(): Application {
        this.app.listen(serverInfo.port, serverInfo.host, () => {
            console.log(`Listening on ${serverInfo.host}:${serverInfo.port}`)
        })
        return this;
    }
}

const server = Application.getInstance();
server
    .setMiddleware()
    .setMainRoutes()
    .run()
