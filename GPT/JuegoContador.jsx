import { useState, useEffect } from "react";

export default function JuegoContador() {
  const [gameState, setGameState] = useState("idle");
  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [countdownText, setCountdownText] = useState("");

  const startGame = () => {
    setGameState("countdown");
    setCountdownText("Preparados");

    setTimeout(() => setCountdownText("Listos"), 1000);
    setTimeout(() => setCountdownText("Ya"), 2000);

    setTimeout(() => {
      setGameState("playing");
      setCount(0);
      setTimeLeft(5);
    }, 3000);
  };

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const endGame = () => {
    setGameState("idle");
    if (count > maxScore) {
      setMaxScore(count);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>JuegoContador</h1>

      <button onClick={startGame} disabled={gameState !== "idle"}>
        Iniciar
      </button>

      <button
        onClick={() => setCount(count + 1)}
        disabled={gameState !== "playing"}
      >
        Click!
      </button>

      <h2>Puntaje actual: {count}</h2>
      <h2>Máximo: {maxScore}</h2>

      {gameState === "countdown" && <h2>{countdownText}</h2>}
      {gameState === "playing" && <h2>Tiempo restante: {timeLeft}s</h2>}
    </div>
  );
}
