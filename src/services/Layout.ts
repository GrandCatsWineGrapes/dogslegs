import {generateRandomId} from '../utils'
//todev ALL
interface ILayoutBuilder {
    addChunk(chunk: string): void,

}

class standardLayoutBuilder implements ILayoutBuilder {
    private layout: Layout;

    constructor() {
        this.layout = new Layout();
    }

    addChunk(chunk: string) {
        this.layout.layoutString+=chunk;
    }
}

class Layout {
    public layoutString: string = '';
}