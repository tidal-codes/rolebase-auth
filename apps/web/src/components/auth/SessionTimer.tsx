import { Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

const SessionTimer = ({ seconds }: { seconds: number }) => {
    console.log(seconds)
    const endTimeRef = useRef(Date.now() + seconds * 1000);

    const [secondsLeft, setSecondsLeft] = useState(seconds);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
            setSecondsLeft(diff);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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


