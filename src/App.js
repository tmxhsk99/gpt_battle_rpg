import {Route, Router, Routes} from "react-router-dom";
import './App.css';
import React from "react";
import Home from "./pages/Home";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/gpt_battle_rpg" element={<Home/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>

    );
}
export default App;
