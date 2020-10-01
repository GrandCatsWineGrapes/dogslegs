import StorageWorker from './Storage'
import {ILayout} from './Storage'


export async function Automaton(layoutID: string) {
    const storageWorker = new StorageWorker();
    const receivedData = await storageWorker.findLayout(layoutID)
    const layoutHandler: Function = new Function(receivedData.variables, `return ${receivedData.layout}`)
    return layoutHandler;
}