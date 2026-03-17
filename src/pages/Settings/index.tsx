import type { ChangeEvent } from "react";
import type { PomodoroSettings } from "../../hooks/useTimer";
import { usePomodoroTimer } from "../../hooks/useTimer";

interface SettingField {
  key: keyof PomodoroSettings;
  label: string;
  description: string;
  min: number;
  max: number;
  unit: string;
}

const SETTING_FIELDS: SettingField[] = [
  {
    key: "focus",
    label: "Foco",
    description: "Duração da sessão de foco em minutos.",
    min: 1,
    max: 120,
    unit: "min",
  },
  {
    key: "shortBreak",
    label: "Pausa curta",
    description: "Duração da pausa curta em minutos.",
    min: 1,
    max: 60,
    unit: "min",
  },
  {
    key: "longBreak",
    label: "Pausa longa",
    description: "Duração da pausa longa em minutos.",
    min: 1,
    max: 120,
    unit: "min",
  },
  {
    key: "roundsUntilLongBreak",
    label: "Ciclos para pausa longa",
    description: "Quantidade de focos até a pausa longa.",
    min: 1,
    max: 12,
    unit: "ciclos",
  },
];

export default function SettingsPage() {
  const { settings, updateSetting } = usePomodoroTimer();

  function handleSettingChange(
    event: ChangeEvent<HTMLInputElement>,
    field: SettingField
  ): void {
    const parsed = Number(event.target.value);
    const nextValue = Math.min(
      field.max,
      Math.max(field.min, parsed || field.min)
    );
    updateSetting(field.key, nextValue);
  }

  return (
    <section className="relative overflow-hidden px-6 py-12 sm:px-10">
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_120px_-70px_rgba(34,211,238,0.8)] backdrop-blur sm:p-10">
        <span className="inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
          Configurações
        </span>

        <h1 className="mt-5 text-3xl font-semibold text-slate-100 sm:text-4xl">
          Ajuste o cronômetro
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Defina os tempos do seu ciclo Pomodoro. As alterações são salvas automaticamente.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SETTING_FIELDS.map((field) => (
            <label
              key={field.key}
              className="rounded-2xl border border-white/10 bg-slate-900/65 p-5"
            >
              <span className="text-sm font-semibold text-slate-100">
                {field.label}
              </span>

              <p className="mt-1 text-xs text-slate-400">{field.description}</p>

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="number"
                  min={field.min}
                  max={field.max}
                  value={settings[field.key]}
                  onChange={(event) => handleSettingChange(event, field)}
                  className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-2 text-base font-semibold text-cyan-100 outline-none transition-all focus:border-cyan-300/65"
                />

                <span className="text-xs uppercase tracking-[0.12em] text-slate-400">
                  {field.unit}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
