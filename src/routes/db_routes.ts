import express, { Request, Response} from 'express';

import StorageWorker, {ILayout} from '../services/Storage'



const dbRoutes = express();

dbRoutes.post('/layout', (req: Request, res: Response) => {
    const storageWorker = new StorageWorker();
    storageWorker.pushLayout(req.body)
        .then(() => {
            res.status(202).send('success')
        }).catch((err) => {
            res.status(500).send(`${err} on POST on /layout`)
        });
})

export default dbRoutes;