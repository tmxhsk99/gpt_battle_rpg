import "./GameContainer.css"
import "../style.css"
import React, {useEffect} from "react";
import {useRef} from "react";

import {OverWorld} from "../module/game/OverWorld";

const GameContainer = () => {
    const gameContainer = useRef(null);

    useEffect(() => {
        const overWorld = new OverWorld({
            element: gameContainer.current,
        });
        overWorld.init();
    }, [])

    return (
        <div ref={gameContainer} className="GameContainer">
            <canvas className="gameCanvas"/>
        </div>
    );
}

export default GameContainer;