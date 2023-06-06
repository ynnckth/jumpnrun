import {Vector} from "./Vector";
import {Level} from "./Level";
import {Actor} from "./Actor";
import {LavaDirection} from "./constants";

export class Lava implements Actor {
    type = 'Lava'
    public pos: Vector;
    public size: Vector
    private speed: Vector;
    public repeatPos: Vector | undefined;
    private readonly direction: LavaDirection;
    constructor(pos: Vector, direction: LavaDirection) {
        this.direction = direction;
        this.pos = pos;
        this.size = new Vector(1, 1);
        if (direction === LavaDirection.Horizontally)
            this.speed = new Vector(2, 0);
        else if (direction === LavaDirection.Vertically)
            this.speed = new Vector(0, 2);
        else if (direction === LavaDirection.Falling) {
            this.speed = new Vector(0, 3);
            this.repeatPos = pos;
        } else if (direction === LavaDirection.Static) {
            this.speed = new Vector(0, 0);
            return;
        }
        else {
            throw new Error('Lava type not supported');
        }
    }
    act(step: number, level: Level) {
        if (this.direction === LavaDirection.Static) {
            return;
        }

        const newPos = this.pos.plus(this.speed.times(step));
        if (!level.obstacleAt(newPos, this.size))
            this.pos = newPos;
        else if (this.repeatPos)
            this.pos = this.repeatPos;
        else
            this.speed = this.speed.times(-1);
    }
}
