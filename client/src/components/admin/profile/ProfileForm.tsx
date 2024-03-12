import { profileSchema } from "@/lib/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Loader from "@/svg/Loader"
import { _useMutation } from "@/lib/actions"
import { removeEmptyKeys } from "@/lib/utils"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Form } from "@/components/ui"
import { useState } from "react"
import { ToastMessage, SelectImageButton, HandleAlert } from "@/components"
import { PATH_LIST, ROLE_LIST } from "@/constants/enum"
import { IUser } from "@/types/exports";
type Props = {
  type: "UPDATE" | "CREATE",
  data?: IUser
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileForm = ({ type, data, openDialog }: Props) => {
  const { mutateAsync: patchUser, isPending: patchPending } = _useMutation<IMutationBody<IUser>>(
    { models: "PROFILE", id: data?.id, methodType: "PATCH" }
  );

  const { mutateAsync: postUser, isPending: postPending } = _useMutation<IMutationBody<IUser>>(
    { models: "PROFILE", id: data?.id, methodType: "POST" }
  );
  const toastMessage = ToastMessage();

  const [image, setImage] = useState<string | undefined>();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      img: '',
      username: data?.username || "",
      email: data?.email || "",
      password: "",
      role: data?.role == 0 ? 0 : data?.role || ROLE_LIST.USER,
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      removeEmptyKeys(values);
      if (type == "CREATE") {
        await postUser(
          {
            path: PATH_LIST.USER,
            body: { ...values },
          }
        );
        toastMessage({ defaultText: "create" });
      }
      else {
        await patchUser(
          {
            path: `${PATH_LIST.USER}/${data?.id}`,
            body: { ...values },
          }
        );
        toastMessage({ defaultText: "update" });
      }
      if (openDialog) openDialog(false);

    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }

  }

  return (
    <Form {...form}>

      <form className="flex flex-col gap-5 mt-4 w-full">

        <div className="flex items-center gap-2 h-24 overflow-hidden">

          <FormField control={form.control} name="img" render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Upload Image</FormLabel>
              <FormControl>
                <SelectImageButton fieldChange={field.onChange} setImage={setImage} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex-1 flex-center">
            {
              image &&
              <img src={image || ""} alt="avatar-image" width={96} height={96} />
            }
          </div>
        </div>

        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="off" placeholder="Enter your username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" autoComplete="off" placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" autoComplete="new-password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="role" render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="popper">
                {data?.role == ROLE_LIST.ADMIN ?
                  <>
                    <SelectItem value={ROLE_LIST.ADMIN.toString()}>Admin</SelectItem>
                  </>
                  :
                  <>
                    <SelectItem value={ROLE_LIST.USER.toString()}>User</SelectItem>
                    <SelectItem value={ROLE_LIST.EDITOR.toString()}>Editor</SelectItem>
                  </>
                }
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />


        <HandleAlert trigger={form.handleSubmit(onSubmit)}>
          <Button disabled={postPending || patchPending} type="button" variant="default" className="w-full">
            {(postPending || patchPending) && <Loader />}{type == "UPDATE" ? "Update" : "Create"}
          </Button>
        </HandleAlert>
      </form>
    </Form >

  )
}

export default ProfileForm