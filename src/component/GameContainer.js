import "./GameContainer.css"
import "../module/game/style/global.css"
import "../module/game/style/TextMessage.css"
import React, {useEffect} from "react";
import {useRef} from "react";

import {Overworld} from "../module/game/Overworld";

const GameContainer = () => {
    const gameContainer = useRef(null);

    useEffect(() => {
        const overWorld = new Overworld({
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