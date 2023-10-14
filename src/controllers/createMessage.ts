export default class Messenger {
    port: number;
    constructor(port: number) {
        this.port = port;
    }
    messagePrint(): string {
        return `Node and express server is running on port ${this.port}`
    }
}