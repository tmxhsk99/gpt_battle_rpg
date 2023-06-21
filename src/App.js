import {Route, Routes} from "react-router-dom";

import './App.css';
import React from "react";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/gpt_battle_rpg" element=<Home/>/>
      </Routes>
    </div>

  );
}

export default App;
