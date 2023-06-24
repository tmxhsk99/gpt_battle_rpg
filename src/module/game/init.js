import {OverWorld} from "./OverWorld";

export const initGame = function () {
    const overWorld = new OverWorld({
        element: document.querySelector(".GameContainer"),
    });
    overWorld.init();
};
