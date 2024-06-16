'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export interface IFormLoginInput {
    username: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormLoginInput>();

    const onSubmit: SubmitHandler<IFormLoginInput> = (data) => {
        try {
            toast.success("Login successful");
            router.push("/home");
        } catch (error) {
            toast.error("Login failed");
        } finally {
            reset();
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="w-full flex flex-col gap-3">
            {errors.username && (
                <p className="text-red-500 text-sm">
                    {errors.username.type === "required" && "Username is required"}
                    {errors.username.type === "minLength" && "Username must be at least 3 characters"}
                    {errors.username.type === "maxLength" && "Username must be at most 10 characters"}
                </p>
            )}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-border-light text-sm border-none w-full outline-none pl-12 text-[#777] font-medium p-2 rounded-3xl focus:ring-2 focus:ring-primary py-4"
                    autoComplete="new-username"
                    {...register("username", { required: true, minLength: 3, maxLength: 10 })}
                />
                <Image
                    src="/profile.png"
                    alt="profile"
                    width={25}
                    height={25}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 opacity-50"
                />
            </div>

            {errors.password && (
                <p className="text-red-500 text-sm">
                    {errors.password.type === "required" && "Password is required"}
                    {errors.password.type === "minLength" && "Password must be at least 6 characters"}
                </p>
            )}
            <div className="relative mt-1">
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-border-light text-sm border-none w-full outline-none pl-12 text-[#777] font-medium p-2 rounded-3xl focus:ring-2 focus:ring-primary py-4"
                    autoComplete="new-password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                <Image
                    src="/lock.png"
                    alt="lock"
                    width={25}
                    height={25}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 opacity-50"
                />
            </div>

            <button
                className={`bg-border-dark p-2 rounded-3xl text-white font-semibold text-md hover:bg-border-dark/90 transition-all duration-300 py-4 mt-3`}
            >
                LOGIN
            </button>
        </form>
    )
}

export default LoginForm