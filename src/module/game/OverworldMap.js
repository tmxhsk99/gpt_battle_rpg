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

export class OverworldMap {

    constructor(config) {
        this.overworld = config.overworld || null;
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.isCutscenePlaying = config.isCutscenePlaying || false;

        this.cutsceneSpaces = config.cutsceneSpaces || {};

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

        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            });
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        // NPC가 유휴 동작을 하도록 재설정합니다.
        Object.values(this.gameObjects).forEach(object => {
            object.doBehaviorEvent(this);
        });
    }

    checkForActionCutscene() {
        const player = this.gameObjects["player"];
        const nextCoords = utils.nexPosition(player.x, player.y, player.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            void this.startCutscene(match.talking[0].events);
        }
    }

    /**
     * 플레이어가 이동할때마다 컷신이벤트를 체크하여 실행한다.
     */
    checkForFootstepCutscene(){
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[`${player.x},${player.y}`];
        if(!this.isCutscenePlaying && match ){
            this.startCutscene(match[0].events);
        }
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY)
        const {x, y} = utils.nexPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    myHome1F: {
        lowerSrc: myHome_1F_lower,
        upperSrc: myHome_1F_upper,
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(7),
                y: utils.withGrid(5),
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
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "안녕하세요 이곳은 처음이신가요?", faceForPlayer: "npcA"},
                            {type: "textMessage", text: "그럼 잘 즐기다 가세요!"},
                        ]
                    }
                ]
            }),
            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(7),
                src: npc2Image,
                useShadow: true,
            }),
        },
        walls: {
            [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(10, 4)]: true,
        },
        cutsceneSpaces: {// 특정 좌표시 발생 이벤트
            [utils.asGridCoord(9, 4)]: [
                {
                    events: [
                        {who: "npcB", type: "walk", direction: "up"},
                        {who: "npcB", type: "walk", direction: "up"},
                        {who: "npcB", type: "stand", direction: "up", time: 500},
                        {type: "textMessage", text: "내 피규어에 손대지마!!"},
                        {who: "player", type: "walk", direction: "down"},
                        {who: "npcB", type: "walk", direction: "down"},
                        {who: "npcB", type: "walk", direction: "down"},
                    ]
                }
            ],
            [utils.asGridCoord(10, 5)]: [
                {
                    events: [
                        {who: "npcB", type: "walk", direction: "up"},
                        {who: "npcB", type: "stand", direction: "up", time: 500},
                        {type: "textMessage", text: "내 피규어에 손대지마!!"},
                        {who: "player", type: "walk", direction: "left"},
                        {who: "npcB", type: "walk", direction: "down"},
                    ]
                }
            ],
            [utils.asGridCoord(7, 4)]: [ // 맵 이동 이벤트
                {
                    events: [
                        {type: "changeMap", map: "myHome2F"}
                    ]
                }
            ]
        }
    },
    myHome2F: {
        lowerSrc: myHome_2F_lower,
        middleSrc: myHome_2F_middle,
        upperSrc: myHome_2F_upper,
        gameObjects: {
            player: new Person({
                direction: "up",
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(9),
                src: playerImage,
                useShadow: true,
            }),
            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: npc3Image,
                useShadow: true,
                talking: [
                     {
                         events: [
                             {type: "textMessage", text: "뭘 봐? \n내 독서를 방해하지마!", faceForPlayer: "npcB"},
                         ]
                     }
                 ]
            }),
        }
    },
}