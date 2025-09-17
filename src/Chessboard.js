import Square from "./Square.js";

export default class Chessboard {
    constructor(length) {
        this.data = [] // adjacency list

        for (let row = 0; row < length; row++) {
            for (let column = 0; column < length; column++) {
                const coords = [row, column]

                const data = []

                if(row + 1 > 0 && row + 1 < 8 && column + 2 > 0 && column + 2 < 8) { // NE
                    data.push([row + 1, column + 2])
                }
                if(row + 2 > 0 && row + 2 < 8 && column + 1 > 0 && column + 1 < 8) { // NE
                    data.push([row + 2, column + 1])
                }
                if(row - 1 > 0 && row - 1 < 8 && column - 2 > 0 && column - 2 < 8) { // SW
                    data.push([row - 1, column - 2])
                }
                if(row - 2 > 0 && row - 2 < 8 && column - 1 > 0 && column - 1 < 8) { // SW
                    data.push([row - 2, column - 1])
                }
                if(row + 1 > 0 && row + 1 < 8 && column - 2 > 0 && column - 2 < 8) { // SE
                    data.push([row + 1, column - 2])
                }
                if(row + 2 > 0 && row + 2 < 8 && column - 1 > 0 && column - 1 < 8) { // SE
                    data.push([row + 2, column - 1])
                }
                if(row - 1 > 0 && row - 1 < 8 && column + 2 > 0 && column + 2 < 8) { // NW
                    data.push([row - 1, column + 2])
                }
                if(row - 2 > 0 && row - 2 < 8 && column + 1 > 0 && column + 1 < 8) { // NW
                    data.push([row - 2, column + 1])
                }

                this.data.push(new Square(coords, data))
            }
        }
    }
}