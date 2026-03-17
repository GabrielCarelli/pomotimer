import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import App from "../App";
import PomodoroPage from "../../pages/Pomodoro";
import SettingsPage from "../../pages/Settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children:[
            {
                index:true,
                element:<App />
            },
            {
                path:"pomodoro",
                element: <PomodoroPage />
            },
            {
                path: "settings",
                element: <SettingsPage />
            }
        ]
    }
])