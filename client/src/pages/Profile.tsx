import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../slices/userApi";
import { setUserInfo } from "../slices/auth";
import { updateSchema } from "../schema/updateSchema";
import type { RootState } from "../store";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type FormInputs = z.infer<typeof updateSchema>;

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      password: "",
    },
  });

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(setUserInfo(res));
      toast.success("User profile updated.");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-md border border-black">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Update Profile
        </h2>
        {isLoading || isSubmitting ? (
          <div className="flex justify-center py-2">
            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : null}
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <div>
            <label htmlFor="name" className="block mb-1 text-black">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-2 border border-black rounded text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-black">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border border-black rounded text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-black">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-2 pr-10 border border-black rounded text-black"
              placeholder="Enter Your New Password"
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
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
