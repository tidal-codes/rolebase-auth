import Home from "../pages/Home";
import AuthEntry from "../components/pages/AuthEntry";
import type { AppRouteObject } from "../@types/auth";

const routes: AppRouteObject[] = [
    {
        path: "/",
        protected: true,
        element: <Home />,
    },
    {
        path: "/auth",
        element: <AuthEntry />
    }
]

export default routes;