import {Sprite} from "./Sprite";

import defaultImg from "./images/default_32.png";
import {OverworldEvent} from "./OverworldEvent";

export class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || defaultImg,
            useShadow: config.useShadow || false,
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        setTimeout(() => {
           void this.doBehaviorEvent(map);
        }, 10);
    }

    update() {

    }

    async doBehaviorEvent(map) {
        // 컷신이 실행되는 경우 이벤트를 멈춘다.
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding){
            return;
        }
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        const eventHandler = new OverworldEvent({
            map: map,
            event: eventConfig,
        });
        await eventHandler.init();


        this.behaviorLoopIndex += 1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0;
        }

        await this.doBehaviorEvent(map);
    }
}