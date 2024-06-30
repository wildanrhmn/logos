"use server";

import { signIn, auth } from "@/auth/auth";
import { AuthError } from "next-auth";
import { IFormLoginInput } from "@/components/LoginForm";
import User from "./models/user-model";

export async function SignInAction(formData: IFormLoginInput) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, message: 'Invalid email or password' };
                default:
                    return { success: false, message: 'Invalid email or password' };
            }
        }
    }
    const user = await User.findOne({ username: formData.username });
    return { success: true, message: 'Successfully logged in.', user: user };
}