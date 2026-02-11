import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
    placement: "top-end",
    pauseOnPageIdle: true,
})

type Toast = Record<"error" | "info", (title: string, description?: string) => void>

export const toast: Toast = {
    error: (title, description) => {
        toaster.create({
            type: "error",
            title,
            description
        })
    },
    info: (title, description) => {
        toaster.create({
            type: "info",
            title,
            description
        })
    }
}