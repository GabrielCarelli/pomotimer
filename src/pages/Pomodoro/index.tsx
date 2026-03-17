import { useEffect } from "react";
import type { PomodoroMode } from "../../hooks/useTimer";
import { usePomodoroTimer } from "../../hooks/useTimer";

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
  shortBreak: "Pausa curta",
  longBreak: "Pausa longa",
};

function getModeButtonClass(isActive: boolean): string {
  return [
    "rounded-xl border px-4 py-2 text-sm font-semibold transition-all",
    isActive
      ? "border-cyan-200/60 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/30"
      : "border-white/15 bg-slate-900/70 text-slate-200 hover:border-cyan-200/40 hover:bg-slate-800",
  ].join(" ");
}

const CONTROL_BUTTON_CLASS =
  "rounded-xl border border-white/15 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition-all hover:border-cyan-200/40 hover:bg-slate-800";

export default function PomodoroPage() {
  const {
    mode,
    setMode,
    timeLeft,
    isRunning,
    completedFocusSessions,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    requestNotificationPermission,
  } = usePomodoroTimer();

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - ${MODE_LABELS[mode]}`;
  }, [timeLeft, mode]);

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6 py-10">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-950/70 px-6 py-10 text-center shadow-[0_30px_120px_-60px_rgba(34,211,238,0.65)] backdrop-blur sm:px-10">
        <h1 className="text-3xl font-semibold text-slate-100 sm:text-4xl">
          Pomodoro Timer
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Escolha o modo e mantenha o foco.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            className={getModeButtonClass(mode === "focus")}
            onClick={() => setMode("focus")}
          >
            Foco
          </button>
          <button
            className={getModeButtonClass(mode === "shortBreak")}
            onClick={() => setMode("shortBreak")}
          >
            Pausa curta
          </button>
          <button
            className={getModeButtonClass(mode === "longBreak")}
            onClick={() => setMode("longBreak")}
          >
            Pausa longa
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <div
            className="grid h-72 w-72 place-items-center rounded-full p-2 shadow-[0_20px_80px_-40px_rgba(34,211,238,0.85)]"
            style={{
              background: `conic-gradient(rgba(34,211,238,0.9) ${progress}%, rgba(30,41,59,0.85) ${progress}% 100%)`,
            }}
          >
            <div className="grid h-full w-full place-items-center rounded-full border border-white/10 bg-slate-950/95">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                {MODE_LABELS[mode]}
              </span>
              <strong className="text-6xl font-semibold tabular-nums text-slate-100">
                {formatTime(timeLeft)}
              </strong>
              <span className="text-xs text-slate-400">Tempo restante</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {!isRunning ? (
            <button
              className="rounded-xl border border-cyan-200/60 bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-200"
              onClick={startTimer}
            >
              Iniciar
            </button>
          ) : (
            <button className={CONTROL_BUTTON_CLASS} onClick={pauseTimer}>
              Pausar
            </button>
          )}

          <button className={CONTROL_BUTTON_CLASS} onClick={resetTimer}>
            Resetar
          </button>
          <button className={CONTROL_BUTTON_CLASS} onClick={skipSession}>
            Pular
          </button>
          <button
            className={CONTROL_BUTTON_CLASS}
            onClick={requestNotificationPermission}
          >
            Ativar notificações
          </button>
        </div>

        <p className="mt-6 text-sm text-slate-300">
          Pomodoros concluidos:{" "}
          <span className="font-semibold text-cyan-100">
            {completedFocusSessions}
          </span>
        </p>
      </div>
    </section>
  );
}
