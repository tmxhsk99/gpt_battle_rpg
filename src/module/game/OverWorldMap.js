import myHome_1F_lower from "./images/maps/myHome_1F_lower.png"
import myHome_1F_upper from "./images/maps/myHome_1F_upper.png"
import myHome_2F_upper from "./images/maps/myHome_2F_upper.png"
import myHome_2F_middle from "./images/maps/myHome_2F_middle.png"
import myHome_2F_lower from "./images/maps/myHome_2F_lower.png"
import playerImage from "./images/characters/people/player.png";
import npc1Image from "./images/characters/people/npc1.png";
import npc2Image from "./images/characters/people/npc2.png";
import npc3Image from "./images/characters/people/npc3.png";
import {utils} from "./utils";
import {Person} from "./Person";
import {OverworldEvent} from "./OverworldEvent";

export class OverWorldMap {

    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.isCutscenePlaying = config.isCutscenePlaying|| false;

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
            void utils.withGrid(10.5) - cameraPerson.x,
            void utils.withGrid(6) - cameraPerson.y,
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
      Object.keys(this.gameObjects).forEach(key => {
        let object = this.gameObjects[key];
        object.id = key;
        object.mount(this);

      })
    }

    /**
     * 이벤트 처리 컷신 함수
     * @param events
     * @returns {Promise<void>}
     */
    async startCutscene(events) {
        this.isCutscenePlaying = true;

        for(let i = 0; i < events.length; i++){
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            });
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;
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
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
                src: playerImage,
                useShadow: true,
            }),
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: npc1Image,
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "walk", direction: "up", time: 300},
                    {type: "walk", direction: "down", time: 300},
                ],
            }),
            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(7),
                src: npc2Image,
                useShadow: true,
                behaviorLoop: [
                    {type: "walk", direction: "left"},
                    {type: "stand", direction: "up", time: 800},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "down"},
                ],
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