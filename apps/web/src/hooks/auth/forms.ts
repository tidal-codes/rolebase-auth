import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { EmailForm, PasswordForm, RegisterForm, VerifyCodeForm } from "../../@types/auth";

export const emailSchema = z.object({
    email: z.string().email()
})
export const passwordSchema = z.object({
    password: z.string().min(6)
})
export const registerSchema = z.object({
    fullName: z.string().min(4).max(16),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password cannot exceed 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})
export const verifyCodeSchema = z.object({
    pin: z.array(z.string().min(1))
        .min(1, { message: "Pin is required" })
        .length(6, { message: "Pin must be 4 digits long" })
})

export function useEmailForm() {
    const { handleSubmit, register, setFocus, resetField, formState: { errors } } = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ""
        }
    })

    return { handleSubmit, resetField, setFocus, register, errors }
}
export function usePasswordForm() {
    const { handleSubmit, register, setFocus, resetField, formState: { errors } } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: ""
        }
    })

    return { handleSubmit, setFocus, resetField, register, errors }
}

export function useRegisterForm() {
    const { handleSubmit, register, setFocus, resetField, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            password: ""
        }
    })

    return { handleSubmit, setFocus, register, resetField, errors }
}

export function useCodeVerificationForm() {
    const { handleSubmit, control, setFocus, resetField, formState: { errors } } = useForm<VerifyCodeForm>({
        resolver: zodResolver(verifyCodeSchema)
    })
    return { handleSubmit, setFocus, control, resetField, errors }
}