export async function checkForEmailAccount(email: string) {
    const data = await new Promise<{ email: string, available: boolean }>((resolve, reject) => {
        setTimeout(() => {
            resolve({ available: false, email })
            // reject(new Error("test"))
        }, 1000);
    })

    return data;
}

export async function loginUser(email: string, password: string) {
    const data = await new Promise<{ name: string, email: string }>((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "tidal", email })
            // reject(new Error("wrong credential"))
        }, 1500);
    })

    return data;
}

export async function register(email: string, fullName: string, password: string) {
    const data = await new Promise<{ name: string, email: string }>((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "tidal", email })
            // reject(new Error("wrong credential"))
        }, 1500);
    })

    return data;
}

export async function VerifyCode(email: string, code: string) {
    const data = await new Promise<{ name: string, email: string }>((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "tidal", email })
            // reject(new Error("wrong credential"))
        }, 1500);
    })

    return data;
}