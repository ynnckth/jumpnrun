import {Vector} from "./Vector";
import {gravity, jumpSpeed, playerXSpeed} from "./constants";
import {Level} from "./Level";
import {Actor} from "./Actor";

export class Player implements Actor {
    type = 'player'
    pos: Vector;
    size: Vector;
    private speed: Vector;
    constructor(pos: Vector) {
        this.pos = pos.plus(new Vector(0, -.5));
        this.size = new Vector(.5, 1);
        this.speed = new Vector(0, 0);
    }

    moveX(step: number, level: Level, keys: any) {
        this.speed.x = 0;
        if (keys.left)
            this.speed.x -= playerXSpeed;
        if (keys.right)
            this.speed.x += playerXSpeed;

        var motion = new Vector(this.speed.x * step, 0);
        var newPos = this.pos.plus(motion);
        var obstacle = level.obstacleAt(newPos, this.size);
        if (obstacle)
            level.playerTouched(obstacle);

        else
            this.pos = newPos;
    }

    moveY(step: number, level: Level, keys: any){
        this.speed.y += step * gravity;
        const motion = new Vector(0, this.speed.y * step);
        const newPos = this.pos.plus(motion);
        const obstacle = level.obstacleAt(newPos, this.size);
        if (obstacle) {
            level.playerTouched(obstacle);
            if (keys.up && this.speed.y > 0)
                this.speed.y = -jumpSpeed;

            else
                this.speed.y = 0;
        } else {
            this.pos = newPos;
        }
    }
    
    act(step: number, level: Level, keys: any) {
        this.moveX(step, level, keys);
        this.moveY(step, level, keys);

        const otherActor = level.actorAt(this);
        if (otherActor) {
            level.playerTouched(otherActor.type, otherActor);
        }

        // Losing animation
        if (level.status == "lost") {
            this.pos.y += step;
            this.size.y -= step;
        }
    }
}