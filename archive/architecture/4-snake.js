// We'll represent coordinates as 2-element arrays.
// type Point = [x: Number, y: Number]

// Add two coordinates (2d vector add)
//
// add(a: Point, b: Point) -> Point
const add = ([x0, y0], [x1, y1]) => [x0 + x1, y0 + y1]

// Directions
const UP = [0, 1]
    , DOWN = [0, -1]
    , LEFT = [-1, 0]
    , RIGHT = [1, 0]

// move(snake: [...Point], dir: [x, y]) -> [...Point]
//
// Return a new array of points representing the snake, having
// moved in the direction dir.
const move = ([head, ...tail], dir) =>
  [add(head, dir), head, ...tail.slice(0, -1)]

// grow(snake: [...Point], dir: [x, y]) -> [...Point]
//
// Return a new array of points representing the snake, having
// grown in the direction dir.
const grow = ([head, ...tail], dir) =>
  [add(head, dir), head, ...tail]

console.log(move([[0, 0], [1, 0], [2, 0]], DOWN))
console.log(grow([[0, 0], [1, 0], [2, 0]], UP))

class Snake {
  constructor(coords, direction) {
    this.coords = coords
    this.direction = dir
  }

  turn(dir) {
    return new Snake(this.coords, dir)
  }

  tick() {
    return new Snake(move(this.coords, this.direction),
      this.direction)
  }

  hit(object) {
    if (object.food) {
      return new Snake.Growing(object.food, this.coords, this.direction)
    }
    if (object.fatal) {
      return new Snake.Dead(this.coords)
    }
    return this
  }
}
Snake.prototype.alive = true

Snake.Dead = class extends Snake {
  tick() { return this }
  turn(dir) { return this }
  hit(object) { return this }
}
Snake.Dead.prototype.alive = false

Snake.Growing = class extends Snake {
  constructor(count, ...args) {
    super(args)
    this.count = count
  }

  tick() {
    const NextSnakeType = this.count > 1 ? Snake.Growing : Snake
    return new NextSnakeType(
      grow(this.coords, this.direction),
      this.direction,
      this.count - 1)
  }
}

