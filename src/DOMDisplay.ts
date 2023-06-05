import {Level} from "./Level";
import {scale} from "./constants";

const createElement = (name: string, className?: string) => {
    const elem = document.createElement(name);
    if(className) elem.className = className;
    return elem;
}

export class DOMDisplay {
    public level: Level;
    public wrap: HTMLElement;
    public actorLayer: HTMLElement | null;
    constructor(parent: any, level: Level) {
        this.wrap = parent.appendChild(createElement("div", "game"));
        this.level = level;

        this.wrap.appendChild(this.drawBackground());
        this.actorLayer = null;
        this.drawFrame();
    }
    drawBackground() {
        var table = createElement("table", "background");
        table.style.width = this.level.width * scale + "px";
        table.style.height = this.level.height * scale + "px";
        this.level.grid.forEach(function (row) {
            var rowElement = table.appendChild(createElement("tr"));
            rowElement.style.height = scale + "px";
            row.forEach(function (type: string) {
                rowElement.appendChild(createElement("td", type));
            });
        });
        return table;
    }
    drawActors() {
        var wrap = createElement("div");
        this.level.actors.forEach(function (actor) {
            var rect = wrap.appendChild(createElement("div", "actor " + actor.type));
            rect.style.width = actor.size.x * scale + "px";
            rect.style.height = actor.size.y * scale + "px";
            rect.style.left = actor.pos.x * scale + "px";
            rect.style.top = actor.pos.y * scale + "px";
        });
        return wrap;
    }
    drawFrame() {
        if (this.actorLayer)
            this.wrap.removeChild(this.actorLayer);
        this.actorLayer = this.wrap.appendChild(this.drawActors());
        this.wrap.className = "game " + (this.level.status || "");
        this.scrollPlayerIntoView();
    }
    // clear it later
    scrollPlayerIntoView() {
        const width = this.wrap.clientWidth;
        const height = this.wrap.clientHeight;
        const margin = width / 3;

        // The viewport
        const left = this.wrap.scrollLeft, right = left + width;
        const top = this.wrap.scrollTop, bottom = top + height;

        const player = this.level.player;
        const center = player.pos.plus(player.size.times(0.5))
            .times(scale);

        if (center.x < left + margin)
            this.wrap.scrollLeft = center.x - margin;
        else if (center.x > right - margin)
            this.wrap.scrollLeft = center.x + margin - width;
        if (center.y < top + margin)
            this.wrap.scrollTop = center.y - margin;
        else if (center.y > bottom - margin)
            this.wrap.scrollTop = center.y + margin - height;
    }
    clear() {
        this.wrap.parentNode?.removeChild(this.wrap);
    }
}
