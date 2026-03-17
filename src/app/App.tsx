import '../styles/index.css';
import { useNavigate } from 'react-router-dom';
function App() {
    const navigate = useNavigate();
    function irParaTimer(){
       navigate("/pomodoro")
      }
  const methodHighlights = [
    {
      title: 'Foco sem distrações',
      description:
        'Trabalhe em blocos curtos e intensos para manter a mente no que realmente importa. 25 minutos podem render mais do que horas dispersas.',
    },
    {
      title: 'Pausas estratégicas',
      description:
        'Pequenos intervalos ajudam seu cérebro a descansar, recuperar energia e voltar com mais clareza. Produtividade também depende de saber parar.',
    },
    {
      title: 'Menos procrastinação',
      description:
        'Divida tarefas grandes em ciclos simples e comece sem pressão. O mais difícil não é terminar — é começar.',
    },
  ];

  const cycleSteps = [
    'Escolha uma tarefa para iniciar.',
    'Inicie um ciclo de foco de 25 minutos',
    'Faça uma pausa curta de 5 minutos.',
    'Repita o processo e por 4 ciclos.',
    'Comece com pausas de 15 minutos'
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-56 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-12 sm:px-10">
        <header className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
            Good Time
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-100 sm:text-5xl">
            Método Pomodoro com visual moderno e foco definido
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Site com a implementação do método pomodoro, realizado para estudo de estrutura de pastas, e permanência de estados.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200" onClick={irParaTimer}>
              Começar foco
            </button>
          </div>
        </header>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {methodHighlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-900/65 p-6 shadow-[0_20px_60px_-30px_rgba(34,211,238,0.35)] backdrop-blur"
            >
              <h2 className="text-lg font-semibold text-slate-100">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-900/70 p-7">
            <h2 className="text-2xl font-semibold text-slate-100">
              O que é o metodo Pomodoro?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              O método Pomodoro é uma técnica de gestão de tempo em que você divide o trabalho em blocos curtos de foco total, normalmente de 25 minutos, seguidos por pequenas pausas. A ideia é simples: trabalhar com intensidade por um período curto evita cansaço mental e ajuda a manter a concentração.
            </p>
          </article>

          <article className="rounded-3xl border border-cyan-200/20 bg-cyan-300/5 p-7">
            <h2 className="text-xl font-semibold text-cyan-100">
              Fluxo sugerido
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-200">
              {cycleSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/20 text-xs font-semibold text-cyan-100">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
        </section>
      </div>
    </section>
  );
}

export default App;
