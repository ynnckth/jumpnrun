import { maxStep, actorFactories } from './constants';
import {Vector} from "./Vector";
import {Player} from "./Player";
import {Actor} from "./Actor";

export class Level {
    public player: Player;
    public status: string | null;
    public width: number;
    public height: number;
    public grid: any[];
    public actors: Actor[];
    private finishDelay: number;
    constructor(level: string[]) {
        this.width = level[0].length;
        this.height = level.length;
        this.grid = [];
        this.actors = [];

        for (let y = 0; y < this.height; y++) {
            const line = level[y], gridLine = [];
            for (let x = 0; x < this.width; x++) {
                let ch = line[x], fieldType = null;
                const actorFactory = actorFactories[ch];
                if (actorFactory)
                    this.actors.push(actorFactory(new Vector(x, y)));
                else if (ch === "x")
                    fieldType = "wall";
                gridLine.push(fieldType);
            }
            this.grid.push(gridLine);
        }
        this.player = this.actors.find((actor) => actor.type === "player")! as Player;
        this.status = null;
        this.finishDelay = 0;
    }
    isFinished() {
        return this.status != null && this.finishDelay < 0;
    }
    obstacleAt(pos: Vector, size: Vector) {
        const xStart = Math.floor(pos.x);
        const xEnd = Math.ceil(pos.x + size.x);
        const yStart = Math.floor(pos.y);
        const yEnd = Math.ceil(pos.y + size.y);

        if (xStart < 0 || xEnd > this.width || yStart < 0)
            return "wall";
        if (yEnd > this.height)
            return "lava";
        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const fieldType = this.grid[y][x];
                if (fieldType)
                    return fieldType;
            }
        }
    }
    actorAt(actor: Actor) {
        for (let i = 0; i < this.actors.length; i++) {
            const other = this.actors[i];
            if (other != actor &&
                actor.pos.x + actor.size.x > other.pos.x &&
                actor.pos.x < other.pos.x + other.size.x &&
                actor.pos.y + actor.size.y > other.pos.y &&
                actor.pos.y < other.pos.y + other.size.y)
                return other;
        }
        return undefined;
    }
    animate(step: number, keys: any) {
        if (this.status != null) {
            this.finishDelay -= step;
        }

        while (step > 0) {
            const thisStep = Math.min(step, maxStep);
            this.actors.forEach((actor) => {
                actor.act(thisStep, this, keys);
            }, this);
            step -= thisStep;
        }
    }
    playerTouched(type: string, actor?: Actor) {
        if (type == "lava" || type == "Lava" && this.status == null) {
            this.status = "lost";
            this.finishDelay = 1;
        } else if (type == "coin") {
            this.actors = this.actors.filter((other) => {
                return other != actor;
            });
            if (!this.actors.some((actor) => {
                return actor.type == "coin";
            })) {
                this.status = "won";
                this.finishDelay = 1;
            }
        }
    }
}
