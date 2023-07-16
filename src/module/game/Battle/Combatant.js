import lvImg from "../images/ui/lv.png";

export class Combatant {
    constructor(poketmonInfo, team, battle) {
        this.poketmon = poketmonInfo;
        this.team = team;
        this.battle = battle;
    }

    get hpPercent() {
        const percent = this.poketmon._currentHp / this.poketmon._h * 100;
        return percent > 0 ? percent : 0;
    }

    get xpPercent() {
        return this.poketmon._xp / this.poketmon._maxXp * 100;
    }

    get isActive() {
        return this.battle.activeCombatants[this.team] === this.id;
    }

    createElement() {

        this.hudElement = document.createElement('div');
        this.assignTeamSpecificClass(this.hudElement, this.team);
        const imgPokemonImgSrc = this.getPokemonImageSource(this.team);

        this.hudElement.setAttribute("data-combatant", this.id);
        this.hudElement.setAttribute("data-team", this.team);

        this.hudElement.innerHTML = (`
          <p class="Combatant_name"></p>
            
            ${this.team === "player" ? `<p class="Player_Hp_Number"></p>` : ``}
            
          <svg viewBox="0 0 48 3" class="Combatant_life-container">
            <rect x=0 y=1 width="100%" height=2 fill="#00B800"/>
          </svg>
          
          <svg viewBox="0 0 48 2" class="Combatant_xp-container">     
            <rect x=0 y=1 width="100%" height=2 fill="#2088F8" />
          </svg>
          
          <p class="Combatant_status"></p>
        `);
        this.poketmonElement = document.createElement("img");
        this.poketmonElement.classList.add("Combatant_character");
        this.poketmonElement.setAttribute("src", imgPokemonImgSrc);
        this.poketmonElement.setAttribute("alt", this.poketmon.name);
        this.poketmonElement.setAttribute("data-team", this.team);

        this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect");
        this.xpFills = this.hudElement.querySelectorAll(".Combatant_xp-container > rect");
        this.hpNumber = this.hudElement.querySelector(".Player_Hp_Number");
    }

    /**
     * 팀에 따른 클래스를 지정한다.
     * @param element
     * @param teamType
     */
    assignTeamSpecificClass(element, teamType) {
        if (teamType === "player") {
            element.classList.add('Combatant');
        } else {
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
        if (teamType === "player") {
            resultImgSrc = this.poketmon.backSrc;
        } else {
            resultImgSrc = this.poketmon.frontSrc;
        }
        return resultImgSrc;
    }

    /**
     * hp 값 업데이트
     */
    hpUpdate(hp) {
        if (hp) {
            this.poketmon._currentHp = hp;
        }
    }

    /**
     * 포켓몬 배틀시 상태 업데이트
     */
    stateUpdate({hp}) {
        this.hpUpdate(hp);

    }


    update(changes = {}) {
        this.stateUpdate(changes);
        this.hudElement.setAttribute("data-active", this.isActive);
        //level 업데이트
        this.hudElement.querySelector(".Combatant_name").innerHTML =
            `${this.poketmon.name + this.poketmon.sex}<img src=${lvImg}>&nbsp;<b>${this.poketmon.level}</b>`
        // hp 바 업데이트
        this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`);
        // hp 숫자 업데이트
        if (this.hpNumber != null) {
            this.hpNumber.innerHTML = `${this.poketmon.currentHp + "&nbsp;&nbsp;&nbsp;&nbsp;" + this.poketmon._h}`;
        }
        // 경험치 바 업데이트
        this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`);

        // 상태 업데이트
        const statusElement = this.hudElement.querySelector(".Combatant_status");
        if (this.poketmon.status === "정상") {
            statusElement.innerText = this.poketmon.status;
            statusElement.style.display = "block"
        } else {
            statusElement.style.display = "none";
        }


    }

    init(container) {
        this.createElement();
        container.appendChild(this.hudElement);
        this.hudElement.appendChild(this.poketmonElement);
        this.update();
    }
}
