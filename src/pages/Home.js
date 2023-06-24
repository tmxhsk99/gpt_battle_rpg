import "./Home.css";
import GameContainer from "../component/GameContainer";
import React from "react";
const Home = () => {
    return (
        <div>
            <h1>메인 게임</h1>
            <div className="container">
                <GameContainer/>
            </div>

        </div>
    );
}

export default Home;