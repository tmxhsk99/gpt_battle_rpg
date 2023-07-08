import {utils} from "../utils";

export const BattleAnimation = {
    async teraBurst(event,onComplete){
        const element = event.caster.poketmonElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
        element.classList.add(animationClassName);

        //애니메이션이 완전히 완료되면 클래스 제거
        element.addEventListener("animationend", () => {
          element.classList.remove(animationClassName);
        }, { once:true });

        //피자가 충돌할 때 바로 전투 주기를 계속합니다.
        await utils.wait(100);
        onComplete();
    }
}
