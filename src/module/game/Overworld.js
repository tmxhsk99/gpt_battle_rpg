import {DirectionInput} from "./DirectionInput";
import {KeyPressListener} from "./KeyPressListener";
import {OverworldMap} from "./OverworldMap";

export class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
        this.canvas.width = 350;
        this.canvas.height = 192;
    }

    startGameLoop() {
        const step = () => {
            // 캔버스를 지운다.
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const cameraPerson = this.map.gameObjects.player;

            // 게임 오브젝트를 업데이트 한다.
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            })

            // 캔버스의 lower 레이어를 그린다.
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // 캔버스에 게임 오브젝트를 그린다. 남쪽에 있는 오브젝트가 나중에 그지도록 정렬
            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            });
            // 캔버스 middle 레이어를 그린다.
            // middleLayer는 없을 수도 있다.
            if (this.map.middleImage) {
                this.map.drawMiddleImage(this.ctx, cameraPerson);
            }

            // 캔버스의 upper 레이어를 그린다.
            if (this.map.upperImage) {
                this.map.drawUpperImage(this.ctx, cameraPerson);
            }

            requestAnimationFrame(() => {
                step();
            })
        }

        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            this.map.checkForActionCutscene();
        });

    }

    bindPlayerPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "player") {
                // player 위치 변경시 맵 이벤트를 체크한다.
                this.map.checkForFootstepCutscene();
            }
        })
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }

    init() {
        this.startMap(window.OverworldMaps.myHome1F);
        this.bindActionInput();
        this.bindPlayerPositionCheck()

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        // 맵 이벤트 바인딩
        /*        void this.map.startCutscene([
                   {who: "player", type: "walk", direction: "down"},
                    {who: "player", type: "walk", direction: "down"},
                    {who: "player", type: "stand", direction: "down", time: 200},
                    {who: "npcA", type: "walk", direction: "up"},
                    {who: "npcA", type: "walk", direction: "left"},
                    {who: "npcA", type: "walk", direction: "left"},
                    {who: "player", type: "stand", direction: "right", time: 200},
                    {type: "textMessage", text: "잠깐 나가기 전에 배틀이야!\n준비되었어?"},
                ])*/
        this.startGameLoop();

    }
}