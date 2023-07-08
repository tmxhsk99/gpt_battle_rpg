import {resolvePath} from "react-router-dom";
import {TextMessage} from "../TextMessage";
import {SubmissionMenu} from "./SubMissionMenu";
import {utils} from "../utils";
import {BattleAnimation} from "./BattleAnimation";

export class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve) {
        const text = this.event.text
            .replace("{CASTER}", this.event.caster?.poketmon.name)
            .replace("{TARGET}", this.event.target?.name)
            .replace("{ACTION}", this.event.action?.name)

        const message = new TextMessage({
            text: text,
            onComplete: () => {
                resolve();
            }
        })
        message.init(this.battle.element);
    }

    async stateChange(resolve) {
        const {caster, target, damage} = this.event;
        if (damage) {
            //target의 hp를 damage만큼 깎는다.
            target.update({
                hp: target.poketmon.currentHp - damage,
            })
            //대미지 이펙트
            target.poketmonElement.classList.add("battle-damage-blink");
        }
        await utils.wait(600);
        target.poketmonElement.classList.remove("battle-damage-blink");
        resolve();
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster.poketmon,
            enemy: this.event.enemy,
            onComplete: submission => {
                resolve(submission);
            }
        });
        menu.init(this.battle.element);
    }
    animation (resolve){
        const func = BattleAnimation[this.event.animation];
        func(this.event, resolve);
    }
    init(resolve) {
        this[this.event.type](resolve);
    }

}
