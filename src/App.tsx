import React, {  useState } from "react";
import styles from "./App.module.scss";
import { Game } from "./components/Game";
import { Sandbox } from "./components/Sandbox";
import { GameStateContext,  useGameStateReducer } from "./gameContext";

type Route = "Sandbox" | "Game";

function App() {
    // quick and dirty routing; TODO replace with react router
    const [route, setRoute] = useState<Route>("Game");

    const gameState = useGameStateReducer();

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>Deck of Cards</h1>
                <nav>
                    <ul>
                        <li className={route === "Game" ? styles.selected : ""} onClick={() => setRoute("Game")}>
                            Game
                        </li>
                        <li className={route === "Sandbox" ? styles.selected : ""} onClick={() => setRoute("Sandbox")}>
                            Sandbox
                        </li>
                    </ul>
                </nav>
            </header>
            <GameStateContext.Provider value={gameState}>
                {route === "Sandbox" ? <Sandbox /> : <Game />}
            </GameStateContext.Provider>
        </div>
    );
}

export default App;
