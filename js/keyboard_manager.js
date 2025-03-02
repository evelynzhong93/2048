class keyboardManager {
    constructor() {
        this.events = {}
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        // push new elem added to the array
    }

    emit(event, data) {
        const callbacks = this.events[event];
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(data);
            });
        }
    }

    listen() {
        document.addEventListener("keydown", this.keyHandling.bind(this))

        this.bindButtonPress(".retry-button", this.restart);
        this.bindButtonPress(".restart-button", this.restart);
        this.bindButtonPress(".keep-playing-button", this.keepPlaying);
    }


    keyHandling(event) {
        const map = {
            "ArrowUp": 0,
            "ArrowRight": 1,
            "ArrowDown": 2,
            "ArrowLeft": 3,
            "w": 0,   // Vim up
            "d": 1,   // Vim right
            "s": 2,   // Vim down
            "a": 3    // Vim left
        }

        const modifiers = event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
        const mapped = map[event.key.toLowerCase()]

        if (!modifiers) {
            if (mapped !== undefined) {
                event.preventDefault()
                this.emit("move", mapped)
            }
        }
    }

    bindButtonPress(selector, fn) {
        const button = document.querySelector(selector);
        if (button) {
            button.addEventListener('click', fn.bind(this));
        }
    }

    restart(event) {
        event.preventDefault();
        this.emit('restart');
    }

    keepPlaying(event) {
        event.preventDefault();
        this.emit('keepPlaying');
    }
}



// const test1 = new keyboard_manager()
// test1.on('check', (data) => {
//     console.log("hello" + data.name)
// })
// test1.on('check', (data) => {
//     console.log("welcome" + data.name)
// })

// test1.emit('check', { name: "Alice" })