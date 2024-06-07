import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Shell from "./components/Shell";
import Profs from "./pages/Profs";
import Sessions from "./pages/Sessions";
import { ContextProvider } from "./scripts/context";
import Students from "./pages/Students";
import Groups from "./pages/Groups";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Shell />,
            children: [
                { path: "/", element: <Sessions /> },
                { path: "/profs", element: <Profs /> },
                { path: "/students", element: <Students /> },
                { path: "/groups", element: <Groups /> },
            ],
        },
    ]);
    return (
        <ContextProvider>
            <MantineProvider>
                <ModalsProvider>
                    <RouterProvider router={router} />
                </ModalsProvider>
            </MantineProvider>
        </ContextProvider>
    );
}

export default App;
