import {Sprite} from "./Sprite";

import defalutImg from "./images/default_32.png";

export class GameObject {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || defalutImg,
            useShadow: config.useShadow || false,
        });
    }

    update() {

    }
}