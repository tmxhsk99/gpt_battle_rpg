import lvImg from "../images/ui/lv.png";
export class Combatant {
    constructor(poketmonInfo,team, battle) {
        this.poketmon = poketmonInfo;
        this.team = team;
        this.battle = battle;
    }

    createElement() {

        this.hudElement = document.createElement('div');
        this.assignTeamSpecificClass(this.hudElement,this.team);
        const imgPokemonImgSrc = this.getPokemonImageSource(this.team);

        this.hudElement.setAttribute("data-combatant", this.id);
        this.hudElement.setAttribute("data-team", this.team);

        this.hudElement.innerHTML = (`
          <p class="Combatant_name">
                ${this.poketmon.name + this.poketmon.sex}
                <img src=${lvImg}>
                ${this.poketmon.level}
          </p>
            <img class="Combatant_character" alt="${this.poketmon.name}" src="${imgPokemonImgSrc}" />
          </div>
          <svg viewBox="0 0 26 3" class="Combatant_life-container">
            <rect x=0 y=0 width="100%" height=1 fill="#82ff71" />
            <rect x=0 y=1 width="100%" height=2 fill="#3ef126" />
          </svg>
          <svg viewBox="0 0 26 2" class="Combatant_xp-container">
            <rect x=0 y=0 width="100%" height=1 fill="#ffd76a" />
            <rect x=0 y=1 width="100%" height=1 fill="#ffc934" />
          </svg>
          <p class="Combatant_status">${this.poketmon.status}</p>
        `);

    }

    /**
     * 팀에 따른 클래스를 지정한다.
     * @param element
     * @param teamType
     */
    assignTeamSpecificClass(element, teamType){
        if(teamType === "player"){
            element.classList.add('Combatant');
        }else{
            element.classList.add('CombatantEnemy');
        }
    }

    /**
     * 팀에 따른 이미지 소스를 반환한다.
     * @param teamType
     * @returns {null}
     */
    getPokemonImageSource(teamType) {
        let resultImgSrc = null;
        if(teamType === "player"){
            resultImgSrc = this.poketmon.backSrc;
        }else{
            resultImgSrc = this.poketmon.frontSrc;
        }
        return resultImgSrc;
    }

    init(container) {
        this.createElement();
        container.appendChild(this.hudElement);

    }
}