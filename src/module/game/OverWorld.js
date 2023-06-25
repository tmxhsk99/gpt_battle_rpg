import { OverWorldMap } from "./OverWorldMap.js";
import {DirectionInput} from "./DirectionInput";

export class OverWorld {
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

            const cameraPerson = this.map.gameObject.player;

            // 게임 오브젝트를 업데이트 한다.
            Object.values(this.map.gameObject).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                });
            })

            // 캔버스의 lower 레이어를 그린다.
            this.map.drawLowerImage(this.ctx,cameraPerson);

            // 캔버스에 게임 오브젝트를 그린다.
            Object.values(this.map.gameObject).forEach(object => {
                object.sprite.draw(this.ctx,cameraPerson);
            });
            // 캔버스 middle 레이어를 그린다.
            // middleLayer는 없을 수도 있다.
            if(this.map.middleImage){
                this.map.drawMiddleImage(this.ctx, cameraPerson);
            }

            // 캔버스의 upper 레이어를 그린다.
            if(this.map.upperImage){
                this.map.drawUpperImage(this.ctx, cameraPerson);
            }

            requestAnimationFrame(() => {
                step();
            })
        }

        step();
    }
    init() {
        this.map = new OverWorldMap(window.window.OverWorldMap.myHome1F);
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
    }
}