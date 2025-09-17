import Square from "./Square.js";

export default class Chessboard {
    constructor(length) { // length of one side of grid, e.g., length for lengthxlength, 12 for 12x12
        this.data = [] // adjacency list
        this.search = {}

        for (let row = 0; row < length; row++) {
            for (let column = 0; column < length; column++) {
                const coords = [row, column]

                const data = []

                if(row + 1 > 0 && row + 1 < length && column + 2 > 0 && column + 2 < length) { // NE
                    data.push([row + 1, column + 2])
                }
                if(row + 2 > 0 && row + 2 < length && column + 1 > 0 && column + 1 < length) { // NE
                    data.push([row + 2, column + 1])
                }
                if(row - 1 > 0 && row - 1 < length && column - 2 > 0 && column - 2 < length) { // SW
                    data.push([row - 1, column - 2])
                }
                if(row - 2 > 0 && row - 2 < length && column - 1 > 0 && column - 1 < length) { // SW
                    data.push([row - 2, column - 1])
                }
                if(row + 1 > 0 && row + 1 < length && column - 2 > 0 && column - 2 < length) { // SE
                    data.push([row + 1, column - 2])
                }
                if(row + 2 > 0 && row + 2 < length && column - 1 > 0 && column - 1 < length) { // SE
                    data.push([row + 2, column - 1])
                }
                if(row - 1 > 0 && row - 1 < length && column + 2 > 0 && column + 2 < length) { // NW
                    data.push([row - 1, column + 2])
                }
                if(row - 2 > 0 && row - 2 < length && column + 1 > 0 && column + 1 < length) { // NW
                    data.push([row - 2, column + 1])
                }

                this.data.push(new Square(coords, data))

                this.search[`${row},${column}`] = this.data.length - 1
            }
        }
    }
}