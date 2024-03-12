import { loginSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui"
import { ToastMessage } from "@/components"
import { PATH_LIST } from "@/constants/enum"


const LoginForm = () => {
  const { mutateAsync, isPending, isSuccess } = _useMutation<ILogin>(
    { models: "AUTH" }
  );
  const toastMessage = ToastMessage();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await mutateAsync(
        {
          path: PATH_LIST.AUTH,
          body: { username: values.username, password: values.password }
        }
      );
      form.reset();
      toastMessage({ defaultText: "login" });
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }

  }

  return (
    <Form {...form}>
      <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      <p className="text-sm text-muted-foreground">Enter your username and password</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4 ">

        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="username" placeholder="Enter your username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" autoComplete="password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div>
          <Button disabled={isPending || isSuccess}
            type="submit" variant="default" className="w-full">
            {(isPending || isSuccess) && <Loader />}Sign in
          </Button>
        </div>
      </form>
    </Form>

  )
}

export default LoginForm