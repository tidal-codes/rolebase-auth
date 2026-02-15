import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SessionTimer = ({ seconds }: { seconds: number }) => {
    const [secondsLeft, setSecondsLeft] = useState(seconds);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const minutes = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;

    const paddedSecs = secs.toString().padStart(2, "0");

    return (
        <Box>
            {minutes}:{paddedSecs}
        </Box>
    );
};

export default SessionTimer;

