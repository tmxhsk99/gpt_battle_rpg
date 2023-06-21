import "./Home.css";
import Game from "../component/Game";

const Home = () => {
    return (
        <div>
            <h1>메인 게임</h1>
            <div className="containser">
                <Game/>
            </div>

        </div>
    );
}

export default Home;