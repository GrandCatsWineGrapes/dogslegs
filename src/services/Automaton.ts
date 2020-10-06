import StorageWorker from './Storage'
import {ILayout} from './Storage'


export async function Automaton(layoutID: string) {
    const storageWorker = new StorageWorker();
    const receivedData = await storageWorker.findLayout(layoutID)
    let varString = receivedData.variables.map(el => el.varName).join(', ')
    console.log(varString)
    const layoutHandler: Function = new Function(varString, `return ${receivedData.layout}`)
    return layoutHandler;
}