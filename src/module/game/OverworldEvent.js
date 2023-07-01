import {TextMessage} from "./TextMessage";
import {utils} from "./utils";
import {SceneTransition} from "./SceneTransition";
import {Battle} from "./Battle/Battle";

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

    /**
     * 맵 변경 이벤트 처리
     * @param resolve
     */
    changeMap(resolve) {
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".GameContainer"), () => {
            this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
            resolve();

            sceneTransition.fadeOut();

        })
    }

    /**
     * 배틀 시작시 이벤트 처리
     * @param resolve
     */
    battle(resolve){
        const battle = new Battle({
            onComplete: () => {
                resolve();
            }
        })
        battle.init(document.querySelector(".GameContainer"));
    }
    
    init() {
        return new Promise((resolve) => {
            this[this.event.type](resolve);
        })
    }

}