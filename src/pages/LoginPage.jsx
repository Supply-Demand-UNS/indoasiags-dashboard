import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/components/provider/AuthProvider";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password length min 8 character"),
});

function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value) {
    try {
      setIsLoading(true);
      await login(value);
    } catch (error) {
      if (error.meta?.messages?.[0]) {
        toast({
          title: error.meta.messages[0],
          variant: "destructive",
        });
        return;
      }

      if (error.meta?.validations) {
        Object.keys(error.meta.validations).forEach((key) => {
          form.setError(key, {
            type: "server",
            message: error.meta.validations[key][0],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });
  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   setForm((oldState) => ({ ...oldState, [name]: value }));

  //   // setForm(asdasd)
  //   // setForm({...form,email: 'asdasd'})
  //   // setForm(() => {
  //   //   return {}
  //   // })
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // const formData = new FormData(event.target);
  //   // console.log({
  //   //   email: formData.get("email"),
  //   //   password: formData.get("password"),
  //   // });

  //   console.log({ form });
  // }
  return (
    <section className="min-h-screen bg-primary flex justify-center items-center">
      <div className="max-w-[480px] w-full p-8 space-y-6">
        <h1 className="text-white text-center text-lg font-medium">
          Zenith Dashboard
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password below to log into your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2" loading={isLoading}>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default LoginPage;
