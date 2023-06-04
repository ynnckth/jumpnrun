import {Level} from "./Level";
import {Vector} from "./Vector";

export interface Actor {
    type: string;
    pos: Vector;
    size: Vector;
    act(step: number, level: Level, keys?: any): void;
}