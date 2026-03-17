import { useEffect, useMemo, useRef, useState } from "react";

export type PomodoroMode = "focus" | "shortBreak" | "longBreak";

export interface PomodoroSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
  roundsUntilLongBreak: number;
}

interface UsePomodoroTimerReturn {
  mode: PomodoroMode;
  setMode: (nextMode: PomodoroMode) => void;
  timeLeft: number;
  isRunning: boolean;
  settings: PomodoroSettings;
  completedFocusSessions: number;
  progress: number;
  totalTimeForCurrentMode: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  updateSetting: (key: keyof PomodoroSettings, value: number | string) => void;
  requestNotificationPermission: () => void;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  roundsUntilLongBreak: 4,
};

function getInitialSettings(): PomodoroSettings {
  const saved = localStorage.getItem("pomodoro-settings");

  if (!saved) return DEFAULT_SETTINGS;

  try {
    const parsed = JSON.parse(saved) as Partial<PomodoroSettings>;

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function getSecondsByMode(
  mode: PomodoroMode,
  settings: PomodoroSettings
): number {
  if (mode === "focus") return settings.focus * 60;
  if (mode === "shortBreak") return settings.shortBreak * 60;
  return settings.longBreak * 60;
}

export function usePomodoroTimer(): UsePomodoroTimerReturn {
  const [settings, setSettings] = useState<PomodoroSettings>(getInitialSettings);
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [timeLeft, setTimeLeft] = useState<number>(() =>
    getSecondsByMode("focus", getInitialSettings())
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedFocusSessions, setCompletedFocusSessions] =
    useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTimeForCurrentMode = useMemo<number>(() => {
    return getSecondsByMode(mode, settings);
  }, [mode, settings]);

  const progress = useMemo<number>(() => {
    const elapsed = totalTimeForCurrentMode - timeLeft;
    return Math.min((elapsed / totalTimeForCurrentMode) * 100, 100);
  }, [timeLeft, totalTimeForCurrentMode]);

  function clearTimerInterval(): void {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function switchToMode(nextMode: PomodoroMode): void {
    clearTimerInterval();
    setIsRunning(false);
    setMode(nextMode);
    setTimeLeft(getSecondsByMode(nextMode, settings));
  }

  function handleSessionEnd(): void {
    clearTimerInterval();
    setIsRunning(false);

    if (mode === "focus") {
      setCompletedFocusSessions((prev) => {
        const nextCount = prev + 1;
        const shouldUseLongBreak =
          nextCount % settings.roundsUntilLongBreak === 0;

        const nextMode: PomodoroMode = shouldUseLongBreak
          ? "longBreak"
          : "shortBreak";

        setMode(nextMode);
        setTimeLeft(getSecondsByMode(nextMode, settings));

        return nextCount;
      });
    } else {
      setMode("focus");
      setTimeLeft(getSecondsByMode("focus", settings));
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Sessão finalizada", {
        body:
          mode === "focus"
            ? "Hora de fazer uma pausa."
            : "Hora de voltar ao foco.",
      });
    }
  }

  function startTimer(): void {
    if (isRunning) return;
    setIsRunning(true);
  }

  function pauseTimer(): void {
    clearTimerInterval();
    setIsRunning(false);
  }

  function resetTimer(): void {
    clearTimerInterval();
    setIsRunning(false);
    setTimeLeft(getSecondsByMode(mode, settings));
  }

  function skipSession(): void {
    handleSessionEnd();
  }

  function requestNotificationPermission(): void {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {
      });
    }
  }

  function updateSetting(
    key: keyof PomodoroSettings,
    value: number | string
  ): void {
    const numericValue = Number(value);

    setSettings((prev) => ({
      ...prev,
      [key]: numericValue,
    }));
  }

  useEffect(() => {
    localStorage.setItem("pomodoro-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimerInterval();

          queueMicrotask(() => {
            handleSessionEnd();
          });

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimerInterval();
    };
  }, [isRunning, mode, settings]);

  useEffect(() => {
    setTimeLeft(getSecondsByMode(mode, settings));
    clearTimerInterval();
    setIsRunning(false);
  }, [settings.focus, settings.shortBreak, settings.longBreak]);

  return {
    mode,
    setMode: switchToMode,
    timeLeft,
    isRunning,
    settings,
    completedFocusSessions,
    progress,
    totalTimeForCurrentMode,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    updateSetting,
    requestNotificationPermission,
  };
}