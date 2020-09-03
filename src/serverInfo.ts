const fs = require('fs');
const path = require('path')

interface ServerInfo {
    host: string,
    port: number
}

export let serverInfo: ServerInfo;

const rawInfo: string = fs.readFileSync(path.join(__dirname, '../config.json'))
serverInfo = JSON.parse(rawInfo);