import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
      "hover:bg-white/10 hover:text-white",
      isActive
        ? "bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20"
        : "text-slate-300",
    ].join(" ");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-10">
          <nav className="flex items-center justify-center gap-2 sm:gap-3">
            <NavLink to="/" end className={navItemClass}>
              Home
            </NavLink>
            <NavLink to="/pomodoro" className={navItemClass}>
              Timer
            </NavLink>
            <NavLink to="/settings" className={navItemClass}>
              Settings
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
