import { Vector } from './Vector';

const WOBBLE_SPEED = 8;
const WOBBLE_DISTANCE = 0.07;

export class Coin {
    type = 'coin'
    public pos: Vector;
    public size: Vector;
    private basePos: Vector;
    private wobble: number;
    constructor(pos: Vector) {
        this.basePos = this.pos = pos;
        this.size = new Vector(.6, .6);
        this.wobble = Math.random() * Math.PI * 2;
    }
    act(step: number) {
        this.wobble += step * WOBBLE_SPEED;
        const wobblePos = Math.sin(this.wobble) * WOBBLE_DISTANCE;
        this.pos = this.basePos.plus(new Vector(0, wobblePos));
    }
}
