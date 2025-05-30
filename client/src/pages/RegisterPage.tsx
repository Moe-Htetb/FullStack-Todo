import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/registerSchema";
import { useRegisterMutation } from "../slices/userApi";
import { toast } from "react-toastify";

type RegisterType = z.infer<typeof registerSchema>;

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    try {
      await registerMutation(data);
      navigate("/login");
      toast.success("Register Successful");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex items-center justify-center  mt-40 md:mt-30 bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a New Account
        </h2>
        {isLoading || isSubmitting ? (
          <div className="flex justify-center py-2">
            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : null}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Choose a username"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full border px-3 py-2 rounded mt-1 pr-10"
              placeholder="Create a password"
              {...register("password")}
            />
            <div
              className="absolute right-3 top-9 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
