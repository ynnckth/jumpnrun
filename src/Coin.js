import { Vector } from './Vector.js';
import { wobbleSpeed, wobbleDist } from './constants.js';

export class Coin {
    constructor(pos) {
        this.basePos = this.pos = pos;
        this.size = new Vector(.6, .6);
        // take a look back
        this.wobble = Math.random() * Math.PI * 2;
    }
    act(step) {
        this.wobble += step * wobbleSpeed;
        const wobblePos = Math.sin(this.wobble) * wobbleDist;
        this.pos = this.basePos.plus(new Vector(0, wobblePos));
    }
}
Coin.prototype.type = "coin";