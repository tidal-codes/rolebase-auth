import { useEffect, useRef } from "react";

export default function useInputFocus() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return { ref: inputRef }
}