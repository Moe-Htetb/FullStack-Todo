import { apiSlice } from "./api";

interface IloginInput {
  email: string;
  password: string;
}

interface IregisterInput extends IloginInput {
  name: string;
}
interface IupdateProfile {
  name?: string;
  email?: string;
  password?: string;
}
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (data: IloginInput) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    Logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data: IregisterInput) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data: IupdateProfile) => ({
        url: "profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} = userApiSlice;
