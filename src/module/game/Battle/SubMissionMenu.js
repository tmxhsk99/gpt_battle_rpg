import  '../Content/Actions';
import {Actions} from "../Content/Actions";

export class SubmissionMenu {
    constructor({caster, enemy, onComplete}) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    decide() {
        this.onComplete({
            action: Actions[this.caster._findPoketmon.sampleSkill[3]],
            target: this.enemy
        });
    }

    init(container) {
        this.decide();
    }
}
