import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthProvider";

export default function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("AuthProvider is missing!");
    return ctx;
}