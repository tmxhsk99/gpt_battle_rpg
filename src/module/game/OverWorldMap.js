import myHome_1F_lower from "./images/maps/myHome_1F_lower.png"
import myHome_1F_upper from "./images/maps/myHome_1F_upper.png"
import myHome_2F_upper from "./images/maps/myHome_2F_upper.png"
import myHome_2F_middle from "./images/maps/myHome_2F_middle.png"
import myHome_2F_lower from "./images/maps/myHome_2F_lower.png"
import {GameObject} from "./GameObject";
import playerImage from "./images/characters/people/player.png";
import npc1Image from "./images/characters/people/npc1.png";
import npc2Image from "./images/characters/people/npc2.png";
import npc3Image from "./images/characters/people/npc3.png";

export class OverWorldMap {

    constructor(config) {
        this.gameObject = config.gameObject;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.middleImage = new Image();
        this.middleImage.src = config.middleSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0,);
    }

    drawMiddleImage(ctx) {
        ctx.drawImage(this.middleImage, 0, 0,);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0,);
    }
}

window.OverWorldMap = {
    myHome1F: {
        lowerSrc: myHome_1F_lower,
        upperSrc: myHome_1F_upper,
        gameObject: {
            player: new GameObject({
                x: 4,
                y: 6,
                src: playerImage,
                useShadow: true,
            }),
            npc1: new GameObject({
                x: 7,
                y: 9,
                src: npc1Image,
                useShadow: true,
            }),


        }
    },
    myHome2F: {
        lowerSrc: myHome_2F_lower,
        middleSrc: myHome_2F_middle,
        upperSrc: myHome_2F_upper,
        gameObject: {
            player: new GameObject({
                x: 3,
                y: 5,
                src: playerImage,
                useShadow: true,
            }),
            npcA: new GameObject({
                x: 9,
                y: 6,
                src: npc2Image,
                useShadow: true,
            }),
            npcB: new GameObject({
                x: 10,
                y: 8,
                src: npc3Image,
                useShadow: true,
            }),
        }
    },
}