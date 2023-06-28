import {TextMessage} from "./TextMessage";
import {utils} from "./utils";

export class OverworldEvent {

    constructor({map, event}) {
        this.map = map
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        //올바른 사람이 걷기를 완료하면 완료하도록 핸들러를 설정한 다음 이벤트를 해결합니다.
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map,
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true,
        })

        const completeHandler = (e) => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler);
    }

    textMessage(resolve) {
        if (this.event.faceForPlayer) {
            const obj = this.map.gameObjects[this.event.faceForPlayer];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["player"].direction);
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => {
                resolve();
            }
        });
        message.init(document.querySelector(".GameContainer"));
    }

    changeMap(resolve) {
        console.log(window.OverworldMaps[this.event.map])
        this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
        resolve();
    }

    init() {
        return new Promise((resolve) => {
            this[this.event.type](resolve);
        })
    }

}