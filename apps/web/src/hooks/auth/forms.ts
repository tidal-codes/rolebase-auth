import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { EmailForm, PasswordForm } from "../../@types/auth";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const emailSchema = z.object({
    email: z.string().email()
})
export const passwordSchema = z.object({
    password: z.string().min(6)
})

export function useEmailForm() {
    const { handleSubmit, register, resetField, formState: { errors } } = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ""
        }
    })

    return { handleSubmit, resetField, register, errors }
}
export function usePasswordForm() {
    const { handleSubmit, register, resetField, formState: { errors } } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: ""
        }
    })

    return { handleSubmit, resetField, register, errors }
}


