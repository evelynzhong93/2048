class Grid {
    constructor(size, previousState) {
        this.size = size;
        this.cells = previousState ? this.fromState(previousState) : this.empty;
    }

    fromState(state) {
        const cells = [];

        for (let x = 0; x < this.size; x++) {
            const row = cells[x] = [];
            for (let y = 0; y < this.size; y++) {
                tile = state[x][y];
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

    availableCellsLst() {
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

    availableCellsBool() {
        return this.availableCellsLst().length > 0;
    }

    randomAvailableCell() {
        const avCells = this.availableCellsLst();
        if (!avCells.length) { return null };
        return avCells[Math.floor(Math.random() * avCells.length)];
    }

    //cell avaiable, occupied, content not incluced here, check original code

    insertTile(tile) {
        this.cells[tile.x][tile.y] = tile;
    }

    removeTile(tile) {
        this.cells[tile.x][tile.y] = null;
    }

    withinBounds(position) {
        return position.x >= 0 && position.x < this.size &&
            position.y >= 0 && position.y < this.size;
    }

    serialize() {
        var cellState = [];

        for (let x = 0; x < this.size; x++) {
            let row = cellState[x] = [];

            for (let y = 0; y < this.size; y++) {
                row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
            }
        }

        return {
            size: this.size,
            cells: cellState
        }
    }
}

