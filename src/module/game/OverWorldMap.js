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
import {utils} from "./utils";
import {Person} from "./Person";

export class OverWorldMap {

    constructor(config) {
        this.gameObject = config.gameObject;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        if (config.middleSrc) {
            this.middleImage = new Image();
            this.middleImage.src = config.middleSrc;
        }

        if (config.upperSrc) {
            this.upperImage = new Image();
            this.upperImage.src = config.upperSrc;
        }

    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y,
        );
    }

    drawMiddleImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.middleImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y,
        );
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y,
        );
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nexPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.values(this.gameObject).forEach(object => {
            object.mount(this);
        })
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasyY, direction) {
        this.removeWall(wasX, wasyY)
        const {x, y} = utils.nexPosition(wasX, wasyY, direction);
        this.addWall(x, y);
    }
}

window.OverWorldMap = {
    myHome1F: {
        lowerSrc: myHome_1F_lower,
        upperSrc: myHome_1F_upper,
        gameObject: {
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
                src: playerImage,
                useShadow: true,
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: npc1Image,
                useShadow: true,
            }),
        },
        walls: {
            [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
        },
    },
    myHome2F: {
        lowerSrc: myHome_2F_lower,
        middleSrc: myHome_2F_middle,
        upperSrc: myHome_2F_upper,
        gameObject: {
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(5),
                src: playerImage,
                useShadow: true,
            }),
            npcA: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: npc2Image,
                useShadow: true,
            }),
            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: npc3Image,
                useShadow: true,
            }),
        }
    },
}