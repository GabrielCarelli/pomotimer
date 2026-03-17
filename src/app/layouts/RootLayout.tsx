import { Link, Outlet } from "react-router-dom";

export default function RootLayout(){
    return(
        <div>
            <header>
                <nav>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/pomodoro"}>Timer</Link>
                    <Link to={"/settings"}>Settings</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}