import Square from "./Square.js";

export default class Chessboard {
    constructor(length) { // length of one side of grid, e.g., length for lengthxlength, 12 for 12x12
        this.data = [] // adjacency list
        this.search = {}

        for (let row = 0; row < length; row++) {
            for (let column = 0; column < length; column++) {
                const coords = [row, column]

                const data = []

                if (row + 1 >= 0 && row + 1 < length && column + 2 >= 0 && column + 2 < length) { // NE
                    data.push([row + 1, column + 2])
                }
                if (row + 2 >= 0 && row + 2 < length && column + 1 >= 0 && column + 1 < length) { // NE
                    data.push([row + 2, column + 1])
                }
                if (row - 1 >= 0 && row - 1 < length && column - 2 >= 0 && column - 2 < length) { // SW
                    data.push([row - 1, column - 2])
                }
                if (row - 2 >= 0 && row - 2 < length && column - 1 >= 0 && column - 1 < length) { // SW
                    data.push([row - 2, column - 1])
                }
                if (row + 1 >= 0 && row + 1 < length && column - 2 >= 0 && column - 2 < length) { // SE
                    data.push([row + 1, column - 2])
                }
                if (row + 2 >= 0 && row + 2 < length && column - 1 >= 0 && column - 1 < length) { // SE
                    data.push([row + 2, column - 1])
                }
                if (row - 1 >= 0 && row - 1 < length && column + 2 >= 0 && column + 2 < length) { // NW
                    data.push([row - 1, column + 2])
                }
                if (row - 2 >= 0 && row - 2 < length && column + 1 >= 0 && column + 1 < length) { // NW
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

    travel(start, end) {
        if (typeof start !== 'object' && typeof end !== 'object') {
            if (start.length !== 2 && end.length !== 2)
            return new Error('Bad input!')
        }

        start = this.data[this.search[`${start[0]},${start[1]}`]]
        end = this.data[this.search[`${end[0]},${end[1]}`]]

        // Reset visited state before each search
        this.data.forEach((square) => {
            square.visited = false
        })

        const queue = [start]
        const parent = {} // store how we reached each node
        parent[`${start.x},${start.y}`] = null // starting square has no parent

        while (queue.length > 0) {
            const current = queue.shift()

            current.visited = true

            if (current === end) { // reconstruct path
                let path = []
                let node = current

                while (node) {
                    path.push([node.x, node.y]) // end first in path
                    node = parent[`${node.x},${node.y}`] // **most important part to pay attention to -- parent object ends up containing many, many irrelevant nodes, but we want to trace parents back from the end/target therefore skipping those irrelevant nodes
                }
                return path.reverse().join(' ').toString() // reverse path, make printable
            }

            for (let adjacent of current.data) {
                if (!adjacent.visited && !(`${adjacent.x},${adjacent.y}` in parent)) {
                    parent[`${adjacent.x},${adjacent.y}`] = current
                    queue.push(adjacent)
                }
            }
        }

        return new Error("Something went wrong!")
    }
}