import Chessboard from './Chessboard'

const test = new Chessboard(8)

console.log('adjacency list', test.data)
console.log('search', test.search)
console.log('search 0,0', test.search['0,0'])
console.log('search 7,7', test.search['7,7'])

test.travel([0,0],[2,1])