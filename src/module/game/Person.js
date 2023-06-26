import {GameObject} from "./GameObject";

export class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {


            //Case: 키보드를 누르고 방향키를 누른상태
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow,
                })
            }
            this.updatedSprite(state);
        }
    }

    startBehavior(state, behavior) {
        // 행동을 체크한다
        this.direction = behavior.direction;
        // 행동이 걷기인경우 이동할 수 있는지 체크한다
        if (behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }

            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
        }

    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }

    updatedSprite() {

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);

    }
}