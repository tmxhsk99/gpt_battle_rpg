import battlePlayer from "../images/battle/battle_user.png";
import battleEnemy from "../images/battle/npc/battle_npc2.png";
import {Combatant} from "./Combatant";
import {Poketmon} from "../pokedex/Poketmon";
import {TurnCycle} from "./TurnCycle";
import {BattleEvent} from "./BattleEvent";

export class Battle {
    constructor() {
        this.combatants = {
            "player1": new Combatant(
                new Poketmon({
                    pokedexNumber: 3,
                    field: {
                        name: "그래스필드",
                        expiresIn: 5,
                    }
                }),
                "player"
                , this),
            "enemy1": new Combatant(
                new Poketmon(149),
                "enemy"
                , this),
            "enemy2": new Combatant(
                new Poketmon(991)
                , "enemy"
                , this),
        }
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy1",
        }
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('Battle');
        this.element.innerHTML = (`
            <div class="Battle_player">
                <img src=${battlePlayer} alt="player"/>
            </div>
            <div class="Battle_enemy">
                <img src=${battleEnemy} alt="enamy"/>
            </div>
        `)
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        });

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this);
                    battleEvent.init(resolve);
                })
            }
        })

        void this.turnCycle.init();


    }
}
