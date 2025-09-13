"use client";

import * as React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { useOtpVerifyMutation } from "@/redux/features/auth/authApi";

const OtpVerify: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [otpVerify] = useOtpVerifyMutation();
  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      // Replace with your API call to verify OTP
      const res = await otpVerify(data).unwrap();
      toast.success(res?.data?.message);
      form.reset();
      router.push("/new-password"); // Navigate to reset password page
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl p-8">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Verify OTP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Enter your email and the OTP sent to your email to continue.
          </p>

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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* OTP */}
              <FormField
                control={form.control}
                name="otp"
                rules={{
                  required: "OTP is required",
                  minLength: {
                    value: 4,
                    message: "OTP must be at least 4 digits",
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP cannot exceed 6 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter OTP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpVerify;
