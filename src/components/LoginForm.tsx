/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { SignInAction } from "@/lib/action";
import useUserStore from "@/stores/user";

export interface IFormLoginInput {
  username: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormLoginInput>();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<IFormLoginInput> = async (data) => {
    const result: any = await SignInAction(data);

    if (result.success) {
      toast.success(result.message);

      const user = JSON.parse(JSON.stringify(result.user));

      setUser({
        id: user._id,
        username: user.username,
        archivedTenders: user.archive,
        recordedTenders: user.record,
        notification: user.notification,
        config: user.config,
      });

      router.push("/home");
    } else {
      return toast.error(result.message);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="w-full flex flex-col gap-3"
    >
      <InputField
        type="text"
        placeholder="Username"
        error={errors.username}
        icon="/profile.png"
        register={register("username", {
          required: true,
          minLength: 3,
          maxLength: 12,
        })}
      />
      <InputField
        type="password"
        placeholder="Password"
        error={errors.password}
        icon="/lock.png"
        register={register("password", { required: true, minLength: 5 })}
      />
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

const InputField = ({
  type,
  placeholder,
  error,
  icon,
  register,
}: {
  type: string;
  placeholder: string;
  error: any;
  icon: string;
  register: any;
}) => (
  <div className="relative">
    {error && (
      <p className="text-red-500 text-sm">
        {error.type === "required" && `${placeholder} is required`}
        {error.type === "minLength" &&
          `${placeholder} must be at least 3 characters`}
        {error.type === "maxLength" &&
          `${placeholder} must be at most 4 characters`}
      </p>
    )}
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="bg-border-light text-sm border-none w-full outline-none pl-12 text-[#777] font-medium p-2 rounded-3xl focus:ring-2 focus:ring-primary py-4"
        autoComplete={`new-${type}`}
        {...register}
      />
      <Image
        src={icon}
        alt={type}
        width={25}
        height={25}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 opacity-50"
      />
    </div>
  </div>
);

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <button
    className={`bg-border-dark p-2 rounded-3xl flex items-center justify-center text-white font-semibold text-md hover:bg-border-dark/90 transition-all duration-300 py-3 mt-3 ${
      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <Icon icon="line-md:loading-loop" className="w-8 h-8" />
    ) : (
      "Login"
    )}
  </button>
);

export default LoginForm;
