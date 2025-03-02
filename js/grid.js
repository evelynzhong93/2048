class Grid {
    constructor(size, previousState) {
        this.size = size
        this.cells = previousState ? this.fromState(previousState) : this.empty
    }

    fromState(state) {
        const cells = [];

        for (let x = 0; x < this.size; x++) {
            const row = cells[x] = [];
            for (let y = 0; y < this.size; y++) {
                tile = state[x][y]
                row.push(tile ? new Tile(tile.value, tile.position) : null);
            }
        }

        return cells;

    }

    empty() {
        const cells = [];

        for (let x = 0; x < this.size; x++) {
            const row = cells[x] = [];
            for (let y = 0; y < this.size; y++) {
                row.push(null);
            }
        }

        return cells;
    }

    availableCells() {
        let avCells = [];

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.cells[x][y] == null) {
                    avCells.push({ x: x, y: y });
                }
            }
        }

        return avCells;
    }

    randomAvailableCell() {

    }
}