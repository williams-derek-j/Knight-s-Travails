export default class Square {
    constructor(coords, data) {
        this.coords = coords
        this.x = coords[0];
        this.y = coords[1];

        this.data = data // data is a list of squares connected by the Knight's moveset (i.e., adjacent in the graph)

        this.visited = false
    }
}
