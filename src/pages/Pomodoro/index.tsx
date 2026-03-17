import {useEffect} from "react";
import type { PomodoroMode } from "../../hooks/useTimer";
import {usePomodoroTimer} from "../../hooks/useTimer";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

const MODE_LABELS: Record<PomodoroMode, string> = {
  focus: "Foco",
  shortBreak: "Pausa Curta",
  longBreak: "Pausa Longa",
};

export default function PomodoroPage(){
const {
    mode,
    setMode,
    timeLeft,
    isRunning,
    settings,
    completedFocusSessions,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    updateSetting,
    requestNotificationPermission,
  } = usePomodoroTimer();

  useEffect(() =>{
    document.title = `${formatTime(timeLeft)} • ${MODE_LABELS[mode]}`;
  }, [timeLeft, mode])

    return(
        <section className="relative overflow-hidden">
            <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-12 sm:px-10">
                <h1 className="text-4xl font-semibold leading-tight text-slate-100 sm:text-5xl">
                    Pomodoro Timer
                </h1>
                <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100 ">
                    Modo: {MODE_LABELS[mode]}
                </span>
            </div>
            <h1>
               {formatTime(timeLeft)} 
            </h1>
            <div className="h-full bg-green-400 transition-all duration-300" style={{width: `${progress}`}} />
            <div>
                <button onClick={() => setMode("focus")}>Foco</button>
                <button onClick={() => setMode("shortBreak")}>Pausa Curta</button>
                <button onClick={() => setMode("longBreak")}>Pausa Longa</button>
            </div>
            <div>
                {!isRunning ? (
                <button onClick={startTimer}>Iniciar</button>
                ) : (
                <button onClick={pauseTimer}>Pausar</button>
                )}

                <button onClick={resetTimer}>Resetar</button>
                <button onClick={skipSession}>Pular</button>
                <button onClick={requestNotificationPermission}>
                Ativar notificações
                </button>
            </div>

            <p>Pomodoros concluídos: {completedFocusSessions}</p>

            <div>
                <input
                type="number"
                value={settings.focus}
                onChange={(e) => updateSetting("focus", e.target.value)}
                />

                <input
                type="number"
                value={settings.shortBreak}
                onChange={(e) => updateSetting("shortBreak", e.target.value)}
                />

                <input
                type="number"
                value={settings.longBreak}
                onChange={(e) => updateSetting("longBreak", e.target.value)}
                />

                <input
                type="number"
                value={settings.roundsUntilLongBreak}
                onChange={(e) =>
                    updateSetting("roundsUntilLongBreak", e.target.value)
                }
                />
            </div>
        </section>
    )
}