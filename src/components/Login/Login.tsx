/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  useGetProfileQuery,
  useLoginMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SplinePointer } from "lucide-react";

const Login = () => {
  const [login, { isLoading: isLoging }] = useLoginMutation();
  const router = useRouter();
  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Grab token from cookies (if user already logged in before)
  const token = Cookies.get("token");

  // Only fetch profile if token exists
  const { data: profile, isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await login(data).unwrap();
      const token = res?.data?.token;

      if (token) {
        Cookies.set("token", token, { expires: 7 });
        const decodeToken = jwtDecode(token);
        console.log("Decoded Token:", decodeToken);

        toast.success("Login successful");
        router.push("/dashboard");
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.errorSources?.[0]?.details ||
        err?.error ||
        "Something went wrong";

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Login to your account</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading && <p>Loading profile...</p>}
        {profile && <p>Welcome back, {profile.data.fullName}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoging ? (
                <div className="flex items-center gap-2">
                  <SplinePointer className="animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
