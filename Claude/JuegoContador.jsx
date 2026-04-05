import { useState, useEffect, useRef, useCallback } from "react";

const COUNTDOWN_MESSAGES = ["Preparados", "Listos", "Ya"];
const GAME_DURATION = 5;

export default function JuegoContador() {
  const [phase, setPhase] = useState("idle"); // idle | countdown | playing | finished
  const [countdownIndex, setCountdownIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startGame = useCallback(() => {
    setPhase("countdown");
    setCountdownIndex(0);
    setCount(0);
    setTimeLeft(GAME_DURATION);
    setIsNewRecord(false);

    let step = 0;
    timerRef.current = setInterval(() => {
      step++;
      if (step < COUNTDOWN_MESSAGES.length) {
        setCountdownIndex(step);
      } else {
        clearTimer();
        setPhase("playing");

        let remaining = GAME_DURATION;
        timerRef.current = setInterval(() => {
          remaining--;
          setTimeLeft(remaining);
          if (remaining <= 0) {
            clearTimer();
            setPhase("finished");
          }
        }, 1000);
      }
    }, 1000);
  }, []);

  const handleClick = useCallback(() => {
    if (phase !== "playing") return;
    setCount((prev) => prev + 1);
  }, [phase]);

  useEffect(() => {
    if (phase === "finished") {
      setCount((currentCount) => {
        setMaxScore((prev) => {
          if (currentCount > prev) {
            setIsNewRecord(true);
            return currentCount;
          }
          return prev;
        });
        return currentCount;
      });
    }
  }, [phase]);

  useEffect(() => () => clearTimer(), []);

  const isIdle = phase === "idle";
  const isCountdown = phase === "countdown";
  const isPlaying = phase === "playing";
  const isFinished = phase === "finished";

  return (
    <div className="game-wrapper">
      <div className="game-card">
        <header className="game-header">
          <h1 className="game-title">JuegoContador</h1>
          <p className="game-subtitle">¿Cuántas veces podés clickear en 5 segundos?</p>
        </header>

        <div className="scoreboard">
          <div className="score-item">
            <span className="score-label">Puntaje máximo</span>
            <span className="score-value">{maxScore}</span>
          </div>
          {(isPlaying || isFinished) && (
            <div className="score-item">
              <span className="score-label">Actual</span>
              <span className={`score-value ${isNewRecord && isFinished ? "new-record" : ""}`}>
                {count}
              </span>
            </div>
          )}
        </div>

        <div className="game-center">
          {isIdle && (
            <div className="status-display idle-display">
              <span className="idle-icon">🖱️</span>
              <p className="idle-text">Presioná Iniciar para jugar</p>
            </div>
          )}

          {isCountdown && (
            <div className="status-display countdown-display">
              <span className="countdown-message">{COUNTDOWN_MESSAGES[countdownIndex]}</span>
            </div>
          )}

          {isPlaying && (
            <div className="status-display playing-display">
              <div className="timer-ring">
                <svg viewBox="0 0 100 100" className="timer-svg">
                  <circle cx="50" cy="50" r="44" className="timer-track" />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="timer-progress"
                    strokeDasharray={`${2 * Math.PI * 44}`}
                    strokeDashoffset={`${2 * Math.PI * 44 * (1 - timeLeft / GAME_DURATION)}`}
                  />
                </svg>
                <div className="timer-text">
                  <span className="timer-number">{timeLeft}</span>
                  <span className="timer-label">seg</span>
                </div>
              </div>
              <p className="playing-count">{count} clicks</p>
            </div>
          )}

          {isFinished && (
            <div className="status-display finished-display">
              {isNewRecord ? (
                <>
                  <span className="record-icon">🏆</span>
                  <p className="result-text record-text">¡Nuevo récord!</p>
                </>
              ) : (
                <>
                  <span className="record-icon">🎯</span>
                  <p className="result-text">Terminó el tiempo</p>
                </>
              )}
              <p className="final-count">{count} clicks</p>
            </div>
          )}
        </div>

        <div className="button-row">
          <button
            className="btn btn-start"
            onClick={startGame}
            disabled={isCountdown || isPlaying}
          >
            {isFinished ? "Jugar de nuevo" : "Iniciar"}
          </button>

          <button
            className="btn btn-click"
            onClick={handleClick}
            disabled={!isPlaying}
          >
            ¡Click!
          </button>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .game-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
          padding: 1rem;
        }

        .game-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        }

        .game-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .game-title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .game-subtitle {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.5);
          margin-top: 0.4rem;
        }

        .scoreboard {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .score-item {
          background: rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 0.8rem 1.5rem;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .score-label {
          display: block;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .score-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
        }

        .score-value.new-record {
          color: #ffd700;
        }

        .game-center {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .status-display {
          text-align: center;
          width: 100%;
        }

        .idle-icon { font-size: 3rem; display: block; margin-bottom: 0.75rem; }
        .idle-text { color: rgba(255,255,255,0.5); font-size: 1rem; }

        .countdown-message {
          font-size: 3.5rem;
          font-weight: 800;
          color: #fff;
          animation: pulse 0.5s ease;
        }

        @keyframes pulse {
          from { transform: scale(1.3); opacity: 0.6; }
          to { transform: scale(1); opacity: 1; }
        }

        .timer-ring {
          position: relative;
          width: 130px;
          height: 130px;
          margin: 0 auto 1rem;
        }

        .timer-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .timer-track {
          fill: none;
          stroke: rgba(255,255,255,0.1);
          stroke-width: 8;
        }

        .timer-progress {
          fill: none;
          stroke: #7c3aed;
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dashoffset 1s linear;
        }

        .timer-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .timer-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .timer-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        .playing-count {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
        }

        .record-icon { font-size: 3rem; display: block; margin-bottom: 0.5rem; }

        .result-text {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 0.5rem;
        }

        .record-text { color: #ffd700; font-weight: 700; }

        .final-count {
          font-size: 2.5rem;
          font-weight: 800;
          color: #fff;
        }

        .button-row {
          display: flex;
          gap: 1rem;
        }

        .btn {
          flex: 1;
          padding: 0.9rem;
          border-radius: 14px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-start {
          background: #7c3aed;
          color: #fff;
        }

        .btn-start:not(:disabled):hover {
          background: #6d28d9;
          transform: translateY(-2px);
        }

        .btn-click {
          background: #059669;
          color: #fff;
          font-size: 1.2rem;
        }

        .btn-click:not(:disabled):hover {
          background: #047857;
          transform: translateY(-2px);
        }

        .btn-click:not(:disabled):active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
