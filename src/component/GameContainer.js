import "./GameContainer.css"
import "../style.css"
import React, {useEffect} from "react";
import { useRef } from "react";

import {OverWorld} from "../module/game/OverWorld";

const GameContainer = () => {
    const gameContainer = useRef(null);
    const gameCanvas = useRef(null);

    useEffect(() => {
        console.log(gameContainer.current);
        const overWorld = new OverWorld({
            element: gameContainer.current,
            canvas: gameCanvas.current,
        });
        overWorld.init();
    },[gameContainer.current])
    return (
            <div ref={gameContainer} className="GameContainer">
                <canvas ref={gameCanvas} className="gameCanvas"></canvas>
            </div>
    );
}

export default GameContainer;