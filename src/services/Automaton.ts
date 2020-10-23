import StorageWorker from './Storage'

export async function Automaton(layoutID: string) {
    try {
        const storageWorker = new StorageWorker();
        const receivedData = await storageWorker.findLayout(layoutID)
        let varString = receivedData.variables.map(el => el.varName).join(', ')
        const layoutHandler: Function = new Function(varString, `return ${receivedData.layout}`)
        return layoutHandler;
    } catch(err) {
        console.error(`${err} in automaton`)
    }
}