
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@xylem.com"), {
      message: "Email must end with @xylem.com",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (data: FormValues) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Eco Sort</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (@xylem.com)</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.email@xylem.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Start Game
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
