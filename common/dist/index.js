import z, { email } from "zod";
import { id } from "zod/locales";
// user zod validation
export const signupInput = z.object({
    name: z.string(),
    password: z.string().min(7),
    email: z.string().email()
});
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(7)
});
// Blog zod validation
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
});
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
});
//# sourceMappingURL=index.js.map