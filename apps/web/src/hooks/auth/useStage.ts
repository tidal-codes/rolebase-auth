import { useEffect, useState } from "react";
import type { AuthStage } from "../../@types/auth";
import { getAvailableEmailConfirmation, removeAvailableEmailConfirmation } from "../../utils/emailConfirmationStorage";

export default function useStage() {
    const [stage, setStage] = useState<AuthStage>("LOGIN");

    useEffect(() => {
        const data = getAvailableEmailConfirmation();

        if (data) {
            if (Date.now() > data.expiresAt) {
                removeAvailableEmailConfirmation();
                return;
            }
            setStage("VERIFY-EMAIL");
        }
    }, []);

    return { stage, setStage }
}