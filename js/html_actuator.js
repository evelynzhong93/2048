class HTMLActuator {
    constructor() {
        this.tileContainer = document.querySelector(".tile-container");
        this.scoreContainer = document.querySelector(".score-container");
        this.bestContainer = document.querySelector(".best-container");
        this.messageContainer = document.querySelector(".game-message");

        this.score = 0;
    }

    actuate(grid, metadata) {

        window.requestAnimationFrame(() => {
            this.clearContainer(this.tileContainer);

            grid.cells.forEach((column) => {
                column.forEach((cell) => {
                    cell && this.addTile(cell);
                })
            })

            this.updateScore(metadata.score);
            this.updateBestScore(metadata.bestScore);

            if (metadata.terminated) {
                if (metadata.over) {
                    this.message(false);
                } else if (metadata.won) {
                    this.message(true);
                }
            }
        })
    }

    continueGame() {
        this.clearMessage();
    }

    clearContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    addTile(tile) {
        const wrapper = document.createElement("div");
        const inner = document.createElement("div");
        const position = tile.previousPosition || { x: tile.x, y: tile.y };
        let positionClass = this.positionClass(position);

        const classes = ["tile", "tile-" + tile.value, positionClass];

        if (tile.value > 2048) classes.push("tile-super");

        this.applyClasses(wrapper, classes);

        inner.classList.add("tile-inner");
        inner.textContent = tile.value;

        if (tile.previousPosition) {
            window.requestAnimationFrame(() => {
                classes[2] = self.positionClass({ x: tile.x, y: tile.y });
                // classes[2] to update positionclass
                this.applyClasses(wrapper, classes);
            })
        } else if (tile.mergedFrom) {
            classes.push("tile-merged");
            this.applyClasses(wrapper, classes);

            tile.mergedFrom.forEach((merged) => {
                this.addTile(merged);
            })
        } else {
            classes.push("tile-new");
            this.applyClasses(wrapper, classes);
        }

        wrapper.appendChild(inner);
        this.tileContainer.appendChild(wrapper);
    }

    applyClasses(element, classes) {
        element.setAttribute("class", classes.join(" "));
    }

    positionClass(position) {
        const normalized = { x: position.x + 1, y: position.y + 1 };
        return `tile-position-${normalized.x}-${normalized.y}`;
        //template literals
    }

    updateScore(score) {
        this.clearContainer(this.scoreContainer);

        const difference = score - this.score;
        this.score = score;
        this.scoreContainer.textContent = this.score;

        if (difference > 0) {
            const addition = document.createElement("div");
            addition.classList.add("score-addition");
            addition.textContent = "+" + difference;

            this.scoreContainer.appendChild(addition);
        }
    }

    updateBestScore(bestScore) {
        this.bestContainer.textContent = bestScore;
    }

    message(won) {
        const type = won ? "game-won" : "game-over";
        const message = won ? "You win!" : "Game over!";

        this.messageContainer.classList.add(type);
        this.messageContainer.getElementsByTagName("p")[0].textContent = message;
    }

    clearMessage() {
        this.messageContainer.classList.remove("game-won");
        this.messageContainer.classList.remove("game-over");
    }
}