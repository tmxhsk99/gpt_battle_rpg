import { OverWorldMap } from "./OverWorldMap.js";
import {DirectionInput} from "./DirectionInput";

export class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
        this.canvas.width = 192;
        this.canvas.height = 192;
    }

    startGameLoop() {
        const step = () => {
            // 캔버스를 지운다.
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // 캔버스의 lower 레이어를 그린다.
            this.map.drawLowerImage(this.ctx);

            // 캔버스에 게임 오브젝트를 그린다.
            Object.values(this.map.gameObject).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                });
                object.sprite.draw(this.ctx);
            });
            // 캔버스 middle 레이어를 그린다.
            this.map.drawMiddleImage(this.ctx);

            // 캔버스의 upper 레이어를 그린다.
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => {
                step();
            })
        }

        step();
    }
    init() {
        this.map = new OverWorldMap(window.window.OverWorldMap.myHome2F);
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
    }
}