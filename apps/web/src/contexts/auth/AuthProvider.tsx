import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, User } from "../../@types/auth";
import { authApi } from "../../api/auth";
import { setAxiosAccessToken } from "../../libs/client";



export const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const setAuth = useCallback(({ user, accessToken }: { user: User; accessToken: string }) => {
        setUser(user);
        setAccessToken(accessToken);
    }, []);

    const clearAuth = useCallback(() => {
        setUser(null);
        setAccessToken(null);
    }, []);

    useEffect(() => {
        (async function checkUser() {
            try {
                const { data } = await authApi.refresh();
                setAuth({
                    user: data.data.user,
                    accessToken: data.data.accessToken
                })
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        })();
    }, [])

    useEffect(() => {
        setAxiosAccessToken(accessToken);
    }, [accessToken])

    return (
        <AuthContext value={{ user, loading, accessToken, setAuth, clearAuth }}>{children}</AuthContext>
    );
}

export default AuthProvider;
