import {Vector} from "./Vector";
import {Level} from "./Level";
import {Actor} from "./Actor";

export class Lava implements Actor {
    type = 'Lava'
    public pos: Vector;
    public size: Vector
    private speed: Vector;
    public repeatPos: Vector | undefined;
    constructor(pos: Vector, ch: string) {
        this.pos = pos;
        this.size = new Vector(1, 1);
        if (ch === "=")
            this.speed = new Vector(2, 0);
        else if (ch === '|')
            this.speed = new Vector(0, 2);
        else if (ch === 'v') {
            this.speed = new Vector(0, 3);
            this.repeatPos = pos;
        }
        else {
            this.speed = new Vector(0, 0);
        }
    }
    act(step: number, level: Level) {
        const newPos = this.pos.plus(this.speed.times(step));
        if (!level.obstacleAt(newPos, this.size))
            this.pos = newPos;
        else if (this.repeatPos)
            this.pos = this.repeatPos;
        else
            this.speed = this.speed.times(-1);
    }
}
