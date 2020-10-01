import Store from 'nedb'
import path from 'path';

import { pathToFileURL } from 'url';

import compareArrays from '../utils'

export interface ILayout {
    name: string,
    layout: string,
}

export default class StorageWorker {
    private _db: Store;
    constructor() {
        this._db = new Store({
            filename: path.join(__dirname, '../../db/storage.db'),
            autoload: true
        })
    }

    async findAllLayouts(): Promise<ILayout[]> {
        return new Promise((resolve, reject) => {
            this._db.find({}, (err: Error, doc: ILayout[]) => {
                if (err) reject(`Error on findAllLayouts - StorageWorker: ${err}`)
                else resolve(doc)
            })
        })
    }

    async findLayout(id: string): Promise<ILayout> {
        return new Promise((resolve, reject) => {
            this._db.findOne({_id: id}, (err: Error | null, doc: ILayout) => {
                if (Array.isArray(doc)) {
                        reject(`Err: no layouts with current ID found`)
                } else {
                    if (err) reject(`Error on findLayout - StorageWorker: ${err}`)
                    else 
                        if (doc) resolve(doc)
                        else reject('No layouts matching current ID')
                }
            })
        })
    }

    async pushLayout(data: ILayout): Promise<ILayout> {
        return new Promise((resolve, reject) => {
            this._db.find({name: data.name}, (err: Error, doc:  ILayout| []) => {
                if (Array.isArray(doc) && compareArrays(doc, [])) {
                    this._db.insert(data, (err: Error | null, doc: ILayout) => {
                        if (err) reject(`Error on pushLayout - StorageWorker: ${err}`)
                        else resolve(doc)
                    })
                } else reject(`Error on pushLayout - element with name: ${data.name} is already in DB`)
            })
            
        })
    }

    async deleteLayout(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this._db.remove({_id: id}, {}, (err: Error|null) => {
                if (err) reject(err)
                else resolve();
            })
        })
    }

    async updateLayout(id: string, data: ILayout): Promise<void> {
        return new Promise((resolve, reject) => {
            if (id) {
                this.findLayout(id).then(() => {
                    this._db.update({_id: id}, {$set: {name: data.name, layout: data.layout}})
                    resolve();
                }).catch((err) => {
                    reject(`Error on updateLayout - StorageWorker ${err} `)
                })
            } else reject('ID is not defined on updateLayout')
        })
    }
}