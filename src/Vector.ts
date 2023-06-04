export class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x; this.y = y;
    }
    plus(other: Vector) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    times(scale: number) {
        return new Vector(this.x * scale, this.y * scale);
    }
}
