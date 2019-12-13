export default class Subject {
    constructor() {
        this.callbacks = [];
    }
    add(...callbacks) {
        this.callbacks = [...this.callbacks, ...callbacks];
    }
    notifyObservers() {
        this.callbacks.forEach(
            callback => callback()
        );
    }
}
