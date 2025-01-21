import z from "zod"

export const signUpSchema = z.object({
    userName: z.string().min(4).max(12),
    email: z.string().email(),
    password: z.string().min(4).max(12)
})

export const signInSchema = z.object({
    userName: z.string().min(4).max(12),
    password: z.string().min(4).max(12)
})

export const createRoomSchema = z.object({
    roomId: z.string().min(4).max(10)
})