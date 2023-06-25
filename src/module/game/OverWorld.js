import myRoom from "./images/maps/myRoom.png";

import playerImage from "./images/characters/people/player.png";
import npc1Image from "./images/characters/people/npc1.png";
import {GameObject} from "./GameObject";

export class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 192;
        this.canvas.height = 192;
    }

    init() {
        const image = new Image();
        image.src = myRoom;
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };

        //Place some Game Objects
        const player = new GameObject({
            x: 4,
            y: 6,
            src: playerImage,
            useShadow: true,
        });

        const npc1 = new GameObject({
            x: 7,
            y: 9,
            src: npc1Image,
            useShadow: true,
        });
        setTimeout(() => {
            player.sprite.draw(this.ctx);
            npc1.sprite.draw(this.ctx);
        }, 200);


    }
}