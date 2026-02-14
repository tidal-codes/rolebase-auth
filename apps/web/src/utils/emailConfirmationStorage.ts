import type { AvailableEmailConfirmType } from "../@types/auth";
const key = "available-email-confirm"


export function getAvailableEmailConfirmation() {
    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
        return JSON.parse(value) as AvailableEmailConfirmType;
    } catch {
        throw new Error("faild to parse json")
    }

}

export function setAvailableEmailConfirmation(email: string) {
    const expiresAt = Date.now() + 20 * 60_000;
    const data = {
        email,
        expiresAt,
    };
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        throw new Error("faild to parse json")
    }
}

export function removeAvailableEmailConfirmation() {
    localStorage.removeItem(key);
}