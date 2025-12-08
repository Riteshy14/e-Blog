import z, { email } from "zod"
import { id } from "zod/locales"

// user zod validation
export const signupInput= z.object({
  name:z.string(),
  password:z.string().min(7),
  email: z.string().email()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput= z.object({
    email: z.string().email(),
    password:z.string().min(7)
}) 

export type SigninInput = z.infer<typeof signinInput>

// Blog zod validation
export const createBlogInput= z.object({
    title : z.string(),
    content: z.string()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title : z.string(),
    content: z.string(),
    id : z.string()
}) 

export type UpdateBlogInput = z.infer<typeof updateBlogInput>