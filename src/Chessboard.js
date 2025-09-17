import Square from "./Square.js";

export default class Chessboard {
    constructor(length) { // length of one side of grid, e.g., length for lengthxlength, 12 for 12x12
        this.data = [] // adjacency list
        this.search = {}

        for (let row = 0; row < length; row++) {
            for (let column = 0; column < length; column++) {
                const coords = [row, column]

                const data = []

                if(row + 1 >= 0 && row + 1 < length && column + 2 >= 0 && column + 2 < length) { // NE
                    data.push([row + 1, column + 2])
                }
                if(row + 2 >= 0 && row + 2 < length && column + 1 >= 0 && column + 1 < length) { // NE
                    data.push([row + 2, column + 1])
                }
                if(row - 1 >= 0 && row - 1 < length && column - 2 >= 0 && column - 2 < length) { // SW
                    data.push([row - 1, column - 2])
                }
                if(row - 2 >= 0 && row - 2 < length && column - 1 >= 0 && column - 1 < length) { // SW
                    data.push([row - 2, column - 1])
                }
                if(row + 1 >= 0 && row + 1 < length && column - 2 >= 0 && column - 2 < length) { // SE
                    data.push([row + 1, column - 2])
                }
                if(row + 2 >= 0 && row + 2 < length && column - 1 >= 0 && column - 1 < length) { // SE
                    data.push([row + 2, column - 1])
                }
                if(row - 1 >= 0 && row - 1 < length && column + 2 >= 0 && column + 2 < length) { // NW
                    data.push([row - 1, column + 2])
                }
                if(row - 2 >= 0 && row - 2 < length && column + 1 >= 0 && column + 1 < length) { // NW
                    data.push([row - 2, column + 1])
                }

                this.data.push(new Square(coords, data))

                this.search[`${row},${column}`] = this.data.length - 1
            }
        }

        this.data.forEach((square) => {  // replace coordinates of adjacent nodes with object references to those nodes
            for (let i = 0; i < square.data.length; i++) {
                square.data[i] = this.data[this.search[`${square.data[i][0]},${square.data[i][1]}`]]
            }
        })
    }

    travel(start, end, queue = []) { // start and end must be arrays
        if (queue.length === 0) {
            if (typeof start !== 'object' && start.length !== 2 && typeof end !== 'object' && end.length !== 2) {
                return new Error('Bad input!')
            } else {
                start = this.data[this.search[`${start[0]},${start[1]}`]]
                end = this.data[this.search[`${end[0]},${end[1]}`]]
            }

            // let path = `[${start.x},${start.y}], `
            queue.push(start)
        }

        const nextQ = []
        for (let i = 0; i < queue.length; i++) {{
            if (queue[i].visited === false) {
                console.log(queue[i])

                queue[i].visited = true

                if (end === queue[i]) {
                    // path += `[${adjacent.x},${adjacent.y}]`
                    return
                } else {
                    queue[i].data.forEach((subAdj) => {
                        if (subAdj.visited === false) {
                            nextQ.push(subAdj)
                        }
                    })
                }
            }
        }}

        return this.travel(start, end, nextQ)
    }
}