import React, { useState } from "react";
import "./App.css";

const ROWS = 5; // Number of rows in the grid
const COLS = 5; // Number of columns in the grid
const NUM_MINES = 5; // Number of mines

// Generate a grid with random mines
const generateGrid = () => {
    const grid = Array(ROWS)
        .fill()
        .map(() => Array(COLS).fill({ isMine: false, revealed: false }));

    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);

        if (!grid[row][col].isMine) {
            grid[row][col] = { isMine: true, revealed: false };
            minesPlaced++;
        }
    }

    return grid;
};

function App() {
    const [grid, setGrid] = useState(generateGrid());
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");

    const revealCell = (row, col) => {
        if (gameOver || grid[row][col].revealed) return;

        if (grid[row][col].isMine) {
            setGameOver(true);
            setMessage("You hit a mine! Game Over.");
            revealMines();
        } else {
            const newGrid = [...grid];
            newGrid[row][col] = { ...newGrid[row][col], revealed: true };
            setGrid(newGrid);
        }
    };

    const revealMines = () => {
        const newGrid = grid.map(row =>
            row.map(cell => ({
                ...cell,
                revealed: cell.isMine ? true : cell.revealed
            }))
        );
        setGrid(newGrid);
    };

    const resetGame = () => {
        setGrid(generateGrid());
        setGameOver(false);
        setMessage("");
    };

    return (
        <div className="App">
            <h1>Stake Mines Game</h1>
            <div className="grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`cell ${cell.revealed ? "revealed" : ""} ${
                                    cell.isMine && cell.revealed ? "mine" : ""
                                }`}
                                onClick={() => revealCell(rowIndex, colIndex)}
                            >
                                {cell.revealed && cell.isMine ? "💣" : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {gameOver && <p className="message">{message}</p>}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default App;