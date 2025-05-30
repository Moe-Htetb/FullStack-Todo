import { useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "../slices/userApi";
import { loginSchema } from "../schema/loginSchems";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import type { RootState } from "../store";

type RegisterType = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterType>({
    resolver: zodResolver(loginSchema),
  });

  const [Login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    try {
      const res = await Login(data).unwrap();
      dispatch(setUserInfo(res));
      reset();
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex flex-col items-center justify-center  mt-40 md:mt-30  bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-md border border-black">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Login to Your Notes
        </h2>
        {isLoading || isSubmitting ? (
          <div className="flex justify-center py-2">
            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : null}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 text-black">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-black rounded text-black"
              placeholder="Enter your email"
              required
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1 text-black">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 border border-black rounded text-black"
              placeholder="••••••••"
              required
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            <div
              className="absolute top-[38px] right-3 cursor-pointer text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800"
            disabled={isSubmitting || isLoading}
          >
            Login
          </button>

          <p className="text-sm text-center text-black">
            Don't have an account?
            <a href="/register" className="text-blue-600">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
