import type { AppRouteObject } from "../@types/auth";
import ProtectedRoute from "./ProtectedRoutes";

export function wrapRoutes(routes: AppRouteObject[]) {
    return routes.map(route => {
        let newRoute = { ...route };

        if (route.protected) {
            newRoute.element = (
                <ProtectedRoute>
                    {route.element}
                </ProtectedRoute>
            );
        }

        if (route.children) {
            newRoute.children = wrapRoutes(route.children);
        }

        return newRoute;
    });
}